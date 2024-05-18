import { Country } from './types';
import httpClient from '../../utils/api';

export async function getCountries(): Promise<Country[]> {
  const resp = await httpClient.get<Country[]>('/countries');
  return resp.data;
}
