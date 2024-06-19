import { Typography } from 'antd';
import styles from './Technology.module.css';
import Frontend from './Frontend';
import Backend from './Backend';

export default function Technology() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <Typography.Title level={5} className={styles.title}>
          TECHNOLOGIES
        </Typography.Title>
        <div className={styles.content}>
          <Frontend />
          <Backend />
        </div>
      </div>
      <Typography.Text className={styles.title}>
        Made with ♥ by{' '}
        <a className={styles.about} href="./#/about">
          p0grammers team
        </a>
      </Typography.Text>
    </div>
  );
}
