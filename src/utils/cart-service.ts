import api from './api';
import { CartResponseData, CartPayload, Promo } from '../types/types';

class CartService {
  addToCart = async (payload: CartPayload): Promise<[CartResponseData, undefined] | [undefined, Error]> => {
    try {
      const resp = await api.post<CartResponseData>(`/cart`, payload);
      return [resp.data, undefined];
    } catch (error) {
      return [undefined, error as Error];
    }
  };

  removeFromCart = async (payload: CartPayload): Promise<[CartResponseData, undefined] | [undefined, Error]> => {
    try {
      const resp = await api.delete<CartResponseData>(`/cart`, { data: payload });
      return [resp.data, undefined];
    } catch (error) {
      return [undefined, error as Error];
    }
  };

  loadItems = async (payload: CartPayload): Promise<[CartResponseData, undefined] | [undefined, Error]> => {
    try {
      const resp = await api.post<CartResponseData>('/cart/load-cart', payload);
      return [resp.data, undefined];
    } catch (error) {
      return [undefined, error as Error];
    }
  };

  createTempCart = async (): Promise<[CartResponseData, undefined] | [undefined, Error]> => {
    try {
      const resp = await api.post<CartResponseData>(`/cart/temp-cart`);
      return [resp.data, undefined];
    } catch (error) {
      return [undefined, error as Error];
    }
  };

  mergeCarts = async (
    userId: string,
    tempCartId: string
  ): Promise<[CartResponseData, undefined] | [undefined, Error]> => {
    try {
      const resp = await api.post<CartResponseData>('/cart/merge-cart', { tempCartId, userId });
      return [resp.data, undefined];
    } catch (error) {
      return [undefined, error as Error];
    }
  };

  updateItemQuantity = async (payload: CartPayload): Promise<[CartResponseData, undefined] | [undefined, Error]> => {
    try {
      const resp = await api.post<CartResponseData>(`/cart/update-quantity`, payload);
      return [resp.data, undefined];
    } catch (error) {
      return [undefined, error as Error];
    }
  };

  clearCart = async (payload: CartPayload): Promise<Error | undefined> => {
    try {
      await api.post<CartResponseData>('/cart/clear', payload);
      return undefined;
    } catch (error) {
      return error as Error;
    }
  };

  getPromoCodes = async (): Promise<[Promo[], undefined] | [undefined, Error]> => {
    try {
      const resp = await api.get<Promo[]>('/promo');
      return [resp.data, undefined];
    } catch (error) {
      return [undefined, error as Error];
    }
  };

  applyPromoCode = async (payload: {
    promoCodeId: string;
    userId?: string;
    tempCartId?: string;
  }): Promise<[CartResponseData, undefined] | [undefined, Error]> => {
    try {
      const resp = await api.post<CartResponseData>('/cart/promo-apply', payload);
      return [resp.data, undefined];
    } catch (error) {
      return [undefined, error as Error];
    }
  };

  removePromoCode = async (payload: {
    userId?: string;
    tempCartId?: string;
  }): Promise<[CartResponseData, undefined] | [undefined, Error]> => {
    try {
      const resp = await api.post<CartResponseData>('/cart/promo-remove', payload);
      return [resp.data, undefined];
    } catch (error) {
      return [undefined, error as Error];
    }
  };
}

export const cartService = new CartService();
