import api from './api';
// import { Product } from '../types/types';

export type Country = {
  _id: string;
  abbrev: string;
  name: string;
  postalCodePattern: string;
  postalRegex: string;
};

class ProductsService {
  loadProducts = async (): Promise<[Country[], Error | undefined]> => {
    try {
      const resp = await api.get<Country[]>('/countries');

      return [resp.data, undefined];
    } catch (error) {
      return [[], error as Error];
    }
  };
}

export const productsService = new ProductsService();
