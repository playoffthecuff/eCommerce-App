import api from './api';
import { CartResponseData, CartPayload } from '../types/types';

class CartService {
  addToCart = async (payload: CartPayload): Promise<[CartResponseData, Error | undefined]> => {
    try {
      const resp = await api.post<CartResponseData>(`/cart`, payload);
      return [resp.data, undefined];
    } catch (error) {
      return [{ _id: '', items: [], totalItems: 0, totalPrice: 0, userId: '' }, error as Error];
    }
  };

  removeFromCart = async (payload: CartPayload): Promise<[CartResponseData, Error | undefined]> => {
    try {
      const resp = await api.delete<CartResponseData>(`/cart`, { data: payload });
      return [resp.data, undefined];
    } catch (error) {
      return [{ _id: '', items: [], totalItems: 0, totalPrice: 0, userId: '' }, error as Error];
    }
  };

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
