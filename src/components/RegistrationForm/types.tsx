import { Dayjs } from 'dayjs';

export type Country = {
  id: string;
  abbrev: string;
  name: string;
  postalCodePattern: string;
  postalRegex: string;
};

export type AddressProps = {
  sameAddresses: boolean;
  setSameAddresses: (flag: boolean) => void;
};

export type BillingFormProps = {
  countries: Country[];
  country?: Country;
  setCountry: (country?: Country) => void;
};

export type AddressFormProps = {
  countries: Country[];
  country?: Country;
  setCountry: (country?: Country) => void;
};

export type Fields = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  dateOfBirth: Dayjs;
  country: string;
  postCode: string;
  city: string;
  street: string;
  setAsDefaultBillingAddress: boolean;
  setAsDefaultShippingAddress: boolean;
  billingCountry: string;
  billingPostCode: string;
  billingStreet: string;
  billingCity: string;
};
