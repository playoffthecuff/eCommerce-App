import api from './api';
import { ProductSummary, ProductData } from '../types/types';

// export type Country = {
//   _id: string;
//   abbrev: string;
//   name: string;
//   postalCodePattern: string;
//   postalRegex: string;
// };

class ProductsService {
  loadProducts = async (): Promise<[ProductSummary[], Error | undefined]> => {
    try {
      const resp = await api.post<ProductSummary[]>('/products');
      console.log(resp.data);

      return [resp.data, undefined];
    } catch (error) {
      return [[], error as Error];
    }
  };

  loadAllProducts = async (): Promise<[ProductData[], Error | undefined]> => {
    try {
      const resp = await api.get<ProductData[]>('/products');
      console.log(resp.data);

      return [resp.data, undefined];
    } catch (error) {
      return [[], error as Error];
    }
  };
}

export const productsService = new ProductsService();
