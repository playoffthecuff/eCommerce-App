import axios from 'axios';
import { Country, SignUpArg, SignUpResponse } from './types';

const API_URL = 'http://localhost:5000/api';

const httpClient = axios.create({
  baseURL: API_URL,
});

export async function getCountries(): Promise<Country[]> {
  const resp = await httpClient.get<Country[]>('/countries');
  return resp.data;
}

export async function signUp(arg: SignUpArg): Promise<SignUpResponse> {
  const resp = await httpClient.post('/users/registration', arg, {
    headers: { 'Content-Type': 'application/json' },
  });
  return resp.data;
}
