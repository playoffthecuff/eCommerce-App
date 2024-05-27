import { makeAutoObservable, runInAction } from 'mobx';
import { productsService } from '../utils/product-service';
import { ProductData } from '../types/types';
import { BootState } from '../enums';

class ProductsStore {
  // private _products: Product[] = [];

  private _allProducts: ProductData[] = [];

  private _state: BootState = BootState.None;

  private _error: string | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  // public get products(): Product[] {
  //   if (this._state === BootState.None) {
  //     this.loadProducts();
  //   }
  //   return this._products;
  // }

  public get allProducts(): ProductData[] {
    if (this._state === BootState.None) {
      this.loadAllProducts();
    }

    return this._allProducts;
  }

  public get productsState(): BootState {
    return this._state;
  }

  public get error(): string | undefined {
    return this._error;
  }

  // private async loadProducts(): Promise<void> {
  //   this._state = BootState.InProgress;
  //   this._error = undefined;

  //   const [products, error] = await productsService.loadProducts();

  //   if (error) {
  //     this._state = BootState.Failed;
  //     this._error = (error as Error).toString();
  //     return;
  //   }

  //   runInAction(() => {
  //     this._products = products;
  //     this._state = BootState.Success;
  //   });
  // }

  private async loadAllProducts(): Promise<void> {
    this._state = BootState.InProgress;
    this._error = undefined;

    const [products, error] = await productsService.loadAllProducts();

    if (error) {
      this._state = BootState.Failed;
      this._error = (error as Error).toString();
      return;
    }

    runInAction(() => {
      this._allProducts = products;
      this._state = BootState.Success;
    });
  }
}

export const productsStore = new ProductsStore();
