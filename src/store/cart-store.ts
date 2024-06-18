import { autorun, makeAutoObservable, runInAction } from 'mobx';
import { cartService } from '../utils/cart-service';
import { CartItem, Promo } from '../types/types';
import { BootState } from '../enums';
import userStore from './user-store';

class CartStore {
  private _items: CartItem[] = [];

  private _totalItems: number = 0;

  private _totalPrice: number = 0;

  private _totalDiscount: number = 0;

  private _state: BootState = BootState.None;

  private _error: string | undefined;

  private _promoCodes: Promo[] = [];

  private _promo: Promo | undefined;

  private _totalPromoDiscount: number = 0;

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
      this.getPromoCodes();
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

  get totalDiscount() {
    return this._totalDiscount;
  }

  get promo() {
    return this._promo;
  }

  get totalPromoDiscount() {
    return this._totalPromoDiscount;
  }

  get promoCodes() {
    return this._promoCodes;
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
      this._promo = resp.promo;
      this._totalItems = resp.totalItems;
      this._totalPrice = resp.totalPrice;
      this._totalDiscount = resp.totalDiscount;
      this._totalPromoDiscount = resp.totalPromoDiscount;
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
      this._promo = resp.promo;
      this._totalItems = resp.totalItems;
      this._totalPrice = resp.totalPrice;
      this._totalDiscount = resp.totalDiscount;
      this._totalPromoDiscount = resp.totalPromoDiscount;
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
      this._promo = resp.promo;
      this._totalItems = resp.totalItems;
      this._totalPrice = resp.totalPrice;
      this._totalDiscount = resp.totalDiscount;
      this._totalPromoDiscount = resp.totalPromoDiscount;
      this._state = BootState.Success;
    });
  };

  public createTempCart = async () => {
    const tempCartId = this.getCurrentTempCartID();
    if (tempCartId) {
      return;
    }

    this._error = undefined;
    this._state = BootState.InProgress;
    const [resp, error] = await cartService.createTempCart();
    if (error) {
      this._state = BootState.Failed;
      this._error = (error as Error).toString();
      return;
    }

    localStorage.setItem('temp_cart_id', resp._id);
    this._state = BootState.Success;
    this.loadItems();
  };

  public mergeCarts = async () => {
    const tmpCartID = this.getCurrentTempCartID();
    if (!userStore.user?.id || !tmpCartID) {
      return;
    }

    this._state = BootState.InProgress;
    this._error = undefined;

    const [resp, error] = await cartService.mergeCarts(userStore.user.id, tmpCartID);
    if (error) {
      this._state = BootState.Failed;
      this._error = (error as Error).toString();
      return;
    }
    localStorage.removeItem('temp_cart_id');

    runInAction(() => {
      this._items = resp.items;
      this._promo = resp.promo;
      this._totalItems = resp.totalItems;
      this._totalPrice = resp.totalPrice;
      this._totalDiscount = resp.totalDiscount;
      this._totalPromoDiscount = resp.totalPromoDiscount;
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
      this._promo = resp.promo;
      this._totalItems = resp.totalItems;
      this._totalPrice = resp.totalPrice;
      this._totalDiscount = resp.totalDiscount;
      this._totalPromoDiscount = resp.totalPromoDiscount;
      this._state = BootState.Success;
    });
  };

  async clearCart(): Promise<void> {
    this._state = BootState.InProgress;
    try {
      await cartService.clearCart({
        userId: userStore.user?.id,
        tempCartId: this.getCurrentTempCartID(),
      });
    } catch (error) {
      this._state = BootState.Failed;
      this._error = (error as Error).toString();
      return;
    }

    runInAction(() => {
      this._items = [];
      this._promo = undefined;
      this._totalItems = 0;
      this._totalPrice = 0;
      this._totalDiscount = 0;
      this._totalPromoDiscount = 0;
      this._state = BootState.Success;
    });
  }

  public getPromoCodes = async () => {
    const [promoCodes, error] = await cartService.getPromoCodes();
    if (error) {
      return;
    }
    this._promoCodes = promoCodes;
  };

  async applyPromoCode(code: string) {
    const promoCode = this._promoCodes.find((promo) => promo.code === code.toUpperCase());
    if (!promoCode) {
      throw new Error('Unknown promo code');
    }
    this._state = BootState.InProgress;
    const [resp, error] = await cartService.applyPromoCode({
      userId: userStore.user?.id,
      tempCartId: this.getCurrentTempCartID(),
      promoCodeId: promoCode._id,
    });
    if (error) {
      this._state = BootState.Failed;
      this._error = error.toString();
      throw error;
    }

    runInAction(() => {
      this._items = resp.items;
      this._promo = resp.promo;
      this._totalItems = resp.totalItems;
      this._totalPrice = resp.totalPrice;
      this._totalDiscount = resp.totalDiscount;
      this._totalPromoDiscount = resp.totalPromoDiscount;
      this._state = BootState.Success;
    });
  }

  async removePromoCode() {
    this._state = BootState.InProgress;
    const [resp, error] = await cartService.removePromoCode({
      userId: userStore.user?.id,
      tempCartId: this.getCurrentTempCartID(),
    });
    if (error) {
      this._state = BootState.Failed;
      this._error = error.toString();
      throw error;
    }

    runInAction(() => {
      this._items = resp.items;
      this._promo = undefined;
      this._totalItems = resp.totalItems;
      this._totalPrice = resp.totalPrice;
      this._totalDiscount = resp.totalDiscount;
      this._totalPromoDiscount = resp.totalPromoDiscount;
      this._state = BootState.Success;
    });
  }

  getCurrentTempCartID(): string | undefined {
    return localStorage.getItem('temp_cart_id') || undefined;
  }
}

export const cartStore = new CartStore();
