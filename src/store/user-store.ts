import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { SignUpArg, SignUpResponse, UpdateUserArg, User } from '../types/authorization-response';
import UserService from '../utils/user-service';
import { BootState } from '../enums';

class UserStore {
  private _user: User | undefined;

  public get user(): User | undefined {
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
      user: computed,
      isAuthorized: computed,
      bootState: computed,
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
        this._user = undefined;
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

  public async update(arg: UpdateUserArg): Promise<void> {
    if (!this._user) return;
    const [updatedUser, error] = await UserService.update(this._user.id, arg);
    if (error) {
      this._bootState = BootState.Failed;
      throw error;
    }
    runInAction(() => {
      this._isAuthorized = true;
      this._user = updatedUser;
    });
  }
}

export default new UserStore();
