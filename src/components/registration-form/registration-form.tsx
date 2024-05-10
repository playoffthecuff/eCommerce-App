import dayjs from 'dayjs';
import { Steps, Button, DatePicker, Form, Input, Select, Typography } from 'antd';
import { CheckCircleOutlined, EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Paragraph from 'antd/es/typography/Paragraph';
import styles from './registration-form.module.css';
import { Country, AddressProps, PersonalDataProps, TPersonalData, TAddress, FinishProps } from './types';
import { getCountries } from './service';

const { Title, Text } = Typography;

function RegistrationForm() {
  const [step, setStep] = useState(0);
  const [personalData, setPersonalData] = useState<TPersonalData | undefined>();
  const [address, setAddress] = useState<TAddress | undefined>();

  const onFinishPersonal = (d: TPersonalData) => {
    setPersonalData(d);
    setStep(1);
  };

  const onFinishAdress = (a: TAddress) => {
    setAddress(a);
    setStep(2);
  };

  const handleSubmit = () => {
    const data = { address, personalData };
    return data;
  };

  const forms = [
    <PersonalData onFinish={onFinishPersonal} />,
    <Address onFinish={onFinishAdress} />,
    <Finish onClick={handleSubmit} />,
  ];

  return (
    <div className={styles.steps}>
      <Steps current={step}>
        <Steps.Step title="Personal data" icon={<UserOutlined />} />
        <Steps.Step title="Address" icon={<EnvironmentOutlined />} />
        <Steps.Step title="Finish" icon={<CheckCircleOutlined />} />
      </Steps>
      {forms[step]}
    </div>
  );
}

export default RegistrationForm;

function PersonalData({ onFinish }: PersonalDataProps) {
  const minValidAge = 16;
  const maxValidAge = 100;
  const minValidDate = dayjs().subtract(minValidAge, 'year');
  const maxValidDate = dayjs().subtract(maxValidAge, 'year');

  return (
    <Form onFinish={onFinish} className={styles.registrationForm} autoComplete="off" layout="vertical">
      <Title level={3}>SIGN UP</Title>
      <Form.Item
        label="First name"
        name="first-name"
        rules={[
          { required: true, message: 'Please enter your name!' },
          { min: 1, message: 'Must be at least 1 characters long!' },
          { pattern: /^[A-Za-z]*$/, message: 'Must contain only English letters!' },
        ]}
        hasFeedback
      >
        <Input data-testid="firstName" placeholder="Enter your name..." />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="last-name"
        rules={[
          { required: true, message: 'Please enter your last name!' },
          { min: 1, message: 'Must be at least 1 characters long!' },
          { pattern: /^[A-Za-z]*$/, message: 'Must contain only English letters!' },
        ]}
        hasFeedback
      >
        <Input data-testid="lastName" placeholder="Enter your email last name..." />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please enter your password' },
          { pattern: /^[^а-яА-Я]*$/, message: 'Must contain only English letters!' },
          { pattern: /^\S(?:.*\S)?$/, message: 'Must not contain leading or trailing spaces!' },
          { pattern: /[a-z]/, message: 'Must contain at least one lowercase english letter!' },
          { pattern: /[A-Z]/, message: 'Must contain at least one uppercase english letter!' },
          { pattern: /\d/, message: 'Must contain at least one digit!' },
          { pattern: /[^A-Za-zА-Яа-я\s0-9]/, message: 'Must contain at least one special character!' },
          { min: 8, message: 'Must be at least 8 characters long!' },
        ]}
        hasFeedback
        validateFirst
      >
        <Input data-testid="password" type="password" placeholder="Enter your password..." />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please enter your Email' },
          { type: 'email', message: 'Please enter correct Email address' },
        ]}
        hasFeedback
      >
        <Input data-testid="email" placeholder="Enter your email..." />
      </Form.Item>
      <Form.Item
        label="Date of birth"
        name="date-of-birth"
        rules={[{ required: true, message: 'Please enter valid date of birth!' }]}
        hasFeedback
      >
        <DatePicker data-testid="dateOfBirth" placeholder="YEAR-MM-DD" maxDate={minValidDate} minDate={maxValidDate} />
      </Form.Item>
      <Form.Item className={styles['button-wrapper']} wrapperCol={{ span: 24 }}>
        <Button
          data-testid="submitPersonalData"
          type="primary"
          htmlType="submit"
          className={styles['next-step-btn']}
          block
        >
          NEXT STEP
        </Button>
      </Form.Item>
    </Form>
  );
}

function Address({ onFinish }: AddressProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState<Country | undefined>();

  useEffect(() => {
    getCountries()
      .then((d) => {
        d.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(d);
        setCountry(d[0]);
      })
      .catch(() => {});
  }, []);

  return (
    <Form
      data-testid="address-form"
      onFinish={onFinish}
      className={styles['registration-form']}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item label="Country" name="country" rules={[{ required: true, message: 'Please enter your country!' }]}>
        <Select
          showSearch
          placeholder="Choose your country..."
          onChange={(v) => {
            setCountry(countries.find((c) => c.name === v));
          }}
        >
          {countries.length > 0 &&
            countries.map((c) => {
              return (
                <Select.Option key={c._id} value={c.name}>
                  {c.name}
                </Select.Option>
              );
            })}
        </Select>
      </Form.Item>
      <Form.Item
        label="City"
        name="city"
        rules={[
          { required: true, message: 'Please enter your city!' },
          { pattern: /[A-Za-z]/, message: 'Must contain at least one character' },
          { pattern: /^[A-Za-z]*$/, message: 'Must not contain special characters or numbers!' },
        ]}
        hasFeedback
        validateFirst
      >
        <Input data-testid="city" placeholder="Enter your city..." />
      </Form.Item>
      <Form.Item
        label="Street"
        name="street"
        rules={[
          { required: true, message: 'Please enter your street!' },
          { pattern: /[A-Za-z]/, message: 'Must contain at least one character' },
        ]}
        hasFeedback
      >
        <Input data-testid="street" placeholder="Enter your street..." />
      </Form.Item>
      <Form.Item
        label="Post Code"
        name="post-code"
        dependencies={['country']}
        rules={[
          { required: true, message: 'Please enter your post code!' },
          { pattern: new RegExp(country?.postalRegex || /^[0-9]{5}$/), message: 'Post code is invalid' },
        ]}
        hasFeedback
      >
        <Input data-testid="postCode" placeholder={country?.postalCodePattern} />
      </Form.Item>
      <Form.Item className={styles['button-wrapper']} wrapperCol={{ span: 24 }}>
        <Button data-testid="submitAddress" type="primary" htmlType="submit" className={styles['next-step-btn']} block>
          NEXT STEP
        </Button>
      </Form.Item>
    </Form>
  );
}

function Finish({ onClick }: FinishProps) {
  return (
    <div data-testid="finishForm" className={styles['finish-form']}>
      <Title level={3}>You are set all data!</Title>
      <Paragraph>
        <Text>To successfully complete registration, click the submit button!</Text>
      </Paragraph>
      <Form.Item className={styles['button-wrapper']} wrapperCol={{ span: 24 }}>
        <Button data-testid="completeRegestration" type="primary" htmlType="submit" onClick={onClick} block>
          SUBMIT
        </Button>
      </Form.Item>
    </div>
  );
}
