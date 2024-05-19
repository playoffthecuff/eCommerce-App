import { action, makeObservable, observable, runInAction } from 'mobx';
import { Country, countriesService } from '../utils/countries-service';
import { BootState } from '../enums';

class CountriesStore {
  private _countries: Country[] = [];

  public get countries(): Country[] {
    return this._countries;
  }

  private _state: BootState = BootState.None;

  public get state(): BootState {
    return this._state;
  }

  constructor() {
    makeObservable<CountriesStore, '_countries' | '_state'>(this, {
      _countries: observable,
      _state: observable,
      getCountries: action,
    });
  }

  public async getCountries(): Promise<void> {
    this._state = BootState.InProgress;
    let resp: Country[];
    try {
      resp = await countriesService.getCountries();
    } catch (error) {
      this._state = BootState.Failed;
      throw error;
    }
    runInAction(() => {
      this._countries = resp.sort((a, b) => a.name.localeCompare(b.name));
      this._state = BootState.Success;
    });
  }
}

export const countriesStore = new CountriesStore();
