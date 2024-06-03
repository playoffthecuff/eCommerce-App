import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { Address, AddressType, SignUpArg, SignUpResponse, UpdateUserArg, User } from '../types/authorization-response';
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
      this._bootState = BootState.Success;
      this._isAuthorized = true;
      this._user = updatedUser;
    });
  }

  public async addAddress(type: AddressType, addr: Omit<Address, 'id'>): Promise<void> {
    if (!this._user) return;
    const [newAddress, error] = await UserService.addAddress(this._user.id, type, addr);
    if (error) {
      this._bootState = BootState.Failed;
      throw error;
    }
    const arrWithNewAddress = this._user.addresses[`${type}Addresses`].slice();
    if (newAddress.isDefault) {
      arrWithNewAddress.forEach((item) => {
        item.isDefault = false;
      });
    }
    arrWithNewAddress.push(newAddress);
    runInAction(() => {
      this._bootState = BootState.Success;
      this._user!.addresses[`${type}Addresses`] = arrWithNewAddress;
    });
  }

  public async editAddress(type: AddressType, addr: Address): Promise<void> {
    if (!this._user) return;
    const [updatedAddress, error] = await UserService.editAddress(this._user.id, type, addr);
    if (error) {
      this._bootState = BootState.Failed;
      throw error;
    }
    const addresses = this._user.addresses[`${type}Addresses`];
    for (const address of addresses) {
      if (address.id === updatedAddress.id) {
        address.city = updatedAddress.city;
        address.street = updatedAddress.street;
        address.country = updatedAddress.country;
        address.postalCode = updatedAddress.postalCode;
        address.isDefault = updatedAddress.isDefault;
        continue;
      }
      if (updatedAddress.isDefault) {
        address.isDefault = false;
      }
    }
    runInAction(() => {
      this._bootState = BootState.Success;
      this._user!.addresses[`${type}Addresses`] = addresses.slice();
    });
  }

  public async deleteAddress(type: AddressType, addressID: string): Promise<void> {
    if (!this._user) return;
    const error = await UserService.delteAddress(this._user.id, type, addressID);
    if (error) {
      this._bootState = BootState.Failed;
      throw error;
    }
    const arrWithoutDeletedAddr = this._user.addresses[`${type}Addresses`].filter((addr) => addr.id !== addressID);
    runInAction(() => {
      this._bootState = BootState.Success;
      this._user!.addresses[`${type}Addresses`] = arrWithoutDeletedAddr;
    });
  }
}

export default new UserStore();
