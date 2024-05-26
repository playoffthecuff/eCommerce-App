import { Button, Form, Input, Typography } from 'antd';
import styles from '../ProfileForm.module.css';

const passwordRules = [
  { required: true, message: 'Please enter your password!' },
  { pattern: /^[^а-яА-Я]*$/, message: 'Must contain only English letters!' },
  { pattern: /^\S(?:.*\S)?$/, message: 'Must not contain leading or trailing spaces!' },
  { pattern: /[a-z]/, message: 'Must contain at least one lowercase english letter!' },
  { pattern: /[A-Z]/, message: 'Must contain at least one uppercase english letter!' },
  { pattern: /\d/, message: 'Must contain at least one digit!' },
  { pattern: /[^A-Za-zА-Яа-я\s0-9]/, message: 'Must contain at least one special character!' },
  { min: 8, message: 'Must be at least 8 characters long!' },
];

export function PasswordData() {
  return (
    <div className={styles['profile-form']}>
      <Form layout="vertical">
        <Typography.Title level={3}>Change Password</Typography.Title>
        <Form.Item label="Enter your password" name="password" rules={passwordRules} hasFeedback validateFirst>
          <Input.Password data-testid="password" type="password" placeholder="Enter your password..." />
        </Form.Item>
        <Form.Item label="Enter new password" name="password" rules={passwordRules} hasFeedback validateFirst>
          <Input.Password data-testid="password" type="password" placeholder="Enter your password..." />
        </Form.Item>
        <Form.Item label="Confirm new password" name="password" rules={passwordRules} hasFeedback validateFirst>
          <Input.Password data-testid="password" type="password" placeholder="Enter your password..." />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          CHANGE PASSWORD
        </Button>
      </Form>
    </div>
  );
}
