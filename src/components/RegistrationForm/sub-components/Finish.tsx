import { Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import styles from '../RegistrationForm.module.css';

export function Finish() {
  return (
    <div className={styles['finish-form']}>
      <Typography.Title level={3}>You are set all data!</Typography.Title>
      <Paragraph>
        <Typography.Text>To successfully complete registration, click the submit button!</Typography.Text>
      </Paragraph>
    </div>
  );
}
