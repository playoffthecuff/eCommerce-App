/* eslint-disable react/jsx-props-no-spreading */
import { Button, DatePicker, Form, Input, Select } from 'antd';
// import Paragraph from 'antd/es/typography/Paragraph';
import styles from './registration-form.module.css';

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
      <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600 }}>
        <Form.Item label="First name" name="First name" rules={[{ required: true, message: 'Please input!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Last Name" name="Last Name" rules={[{ required: true, message: 'Please input!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="Password" rules={[{ required: true, message: 'Please input!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="Email" rules={[{ required: true, message: 'Please input!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Date of birth" name="Date of birth" rules={[{ required: true, message: 'Please input!' }]}>
          <DatePicker />
        </Form.Item>

        <Form.Item label="Country" name="Country" rules={[{ required: true, message: 'Please input!' }]}>
          <Select />
        </Form.Item>

        <Form.Item label="City" name="City" rules={[{ required: true, message: 'Please input!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Street" name="Street" rules={[{ required: true, message: 'Please input!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Post Code" name="Post Code" rules={[{ required: true, message: 'Please input!' }]}>
          <Input />
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
