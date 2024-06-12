import { autorun, makeAutoObservable, runInAction } from 'mobx';
import { cartService } from '../utils/cart-service';
import { CartItem, CartPayload } from '../types/types';
import { BootState } from '../enums';
import userStore from './user-store';

class CartStore {
  private _items: CartItem[] = [];

  private _totalItems: number = 0;

  private _totalPrice: number = 0;

  private _state: BootState = BootState.None;

  private _error: string | undefined;

  private _payload: CartPayload = {
    productId: null,
    userId: null,
    quantity: 1,
    size: 'M',
    tempCartId: null,
  };

  constructor() {
    makeAutoObservable(this);

    autorun(() => {
      const currentUser = userStore.user?.id;
      if (!currentUser) {
        this.createTempCart();
      } else {
        this.loadItems();
      }
    });
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

  public get cartState(): BootState {
    return this._state;
  }

  public get error(): string | undefined {
    return this._error;
  }

  public addToCart = async ({ userId, productId, quantity, size }: CartPayload) => {
    this._state = BootState.InProgress;
    this._error = undefined;

    this._payload.productId = productId;
    this._payload.userId = userId;
    this._payload.quantity = quantity;
    this._payload.size = size;

    const [responseData, error] = await cartService.addToCart(this._payload);

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

  public removeFromCart = async (productId: string, userId: string | undefined, tempCartId: string | null) => {
    this._state = BootState.InProgress;
    this._error = undefined;

    const [responseData, error] = await cartService.removeFromCart({ productId, userId, tempCartId });

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

  public isInCart = (productId: string): boolean => {
    return this._items.some((item) => item.productId === productId);
  };

  public loadItems = async (): Promise<void> => {
    this._state = BootState.InProgress;
    this._error = undefined;

    this._payload.userId = userStore.user?.id || null;
    this._payload.tempCartId = localStorage.getItem('temp_cart_id');

    const [responseData, error] = await cartService.loadItems(this._payload);

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

  public createTempCart = async () => {
    this._state = BootState.InProgress;
    this._error = undefined;

    let tempCartId = localStorage.getItem('temp_cart_id');

    if (!tempCartId) {
      const [responseData, error] = await cartService.createTempCart();

      if (error) {
        this._state = BootState.Failed;
        this._error = (error as Error).toString();
        return;
      }

      tempCartId = responseData._id;
      localStorage.setItem('temp_cart_id', tempCartId);
      this._payload.tempCartId = tempCartId;
      this.loadItems();
    }

    this._payload.tempCartId = tempCartId;
  };

  public mergeCarts = async (tempCartId: string, userId: string) => {
    this._state = BootState.InProgress;
    this._error = undefined;

    const [responseData, error] = await cartService.mergeCarts(userId, tempCartId);

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
