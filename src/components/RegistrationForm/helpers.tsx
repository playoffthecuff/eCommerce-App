import dayjs from 'dayjs';
import { RuleObject } from 'antd/es/form';
import { Fields } from './types';
import { EmailAvailabilityResponse, SignUpArg } from '../../types/authorization-response';
import userService from '../../utils/user-service';

const MIN_AGE = 16;

export const dateOfBirthValidator = {
  validator: (_rules: RuleObject, value: unknown, callback: (error?: string | undefined) => void): void => {
    if (!value) {
      callback();
      return;
    }

    let date;
    try {
      date = dayjs(value as string);
    } catch {
      callback('Date has to be valid.');
      return;
    }
    const now = dayjs();
    const diff = now.diff(date, 'years');
    if (diff < MIN_AGE) {
      callback(`You have to be at least ${MIN_AGE} years old.`);
      return;
    }
    callback();
  },
};

export const emailAvailabilityValidator = {
  validator: (_: RuleObject, value: string) => {
    return new Promise<void>((resolve, reject) => {
      if (!value) {
        resolve();
        return;
      }
      userService
        .checkEmailAvailability(value)
        .then((d) => {
          if ((d as EmailAvailabilityResponse).exists) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('User with such email already exists');
            return;
          }
          resolve();
        })
        .catch(() => {
          // Ignore error and allow user to try to register.
          resolve();
        });
    });
  },
};

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
