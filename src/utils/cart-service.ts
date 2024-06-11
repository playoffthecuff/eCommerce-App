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

  loadItems = async (payload: CartPayload): Promise<[CartResponseData, Error | undefined]> => {
    try {
      const resp = await api.post<CartResponseData>('/cart/load-cart', payload);
      return [resp.data, undefined];
    } catch (error) {
      return [{ _id: '', items: [], totalItems: 0, totalPrice: 0, userId: '' }, error as Error];
    }
  };

  createTempCart = async (): Promise<[CartResponseData, Error | undefined]> => {
    try {
      const resp = await api.post<CartResponseData>(`/cart/temp-cart`);
      return [resp.data, undefined];
    } catch (error) {
      return [{ _id: '', items: [], totalItems: 0, totalPrice: 0, userId: '' }, error as Error];
    }
  };

  mergeCarts = async (tempCartId: string, userId: string): Promise<[CartResponseData, Error | undefined]> => {
    try {
      const resp = await api.post<CartResponseData>('/cart/merge-cart', { tempCartId, userId });
      return [resp.data, undefined];
    } catch (error) {
      return [{ _id: '', items: [], totalItems: 0, totalPrice: 0, userId: '' }, error as Error];
    }
  };
}

export const cartService = new CartService();