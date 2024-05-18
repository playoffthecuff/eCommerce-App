import { action, makeObservable, observable, runInAction } from 'mobx';
import axios, { AxiosError } from 'axios';
import { AuthorizationResponse, User } from '../types/authorization-response';
import UserService from '../utils/user-service';
import { BootState } from '../types/boot-state';

class UserStore {
  private _user: User = { id: null, email: null, isActivated: false };

  private _isAuthorized: boolean = false;

  private _bootState: BootState = BootState.None;

  constructor() {
    makeObservable<UserStore, '_user' | '_isAuthorized' | '_bootState' | 'checkAuthorization'>(this, {
      _user: observable,
      _isAuthorized: observable,
      _bootState: observable,
      checkAuthorization: action,
    });
    this.checkAuthorization();
  }

  public async login(email: string, password: string) {
    try {
      const response = await UserService.login(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      runInAction(() => {
        this._isAuthorized = true;
        this._user = response.data.user;
      });
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

  public async registration(email: string, password: string) {
    try {
      const response = await UserService.registration(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      runInAction(() => {
        this._isAuthorized = true;
        this._user = response.data.user;
      });
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

  public async logout() {
    try {
      await UserService.logout();
      localStorage.removeItem('token');
      runInAction(() => {
        this._isAuthorized = false;
        this._user = { id: null, email: null, isActivated: false };
      });
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

  public async checkAuthorization() {
    this._bootState = BootState.InProgress;
    try {
      const response = await axios.get<AuthorizationResponse>(`${import.meta.env.VITE_API_URL}/users/refresh`, {
        withCredentials: true,
      });
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      runInAction(() => {
        this._isAuthorized = true;
        this._user = response.data.user;
      });
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
      runInAction(() => {
        this._bootState = BootState.Success;
      });
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
