import Paragraph from 'antd/es/typography/Paragraph';
import { DatePicker, Form, Input, Typography } from 'antd';
import { dateOfBirthValidator, emailRules, nameRules, passwordRules } from '../../../utils/fields-validation';
import BreadCrumb from '../../BreadCrumb/BreadCrumb';

const { Text, Link } = Typography;

export function PersonalData() {
  return (
    <>
      <BreadCrumb />
      <Typography.Title level={3}>SIGN UP</Typography.Title>
      <Paragraph>
        <Text>Already have an account? Click </Text>
        <Link href="#/login">Sign In</Link>
        <Text> to continue.</Text>
      </Paragraph>
      <Form.Item label="First name" name="firstName" rules={nameRules} hasFeedback>
        <Input data-testid="firstName" placeholder="Enter your name..." />
      </Form.Item>
      <Form.Item label="Last Name" name="lastName" rules={nameRules} hasFeedback>
        <Input data-testid="lastName" placeholder="Enter your email last name..." />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={emailRules} hasFeedback>
        <Input data-testid="email" placeholder="Enter your email..." />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={passwordRules} hasFeedback validateFirst>
        <Input.Password data-testid="password" type="password" placeholder="Enter your password..." />
      </Form.Item>
      <Form.Item
        label="Date of birth"
        name="dateOfBirth"
        rules={[{ required: true, message: 'Please enter valid date of birth!' }, dateOfBirthValidator]}
        hasFeedback
      >
        <DatePicker data-testid="dateOfBirth" placeholder="DD.MM.YEAR" format="DD.MM.YYYY" />
      </Form.Item>
    </>
  );
}
