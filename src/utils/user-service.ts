import { AxiosResponse } from 'axios';
import api from './api';
import { AuthorizationResponse } from '../types/authorization-response';

const UserService = {
  async login(email: string, password: string): Promise<AxiosResponse<AuthorizationResponse>> {
    return api.post<AuthorizationResponse>('/users/login', { email, password });
  },

  async registration(email: string, password: string): Promise<AxiosResponse<AuthorizationResponse>> {
    return api.post<AuthorizationResponse>('/users/registration', { email, password });
  },

  async logout(): Promise<AxiosResponse<AuthorizationResponse>> {
    return api.post('/users/logout');
  },
};

export default UserService;
