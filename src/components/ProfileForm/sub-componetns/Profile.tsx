import { useState } from 'react';
import { DatePicker, Form, Input, Spin, Typography, notification } from 'antd';
import { observer } from 'mobx-react-lite';
import { DiffOutlined, EditOutlined, FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import CustomButton from '../../CustomButton/CustomButton';
import { dateOfBirthValidator, emailRules, nameRules } from '../../../utils/fields-validation';
import userStore from '../../../store/user-store';
import styles from '../ProfileForm.module.css';
import { ProfileFormFields } from '../types';

export const PersonalData = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const [isValid, setIsValid] = useState(true);
  const [notificationAPI, contextHolder] = notification.useNotification();
  const user = userStore.user!;

  const handleUpdateData = async () => {
    setEditing(false);
    const fields: ProfileFormFields = form.getFieldsValue(true);
    if (
      fields.firstName === user.firstName &&
      fields.lastName === user.lastName &&
      fields.email === user.email &&
      dayjs(user.dateOfBirth).diff(fields.dateOfBirth) === 0
    ) {
      return;
    }
    try {
      setIsLoading(true);
      await userStore.update({
        email: fields.email,
        firstName: fields.firstName,
        lastName: fields.lastName,
        dateOfBirth: fields.dateOfBirth.toISOString(),
      });
      form.resetFields();
      notificationAPI.success({
        message: `You have successfully updated your data! 🥳`,
        placement: 'top',
        icon: <SmileOutlined />,
        duration: 2.5,
      });
    } catch (error) {
      notificationAPI.success({
        message: `Failed to update user data.`,
        description: ((error as AxiosError)?.response?.data as { message: string })?.message || 'Please try again.',
        placement: 'top',
        icon: <FrownOutlined />,
        duration: 2.5,
      });
    }
    setIsLoading(false);
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
    <>
      <Spin spinning={isLoading}>
        <div style={{ margin: '5.5rem auto 0' }} className={styles['profile-form']}>
          <Form
            form={form}
            onFieldsChange={() => checkIfFormValid()}
            initialValues={{
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              dateOfBirth: dayjs(user.dateOfBirth),
            }}
            layout="vertical"
            disabled={!editing}
          >
            <Typography.Title level={4}>Personal Data</Typography.Title>
            <Form.Item label="First name" name="firstName" rules={nameRules} hasFeedback>
              <Input data-testid="firstName" placeholder="Enter your name..." />
            </Form.Item>
            <Form.Item label="Last Name" name="lastName" rules={nameRules} hasFeedback>
              <Input data-testid="lastName" placeholder="Enter your email last name..." />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={emailRules} hasFeedback>
              <Input data-testid="email" placeholder="Enter your email..." />
            </Form.Item>
            <Form.Item
              label="Date of birth"
              name="dateOfBirth"
              rules={[{ required: true, message: 'Please enter valid date of birth!' }, dateOfBirthValidator]}
              hasFeedback
            >
              <DatePicker data-testid="dateOfBirth" placeholder="DD.MM.YEAR" format="DD.MM.YYYY" />
            </Form.Item>
          </Form>
          {!editing && (
            <CustomButton variety="common" htmlType="submit" onClick={() => setEditing(true)} block>
              <EditOutlined /> EDIT DATA
            </CustomButton>
          )}
          {editing && (
            <CustomButton
              variety="common"
              htmlType="submit"
              onClick={() => handleUpdateData()}
              disabled={!isValid}
              block
            >
              <DiffOutlined /> UPDATE DATA
            </CustomButton>
          )}
        </div>
      </Spin>
      {contextHolder}
    </>
  );
});
