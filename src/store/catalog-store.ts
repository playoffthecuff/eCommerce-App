import { makeAutoObservable, runInAction } from 'mobx';
import { productsService } from '../utils/catalog-service';
import { FiltersData, ProductSummary, Payload } from '../types/types';
import { BootState } from '../enums';

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 8;

class CatalogStore {
  private _products: ProductSummary[] = [];

  private _besSellingProducts: ProductSummary[] = [];

  private _filtersData: FiltersData = {};

  private _totalPage: number = 0;

  private _state: BootState = BootState.None;

  private _error: string | undefined;

  private _payload: Payload = {
    query: '',
    filters: {},
    sorts: [{ field: '', order: 'ASC' }],
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
  };

  public currentPage: number = DEFAULT_PAGE;

  constructor() {
    makeAutoObservable(this);
  }

  public get products(): ProductSummary[] {
    return this._products;
  }

  public get bestSellingProducts(): ProductSummary[] {
    return this._besSellingProducts;
  }

  public get filtersData(): FiltersData {
    return this._filtersData;
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

  public loadProducts = async (): Promise<void> => {
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
  };

  public loadBestSellingProducts = async (): Promise<void> => {
    this._state = BootState.InProgress;
    this._error = undefined;

    const [responseData, error] = await productsService.loadBestSellingProducts();

    if (error) {
      this._state = BootState.Failed;
      this._error = (error as Error).toString();
      return;
    }

    runInAction(() => {
      this._besSellingProducts = responseData.products;
      this._state = BootState.Success;
    });
  };

  public loadFiltersData = async (): Promise<void> => {
    this._error = undefined;

    const [filtersData, error] = await productsService.loadFiltersData();

    if (error) {
      this._state = BootState.Failed;
      this._error = (error as Error).toString();

      return;
    }

    runInAction(() => {
      this._filtersData = filtersData;
    });
  };

  public applyFilters = async (payload: Payload) => {
    this._payload.filters = payload.filters;
    this._payload.query = payload.query;
    this._payload.sorts = payload.sorts;
    this._payload.page = payload.page || this._payload.page;
    this._payload.pageSize = payload.pageSize || this._payload.pageSize;
    this.currentPage = this._payload.page || 1;

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
  };

  public resetFilters = async () => {
    this._payload.filters = {};
    this._payload.page = DEFAULT_PAGE;
    this.currentPage = DEFAULT_PAGE;
    this._payload.pageSize = DEFAULT_PAGE_SIZE;

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
  };
}

export const catalogStore = new CatalogStore();
