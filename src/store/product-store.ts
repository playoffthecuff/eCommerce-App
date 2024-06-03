import { makeAutoObservable, runInAction } from 'mobx';
import { BootState } from '../enums';
import { ProductResponse, ShortInfoResponse } from '../types/product-response';
import { productService } from '../utils/product-service';

class ProductStore {
  private _product: ProductResponse | null = null;

  public get product(): ProductResponse | null {
    return this._product;
  }

  private _shortInfo: ShortInfoResponse[] = [];

  public get shortInfo(): ShortInfoResponse[] {
    return this._shortInfo;
  }

  private _bootState: BootState = BootState.None;

  public get bootState(): BootState {
    return this._bootState;
  }

  private _error: string | null = null;

  public get error(): string | null {
    return this._error;
  }

  constructor() {
    makeAutoObservable(this);
  }

  public async loadProduct(vc: string): Promise<void> {
    this._bootState = BootState.InProgress;
    this._error = null;

    const [response, errorMessage] = await productService.getProduct(vc);
    if (errorMessage) {
      runInAction(() => {
        this._bootState = BootState.Failed;
        this._error = errorMessage;
      });
    }
    if (response) {
      runInAction(() => {
        this._product = response.data;
        this._bootState = BootState.Success;
      });
    }
  }

  public async loadShortInfo(): Promise<void> {
    this._bootState = BootState.InProgress;
    this._error = null;

    const [response, errorMessage] = await productService.getShortInfo();
    if (errorMessage) {
      runInAction(() => {
        this._bootState = BootState.Failed;
        this._error = errorMessage;
      });
    }
    if (response) {
      runInAction(() => {
        this._shortInfo = response.data;
        this._bootState = BootState.Success;
      });
    }
  }
}

export default new ProductStore();
