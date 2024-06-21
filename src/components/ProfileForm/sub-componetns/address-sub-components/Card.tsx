import {
  DeleteOutlined,
  EditOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  HomeOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Card, Typography } from 'antd';
import styles from '../../ProfileForm.module.css';
import { Address } from '../../../../types/authorization-response';

export function CardComponent({
  address,
  onEdit,
  handleDeleteAddress: handleDeleteAddres,
}: {
  address: Address;
  handleDeleteAddress: () => void;
  onEdit: (addr: Address) => void;
}) {
  return (
    <Card
      className={styles['address-card']}
      actions={[
        <DeleteOutlined key="setting" onClick={handleDeleteAddres} />,
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
  );
}
