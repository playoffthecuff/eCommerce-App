import { action, makeObservable, observable, runInAction } from 'mobx';
import { SignUpArg, SignUpResponse, User } from '../types/authorization-response';
import UserService from '../utils/user-service';
import { BootState } from '../enums';

class UserStore {
  private _user: User = { id: null, email: null, isActivated: false };

  public get user(): User {
    return this._user;
  }

  private _isAuthorized: boolean = false;

  public get isAuthorized(): boolean {
    return this._isAuthorized;
  }

  private _bootState: BootState = BootState.None;

  get bootState(): BootState {
    return this._bootState;
  }

  constructor() {
    makeObservable<UserStore, '_user' | '_isAuthorized' | '_bootState'>(this, {
      _user: observable,
      _isAuthorized: observable,
      _bootState: observable,
      checkAuthorization: action,
      login: action,
      signUp: action,
      logout: action,
    });
    this.checkAuthorization();
  }

  public async login(email: string, password: string): Promise<void> {
    this._bootState = BootState.InProgress;
    const [response, errorMessage] = await UserService.login(email, password);
    if (errorMessage) {
      runInAction(() => {
        this._bootState = BootState.Failed;
      });
      throw Error(errorMessage);
    }
    if (response) {
      runInAction(() => {
        this._isAuthorized = true;
        this._user = response.data.user;
        this._bootState = BootState.Success;
      });
    }
  }

  public async signUp(arg: SignUpArg): Promise<void> {
    let resp: SignUpResponse;
    try {
      resp = await UserService.signUp(arg);
      localStorage.setItem('token', resp.accessToken);
    } catch (error) {
      this._bootState = BootState.Failed;
      throw error;
    }
    runInAction(() => {
      this._isAuthorized = true;
      this._user = resp.user;
    });
  }

  public async logout(): Promise<void> {
    this._bootState = BootState.InProgress;
    const [response, errorMessage] = await UserService.logout();
    if (errorMessage) {
      runInAction(() => {
        this._bootState = BootState.Failed;
      });
      return;
    }
    if (response) {
      runInAction(() => {
        this._isAuthorized = false;
        this._user = { id: null, email: null, isActivated: false };
        this._bootState = BootState.Success;
      });
    }
  }

  public async checkAuthorization(): Promise<void> {
    this._bootState = BootState.InProgress;
    const [response, errorMessage] = await UserService.checkAuthorization();
    if (errorMessage) {
      runInAction(() => {
        this._bootState = BootState.Failed;
      });
      return;
    }
    if (response) {
      runInAction(() => {
        this._isAuthorized = true;
        this._user = response.data.user;
        this._bootState = BootState.Success;
      });
    }
  }
}

export default new UserStore();
