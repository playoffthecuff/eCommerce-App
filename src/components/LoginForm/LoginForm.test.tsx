import { describe, test, expect, beforeEach } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './LoginForm';

describe('LoginForm tests', () => {
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let user: UserEvent;
  beforeEach(() => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    emailInput = screen.getByPlaceholderText('Enter your email...');
    passwordInput = screen.getByPlaceholderText('Enter your password...');
    user = userEvent.setup();
  });
  test('view must be in the document', () => {
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });
  test('input fields must be empty and visible', () => {
    expect(emailInput).toBeVisible();
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toBeVisible();
    expect(passwordInput).toHaveValue('');
  });
  test('input fields must be invalid when entering irrelevant values', async () => {
    await user.click(emailInput);
    await user.keyboard('asd');
    expect(emailInput).toBeInvalid();
    await user.type(passwordInput, 'zzz...');
    expect(passwordInput).toBeInvalid();
  });
  test('input fields must be valid when entering relevant values', async () => {
    await user.click(emailInput);
    await user.keyboard('a@mail.com');
    expect(emailInput).toBeValid();
    await user.type(passwordInput, '1#Abcdef');
    expect(passwordInput).toBeValid();
  });
  test('the form contain links "Create Account" & "Forgot your password?"', () => {
    const link1 = screen.getByText('Create Account');
    const link2 = screen.getByText('Forgot your password?');
    expect(link1).toHaveRole('link');
    expect(link2).toHaveRole('link');
  });
});
