// import { describe, test, expect, beforeEach } from 'vitest';
// import { screen, render } from '@testing-library/react';
// import userEvent, { UserEvent } from '@testing-library/user-event';
// import RegistrationForm from './registration-form';

// describe('RegistrationForm tests', () => {
//   let emailInput: HTMLInputElement;
//   let passwordInput: HTMLInputElement;
//   let user: UserEvent;

//   beforeEach(() => {
//     emailInput = screen.getByPlaceholderText('Enter your email...');
//     passwordInput = screen.getByPlaceholderText('Enter your password...');
//     user = userEvent.setup();
//   });

//   test('can submit personal data', () => {
//     render(<RegistrationForm />);
//     expect(1).eq(1);
//   });

// test('view must be in the document', () => {
//   expect(screen.getByTestId('login-form')).toBeInTheDocument();
// });
// test('input fields must be empty and visible', () => {
//   expect(emailInput).toBeVisible();
//   expect(emailInput).toHaveValue('');
//   expect(passwordInput).toBeVisible();
//   expect(passwordInput).toHaveValue('');
// });
// test('input fields must be invalid when entering irrelevant values', async () => {
//   await user.click(emailInput);
//   await user.keyboard('asd');
//   expect(emailInput).toBeInvalid();
//   await user.type(passwordInput, 'zzz...');
//   expect(passwordInput).toBeInvalid();
// });
// test('input fields must be valid when entering relevant values', async () => {
//   await user.click(emailInput);
//   await user.keyboard('a@mail.com');
//   expect(emailInput).toBeValid();
//   await user.type(passwordInput, '1#Abcdef');
//   expect(passwordInput).toBeValid();
// });
// test('the form contain links "Create Account" & "Forgot your password?"', () => {
//   const link1 = screen.getByText('Create Account');
//   const link2 = screen.getByText('Forgot your password?');
//   expect(link1).toHaveRole('link');
//   expect(link2).toHaveRole('link');
// });
// test('empty input fields must be invalid after clicking submit button', async () => {
//   const button = screen.getByRole('button');
//   await user.click(button);
//   expect(emailInput).toBeInvalid();
//   expect(passwordInput).toBeInvalid();
// });
// });
