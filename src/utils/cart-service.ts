import api from './api';
import { CartResponseData } from '../types/types';

class CartService {
  loadItems = async (userId: string): Promise<[CartResponseData, Error | undefined]> => {
    try {
      const resp = await api.get<CartResponseData>(`/cart/${userId}`);
      return [resp.data, undefined];
    } catch (error) {
      return [{ _id: '', items: [], totalItems: 0, totalPrice: 0, userId: '' }, error as Error];
    }
  };
}

export const cartService = new CartService();
