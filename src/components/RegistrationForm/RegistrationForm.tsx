import { Steps, Button, Form } from 'antd';
import { CheckCircleOutlined, EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import styles from './RegistrationForm.module.css';
import { Address, PersonalData, Finish } from './components';
import { AddressProps } from './types';

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
    icon: <CheckCircleOutlined />,
  },
];

export function RegistrationForm() {
  const [sameAddresses, setSameAddresses] = useState(false);
  const [step, setStep] = useState(0);
  const [form] = Form.useForm();

  const submit = () => {
    const data = form.getFieldsValue(true);
    console.log({ ...data, sameAddresses });
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
    <div className={styles.steps}>
      <Steps current={step}>
        {steps.map((s) => (
          <Steps.Step className={styles.step} key={s.title} title={s.title} icon={s.icon} />
        ))}
      </Steps>
      <div className={styles['registration-form']}>
        <Form form={form} layout="vertical" onFinish={step === 2 ? submit : next}>
          <CurrentStep sameAddresses={sameAddresses} setSameAddresses={setSameAddresses} />
          <Button data-testid="submitBtn" type="primary" htmlType="submit" className={styles['register-btn']} block>
            {step === 2 ? 'SUBMIT' : 'NEXT'}
          </Button>
        </Form>
      </div>
    </div>
  );
}
