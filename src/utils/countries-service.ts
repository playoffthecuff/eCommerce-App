import httpClient from './api';

export type Country = {
  _id: string;
  abbrev: string;
  name: string;
  postalCodePattern: string;
  postalRegex: string;
};

class CountriesService {
  getCountries = async (): Promise<[Country[], Error | undefined]> => {
    try {
      const resp = await httpClient.get<Country[]>('/countries');
      return [resp.data, undefined];
    } catch (error) {
      return [[], error as Error];
    }
  };
}

export const countriesService = new CountriesService();
