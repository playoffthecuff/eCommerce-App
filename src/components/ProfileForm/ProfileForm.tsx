import { Button, DatePicker, Form, Input, Steps, Typography } from 'antd';
import { MailOutlined, SolutionOutlined, UnlockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import styles from './ProfileForm.module.css';
import { dateOfBirthValidator } from '../RegistrationForm/helpers';

export default function ProfilePage() {
  const [current, setCurrent] = useState(0);
  return (
    <>
      <Steps className={styles.steps} onChange={setCurrent} current={current}>
        <Steps.Step title="Pesonal" icon={<SolutionOutlined />} />
        <Steps.Step title="Password" icon={<UnlockOutlined />} />
        <Steps.Step title="Addresses" icon={<MailOutlined />} />
      </Steps>
      <PesonalData />
    </>
  );
}

function PesonalData() {
  return (
    <div className={styles['profile-form']}>
      <Form layout="vertical">
        <Typography.Title level={3}>Personal Data</Typography.Title>
        <Form.Item
          label="First name"
          name="firstName"
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
          name="lastName"
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
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your Email' },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Please enter correct Email address',
            },
          ]}
          hasFeedback
        >
          <Input data-testid="email" placeholder="Enter your email..." />
        </Form.Item>
        <Form.Item
          label="Date of birth"
          name="dateOfBirth"
          rules={[{ required: true, message: 'Please enter valid date of birth!' }, dateOfBirthValidator]}
          hasFeedback
        >
          <DatePicker data-testid="dateOfBirth" placeholder="DD.MM.YEAR" format="DD.MM.YYYY" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          EDIT DATA
        </Button>
      </Form>
    </div>
  );
}
