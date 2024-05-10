import { Dayjs } from 'dayjs';

export type Country = {
  _id: string;
  abbrev: string;
  name: string;
  postalCodePattern: string;
  postalRegex: string;
};

export type AddressProps = {
  onFinish: (values: TAddress) => void;
};

export type PersonalDataProps = {
  onFinish: (values: TPersonalData) => void;
};

export type TPersonalData = {
  dateOfBirth: Dayjs;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type TAddress = {
  city: string;
  country: string;
  postCode: string;
  street: string;
};

export type FinishProps = {
  onClick: () => void;
};
