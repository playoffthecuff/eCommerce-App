export type User = {
  id: string | null;
  email: string | null;
  isActivated: boolean;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: {
    shippingAddresses: Address[];
    billingAddresses: Address[];
  };
};

export interface AuthorizationResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

type Address = {
  id: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

export type SignUpArg = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: {
    shippingAddresses: Omit<Address, 'id'>[];
    billingAddresses?: Omit<Address, 'id'>[];
  };
};

export type SignUpResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type EmailAvailabilityResponse = {
  email: string;
  exists: boolean;
};
