import api from './api';
import { FiltersData, Payload, ResponseData } from '../types/types';

class CatalogService {
  loadProducts = async (payload: Payload): Promise<[ResponseData, Error | undefined]> => {
    try {
      const resp = await api.post<ResponseData>('/products', payload);
      return [resp.data, undefined];
    } catch (error) {
      return [{ products: [], total: 0 }, error as Error];
    }
  };

  loadBestSellingProducts = async (): Promise<[ResponseData, Error | undefined]> => {
    try {
      const resp = await api.get<ResponseData>('/products/best-selling');
      return [resp.data, undefined];
    } catch (error) {
      return [{ products: [], total: 0 }, error as Error];
    }
  };

  loadFiltersData = async (): Promise<[FiltersData, Error | undefined]> => {
    try {
      const resp = await api.get<FiltersData>('/products/filters');

      return [resp.data, undefined];
    } catch (error) {
      return [{}, error as Error];
    }
  };
}

export const productsService = new CatalogService();
