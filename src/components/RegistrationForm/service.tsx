import { Country } from './types';

export async function getCountries(): Promise<Country[]> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/countries`);
  const countries = await response.json();
  return countries;
}
