import dayjs from 'dayjs';
import { Steps, Button, DatePicker, Form, Input, Select, Typography } from 'antd';
import { CheckCircleOutlined, EnvironmentOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import styles from './registration-form.module.css';
import { Country, AddressProps, PersonalDataProps, TPersonalData, TAddress, FinishProps } from './types';
import { getCountries } from './server';

const { Title } = Typography;

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
        name="firstName"
        rules={[
          { required: true, message: 'Please enter your name!' },
          { min: 1, message: 'Must be at least 1 characters long!' },
          { pattern: /^[A-Za-z]*$/, message: 'Must contain only English letter!' },
        ]}
        hasFeedback
      >
        <Input placeholder="Enter your name..." />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[
          { required: true, message: 'Please enter your last name!' },
          { min: 1, message: 'Must be at least 1 characters long!' },
          { pattern: /^[A-Za-z]*$/, message: 'Must contain only English letter!' },
        ]}
        hasFeedback
      >
        <Input placeholder="Enter your email last name..." />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please enter your password' },
          { pattern: /^[A-Za-z0-9]*$/, message: 'Must contain only English letter and numbers!' },
          { pattern: /[a-z]/, message: 'Must contain at least one lowercase letter!' },
          { pattern: /[A-Z]/, message: 'Must contain at least one uppercase letter!' },
          { pattern: /[0-9]/, message: 'Must contain at least one digit!' },
          { min: 8, message: 'Must be at least 8 characters long!' },
        ]}
        hasFeedback
        validateFirst
      >
        <Input placeholder="Enter your password..." />
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
        <Input placeholder="Enter your email..." />
      </Form.Item>
      <Form.Item
        label="Date of birth"
        name="dateOfBirth"
        rules={[{ required: true, message: 'Please enter valid date of birth!' }]}
        hasFeedback
      >
        <DatePicker placeholder="YEAR-MM-DD" maxDate={minValidDate} minDate={maxValidDate} />
      </Form.Item>
      <Button type="primary" htmlType="submit" className={styles.nextStepBtn} block>
        NEXT STEP
      </Button>
    </Form>
  );
}

function Address({ onFinish }: AddressProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState<Country | undefined>();

  useEffect(() => {
    getCountries()
      .then((d) => {
        setCountries(d);
        setCountry(d[0]);
      })
      .catch(() => {});
  }, []);

  return (
    <Form onFinish={onFinish} className={styles.registrationForm} autoComplete="off" layout="vertical">
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
        <Input placeholder="Enter your city..." />
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
        <Input placeholder="Enter your street..." />
      </Form.Item>
      <Form.Item
        label="Post Code"
        name="postCode"
        dependencies={['country']}
        rules={[
          { required: true, message: 'Please enter your post code!' },
          { pattern: new RegExp(country?.postalRegex || /^[0-9]{5}$/), message: 'Post code is invalid' },
        ]}
        hasFeedback
      >
        <Input placeholder={country?.postalCodePattern} />
      </Form.Item>
      <Button type="primary" htmlType="submit" className={styles.nextStepBtn} block>
        NEXT STEP
      </Button>
    </Form>
  );
}

function Finish({ onClick }: FinishProps) {
  return (
    <div className={styles.finishForm}>
      <p className={styles.finishTitle}>You are set all data!</p>
      <p>To successfully complete registration, click the submit button!</p>
      <Button type="primary" htmlType="submit" onClick={onClick}>
        SUBMIT
      </Button>
    </div>
  );
}
