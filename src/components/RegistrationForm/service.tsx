import { Country, SignUpArg, SignUpResponse } from './types';

const API_URL = 'http://localhost:5000';

export async function getCountries(): Promise<Country[]> {
  const response = await fetch(`${API_URL}/api/countries`);
  const countries = await response.json();
  return countries;
}

export async function signUp(arg: SignUpArg): Promise<SignUpResponse> {
  const response = await fetch(`${API_URL}/api/users/registration`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
  });
  return response.json();
}
