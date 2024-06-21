import { FrownOutlined, PlusOutlined, SmileOutlined } from '@ant-design/icons';
import { Modal, Typography, notification } from 'antd';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { Address, AddressType } from '../../../types/authorization-response';
import styles from '../ProfileForm.module.css';
import { EditForm } from './address-sub-components/EditForm';
import { AddAddressForm } from './address-sub-components/AddAddressForm';
import { AddressCard } from './address-sub-components/AddressCard';

export const Addresses = observer(
  ({ addresses, type, title }: { addresses: Address[]; type: AddressType; title: string }) => {
    const [isModalEditAddressOpen, setIsModalEditAddressOpen] = useState(false);
    const [isModalAddAddressOpen, setIsModalAddAddressOpen] = useState(false);
    const [currAddr, setCurrAddr] = useState(addresses[0]);
    const [notificationAPI, contextHolder] = notification.useNotification();

    return (
      <div className={styles['address-form-styles']}>
        <Typography.Title level={4}>{title}</Typography.Title>
        <div
          className={styles['add-new-btn']}
          onClick={() => {
            setIsModalAddAddressOpen(true);
          }}
        >
          <PlusOutlined /> ADD NEW ADDRESS
        </div>
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
          open={isModalAddAddressOpen}
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
