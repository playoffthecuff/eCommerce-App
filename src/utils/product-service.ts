import api from './api';
import { FiltersData, Payload, ResponseData } from '../types/types';

class ProductsService {
  loadProducts = async (payload: Payload): Promise<[ResponseData, Error | undefined]> => {
    try {
      const resp = await api.post<ResponseData>('/products', payload);
      console.log(resp.data);

      return [resp.data, undefined];
    } catch (error) {
      return [{ products: [], total: 0 }, error as Error];
    }
  };

  loadFilters = async (): Promise<[FiltersData, Error | undefined]> => {
    try {
      const resp = await api.post<FiltersData>('/products/filters');

      return [resp.data, undefined];
    } catch (error) {
      return [{}, error as Error];
    }
  };
}

export const productsService = new ProductsService();
