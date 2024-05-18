import axios, { AxiosError, AxiosResponse } from 'axios';
import api from './api';
import { AuthorizationResponse } from '../types/authorization-response';

const UserService = {
  async login(email: string, password: string): Promise<[AxiosResponse<AuthorizationResponse> | null, string]> {
    let response: AxiosResponse<AuthorizationResponse> | null = null;
    let error: Error | AxiosError | null = null;
    let message: string = '';
    try {
      response = await api.post<AuthorizationResponse>('/users/login', { email, password });
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
    } catch (err) {
      error = err as AxiosError | Error;
      if (axios.isAxiosError(error)) {
        const responseData: { message?: string } = error.response?.data ?? {};
        console.log(error.message);
        message = responseData.message ?? 'connection failed';
      } else {
        message = 'unexplained error';
      }
      console.log(message);
    }
    return [response, message];
  },

  async registration(email: string, password: string): Promise<[AxiosResponse<AuthorizationResponse> | null, string]> {
    let response: AxiosResponse<AuthorizationResponse> | null = null;
    let error: Error | AxiosError | null = null;
    let message: string = '';
    try {
      response = await api.post<AuthorizationResponse>('/users/registration', { email, password });
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
    } catch (err) {
      error = err as AxiosError | Error;
      if (axios.isAxiosError(error)) {
        const responseData: { message?: string } = error.response?.data ?? {};
        console.log(error.message);
        message = responseData.message ?? 'connection failed';
      } else {
        message = 'unexplained error';
      }
      console.log(message);
    }
    return [response, message];
  },

  async logout(): Promise<[AxiosResponse<AuthorizationResponse> | null, string]> {
    let response: AxiosResponse<AuthorizationResponse> | null = null;
    let error: Error | AxiosError | null = null;
    let message: string = '';
    try {
      response = await api.post('/users/logout');
      localStorage.removeItem('token');
    } catch (err) {
      error = err as AxiosError | Error;
      if (axios.isAxiosError(error)) {
        const responseData: { message?: string } = error.response?.data ?? {};
        console.log(error.message);
        message = responseData.message ?? 'connection failed';
      } else {
        message = 'unexplained error';
      }
      console.log(message);
    }
    return [response, message];
  },

  async checkAuthorization(): Promise<[AxiosResponse<AuthorizationResponse> | null, string]> {
    let response: AxiosResponse<AuthorizationResponse> | null = null;
    let error: Error | AxiosError | null = null;
    let message: string = '';
    try {
      response = await axios.get<AuthorizationResponse>(`${import.meta.env.VITE_API_URL}/users/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', response.data.accessToken);
    } catch (err) {
      error = err as AxiosError | Error;
      if (axios.isAxiosError(error)) {
        const responseData: { message?: string } = error.response?.data ?? {};
        console.log(error.message);
        message = responseData.message ?? 'connection failed';
      } else {
        message = 'unexplained error';
      }
      console.log(message);
    }
    return [response, message];
  },
};

export default UserService;
