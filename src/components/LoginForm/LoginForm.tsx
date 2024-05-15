import { Button, Form, Input, Typography, FormProps, notification, Spin } from 'antd';
import type { NotificationArgsProps } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { FrownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FieldData } from 'rc-field-form/lib/interface';
import styles from './LoginForm.module.css';
import userStore from '../../store/user-store';

const { Text, Title, Link } = Typography;

type NotificationPlacement = NotificationArgsProps['placement'];

type FieldType = {
  email: string;
  password: string;
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log(errorInfo);
};

export default function LoginForm() {
  const [formState, setFormState] = useState<boolean>(false);
  const [buttonState, setButtonState] = useState<boolean>(true);
  const [spinState, setSpinState] = useState<boolean>(false);

  const onFieldsChange = (_: FieldData[], allFields: FieldData[]): void => {
    const isFormValid = allFields.every((field) => {
      return !field.errors!.length && field.touched;
    });
    setButtonState(!isFormValid);
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement, errorMessage: string) => {
    api.info({
      message: `It seems something went wrong:`,
      description: errorMessage,
      placement,
      icon: <FrownOutlined />,
    });
  };
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      setFormState(true);
      setSpinState(true);
      await userStore.login(values.email, values.password);
      navigate('/main');
    } catch (err) {
      const error = err as Error;
      setFormState(false);
      setSpinState(false);
      openNotification('top', error.message);
    }
  };

  return (
    <Spin spinning={spinState}>
      <Form
        name="login"
        className={styles.loginForm}
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 7 }}
        scrollToFirstError
        layout="vertical"
        data-testid="login-form"
        disabled={formState}
        onFieldsChange={onFieldsChange}
      >
        {contextHolder}
        <Title level={3}>CUSTOMER INFO</Title>
        <Paragraph>
          <Text>Don&apos;t have an account? </Text>
          <Link href="#/registration">Create Account</Link>
          <Text> to continue.</Text>
        </Paragraph>
        <Form.Item<FieldType>
          name="email"
          label="Email"
          tooltip="Email address according RFC 5321 & RFC 5322"
          rules={[
            { required: true, message: 'Please enter your Email' },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Please enter correct Email address',
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter your email..." />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          tooltip="The password must be at least 8 characters long and must consist of English letters of different case, numbers and special characters."
          rules={[
            { required: true, message: 'Please enter your password' },
            { pattern: /^\S(?:.*\S)?$/, message: 'Must not contain leading or trailing spaces!' },
            { pattern: /^[^а-яА-Я]*$/, message: 'Must contain only English letters!' },
            { pattern: /[a-z]/, message: 'Must contain at least one lowercase letter!' },
            { pattern: /[A-Z]/, message: 'Must contain at least one uppercase letter!' },
            { pattern: /\d/, message: 'Must contain at least one digit!' },
            { pattern: /[^A-Za-zА-Яа-я\s0-9]/, message: 'Must contain at least one special character!' },
            { min: 8, message: 'Must be at least 8 characters long!' },
          ]}
          hasFeedback
          validateFirst
        >
          <Input.Password placeholder="Enter your password..." />
        </Form.Item>
        <Paragraph>
          <Link href="#/">Forgot your password?</Link>
        </Paragraph>
        <Form.Item className={styles['button-wrapper']} wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" block disabled={buttonState}>
            SIGN IN
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  );
}
