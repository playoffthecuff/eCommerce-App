import { ClockCircleOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import styles from './Contacts.module.css';

export default function Contacts() {
  return (
    <div className={styles.wrapper}>
      <Typography.Title level={5} className={styles.title}>
        CONTACTS
      </Typography.Title>
      <div className={styles.block}>
        <EnvironmentOutlined />
        <a href="https://www.google.ru/maps/@33.8589987,-117.8410924,18.67z?entry=ttu" target="blank">
          1186 N Grove St, Anaheim
        </a>
      </div>
      <div className={styles.block}>
        <PhoneOutlined />
        <a href="tel: +1 (714) 630-9494">+1 (714) 630-9494</a>
      </div>
      <div className={styles.block}>
        <ClockCircleOutlined />
        Mon-Sat: 10:00 AM – 23:00 PM
      </div>
      <div className={styles.block}>
        <MailOutlined />
        <a href="mailto: p0grammers@gmail.com">p0grammers@gmail.com</a>
      </div>
    </div>
  );
}
