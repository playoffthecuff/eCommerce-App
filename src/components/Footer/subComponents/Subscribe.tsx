import { Button, Input, Space, Typography } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import styles from './Subscribe.module.css';

export default function Subscribe() {
  return (
    <div className={styles.wrapper}>
      <Typography.Title level={5} className={styles.title}>
        GET UPDATES
      </Typography.Title>
      <Space.Compact style={{ width: '100%' }}>
        <Input className={styles.input} placeholder="Enter your email..." />
        <Button className={styles.button} type="primary" icon={<SendOutlined />} />
      </Space.Compact>
    </div>
  );
}
