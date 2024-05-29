import { Form, Input, Typography, notification } from 'antd';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import CustomButton from '../../CustomButton/CustomButton';
import { passwordRules } from '../../../utils/fields-validation';
import userStore from '../../../store/user-store';
import { PasswordDataFormFields } from '../types';
import styles from '../ProfileForm.module.css';

export function PasswordData() {
  const [isValid, setIsValid] = useState(false);
  const [form] = Form.useForm();
  const [notificationAPI, contextHolder] = notification.useNotification();

  const handleSubmit = async () => {
    const fields: PasswordDataFormFields = form.getFieldsValue(true);
    try {
      await userStore.update({ password: fields.password, newPassword: fields.newPassword });
      form.resetFields();
      notificationAPI.success({
        message: `You have successfully updated your password! 🥳`,
        placement: 'top',
        icon: <SmileOutlined />,
        duration: 2.5,
      });
    } catch (error) {
      notificationAPI.success({
        message: `Failed to update password.`,
        description: ((error as AxiosError)?.response?.data as { message: string })?.message || 'Please try again.',
        placement: 'top',
        icon: <FrownOutlined />,
        duration: 2.5,
      });
    }
  };

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
        <Form.Item
          label="Enter new password"
          dependencies={['password']}
          name="newPassword"
          rules={[
            ...passwordRules,
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') !== value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password you entered is the same as the previous one!'));
              },
            }),
          ]}
          hasFeedback
          validateFirst
        >
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
        <CustomButton variety="common" htmlType="submit" onClick={() => handleSubmit()} disabled={!isValid} block>
          CHANGE PASSWORD
        </CustomButton>
      </Form>
      {contextHolder}
    </div>
  );
}
