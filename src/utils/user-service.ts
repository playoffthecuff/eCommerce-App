import axios, { AxiosError, AxiosResponse } from 'axios';
import api from './api';
import {
  AuthorizationResponse,
  EmailAvailabilityResponse,
  SignUpArg,
  SignUpResponse,
  UpdateUserArg,
  User,
} from '../types/authorization-response';

const UserService = {
  async login(email: string, password: string): Promise<[AxiosResponse<AuthorizationResponse> | null, string]> {
    let response: AxiosResponse<AuthorizationResponse> | null = null;
    let error: Error | AxiosError | null = null;
    let message: string = '';
    try {
      response = await api.post<AuthorizationResponse>('/users/login', { email, password });
      localStorage.setItem('token', response.data.accessToken);
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

  async signUp(arg: SignUpArg): Promise<SignUpResponse> {
    const resp = await api.post('/users/registration', arg, {
      headers: { 'Content-Type': 'application/json' },
    });
    return resp.data;
  },

  async checkEmailAvailability(email: string): Promise<EmailAvailabilityResponse> {
    const resp = await api.post(
      '/users/check-email',
      { email },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return resp.data;
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
        message = responseData.message ?? 'connection failed';
      } else {
        message = 'unexplained error';
      }
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
        message = responseData.message ?? 'connection failed';
      } else {
        message = 'unexplained error';
      }
    }
    return [response, message];
  },

  async update(arg: UpdateUserArg): Promise<[User, undefined] | [undefined, Error]> {
    try {
      const resp = await api.patch('/users', arg, {
        headers: { 'Content-Type': 'application/json' },
      });
      return [resp.data, undefined];
    } catch (error) {
      return [undefined, error as Error];
    }
  },
};

export default UserService;
