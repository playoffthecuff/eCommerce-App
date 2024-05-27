import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, Form, Input, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import styles from '../ProfileForm.module.css';
import CustomButton from '../../CustomButton/CustomButton';
import { dateOfBirthValidator, emailRules, nameRules } from '../../../utils/fields-validation';
import userStore from '../../../store/user-store';

type Fields = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Dayjs;
};

export const PersonalData = observer(() => {
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const [isValid, setIsValid] = useState(true);
  const user = userStore.user!;

  const handleUpdateData = () => {
    setEditing(false);
    const fields: Fields = form.getFieldsValue(true);
    if (
      fields.firstName === user.firstName &&
      fields.lastName === user.lastName &&
      fields.email === user.email &&
      dayjs(user.dateOfBirth).diff(fields.dateOfBirth) === 0
    ) {
      return;
    }
    // TODO
    // updateUserData();
    console.log(fields, user);
  };

  const checkIfFormValid = (): void => {
    const fields = form.getFieldsError();
    for (const field of fields) {
      if (field.errors.length > 0) {
        setIsValid(false);
        return;
      }
    }
    setIsValid(true);
  };

  return (
    <div className={styles['profile-form']}>
      <Form
        form={form}
        onFieldsChange={() => checkIfFormValid()}
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          dateOfBirth: dayjs(user.dateOfBirth),
        }}
        layout="vertical"
        disabled={!editing}
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
      {!editing && (
        <CustomButton variety="common" htmlType="submit" onClick={() => setEditing(true)} block>
          EDIT DATA
        </CustomButton>
      )}
      {editing && (
        <CustomButton variety="common" htmlType="submit" onClick={() => handleUpdateData()} disabled={!isValid} block>
          UPDATE DATA
        </CustomButton>
      )}
    </div>
  );
});
