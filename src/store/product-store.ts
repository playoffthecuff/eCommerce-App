import { makeAutoObservable, runInAction } from 'mobx';
import { Country, productsService } from '../utils/product-service';
// import { Product } from '../types/types';
import { BootState } from '../enums';

class ProductsStore {
  private _products: Country[] = [];

  private _state: BootState = BootState.None;

  private _error: string | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  public get products(): Country[] {
    if (this._state === BootState.None) {
      this.loadProducts();
    }
    console.log(this._products);
    return this._products;
  }

  public get productsState(): BootState {
    return this._state;
  }

  public get error(): string | undefined {
    return this._error;
  }

  private async loadProducts(): Promise<void> {
    this._state = BootState.InProgress;
    this._error = undefined;

    const [products, error] = await productsService.loadProducts();

    if (error) {
      this._state = BootState.Failed;
      this._error = (error as Error).toString();
      return;
    }

    runInAction(() => {
      this._products = products;
      this._state = BootState.Success;
    });
  }
}

export const productsStore = new ProductsStore();
