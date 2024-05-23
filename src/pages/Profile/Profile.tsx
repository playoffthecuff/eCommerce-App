import { Form, Input, Steps, Typography } from 'antd';
import { MailOutlined, SolutionOutlined, UnlockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import styles from './Profile.module.css';

export default function ProfilePage() {
  const [current, setCurrent] = useState(0);
  return (
    <div className="container">
      <div id="profile-page" className={styles.wrapper}>
        <Steps onChange={setCurrent} current={current}>
          <Steps.Step title="Pesonal" icon={<SolutionOutlined />} />
          <Steps.Step title="Password" icon={<UnlockOutlined />} />
          <Steps.Step title="Addresses" icon={<MailOutlined />} />
        </Steps>
        <PesonalData />
      </div>
    </div>
  );
}

function PesonalData() {
  return (
    <>
      <Typography.Title level={3}>PERSONAL DATA</Typography.Title>
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
    </>
  );
}
