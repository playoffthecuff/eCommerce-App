export type User = {
  id: string | null;
  email: string | null;
  isActivated: boolean;
};

export interface AuthorizationResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

type Address = {
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
    shippingAddresses: Address[];
    billingAddresses?: Address[];
  };
};

export type SignUpResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    id: string;
    isActivated: boolean;
  };
};

export type EmailAvailabilityResponse = {
  email: string;
  exists: boolean;
};
