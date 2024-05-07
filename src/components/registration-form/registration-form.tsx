/* eslint-disable react/jsx-props-no-spreading */
import dayjs from 'dayjs';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import styles from './registration-form.module.css';

const minValidAge = 16;
const maxValidAge = 100;
const minValidDate = dayjs().subtract(minValidAge, 'year');
const maxValidDate = dayjs().subtract(maxValidAge, 'year');

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

function RegistrationForm() {
  return (
    <div className={styles.registrationForm}>
      <h1>Registration</h1>
      <Form {...formItemLayout} style={{ maxWidth: 600 }} autoComplete="off" variant="filled">
        <Form.Item
          label="First name"
          name="First name"
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
          name="Last Name"
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
          name="Password"
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
          name="Email"
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
          name="Date of birth"
          rules={[{ required: true, message: 'Please enter valid date of birth!' }]}
          hasFeedback
        >
          <DatePicker placeholder="YEAR-MM-DD" maxDate={minValidDate} minDate={maxValidDate} />
        </Form.Item>

        <Form.Item label="Country" name="Country" rules={[{ required: true, message: 'Please enter your country!' }]}>
          <Select placeholder="Choose your country..." />
        </Form.Item>
        <Form.Item
          label="City"
          name="City"
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
          name="Street"
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
          name="Post Code"
          rules={[{ required: true, message: 'Please enter your post code!' }]}
          hasFeedback
        >
          <Input placeholder="Enter your post code..." />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegistrationForm;
