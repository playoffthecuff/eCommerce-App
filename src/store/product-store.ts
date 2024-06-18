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

  public set bootState(bootState: BootState) {
    this._bootState = bootState;
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
        this._bootState = BootState.None;
      });
    }
  }

  public addThumb = (thumb: string): void => {
    this.product?.thumbs?.push(thumb);
  };

  public addImage = (image: string): void => {
    this.product?.gallery?.push(image);
  };

  public removeThumb = (index: number): void => {
    this.product?.thumbs?.splice(index, 1);
  };

  public removeImage = (index: number): void => {
    this.product?.gallery?.splice(index, 1);
  };
}

export default new ProductStore();
