import { makeAutoObservable, runInAction } from 'mobx';
import { productsService } from '../utils/catalog-service';
import { FiltersData, ProductSummary, Payload } from '../types/types';
import { BootState } from '../enums';

class CatalogStore {
  private _products: ProductSummary[] = [];

  private _filters: FiltersData = {};

  private _totalPage: number = 0;

  private _state: BootState = BootState.None;

  private _error: string | undefined;

  private _payload: Payload = {
    query: '',
    filters: {},
    // sorts: [{ field: 'name', order: 'ASC' }],
    page: 1,
    pageSize: 8,
  };

  constructor() {
    makeAutoObservable(this);
  }

  public get products(): ProductSummary[] {
    if (this._state === BootState.None) {
      this.loadProducts();
      this.loadFilters();
    }

    return this._products;
  }

  public get filters(): FiltersData {
    if (this._state === BootState.None) {
      this.loadFilters();
    }

    return this._filters;
  }

  public get payload(): Payload {
    return this._payload;
  }

  public get totalPage(): number {
    return this._totalPage;
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

    const [responseData, error] = await productsService.loadProducts(this._payload);

    if (error) {
      this._state = BootState.Failed;
      this._error = (error as Error).toString();
      return;
    }

    runInAction(() => {
      this._products = responseData.products;
      this._totalPage = responseData.total;
      this._state = BootState.Success;
    });
  }

  private async loadFilters(): Promise<void> {
    this._error = undefined;

    const [filters, error] = await productsService.loadFilters();

    if (error) {
      this._state = BootState.Failed;
      this._error = (error as Error).toString();

      return;
    }

    runInAction(() => {
      this._filters = filters;
    });
  }

  public async changePage(page: number) {
    this._payload.page = page;

    const [responseData, error] = await productsService.loadProducts(this._payload);

    if (error) {
      this._state = BootState.Failed;
      this._error = (error as Error).toString();
      return;
    }

    runInAction(() => {
      this._products = responseData.products;
      this._totalPage = responseData.total;
    });
  }

  public async applyFilters(payload: Payload) {
    this._payload.filters = payload.filters;
    this._payload.query = payload.query;
    this._payload.page = 1;

    const [responseData, error] = await productsService.loadProducts(this._payload);

    if (error) {
      this._state = BootState.Failed;
      this._error = (error as Error).toString();
      return;
    }

    runInAction(() => {
      this._products = responseData.products;
      this._totalPage = responseData.total;
    });
  }

  public async resetFilters() {
    this._payload.filters = {};
    this._payload.page = 1;

    const [responseData, error] = await productsService.loadProducts(this._payload);

    if (error) {
      this._state = BootState.Failed;
      this._error = (error as Error).toString();
      return;
    }

    runInAction(() => {
      this._products = responseData.products;
      this._totalPage = responseData.total;
    });
  }
}

export const productsStore = new CatalogStore();
