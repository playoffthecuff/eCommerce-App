import { Form, Input, Select, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Country } from '../../../utils/countries-service';
import { countriesStore } from '../../../store/countries-store';
import CustomButton from '../../CustomButton/CustomButton';

export function Addresses() {
  return (
    <div>
      <Billing />
    </div>
  );
}

const Billing = observer(() => {
  const [country, setCountry] = useState<Country | undefined>(undefined);
  const { countries } = countriesStore;
  const [editing, setEditing] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [form] = Form.useForm();
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
    <>
      <Form layout="vertical" form={form} onFieldsChange={() => checkIfFormValid()} disabled={!editing}>
        <Typography.Title level={3}>Billing Address</Typography.Title>
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
            { pattern: /^[A-Za-z ]*$/, message: 'Must not contain special characters or numbers!' },
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
            { pattern: /[A-Za-z]/, message: 'Must contain at list one English letter' },
            { pattern: /^[^а-яА-Я]*$/, message: 'Must contain only English letters, numbers and symbols!' },
          ]}
          hasFeedback
          validateFirst
        >
          <Input data-testid="street" placeholder="Enter your street..." />
        </Form.Item>
        <Form.Item
          tooltip={(country && `format: ${country?.postalCodePattern}`) || 'choose your country'}
          label="Post Code"
          name="postCode"
          dependencies={['country']}
          rules={[
            { required: true, message: 'Please enter your post code!' },
            { pattern: new RegExp(country?.postalRegex || /^[0-9]{5}$/), message: 'Post code is invalid' },
          ]}
          hasFeedback
        >
          <Input data-testid="postCode" placeholder={country?.postalCodePattern || 'Enter valid post code...'} />
        </Form.Item>
      </Form>
      {!editing && (
        <CustomButton variety="common" htmlType="submit" onClick={() => setEditing(true)} block>
          EDIT DATA
        </CustomButton>
      )}
      {editing && (
        <CustomButton variety="common" htmlType="submit" disabled={!isValid} block>
          UPDATE DATA
        </CustomButton>
      )}
    </>
  );
});
