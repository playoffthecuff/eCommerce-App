import { describe, test, expect, vi, Mock, beforeEach } from 'vitest';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegistrationForm from './registration-form';
import { Country } from './types';
import { getCountries } from './service';

vi.mock('./service');

const mockCountries: Country[] = [
  {
    _id: '1',
    abbrev: 'mock',
    name: 'United States',
    postalCodePattern: '99999 or 99999-9999',
    postalRegex: '^\\d{5}(?:[-\\s]\\d{4})?$',
  },
];

describe('RegistrationForm tests', () => {
  beforeEach(() => {
    (getCountries as Mock).mockResolvedValueOnce(mockCountries);
  });

  test('can register', async () => {
    // personal data form
    const { container } = render(<RegistrationForm />);
    const firstNameEl = screen.getByTestId('firstName');
    const lastNameEl = screen.getByTestId('lastName');
    const passwordEl = screen.getByTestId('password');
    const emailEl = screen.getByTestId('email');
    const dateOfBirthEl = container.querySelector('#date-of-birth')!;
    expect(dateOfBirthEl).toBeTruthy();

    await userEvent.type(firstNameEl, 'John');
    await userEvent.type(lastNameEl, 'Smith');
    await userEvent.type(passwordEl, 'Secret12345!');
    await userEvent.type(emailEl, 'john.smith@company.com');
    await userEvent.type(dateOfBirthEl, '2000-01-01');

    const submitPersonalDataBtn = screen.getByTestId('submitPersonalData');
    await userEvent.click(submitPersonalDataBtn);
    await userEvent.click(submitPersonalDataBtn);

    await screen.findByTestId('address-form');

    // address form
    const countryEl = screen.getByRole('combobox', { name: 'Country' });
    userEvent.click(countryEl);
    const opts = await screen.findByText(/united states/i, { selector: '.ant-select-item-option-content' });
    fireEvent.click(opts);

    const cityEl = screen.getByTestId('city');
    const streetEl = screen.getByTestId('street');
    const postCodeEl = screen.getByTestId('postCode');
    await userEvent.type(cityEl, 'City');
    await userEvent.type(streetEl, 'Green');
    await userEvent.type(postCodeEl, '10001');

    const submitAddressBtn = screen.getByTestId('submitAddress');
    await userEvent.click(submitAddressBtn);

    await screen.findByTestId('finishForm');

    // complete regestration
    userEvent.click(screen.getByTestId('completeRegestration'));
  });

  test('validates email', async () => {
    render(<RegistrationForm />);
    const emailEl = screen.getByTestId('email');
    userEvent.type(emailEl, 'invalid email');
    fireEvent.focus(window);

    await waitFor(() => {
      expect(screen.getByText(/enter correct email/i)).toBeInTheDocument();
    });
  });
});
