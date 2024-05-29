import { makeAutoObservable } from 'mobx';
import { Theme, getSystemTheme } from '../utils/theme';

class ThemeStore {
  private _theme: Theme = 'light';

  public get theme(): Theme {
    return this._theme;
  }

  constructor() {
    makeAutoObservable(this);
    this.setAuto();
  }

  setLight = () => {
    this._theme = 'light';
    document.documentElement.dataset.theme = 'light';
    this.saveTheme();
  };

  setDark = () => {
    this._theme = 'dark';
    document.documentElement.dataset.theme = 'dark';
    this.saveTheme();
  };

  setSystem = () => {
    const systemTheme = getSystemTheme();
    this._theme = systemTheme;
    document.documentElement.dataset.theme = systemTheme;
    this.saveTheme();
  };

  setAuto = () => {
    const theme = (localStorage.getItem('theme') as Theme) ?? getSystemTheme();
    this._theme = theme;
    document.documentElement.dataset.theme = theme;
  };

  saveTheme = () => {
    localStorage.setItem('theme', this._theme);
  };
}

export default new ThemeStore();
