import { Steps, Form, notification } from 'antd';
import { CheckOutlined, EnvironmentOutlined, SmileOutlined, FrownOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import styles from './RegistrationForm.module.css';
import { Address, PersonalData, Finish } from './sub-components';
import { AddressProps, Fields } from './types';
import { mapToSignUpArg } from './helpers';
import userStore from '../../store/user-store';
import { cartStore } from '../../store/cart-store';
import userService from '../../utils/user-service';
import CustomButton from '../CustomButton/CustomButton';
import { CubeSpin } from '../CubeSpinner/CubeSpinner';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const checkIfFormValid = (skipBillingFields: boolean = false): void => {
    const fields = form.getFieldsError();
    for (const field of fields) {
      if (
        skipBillingFields &&
        (field.name[0] as string)?.startsWith &&
        (field.name[0] as string)?.startsWith('billing')
      ) {
        continue;
      }
      if (field.errors.length > 0) {
        setIsValid(false);
        return;
      }
    }
    setIsValid(true);
  };

  const submit = async () => {
    setIsLoading(true);
    const fields: Fields = form.getFieldsValue(true);
    try {
      await userStore.signUp(mapToSignUpArg(fields, sameAddresses));
      notificationAPI.success({
        message: `You have successfully created an account! 🥳`,
        placement: 'top',
        icon: <SmileOutlined />,
        duration: 2.5,
      });
    } catch (err) {
      setIsLoading(false);
      notificationAPI.error({
        message: `Failed to sign up:`,
        description:
          ((err as AxiosError)?.response?.data as { message: string })?.message || 'Please refresh the page.',
        placement: 'top',
        icon: <FrownOutlined />,
        duration: 2,
      });
      return;
    }

    cartStore.mergeCarts();
    setTimeout(() => {
      navigate('/main');
    }, 2500);
  };

  const next = async () => {
    setIsLoading(true);
    await form.validateFields().catch(() => {});
    const fields = form.getFieldsError();
    if (!fields.every((fld) => fld.errors.length === 0)) {
      setIsLoading(false);
      return;
    }

    if (step === 0) {
      let resp;
      try {
        resp = await userService.checkEmailAvailability(form.getFieldValue('email').trim());
        setIsLoading(false);
      } catch {
        form.setFields([
          {
            name: 'email',
            errors: ['Failed to verify if email is unique. Please try again.'],
          },
        ]);
        setIsLoading(false);
        return;
      }
      if (resp.exists) {
        form.setFields([
          {
            name: 'email',
            errors: ['User with such email already exists.'],
          },
        ]);
        setIsValid(false);
        return;
      }
    }

    setIsLoading(false);

    setStep(step + 1);
  };

  const CurrentStep = steps[step].render;

  return (
    <CubeSpin spinning={isLoading}>
      <Steps responsive={false} className={styles.steps} current={step}>
        {steps.map((stp) => (
          <Steps.Step className={styles.step} key={stp.title} title={stp.title} icon={stp.icon} />
        ))}
      </Steps>
      <div className={styles['registration-form']}>
        <Form form={form} layout="vertical" onFieldsChange={() => checkIfFormValid()}>
          <CurrentStep
            sameAddresses={sameAddresses}
            setSameAddresses={(val: boolean) => {
              setSameAddresses(val);
              checkIfFormValid(val);
            }}
          />
        </Form>
        <CustomButton
          variety="common"
          data-testid="submitBtn"
          block
          disabled={!isValid}
          onClick={step === 2 ? submit : next}
        >
          {step === 2 ? 'SUBMIT' : 'NEXT'}
        </CustomButton>
      </div>
      {contextHolder}
    </CubeSpin>
  );
}
