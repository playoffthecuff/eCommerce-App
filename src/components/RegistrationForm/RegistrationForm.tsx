import { Steps, Button, Form, notification } from 'antd';
import { CheckOutlined, EnvironmentOutlined, SmileOutlined, FrownOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RegistrationForm.module.css';
import { Address, PersonalData, Finish } from './sub-components';
import { AddressProps, Fields } from './types';
import { mapToSignUpArg } from './helpers';
import userStore from '../../store/user-store';

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
  const [step, setStep] = useState(0);
  const [form] = Form.useForm();
  const [notificationAPI, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setSubmitting(true);
    const fields: Fields = form.getFieldsValue(true);
    try {
      await userStore.signUp(mapToSignUpArg(fields, sameAddresses));
      notificationAPI.error({
        message: `You have successfully created an account! 🥳`,
        placement: 'top',
        icon: <SmileOutlined />,
        duration: 2.5,
      });
      setTimeout(() => {
        navigate('/main');
      }, 2500);
    } catch (err) {
      setSubmitting(false);
      notificationAPI.error({
        message: `Failed to sign up:`,
        description: (err as Error).message || 'Please refresh page.',
        placement: 'top',
        icon: <FrownOutlined />,
        duration: 2,
      });
    }
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
      <Steps className={styles.steps} current={step}>
        {steps.map((s) => (
          <Steps.Step className={styles.step} key={s.title} title={s.title} icon={s.icon} />
        ))}
      </Steps>
      <div className={styles['registration-form']}>
        <Form form={form} layout="vertical" onFinish={step === 2 ? submit : next}>
          <CurrentStep sameAddresses={sameAddresses} setSameAddresses={setSameAddresses} />
          <Button data-testid="submitBtn" type="primary" htmlType="submit" block disabled={submitting}>
            {step === 2 ? 'SUBMIT' : 'NEXT'}
          </Button>
        </Form>
      </div>
      {contextHolder}
    </>
  );
}
