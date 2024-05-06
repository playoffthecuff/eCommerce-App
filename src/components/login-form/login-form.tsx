import { Button, ConfigProvider, Form, Input, Typography, FormProps } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import styles from './login-form.module.css';

const { Text, Link, Title } = Typography;

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
    <ConfigProvider theme={{ components: { Form: { itemMarginBottom: 32 } } }}>
      <Form
        name="login"
        className={styles.loginForm}
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 7 }}
        scrollToFirstError
        layout="vertical"
      >
        <Title level={3}>Sign in</Title>
        <Paragraph>
          <Text>Don&apos;t have an account? </Text>
          <Link href="./" target="_blank">
            Create Account
          </Link>
          <Text> to continue.</Text>
        </Paragraph>
        <Form.Item<FieldType>
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter your Email' },
            { type: 'email', message: 'Please enter correct Email address' },
          ]}
        >
          <Input placeholder="Enter your email..." />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please enter your password' },
            { pattern: /^\S(?:.*\S)?$/, message: 'Must not contain leading or trailing spaces!' },
            { pattern: /[a-z]/, message: 'Must contain at least one lowercase letter!' },
            { pattern: /[A-Z]/, message: 'Must contain at least one uppercase letter!' },
            { pattern: /[0-9]/, message: 'Must contain at least one digit!' },
            { pattern: /[^A-Za-zА-Яа-я\s0-9]/, message: 'Must contain at least one special character!' },
            { min: 8, message: 'Must be at least 8 characters long!' },
          ]}
          hasFeedback
          validateFirst
        >
          <Input.Password placeholder="Enter your password..." />
        </Form.Item>
        <Paragraph>
          <Link href="./" target="_blank">
            Forgot your password?
          </Link>
        </Paragraph>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" block htmlType="submit">
            LOGIN
          </Button>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
}
