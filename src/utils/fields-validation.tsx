import dayjs from 'dayjs';
import { RuleObject } from 'antd/es/form';

const MIN_AGE = 12;

export const dateOfBirthValidator = {
  validator: (_rules: RuleObject, value: unknown) => {
    if (!value) {
      return Promise.resolve();
    }
    let date;
    try {
      date = dayjs(value as string);
    } catch {
      return Promise.reject('Date has to be valid.');
    }
    const now = dayjs();
    const diff = now.diff(date, 'years');
    if (diff < MIN_AGE) {
      return Promise.reject(`You have to be at least ${MIN_AGE} years old.`);
    }
    return Promise.resolve();
  },
};

export const nameRules = [
  { required: true, message: 'Please enter your name!' },
  { min: 1, message: 'Must be at least 1 characters long!' },
  { pattern: /^[A-Za-z]*$/, message: 'Must contain only English letters!' },
];

export const emailRules = [
  { required: true, message: 'Please enter your Email' },
  {
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Please enter correct Email address',
  },
];

export const passwordRules = [
  { required: true, message: 'Please enter your password!' },
  { pattern: /^[^а-яА-Я]*$/, message: 'Must contain only English letters!' },
  { pattern: /^\S(?:.*\S)?$/, message: 'Must not contain leading or trailing spaces!' },
  { pattern: /[a-z]/, message: 'Must contain at least one lowercase english letter!' },
  { pattern: /[A-Z]/, message: 'Must contain at least one uppercase english letter!' },
  { pattern: /\d/, message: 'Must contain at least one digit!' },
  { pattern: /[^A-Za-zА-Яа-я\s0-9]/, message: 'Must contain at least one special character!' },
  { min: 8, message: 'Must be at least 8 characters long!' },
];
