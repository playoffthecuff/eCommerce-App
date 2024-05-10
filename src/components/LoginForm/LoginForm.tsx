import { Button, ConfigProvider, Form, Input, Typography, FormProps } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';

import styles from './LoginForm.module.css';

const { Text, Title, Link } = Typography;

type FieldType = {
  email: string;
  password: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  return values;
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  return errorInfo;
};

export default function LoginForm() {
  return (
    <ConfigProvider theme={{ components: { Form: { itemMarginBottom: 28, verticalLabelPadding: 0 } } }}>
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
      >
        <Title level={3}>CUSTOMER INFO</Title>
        <Paragraph>
          <Text>Don&apos;t have an account? </Text>
          <Link href="#/registration">Create Account</Link>
          <Text> to continue.</Text>
        </Paragraph>
        <Form.Item<FieldType>
          name="email"
          label="Email"
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
          <Button type="primary" htmlType="submit" block>
            SIGN IN
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
}
