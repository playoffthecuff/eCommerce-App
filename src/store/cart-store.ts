import { makeAutoObservable, runInAction } from 'mobx';
import { cartService } from '../utils/cart-service';
import { CartItem, CartPayload } from '../types/types';
import { BootState } from '../enums';

class CartStore {
  private _items: CartItem[] = [];

  private _totalItems: number = 0;

  private _totalPrice: number = 0;

  private _state: BootState = BootState.None;

  private _error: string | undefined;

  private _payload: CartPayload = {
    productId: '',
    userId: '',
    quantity: 0,
  };

  // private _totalPages: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  public get items(): CartItem[] {
    return this._items;
  }

  get totalItems() {
    return this._totalItems;
  }

  get totalPrice() {
    return this._totalPrice;
  }

  public get payload(): CartPayload {
    return this._payload;
  }

  public get productsState(): BootState {
    return this._state;
  }

  public get error(): string | undefined {
    return this._error;
  }

  public loadItems = async (userId: string): Promise<void> => {
    this._state = BootState.InProgress;
    this._error = undefined;

    const [responseData, error] = await cartService.loadItems(userId);

    if (error) {
      this._state = BootState.Failed;
      this._error = (error as Error).toString();
      return;
    }

    runInAction(() => {
      this._items = responseData.items;
      this._totalItems = responseData.totalItems;
      this._totalPrice = responseData.totalPrice;
      this._state = BootState.Success;
    });
  };
}

export const cartStore = new CartStore();
