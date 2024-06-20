import { observer } from 'mobx-react-lite';
import { AxiosError } from 'axios';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { Checkbox, Form, Spin, notification } from 'antd';
import { useState } from 'react';
import { AddressType } from '../../../../types/authorization-response';
import { Country } from '../../../../utils/countries-service';
import { AddressFields } from '../../types';
import userStore from '../../../../store/user-store';
import { AddressForm } from '../../../RegistrationForm/sub-components/AddressForm';
import CustomButton from '../../../CustomButton/CustomButton';
import { countriesStore } from '../../../../store/countries-store';
import styles from '../../ProfileForm.module.css';
import { checkIfFormValid } from '../../helpers';
import { CubeSpinner } from '../../../CubeSpinner/CubeSpinner';

export const AddAddressForm = observer(({ type, onSubmit }: { type: AddressType; onSubmit?: () => void }) => {
  const [country, setCountry] = useState<Country | undefined>();
  const [form] = Form.useForm();
  const [notificationAPI, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleAddAddress = async () => {
    setIsLoading(true);
    await form.validateFields().catch(() => {});
    const fields = form.getFieldsError();
    if (!fields.every((fld) => fld.errors.length === 0)) {
      setIsLoading(false);
      return;
    }

    const values: AddressFields = form.getFieldsValue(true);
    try {
      const newAddress = {
        city: values.city,
        country: values.country,
        street: values.street,
        postalCode: values.postCode,
        isDefault: Boolean(values.setAsDefaultShippingAddress),
      };
      const addressExists = userStore.user?.addresses[`${type}Addresses`].find((addr) => {
        return (
          addr.city === newAddress.city &&
          addr.country === newAddress.country &&
          addr.postalCode === newAddress.postalCode &&
          addr.street === newAddress.street
        );
      });
      if (addressExists) {
        setIsLoading(false);
        notificationAPI.success({
          message: `This address already exists`,
          placement: 'top',
          icon: <FrownOutlined />,
          duration: 2.5,
        });
        return;
      }
      await userStore.addAddress(type, newAddress);
      setIsLoading(false);
      form.resetFields();
      notificationAPI.success({
        message: `You have successfully added a new address! 🥳`,
        placement: 'top',
        icon: <SmileOutlined />,
        duration: 2.5,
      });
    } catch (error) {
      setIsLoading(false);
      notificationAPI.error({
        message: `Something went wrong:`,
        description: ((error as AxiosError)?.response?.data as { message: string })?.message || 'Please try again.',
        placement: 'top',
        icon: <FrownOutlined />,
        duration: 2,
      });
      return;
    }
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <Spin
      indicator={<CubeSpinner size={32} tilted />}
      spinning={isLoading}
      style={{ width: '212px' }}
      wrapperClassName={styles.spin}
    >
      <Form
        layout="vertical"
        form={form}
        style={{ marginTop: '1.5rem' }}
        onFieldsChange={() => checkIfFormValid(form, setIsValid)}
      >
        <AddressForm countries={countriesStore.countries} country={country} setCountry={setCountry} />
        <Form.Item name="setAsDefaultShippingAddress" valuePropName="checked">
          <Checkbox>Set as default this address</Checkbox>
        </Form.Item>
        <CustomButton variety="common" htmlType="submit" onClick={() => handleAddAddress()} block disabled={!isValid}>
          CREATE ADDRESS
        </CustomButton>
      </Form>
      {contextHolder}
    </Spin>
  );
});
