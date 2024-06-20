import { Form, Input, Spin, Typography, notification } from 'antd';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { FrownOutlined, SettingOutlined, SmileOutlined } from '@ant-design/icons';
import CustomButton from '../../CustomButton/CustomButton';
import { passwordRules } from '../../../utils/fields-validation';
import userStore from '../../../store/user-store';
import { PasswordDataFormFields } from '../types';
import styles from '../ProfileForm.module.css';
import { checkIfFormValid } from '../helpers';
import { CubeSpinner } from '../../CubeSpinner/CubeSpinner';

export function PasswordData() {
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [notificationAPI, contextHolder] = notification.useNotification();

  const handleSubmit = async () => {
    setIsLoading(true);
    await form.validateFields().catch(() => {});
    const fields = form.getFieldsError();
    if (!fields.every((field) => field.errors.length === 0)) {
      setIsLoading(false);
      return;
    }

    const values: PasswordDataFormFields = form.getFieldsValue(true);
    try {
      await userStore.update({ password: values.password, newPassword: values.newPassword });
      setIsLoading(false);
      form.resetFields();
      notificationAPI.success({
        message: `You have successfully updated your password! 🥳`,
        placement: 'top',
        icon: <SmileOutlined />,
        duration: 2.5,
      });
    } catch (error) {
      setIsLoading(false);
      notificationAPI.success({
        message: `Failed to update password.`,
        description: ((error as AxiosError)?.response?.data as { message: string })?.message || 'Please try again.',
        placement: 'top',
        icon: <FrownOutlined />,
        duration: 2.5,
      });
    }
  };

  return (
    <div className={styles['profile-form']}>
      <Spin
        spinning={isLoading}
        indicator={<CubeSpinner size={32} tilted />}
        style={{ width: '360px' }}
        wrapperClassName={styles.spin}
      >
        <Form form={form} layout="vertical" onFieldsChange={() => checkIfFormValid(form, setIsValid)}>
          <Typography.Title level={4}>Change Password</Typography.Title>
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
            <SettingOutlined /> CHANGE PASSWORD
          </CustomButton>
        </Form>
      </Spin>
      {contextHolder}
    </div>
  );
}
