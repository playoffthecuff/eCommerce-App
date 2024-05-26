import dayjs from 'dayjs';
import { Button, DatePicker, Form, Input, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import styles from '../ProfileForm.module.css';
import { dateOfBirthValidator } from '../../RegistrationForm/helpers';
// import userStore from '../../../store/user-store';

const nameRules = [
  { required: true, message: 'Please enter your name!' },
  { min: 1, message: 'Must be at least 1 characters long!' },
  { pattern: /^[A-Za-z]*$/, message: 'Must contain only English letters!' },
];

const emailRules = [
  { required: true, message: 'Please enter your Email' },
  {
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Please enter correct Email address',
  },
];

const user = {
  email: 'test1000@test.com',
  id: '6653096f43ca503628709783',
  isActivated: false,
  firstName: 'asdfasd',
  lastName: 'testest',
  dateOfBirth: '1999-12-31T22:00:00.000Z',
  addresses: {
    shipping: [
      {
        street: 'SomeStreet',
        city: 'SomeCity',
        postalCode: '9999',
        country: 'Australia',
        isDefault: true,
        id: '6653096f43ca503628709784',
      },
    ],
    billing: [
      {
        street: 'SomeStreet',
        city: 'SomeCity',
        postalCode: '9999',
        country: 'Australia',
        isDefault: true,
        id: '6653096f43ca503628709785',
      },
    ],
  },
};

export const PersonalData = observer(() => {
  return (
    <div className={styles['profile-form']}>
      <Form
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          dateOfBirth: dayjs(user.dateOfBirth),
        }}
        layout="vertical"
        disabled
      >
        <Typography.Title level={3}>Personal Data</Typography.Title>
        <Form.Item label="First name" name="firstName" rules={nameRules} hasFeedback>
          <Input data-testid="firstName" placeholder="Enter your name..." />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName" rules={nameRules} hasFeedback>
          <Input data-testid="lastName" placeholder="Enter your email last name..." />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={emailRules} hasFeedback>
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
      </Form>
      <Button type="primary" htmlType="submit" block>
        EDIT DATA
      </Button>
    </div>
  );
});
