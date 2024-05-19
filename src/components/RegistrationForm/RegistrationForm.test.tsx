import { describe, test, expect, vi, Mock, beforeEach } from 'vitest';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { RegistrationForm } from './RegistrationForm';
import userService from '../../utils/user-service';
import { Country, countriesService } from '../../utils/countries-service';

vi.mock('../../utils/countries-service', () => {
  return {
    countriesService: { getCountries: vi.fn().mockResolvedValue([]) },
  };
});
vi.mock('../../utils/user-service', () => {
  return {
    __esModule: true,
    default: {
      signUp: vi.fn(),
      checkAuthorization: vi.fn().mockResolvedValue([{ data: { user: {} } }]),
      checkEmailAvailability: vi.fn(),
    },
  };
});

const mockUser = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token',
  user: {
    email: 'john.smith@company.com',
    id: '1',
    isActivated: false,
  },
};

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
  function setup() {
    return render(
      <MemoryRouter initialEntries={['/registration']}>
        <RegistrationForm />
      </MemoryRouter>
    );
  }

  beforeEach(() => {
    vi.clearAllMocks();
    (countriesService.getCountries as Mock).mockResolvedValueOnce(mockCountries);
    (userService.signUp as Mock).mockResolvedValueOnce(mockUser);
    (userService.checkAuthorization as Mock).mockResolvedValue([{ data: mockUser }]);
    (userService.checkEmailAvailability as Mock).mockResolvedValue({ email: mockUser.user.email, exists: false });
  });

  test('can register', async () => {
    // step: personal data
    const { container } = setup();
    const firstNameEl = screen.getByTestId('firstName');
    const lastNameEl = screen.getByTestId('lastName');
    const passwordEl = screen.getByTestId('password');
    const emailEl = screen.getByTestId('email');
    const dateOfBirthEl = container.querySelector('#dateOfBirth')!;
    expect(dateOfBirthEl).toBeTruthy();

    await userEvent.type(firstNameEl, 'John');
    await userEvent.type(lastNameEl, 'Smith');
    await userEvent.type(passwordEl, 'Secret12345!');
    await userEvent.type(emailEl, 'john.smith@company.com');
    await userEvent.type(dateOfBirthEl, '01.01.2000');

    const submitBtn = screen.getByTestId('submitBtn');
    await userEvent.click(submitBtn);
    await userEvent.click(submitBtn);

    // step: address
    const [countryEl] = await screen.findAllByRole('combobox', { name: 'Country' });
    userEvent.click(countryEl);
    const opts = await screen.findByText(/united states/i, { selector: '.ant-select-item-option-content' });
    fireEvent.click(opts);

    const cityEl = screen.getByTestId('city');
    const streetEl = screen.getByTestId('street');
    const postCodeEl = screen.getByTestId('postCode');
    await userEvent.type(cityEl, 'City');
    await userEvent.type(streetEl, 'Green');
    await userEvent.type(postCodeEl, '10001');

    const sameBillingAddressCheckbox = screen.getByRole('checkbox', { name: /same shipping address/i });
    userEvent.click(sameBillingAddressCheckbox);
    await userEvent.click(submitBtn);

    // step: complete regestration
    await screen.findByText(/complete registration/i);
    userEvent.click(submitBtn);
    await waitFor(() => {
      expect(userService.signUp as Mock).toHaveBeenCalledTimes(1);
    });
  });
});
