import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { Checkbox, Form, Spin, notification } from 'antd';
import { Address, AddressType } from '../../../../types/authorization-response';
import { countriesStore } from '../../../../store/countries-store';
import { AddressFields } from '../../types';
import { addressesAreEqual, checkIfFormValid } from '../../helpers';
import { AddressForm } from '../../../RegistrationForm/sub-components/AddressForm';
import CustomButton from '../../../CustomButton/CustomButton';
import { Country } from '../../../../utils/countries-service';
import userStore from '../../../../store/user-store';

export const EditForm = observer(
  ({ address, type, onSubmit }: { address: Address; type: AddressType; onSubmit: () => void }) => {
    const [form] = Form.useForm();
    const [country, setCountry] = useState<Country | undefined>(
      countriesStore.countries.find((c) => c.name === address.country)
    );
    const [notificationAPI, contextHolder] = notification.useNotification();
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
      form.resetFields();
      setCountry(countriesStore.countries.find((c) => c.name === address.country));
    }, [countriesStore.state, address.id]);

    const handleEditAddress = async () => {
      setIsLoading(true);
      await form.validateFields().catch(() => {});
      const fields = form.getFieldsError();
      if (!fields.every((fld) => fld.errors.length === 0)) {
        setIsLoading(false);
        return;
      }

      const values: AddressFields = form.getFieldsValue(true);
      const updatedAddress = {
        id: address.id,
        city: values.city,
        street: values.street,
        country: values.country,
        postalCode: values.postCode,
        isDefault: Boolean(values.setAsDefaultShippingAddress),
      };

      if (addressesAreEqual(address, updatedAddress)) {
        setIsLoading(false);
        if (onSubmit) {
          onSubmit();
        }
        return;
      }
      try {
        await userStore.editAddress(type, updatedAddress);
        setIsLoading(false);
        form.resetFields();
        notificationAPI.success({
          message: `You have successfully updated the address! 🥳`,
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
      <Spin spinning={isLoading} style={{ width: '212px' }}>
        <Form
          layout="vertical"
          style={{ marginTop: '1.5rem' }}
          initialValues={{
            country: address.country,
            city: address.city,
            street: address.street,
            postCode: address.postalCode,
            setAsDefaultShippingAddress: address.isDefault,
          }}
          form={form}
          onFieldsChange={() => checkIfFormValid(form, setIsValid)}
        >
          <AddressForm countries={countriesStore.countries} country={country} setCountry={setCountry} />
          <Form.Item name="setAsDefaultShippingAddress" valuePropName="checked">
            <Checkbox>Set as default this address</Checkbox>
          </Form.Item>
        </Form>
        <CustomButton variety="common" htmlType="submit" block onClick={() => handleEditAddress()} disabled={!isValid}>
          UPDATE EDITING
        </CustomButton>
        {contextHolder}
      </Spin>
    );
  }
);
