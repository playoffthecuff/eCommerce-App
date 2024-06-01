import { Form, Input, Select } from 'antd';
import { AddressFormProps } from '../types';

export function AddressForm({ countries, country, setCountry }: AddressFormProps) {
  return (
    <>
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
        <Input data-testid="postCode" placeholder={country?.postalCodePattern || '12345'} />
      </Form.Item>
    </>
  );
}
