import { Form, Checkbox, Typography, notification } from 'antd';
import { useEffect, useState } from 'react';
import { FrownOutlined } from '@ant-design/icons';
import { AddressProps, Country } from '../types';
import * as service from '../service';
import { AddressForm } from './AddressForm';
import { BillingForm } from './BillingForm';

export function Address({ sameAddresses, setSameAddresses }: AddressProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState<Country | undefined>();
  const [billingCountry, setBillingCountry] = useState<Country | undefined>();
  const [notificationAPI, contextHolder] = notification.useNotification();

  const getCountries = async () => {
    let countriesList;
    try {
      countriesList = await service.getCountries();
    } catch (error) {
      notificationAPI.error({
        message: 'Failed to sign up:',
        description: 'Please refresh the page.',
        placement: 'top',
        icon: <FrownOutlined />,
        duration: 0,
      });
      return;
    }
    countriesList.sort((a, b) => a.name.localeCompare(b.name));
    setCountries(countriesList);
  };

  useEffect(() => {
    getCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        Have the same shipping address
      </Checkbox>
      <Form.Item name="setAsDefaultBillingAddress" valuePropName="checked">
        <Checkbox>Set as default billing address</Checkbox>
      </Form.Item>
      {!sameAddresses && <BillingForm countries={countries} country={billingCountry} setCountry={setBillingCountry} />}
      {contextHolder}
    </>
  );
}
