import { Dayjs } from 'dayjs';

export type ProfileFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Dayjs;
};

export type PasswordDataFormFields = {
  password: string;
  newPassword: string;
  confirmPassword: string;
};

export type AddressFields = {
  country: string;
  city: string;
  street: string;
  postCode: string;
  setAsDefaultShippingAddress: boolean;
};
