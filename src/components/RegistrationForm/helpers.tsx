import { Fields } from './types';
import { SignUpArg } from '../../types/authorization-response';

export function mapToSignUpArg(fields: Fields, sameAddresses: boolean): SignUpArg {
  const shippingAddress = {
    city: fields.city,
    country: fields.country,
    postalCode: fields.postCode,
    street: fields.street,
    isDefault: Boolean(fields.setAsDefaultShippingAddress),
  };
  const billingAddress = { ...shippingAddress, isDefault: Boolean(fields.setAsDefaultBillingAddress) };
  const arg: SignUpArg = {
    firstName: fields.firstName,
    lastName: fields.lastName,
    dateOfBirth: fields.dateOfBirth.toISOString(),
    email: fields.email,
    password: fields.password,
    addresses: {
      shippingAddresses: [shippingAddress],
      billingAddresses: [billingAddress],
    },
  };
  if (!sameAddresses) {
    arg.addresses.billingAddresses = [
      {
        city: fields.billingCity!,
        country: fields.billingCountry!,
        postalCode: fields.billingPostCode!,
        street: fields.billingStreet!,
        isDefault: Boolean(fields.setAsDefaultBillingAddress),
      },
    ];
  }
  return arg;
}
