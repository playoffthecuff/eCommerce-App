import { Form, Input, Typography, FormProps, notification, Spin } from 'antd';
import type { NotificationArgsProps } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ReactNode, useLayoutEffect, useState } from 'react';
import styles from './LoginForm.module.css';
import userStore from '../../store/user-store';
import CustomButton from '../CustomButton/CustomButton';
import { emailRules, passwordRules } from '../../utils/fields-validation';

const { Text, Title, Link } = Typography;

type NotificationPlacement = NotificationArgsProps['placement'];

type FieldType = {
  email: string;
  password: string;
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  return errorInfo;
};

export default function LoginForm() {
  const [formEnabled, setFormEnabled] = useState<boolean>(false);
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(true);
  const [spinRotate, setSpinRotate] = useState<boolean>(false);

  const [form] = Form.useForm();

  const checkFormValid = (): void => {
    const errorFields = form.getFieldsError();
    const isFieldsTouched = form.isFieldsTouched();
    const isFormValid = errorFields.every((field) => {
      return !field.errors!.length && isFieldsTouched;
    });
    setButtonEnabled(!isFormValid);
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement, msg: string, infoMessage: string, ico: ReactNode) => {
    api.info({
      message: msg,
      description: infoMessage,
      placement,
      icon: ico,
    });
  };
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (userStore.isAuthorized) {
      navigate('/main');
    }
  }, [navigate]);

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      setFormEnabled(true);
      setSpinRotate(true);
      await userStore.login(values.email, values.password);
      openNotification('top', 'Congratulations:', 'you are successfully logged in! 🥳', <SmileOutlined />);
      setTimeout(() => {
        navigate('/main');
      }, 1600);
    } catch (err) {
      const error = err as Error;
      setFormEnabled(false);
      setSpinRotate(false);
      openNotification('top', 'It seems something went wrong:', error.message, <FrownOutlined />);
    }
  };

  return (
    <Spin spinning={spinRotate}>
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
        disabled={formEnabled}
        form={form}
        onFieldsChange={checkFormValid}
      >
        {contextHolder}
        <Title level={3}>CUSTOMER INFO</Title>
        <Paragraph>
          <Text>Don&apos;t have an account? </Text>
          <Link href="#/registration">Create Account</Link>
          <Text> to continue.</Text>
        </Paragraph>
        <Form.Item<FieldType> name="email" label="Email" rules={emailRules} hasFeedback>
          <Input placeholder="Enter your email..." />
        </Form.Item>
        <Form.Item<FieldType> label="Password" name="password" rules={passwordRules} hasFeedback validateFirst>
          <Input.Password placeholder="Enter your password..." />
        </Form.Item>
        <Paragraph>
          <Link
            href="#/login"
            onClick={() => {
              openNotification(
                'top',
                'It seems something went wrong:',
                'this feature is not yet available',
                <FrownOutlined />
              );
            }}
          >
            Forgot your password?
          </Link>
        </Paragraph>
        <Form.Item wrapperCol={{ span: 24 }}>
          <CustomButton variety="inverted" block disabled={buttonEnabled} htmlType="submit">
            SIGN IN
          </CustomButton>
        </Form.Item>
      </Form>
    </Spin>
  );
}
