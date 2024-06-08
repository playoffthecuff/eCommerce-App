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
    quantity: 1,
    size: 'M',
  };

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

  public async addToCart({ userId, productId, quantity, size }: CartPayload) {
    if (userId) {
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

      //   const response = await axios.post('/api/cart', {
      //     userId,
      //     productId: product._id,
      //     quantity: 1,
      //   });
      //   this.items = response.data.items;
      // } else {
      //   addToLocalCart(product, 1);
      //   this.items = getLocalCart();
      // }
    } else {
      console.log('User not login');
    }
  }

  // async removeFromCart(productId, userId) {
  //   if (userId) {
  //     const response = await axios.delete('/api/cart', {
  //       data: {
  //         userId,
  //         productId,
  //       },
  //     });
  //     this.items = response.data.items;
  //   } else {
  //     removeFromLocalCart(productId);
  //     this.items = getLocalCart();
  //   }
  // }

  // async mergeLocalCartToUserCart(userId) {
  //   const localCart = getLocalCart();
  //   if (localCart.length > 0) {
  //     const response = await axios.post('/api/cart/merge', { userId, localCart });
  //     this.items = response.data.items;
  //     localStorage.removeItem('cart'); // Очищаємо локальний кошик після перенесення
  //   }
  // }

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
