import {
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  FrownOutlined,
  PlusOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import { Badge, Card, Checkbox, Form, Modal, Spin, Typography, notification } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import userStore from '../../../store/user-store';
import { Address, AddressType } from '../../../types/authorization-response';
import { Country } from '../../../utils/countries-service';
import { countriesStore } from '../../../store/countries-store';
import CustomButton from '../../CustomButton/CustomButton';
import { AddressForm } from '../../RegistrationForm/sub-components/AddressForm';
import styles from '../ProfileForm.module.css';
import { AddressFields } from '../types';
import { addressesAreEqual } from '../helpers';

export const Addresses = observer(
  ({ addresses, type, title }: { addresses: Address[]; type: AddressType; title: string }) => {
    const [isModalEditAddressOpen, setIsModalEditAddressOpen] = useState(false);
    const [isModalAddAddrerssOpen, setIsModalAddAddressOpen] = useState(false);
    const [currAddr, setCurrAddr] = useState(addresses[0]);
    const [notificationAPI, contextHolder] = notification.useNotification();

    return (
      <div className={styles['address-form-styles']}>
        <Typography.Title level={3}>{title}</Typography.Title>
        {addresses.map((address) => (
          <AddressCard
            address={address}
            type={type}
            onEdit={(addr: Address) => {
              setCurrAddr(addr);
              setIsModalEditAddressOpen(true);
            }}
            onDeleteError={(error: Error) => {
              notificationAPI.error({
                message: `Something went wrong:`,
                description:
                  ((error as AxiosError)?.response?.data as { message: string })?.message || 'Please try again.',
                placement: 'top',
                icon: <FrownOutlined />,
                duration: 2.5,
              });
            }}
            onDeleteSuccess={() => {
              notificationAPI.success({
                message: `You have deleted the address.`,
                placement: 'top',
                icon: <SmileOutlined />,
                duration: 2.5,
              });
            }}
          />
        ))}
        <CustomButton
          style={{ margin: '1rem 0' }}
          variety="common"
          htmlType="submit"
          onClick={() => {
            setIsModalAddAddressOpen(true);
          }}
          block
        >
          <PlusOutlined /> ADD NEW ADDRESS
        </CustomButton>
        <Modal
          className={styles['modal-form']}
          title="Edit Address"
          open={isModalEditAddressOpen}
          onCancel={() => setIsModalEditAddressOpen(false)}
          footer=""
        >
          <EditForm address={currAddr} type={type} onSubmit={() => setIsModalEditAddressOpen(false)} />
        </Modal>
        <Modal
          className={styles['modal-form']}
          title="Add New Address"
          open={isModalAddAddrerssOpen}
          onCancel={() => setIsModalAddAddressOpen(false)}
          footer=""
        >
          <AddAddressForm type={type} onSubmit={() => setIsModalAddAddressOpen(false)} />
        </Modal>
        {contextHolder}
      </div>
    );
  }
);

const EditForm = observer(
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

    const checkIfFormValid = (): void => {
      const fields = form.getFieldsError();
      for (const field of fields) {
        if (field.errors.length > 0) {
          setIsValid(false);
          return;
        }
      }
      setIsValid(true);
    };

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
      const addressExists = userStore.user?.addresses[`${type}Addresses`].find((addr) => {
        return (
          addr.city === updatedAddress.city &&
          addr.country === updatedAddress.country &&
          addr.postalCode === updatedAddress.postalCode &&
          addr.street === updatedAddress.street
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
      <Spin spinning={isLoading}>
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
          onFieldsChange={checkIfFormValid}
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

const AddAddressForm = observer(({ type, onSubmit }: { type: AddressType; onSubmit?: () => void }) => {
  const [country, setCountry] = useState<Country | undefined>();
  const [form] = Form.useForm();
  const [notificationAPI, contextHolder] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const checkIfFormValid = (): void => {
    const fields = form.getFieldsError();
    for (const field of fields) {
      if (field.errors.length > 0) {
        setIsValid(false);
        return;
      }
    }
    setIsValid(true);
  };

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
    <Spin spinning={isLoading}>
      <Form layout="vertical" form={form} style={{ marginTop: '1.5rem' }} onFieldsChange={checkIfFormValid}>
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

function AddressCard({
  address,
  type,
  onEdit,
  onDeleteError,
  onDeleteSuccess,
}: {
  address: Address;
  type: AddressType;
  onEdit: (addr: Address) => void;
  onDeleteSuccess: () => void;
  onDeleteError: (error: Error) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAddress = async () => {
    setIsLoading(true);
    try {
      await userStore.deleteAddress(type, address.id);
      setIsLoading(false);
      onDeleteSuccess();
    } catch (error) {
      setIsLoading(false);
      onDeleteError(error as Error);
    }
  };

  if (address.isDefault) {
    return (
      <Spin spinning={isLoading}>
        <Badge.Ribbon text="Default address" className={styles['badge-style']}>
          <Card
            style={{ paddingTop: '1rem' }}
            actions={[
              <DeleteOutlined key="setting" onClick={handleDeleteAddress} />,
              <EditOutlined key="edit" onClick={() => onEdit(address)} />,
            ]}
          >
            <EnvironmentOutlined /> {address.country}, {address.postalCode}, city: {address.city}, street:{' '}
            {address.street}
          </Card>
        </Badge.Ribbon>
      </Spin>
    );
  }

  return (
    <Spin spinning={isLoading}>
      <Card
        actions={[
          <DeleteOutlined key="setting" onClick={handleDeleteAddress} />,
          <EditOutlined key="edit" onClick={() => onEdit(address)} />,
        ]}
      >
        <EnvironmentOutlined /> {address.country}, {address.postalCode}, city: {address.city}, street: {address.street}
      </Card>
    </Spin>
  );
}
