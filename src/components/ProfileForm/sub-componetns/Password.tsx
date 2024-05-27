import { Form, Input, Typography } from 'antd';
import { useState } from 'react';
import styles from '../ProfileForm.module.css';
import CustomButton from '../../CustomButton/CustomButton';
import { passwordRules } from '../../../utils/fields-validation';

export function PasswordData() {
  const [isValid, setIsValid] = useState(false);
  const [form] = Form.useForm();

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

  return (
    <div className={styles['profile-form']}>
      <Form layout="vertical" form={form} onFieldsChange={() => checkIfFormValid()}>
        <Typography.Title level={3}>Change Password</Typography.Title>
        <Form.Item label="Enter your password" name="password" rules={passwordRules} hasFeedback validateFirst>
          <Input.Password data-testid="password" type="password" placeholder="Enter your password..." />
        </Form.Item>
        <Form.Item label="Enter new password" name="newPassword" rules={passwordRules} hasFeedback validateFirst>
          <Input.Password data-testid="password" type="password" placeholder="Enter new password..." />
        </Form.Item>
        <Form.Item
          dependencies={['newPassword']}
          label="Confirm new password"
          name="confirmPassword"
          rules={[
            ...passwordRules,
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
          hasFeedback
          validateFirst
        >
          <Input.Password data-testid="password" type="password" placeholder="Enter new password..." />
        </Form.Item>
      </Form>
      <CustomButton variety="common" htmlType="submit" disabled={!isValid} block>
        CHANGE PASSWORD
      </CustomButton>
    </div>
  );
}
