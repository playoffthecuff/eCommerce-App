import axios, { AxiosError, AxiosResponse } from 'axios';
import { ProductResponse, ShortInfoResponse } from '../types/product-response';

export const WARRANTY_TEXT = `We believe in our bikes and we believe you should be able to enjoy riding without sweating the small stuff - that’s why we’ve got your back! With a lifetime warranty on frames and a 3-year warranty on components, you can ride confidently with the knowledge that we’ve got you covered. We trust what we make because we use what we make. All Cycling Dependency products are covered by a three year warranty policy.`;

export const productService = {
  async getProduct(vc: string): Promise<[AxiosResponse<ProductResponse> | null, string]> {
    let response: AxiosResponse<ProductResponse> | null = null;
    let error: Error | AxiosError | null = null;
    let message: string = '';
    try {
      response = await axios.get<ProductResponse>(`${import.meta.env.VITE_API_URL}/products?vc=${vc}`, {
        withCredentials: true,
      });
    } catch (err) {
      error = err as AxiosError | Error;
      if (axios.isAxiosError(error)) {
        const responseData: { message?: string } = error.response?.data ?? {};
        message = responseData.message ?? 'connection failed';
      } else {
        message = 'unexplained error';
      }
    }
    return [response, message];
  },
  async getShortInfo(): Promise<[AxiosResponse<ShortInfoResponse[]> | null, string]> {
    let response: AxiosResponse<ShortInfoResponse[]> | null = null;
    let error: Error | AxiosError | null = null;
    let message: string = '';
    try {
      response = await axios.get<ShortInfoResponse[]>(`${import.meta.env.VITE_API_URL}/products/short`, {
        withCredentials: true,
      });
    } catch (err) {
      error = err as AxiosError | Error;
      if (axios.isAxiosError(error)) {
        const responseData: { message?: string } = error.response?.data ?? {};
        message = responseData.message ?? 'connection failed';
      } else {
        message = 'unexplained error';
      }
    }
    return [response, message];
  },
};
