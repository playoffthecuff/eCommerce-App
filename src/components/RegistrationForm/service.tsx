import { Country } from './types';

export async function getCountries(): Promise<Country[]> {
  const response = await fetch('http://localhost:5000/api/countries');
  const countries = await response.json();
  return countries;
}
