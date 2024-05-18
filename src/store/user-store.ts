import { action, makeObservable, observable } from 'mobx';
import axios, { AxiosError } from 'axios';
import { AuthorizationResponse, User } from '../types/authorization-response';
import UserService from '../utils/user-service';

export enum BootState {
  None,
  InProgress,
  Success,
  Failed,
}

class UserStore {
  private _user: User = { id: null, email: null, isActivated: false };

  private _isAuthorized: boolean = false;

  private _bootState: BootState = BootState.None;

  constructor() {
    makeObservable<UserStore, '_user' | '_isAuthorized' | '_bootState'>(this, {
      _user: observable,
      _isAuthorized: observable,
      _bootState: observable,
      setAuthorized: action,
      setUser: action,
      setLoadingAsNone: action,
      setLoadingAsInProgress: action,
      setLoadingAsSuccess: action,
      setLoadingAsFailed: action,
    });
    this.checkAuthorization();
  }

  setAuthorized(isAuthorized: boolean) {
    this._isAuthorized = isAuthorized;
  }

  setUser(user: User) {
    this._user = user;
  }

  setLoadingAsNone() {
    this._bootState = BootState.None;
  }

  setLoadingAsInProgress() {
    this._bootState = BootState.InProgress;
  }

  setLoadingAsSuccess() {
    this._bootState = BootState.Success;
  }

  setLoadingAsFailed() {
    this._bootState = BootState.Failed;
  }

  async login(email: string, password: string) {
    try {
      const response = await UserService.login(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuthorized(true);
      this.setUser(response.data.user);
    } catch (err) {
      const error = err as AxiosError | Error;
      let message;
      if (axios.isAxiosError(error)) {
        const responseData: { message?: string } = error.response?.data ?? {};
        console.log(error.message);
        message = responseData.message ?? 'connection failed';
      } else {
        message = 'unexplained error';
      }
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
      const error = err as AxiosError | Error;
      let message;
      if (axios.isAxiosError(error)) {
        const responseData: { message?: string } = error.response?.data ?? {};
        console.log(error.message);
        message = responseData.message ?? 'connection failed';
      } else {
        message = 'unexplained error';
      }
      console.log(message);
    }
  }

  async logout() {
    try {
      await UserService.logout();
      localStorage.removeItem('token');
      this.setAuthorized(false);
      this.setUser({ id: null, email: null, isActivated: false });
    } catch (err) {
      const error = err as AxiosError | Error;
      let message;
      if (axios.isAxiosError(error)) {
        const responseData: { message?: string } = error.response?.data ?? {};
        console.log(error.message);
        message = responseData.message ?? 'connection failed';
      } else {
        message = 'unexplained error';
      }
      console.log(message);
    }
  }

  async checkAuthorization() {
    this.setLoadingAsInProgress();
    try {
      const response = await axios.get<AuthorizationResponse>(`${import.meta.env.VITE_API_URL}/users/refresh`, {
        withCredentials: true,
      });
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuthorized(true);
      this.setUser(response.data.user);
    } catch (err) {
      const error = err as AxiosError | Error;
      let message;
      if (axios.isAxiosError(error)) {
        const responseData: { message?: string } = error.response?.data ?? {};
        console.log(error.message);
        message = responseData.message ?? 'connection failed';
      } else {
        message = 'unexplained error';
      }
      console.log(message);
    } finally {
      this.setLoadingAsSuccess();
    }
  }

  get user(): User {
    return { ...this._user };
  }

  get isAuthorized() {
    return this._isAuthorized;
  }

  get bootState() {
    return this._bootState;
  }
}

export default new UserStore();
