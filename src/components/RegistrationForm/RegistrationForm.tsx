import { Steps, Button, Form, Spin, notification } from 'antd';
import { CheckOutlined, EnvironmentOutlined, SmileOutlined, FrownOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegistrationForm.module.css';
import { Address, PersonalData, Finish } from './sub-components';
import { AddressProps, Fields } from './types';
import { signUp } from './service';
import { mapToSignUpArg } from './helpers';

const steps = [
  {
    render: () => <PersonalData />,
    title: 'Person',
    icon: <UserOutlined />,
  },
  {
    render: (props: AddressProps) => <Address {...props} />,
    title: 'Address',
    icon: <EnvironmentOutlined />,
  },
  {
    render: () => <Finish />,
    title: 'Finish',
    icon: <CheckOutlined />,
  },
];

export function RegistrationForm() {
  const [sameAddresses, setSameAddresses] = useState(false);
  const [step, setStep] = useState(2);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notificationAPI, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const submit = async () => {
    setIsLoading(true);
    const fields: Fields = form.getFieldsValue(true);
    let resp;
    try {
      resp = await signUp(mapToSignUpArg(fields, sameAddresses));
      notificationAPI.error({
        message: `You have successfully created an account! 🥳`,
        placement: 'top',
        icon: <SmileOutlined />,
        duration: 2.5,
      });
      localStorage.setItem('token', resp.accessToken);
      localStorage.setItem('refresh_token', resp.refreshToken);
      setTimeout(() => {
        navigate('/main');
      }, 2500);
    } catch (err) {
      notificationAPI.error({
        message: `Failed to sign up:`,
        description: (err as Error).message || 'Please refresh page.',
        placement: 'top',
        icon: <FrownOutlined />,
        duration: 2,
      });
    }
    setIsLoading(false);
    console.log('RESPONSE', resp);
  };

  const next = async () => {
    await form.validateFields();
    const fields = form.getFieldsError();
    if (!fields.every((f) => f.errors.length === 0)) {
      return;
    }
    setStep(step + 1);
  };

  const CurrentStep = steps[step].render;

  return (
    <>
      <Spin spinning={isLoading}>
        <Steps className={styles.steps} current={step}>
          {steps.map((s) => (
            <Steps.Step className={styles.step} key={s.title} title={s.title} icon={s.icon} />
          ))}
        </Steps>
        <div className={styles['registration-form']}>
          <Form form={form} layout="vertical" onFinish={step === 2 ? submit : next}>
            <CurrentStep sameAddresses={sameAddresses} setSameAddresses={setSameAddresses} />
            <Button data-testid="submitBtn" type="primary" htmlType="submit" block disabled={isLoading}>
              {step === 2 ? 'SUBMIT' : 'NEXT'}
            </Button>
          </Form>
        </div>
      </Spin>
      {contextHolder}
    </>
  );
}
