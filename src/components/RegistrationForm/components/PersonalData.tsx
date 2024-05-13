import dayjs from 'dayjs';
import Paragraph from 'antd/es/typography/Paragraph';
import { DatePicker, Form, Input, Typography } from 'antd';

const { Text, Link } = Typography;

export function PersonalData() {
  const minValidAge = 16;
  const maxValidAge = 100;
  const minValidDate = dayjs().subtract(minValidAge, 'year');
  const maxValidDate = dayjs().subtract(maxValidAge, 'year');

  return (
    <>
      <Typography.Title level={3}>SIGN UP</Typography.Title>
      <Paragraph>
        <Text>Already have an account? Go to </Text>
        <Link href="#/login">Log In</Link>
        <Text> to continue.</Text>
      </Paragraph>
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
        <Input.Password data-testid="password" type="password" placeholder="Enter your password..." />
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
        rules={[{ required: true, message: 'Please enter valid date of birth!' }]}
        hasFeedback
      >
        <DatePicker
          data-testid="dateOfBirth"
          placeholder="DD.MM.YEAR"
          maxDate={minValidDate}
          minDate={maxValidDate}
          format="DD.MM.YYYY"
        />
      </Form.Item>
    </>
  );
}
