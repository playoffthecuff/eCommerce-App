import { useState } from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  HomeOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Badge, Card, Spin, Typography } from 'antd';
import { Address, AddressType } from '../../../../types/authorization-response';
import userStore from '../../../../store/user-store';
import styles from '../../ProfileForm.module.css';

export function AddressCard({
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
      <Spin spinning={isLoading} style={{ width: '212px' }} wrapperClassName={styles.spin}>
        <Badge.Ribbon text="Default address" className={styles['badge-style']}>
          <Card
            style={{ paddingTop: '1.25rem', width: '212px' }}
            actions={[
              <DeleteOutlined key="setting" onClick={handleDeleteAddress} />,
              <EditOutlined key="edit" onClick={() => onEdit(address)} />,
            ]}
          >
            <div style={{ width: '100%', height: '2rem' }}>
              <GlobalOutlined style={{ marginRight: '0.5rem' }} />
              Country: {address.country}
            </div>
            <div style={{ width: '100%', height: '2rem' }}>
              <EnvironmentOutlined style={{ marginRight: '0.5rem' }} />
              <Typography.Text style={{ width: '136px' }} ellipsis>
                City: {address.city}
              </Typography.Text>
            </div>
            <div style={{ width: '100%', height: '2rem' }}>
              <MailOutlined style={{ marginRight: '0.5rem' }} /> Post Code: {address.postalCode}
            </div>
            <div style={{ width: '100%', height: '2rem' }}>
              <HomeOutlined style={{ marginRight: '0.5rem' }} />
              <Typography.Text style={{ width: '136px' }} ellipsis>
                Street: {address.street}
              </Typography.Text>
            </div>
          </Card>
        </Badge.Ribbon>
      </Spin>
    );
  }

  return (
    <Spin spinning={isLoading} style={{ width: '212px' }} wrapperClassName={styles.spin}>
      <Card
        style={{ width: '212px', paddingTop: '1.25rem' }}
        actions={[
          <DeleteOutlined key="setting" onClick={handleDeleteAddress} />,
          <EditOutlined key="edit" onClick={() => onEdit(address)} />,
        ]}
      >
        <div style={{ width: '100%', height: '2rem' }}>
          <GlobalOutlined style={{ marginRight: '0.5rem' }} />
          Country: {address.country}
        </div>
        <div style={{ width: '100%', height: '2rem' }}>
          <EnvironmentOutlined style={{ marginRight: '0.5rem' }} />
          <Typography.Text style={{ width: '136px' }} ellipsis>
            City: {address.city}
          </Typography.Text>
        </div>
        <div style={{ width: '100%', height: '2rem' }}>
          <MailOutlined style={{ marginRight: '0.5rem' }} />
          <Typography.Text style={{ width: '136px' }} ellipsis>
            Post Code: {address.postalCode}
          </Typography.Text>
        </div>
        <div style={{ width: '100%', height: '2rem' }}>
          <HomeOutlined style={{ marginRight: '0.5rem' }} />
          <Typography.Text style={{ width: '136px' }} ellipsis>
            Street: {address.street}
          </Typography.Text>
        </div>
      </Card>
    </Spin>
  );
}
