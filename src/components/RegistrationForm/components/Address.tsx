import { Form, Input, Select, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { AddressProps, Country } from '../types';
import { getCountries } from '../service';
import styles from '../RegistrationForm.module.css';

export function Address({ sameAddresses, setSameAddresses }: AddressProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState<Country | undefined>();
  const [billingCountry, setBillingCountry] = useState<Country | undefined>();

  useEffect(() => {
    getCountries()
      .then((data) => {
        data.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(data);
        setCountry(data[0]);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <h2>Shipping Address</h2>
      <Checkbox
        className={styles['chechbox-style']}
        checked={sameAddresses}
        onChange={() => setSameAddresses(!sameAddresses)}
      >
        I have the same billing and shipping addresses
      </Checkbox>
      <AddressForm countries={countries} country={country} setCountry={setCountry} />
      {!sameAddresses && (
        <>
          <h2>Billing Address</h2>
          <BillingForm countries={countries} country={billingCountry} setCountry={setBillingCountry} />
        </>
      )}
    </>
  );
}

type AddressFormProps = {
  countries: Country[];
  country?: Country;
  setCountry: (country?: Country) => void;
};

function AddressForm({ countries, country, setCountry }: AddressFormProps) {
  return (
    <div className={styles['address-form']}>
      <Form.Item name="setAsDefaultShippingAddress" valuePropName="checked">
        <Checkbox className={styles['chechbox-style']}>Set as default shipping address</Checkbox>
      </Form.Item>
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
        <Input data-testid="postCode" placeholder={country?.postalCodePattern} />
      </Form.Item>
    </div>
  );
}

type BillingFormProps = {
  countries: Country[];
  country?: Country;
  setCountry: (country?: Country) => void;
};

function BillingForm({ countries, country, setCountry }: BillingFormProps) {
  return (
    <div className={styles['address-form']}>
      <Form.Item name="setAsDefaultBillingAddress" valuePropName="checked">
        <Checkbox className={styles['chechbox-style']}>Set as default billing address</Checkbox>
      </Form.Item>
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
        <Input data-testid="city" placeholder="Enter your city..." />
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
        <Input data-testid="street" placeholder="Enter your street..." />
      </Form.Item>
      <Form.Item
        label="Post Code"
        name="billingPostCode"
        dependencies={['country']}
        rules={[
          { required: true, message: 'Please enter your post code!' },
          { pattern: new RegExp(country?.postalRegex || /^[0-9]{5}$/), message: 'Post code is invalid' },
        ]}
        hasFeedback
      >
        <Input data-testid="postCode" placeholder={country?.postalCodePattern} />
      </Form.Item>
    </div>
  );
}
