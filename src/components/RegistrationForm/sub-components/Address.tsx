import { observer } from 'mobx-react-lite';
import { Form, Checkbox, Typography, notification } from 'antd';
import { useEffect, useState } from 'react';
import { FrownOutlined } from '@ant-design/icons';
import { AddressProps } from '../types';
import { AddressForm } from './AddressForm';
import { BillingForm } from './BillingForm';
import { Country } from '../../../utils/countries-service';
import { countriesStore } from '../../../store/countries-store';

export const Address = observer(({ sameAddresses, setSameAddresses }: AddressProps) => {
  const [country, setCountry] = useState<Country | undefined>();
  const [billingCountry, setBillingCountry] = useState<Country | undefined>();
  const [notificationAPI, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (countriesStore.error) {
      notificationAPI.error({
        message: 'Failed to get supported countries.',
        description: 'Please refresh the page.',
        placement: 'top',
        icon: <FrownOutlined />,
        duration: 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countriesStore.error]);

  return (
    <>
      <Typography.Title level={3}>Shipping Address</Typography.Title>
      <Form.Item name="setAsDefaultShippingAddress" valuePropName="checked">
        <Checkbox>Set as default shipping address</Checkbox>
      </Form.Item>
      <AddressForm countries={countriesStore.countries} country={country} setCountry={setCountry} />
      <Typography.Title level={3}>Billing Address</Typography.Title>
      <Checkbox checked={sameAddresses} onChange={() => setSameAddresses(!sameAddresses)}>
        Have the same shipping address
      </Checkbox>
      <Form.Item name="setAsDefaultBillingAddress" valuePropName="checked">
        <Checkbox>Set as default billing address</Checkbox>
      </Form.Item>
      {!sameAddresses && (
        <BillingForm countries={countriesStore.countries} country={billingCountry} setCountry={setBillingCountry} />
      )}
      {contextHolder}
    </>
  );
});
