import { Form, Input, Select, Checkbox, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { AddressFormProps, AddressProps, BillingFormProps, Country } from '../types';
import { getCountries } from '../service';

export function Address({ sameAddresses, setSameAddresses }: AddressProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState<Country | undefined>();
  const [billingCountry, setBillingCountry] = useState<Country | undefined>();

  useEffect(() => {
    getCountries()
      .then((data) => {
        data.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(data);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Typography.Title level={3}>Shipping Address</Typography.Title>
      <Form.Item name="setAsDefaultShippingAddress" valuePropName="checked">
        <Checkbox>Set as default shipping address</Checkbox>
      </Form.Item>
      <AddressForm countries={countries} country={country} setCountry={setCountry} />
      <Typography.Title level={3}>Billing Address</Typography.Title>
      <Checkbox checked={sameAddresses} onChange={() => setSameAddresses(!sameAddresses)}>
        Same as shipping address
      </Checkbox>
      <Form.Item name="setAsDefaultBillingAddress" valuePropName="checked">
        <Checkbox>Set as default billing address</Checkbox>
      </Form.Item>
      {!sameAddresses && <BillingForm countries={countries} country={billingCountry} setCountry={setBillingCountry} />}
    </>
  );
}

function AddressForm({ countries, country, setCountry }: AddressFormProps) {
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
        ]}
        hasFeedback
      >
        <Input data-testid="street" placeholder="Enter your street..." />
      </Form.Item>
      <Form.Item
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
    </>
  );
}

function BillingForm({ countries, country, setCountry }: BillingFormProps) {
  return (
    <>
      <Form.Item
        label="Country"
        name="billingCountry"
        rules={[{ required: true, message: 'Please enter your country!' }]}
      >
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
        name="billingCity"
        rules={[
          { required: true, message: 'Please enter your city!' },
          { pattern: /^[A-Za-z ]*$/, message: 'Must not contain special characters or numbers!' },
        ]}
        hasFeedback
        validateFirst
      >
        <Input data-testid="billingCity" placeholder="Enter your city..." />
      </Form.Item>
      <Form.Item
        label="Street"
        name="billingStreet"
        rules={[
          { required: true, message: 'Please enter your street!' },
          { pattern: /[A-Za-z]/, message: 'Must contain at list one English letter' },
        ]}
        hasFeedback
      >
        <Input data-testid="billingStreet" placeholder="Enter your street..." />
      </Form.Item>
      <Form.Item
        label="Post Code"
        name="billingPostCode"
        dependencies={['billingCountry']}
        rules={[
          { required: true, message: 'Please enter valid post code!' },
          { pattern: new RegExp(country?.postalRegex || /^[0-9]{5}$/), message: 'Post code is invalid' },
        ]}
        hasFeedback
      >
        <Input data-testid="billingPostCode" placeholder={country?.postalCodePattern || 'Enter valid post code...'} />
      </Form.Item>
    </>
  );
}
