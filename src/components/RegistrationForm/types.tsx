export type Country = {
  _id: string;
  abbrev: string;
  name: string;
  postalCodePattern: string;
  postalRegex: string;
};

export type AddressProps = {
  sameAddresses: boolean;
  setSameAddresses: (flag: boolean) => void;
};

export type BillingFormProps = {
  countries: Country[];
  country?: Country;
  setCountry: (country?: Country) => void;
};

export type AddressFormProps = {
  countries: Country[];
  country?: Country;
  setCountry: (country?: Country) => void;
};
