import { Form, Input, Typography } from 'antd';
import styles from '../ProfileForm.module.css';
import CustomButton from '../../CustomButton/CustomButton';
import { passwordRules } from '../../../utils/fields-validation';

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
      </Form>
      <CustomButton variety="common" htmlType="submit" block>
        CHANGE PASSWORD
      </CustomButton>
    </div>
  );
}
