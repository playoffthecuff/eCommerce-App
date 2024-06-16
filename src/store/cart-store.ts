import { autorun, makeAutoObservable, runInAction } from 'mobx';
import { cartService } from '../utils/cart-service';
import { CartItem } from '../types/types';
import { BootState } from '../enums';
import { formatPrice } from '../utils/format-price';
import userStore from './user-store';

class CartStore {
  private _items: CartItem[] = [];

  private _totalItems: number = 0;

  private _totalPrice: number = 0;

  private _state: BootState = BootState.None;

  private _error: string | undefined;

  constructor() {
    makeAutoObservable(this);

    autorun(() => {
      const currentUser = userStore.user?.id;
      if (!currentUser) {
        this.createTempCart();
      } else {
        runInAction(() => {
          this.loadItems();
        });
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

  public get cartState(): BootState {
    return this._state;
  }

  public get error(): string | undefined {
    return this._error;
  }

  public addToCart = async ({
    productId,
    size,
    quantity = 1,
  }: {
    productId: string;
    size: CartItem['size'];
    quantity?: number;
  }) => {
    this._state = BootState.InProgress;
    this._error = undefined;

    const [resp, error] = await cartService.addToCart({
      userId: userStore.user?.id,
      tempCartId: this.getCurrentTempCartID(),
      productId,
      size,
      quantity,
    });

    if (error) {
      this._state = BootState.Failed;
      this._error = (error as Error).toString();
      return;
    }

    runInAction(() => {
      this._items = resp.items;
      this._totalItems = resp.totalItems;
      this._totalPrice = formatPrice(resp.totalPrice);
      this._state = BootState.Success;
    });
  };

  public removeFromCart = async (productId: string, size: CartItem['size']) => {
    this._state = BootState.InProgress;
    this._error = undefined;

    const [resp, error] = await cartService.removeFromCart({
      userId: userStore.user?.id,
      tempCartId: this.getCurrentTempCartID(),
      productId,
      size,
    });
    if (error) {
      this._state = BootState.Failed;
      this._error = (error as Error).toString();
      return;
    }

    runInAction(() => {
      this._items = resp.items;
      this._totalItems = resp.totalItems;
      this._totalPrice = formatPrice(resp.totalPrice);
      this._state = BootState.Success;
    });
  };

  public getCartItem = (productId: string, size: CartItem['size']): CartItem | undefined => {
    return this._items.find((item) => item.productId === productId && item.size === size);
  };

  public loadItems = async (): Promise<void> => {
    const userId = userStore.user?.id;
    const tempCartId = this.getCurrentTempCartID();
    if (!userId && !tempCartId) {
      return;
    }

    this._state = BootState.InProgress;
    this._error = undefined;

    const [resp, error] = await cartService.loadItems({
      userId: userStore.user?.id,
      tempCartId: this.getCurrentTempCartID(),
    });

    if (error) {
      this._state = BootState.Failed;
      this._error = (error as Error).toString();
      return;
    }

    runInAction(() => {
      this._items = resp.items;
      this._totalItems = resp.totalItems;
      this._totalPrice = formatPrice(resp.totalPrice);
      this._state = BootState.Success;
    });
  };

  public createTempCart = async () => {
    this._state = BootState.InProgress;
    this._error = undefined;

    const tempCartId = this.getCurrentTempCartID();
    if (tempCartId) {
      return;
    }

    const [resp, error] = await cartService.createTempCart();
    if (error) {
      this._state = BootState.Failed;
      this._error = (error as Error).toString();
      return;
    }

    localStorage.setItem('temp_cart_id', resp._id);
    this.loadItems();
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
      this._state = BootState.Success;
    });
  };

  public updateItemQuantity = async ({
    productId,
    quantity,
    size,
  }: {
    productId: string;
    quantity: number;
    size: CartItem['size'];
  }) => {
    this._state = BootState.InProgress;
    this._error = undefined;

    const [resp, error] = await cartService.updateItemQuantity({
      userId: userStore.user?.id,
      tempCartId: this.getCurrentTempCartID(),
      productId,
      quantity,
      size,
    });

    if (error) {
      this._state = BootState.Failed;
      this._error = (error as Error).toString();
      return;
    }

    runInAction(() => {
      this._items = resp.items;
      this._totalItems = resp.totalItems;
      this._totalPrice = formatPrice(resp.totalPrice);
      this._state = BootState.Success;
    });
  };

  getCurrentTempCartID(): string | undefined {
    return localStorage.getItem('temp_cart_id') || undefined;
  }
}

export const cartStore = new CartStore();
