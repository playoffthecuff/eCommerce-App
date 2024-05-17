import { Steps, Button, Form } from 'antd';
import { CheckOutlined, EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
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
  const [isSubmit, setIsSubmiting] = useState(false);
  const [sameAddresses, setSameAddresses] = useState(false);
  const [step, setStep] = useState(0);
  const [form] = Form.useForm();

  const submit = async () => {
    setIsSubmiting(true);
    const fields: Fields = form.getFieldsValue(true);
    let resp;
    try {
      resp = await signUp(mapToSignUpArg(fields, sameAddresses));
    } catch (err) {
      console.error('Failed to sign up:', err);
    }
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
      <Steps className={styles.steps} current={step}>
        {steps.map((s) => (
          <Steps.Step className={styles.step} key={s.title} title={s.title} icon={s.icon} />
        ))}
      </Steps>
      <div className={styles['registration-form']}>
        <Form form={form} layout="vertical" onFinish={step === 2 ? submit : next}>
          <CurrentStep sameAddresses={sameAddresses} setSameAddresses={setSameAddresses} />
          <Button data-testid="submitBtn" type="primary" htmlType="submit" block disabled={isSubmit}>
            {step === 2 ? 'SUBMIT' : 'NEXT'}
          </Button>
        </Form>
      </div>
    </>
  );
}
