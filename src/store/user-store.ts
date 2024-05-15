import { makeAutoObservable } from 'mobx';
import axios, { AxiosError } from 'axios';
import { AuthorizationResponse, User } from '../types/authorization-response';
import UserService from '../utils/user-service';

class UserStore {
  user = {} as User;

  isAuthorized = false;

  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    this.checkAuthorization();
  }

  setAuthorized(isAuthorized: boolean) {
    this.isAuthorized = isAuthorized;
  }

  setUser(user: User) {
    this.user = user;
  }

  setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  async login(email: string, password: string) {
    try {
      const response = await UserService.login(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuthorized(true);
      this.setUser(response.data.user);
    } catch (err) {
      const error = err as AxiosError;
      const responseData: { message?: string } = error.response?.data ?? {};
      const message = responseData.message ?? 'unexplained error';
      console.log(message);
      throw Error(message);
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await UserService.registration(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuthorized(true);
      this.setUser(response.data.user);
    } catch (err) {
      const error = err as AxiosError;
      const responseData: { message?: string } = error.response?.data ?? {};
      const message = responseData.message ?? 'unexplained error';
      console.log(message);
    }
  }

  async logout() {
    try {
      await UserService.logout();
      localStorage.removeItem('token');
      this.setAuthorized(false);
      this.setUser({} as User);
    } catch (err) {
      const error = err as AxiosError;
      const responseData: { message?: string } = error.response?.data ?? {};
      const message = responseData.message ?? 'unexplained error';
      console.log(message);
    }
  }

  async checkAuthorization() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthorizationResponse>(`${import.meta.env.VITE_API_URL}/refresh`, {
        withCredentials: true,
      });
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuthorized(true);
      this.setUser(response.data.user);
    } catch (err) {
      const error = err as AxiosError;
      const responseData: { message?: string } = error.response?.data ?? {};
      const message = responseData.message ?? 'unexplained error';
      console.log(message);
    } finally {
      this.setLoading(false);
    }
  }
}

export default new UserStore();
