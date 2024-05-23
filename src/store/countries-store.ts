import { makeAutoObservable, runInAction } from 'mobx';
import { Country, countriesService } from '../utils/countries-service';
import { BootState } from '../enums';

class CountriesStore {
  private _countries: Country[] = [];

  public get countries(): Country[] {
    if (this._state === BootState.None) {
      this.loadCountries();
    }
    return this._countries;
  }

  private _state: BootState = BootState.None;

  public get state(): BootState {
    return this._state;
  }

  private _error: string | undefined;

  public get error(): string | undefined {
    return this._error;
  }

  constructor() {
    makeAutoObservable(this);
  }

  private async loadCountries(): Promise<void> {
    this._state = BootState.InProgress;
    this._error = undefined;
    const [countries, error] = await countriesService.getCountries();
    if (error) {
      this._state = BootState.Failed;
      this._error = (error as Error).toString();
      return;
    }
    runInAction(() => {
      this._countries = countries.sort((a, b) => a.name.localeCompare(b.name));
      this._state = BootState.Success;
    });
  }
}

export const countriesStore = new CountriesStore();
