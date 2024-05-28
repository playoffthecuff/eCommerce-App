import api from './api';
import { ProductData, Filters } from '../types/types';

// export type Country = {
//   _id: string;
//   abbrev: string;
//   name: string;
//   postalCodePattern: string;
//   postalRegex: string;
// };

class ProductsService {
  loadProducts = async (filters: Filters): Promise<[ProductData[], Error | undefined]> => {
    try {
      const resp = await api.post<ProductData[]>('/products', filters);
      console.log(resp.data);

      return [resp.data, undefined];
    } catch (error) {
      return [[], error as Error];
    }
  };

  loadAllProducts = async (): Promise<[ProductData[], Error | undefined]> => {
    try {
      const resp = await api.post<ProductData[]>('/products');
      console.log(resp.data);

      return [resp.data, undefined];
    } catch (error) {
      return [[], error as Error];
    }
  };
}

export const productsService = new ProductsService();
