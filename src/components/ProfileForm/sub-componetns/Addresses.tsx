import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card, Checkbox, Form, Input, Modal, Select, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import userStore from '../../../store/user-store';
import { Address } from '../../../types/authorization-response';
import { Country } from '../../../utils/countries-service';
import { countriesStore } from '../../../store/countries-store';
import styles from '../ProfileForm.module.css';
import CustomButton from '../../CustomButton/CustomButton';

export const Addresses = observer(() => {
  return (
    <div>
      <Typography.Title level={3}>Shipping Address</Typography.Title>
      {userStore.user?.addresses.shippingAddresses.map((address) => (
        <AddressBlock address={address} countries={countriesStore.countries} />
      ))}
    </div>
  );
});

function AddressBlock({ address, countries }: { address: Address; countries: Country[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card
        className={styles['address-card']}
        title={address.isDefault ? 'Default address' : ''}
        actions={[<DeleteOutlined key="setting" />, <EditOutlined key="edit" onClick={() => setIsModalOpen(true)} />]}
      >
        {address.country}, {address.postalCode}
        <br />
        city: {address.city}, street: {address.street} <br />
      </Card>
      <Modal
        className={styles['modal-form']}
        title="Edit Address"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer=""
      >
        <EditForm address={address} countries={countries} />
      </Modal>
    </>
  );
}

function EditForm({ address, countries }: { address: Address; countries: Country[] }) {
  const [country, setCountry] = useState<Country | undefined>(countries.find((c) => c.name === address.country));

  return (
    <Form
      layout="vertical"
      style={{ marginTop: '1.5rem' }}
      initialValues={{
        country: address.country,
        city: address.city,
        street: address.street,
        postCode: address.postalCode,
      }}
    >
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
      <Form.Item name="setAsDefaultShippingAddress" valuePropName="checked">
        <Checkbox>Set as default this address</Checkbox>
      </Form.Item>
      <CustomButton variety="common" htmlType="submit" block>
        UPDATE EDITING
      </CustomButton>
    </Form>
  );
}
