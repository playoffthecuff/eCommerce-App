export interface ProductSummary {
  price: number;
  rating: number;
  title: string;
  _id: string;
  discountedPrice?: number;
  vendorCode: number;
  thumbs: string;
}
export interface CartItem extends Omit<ProductSummary, 'rating'> {
  productId: string;
  quantity: number;
  size: 'M' | 'S' | 'L';
}

export interface CartResponseData {
  _id: string;
  userId: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  totalDiscount: number;
}

export interface ResponseData {
  products: ProductSummary[];
  total: number;
}

export type FiltersData = {
  categories?: string[];
  colors?: string[];
  rating?: number[];
  // rating?: number;
  weight?: number[];
  minPrice?: number;
  maxPrice?: number;
} | null;

export interface Sort {
  field: string;
  order: 'ASC' | 'DESC';
}

export interface Payload {
  query?: string;
  filters?: FiltersData;
  sorts?: Sort[];
  page?: number;
  pageSize?: number;
}

export interface CartPayload {
  productId?: string;
  userId?: string;
  quantity?: number;
  size?: string;
  tempCartId?: string;
}

export enum ButtonVariety {
  COMMON = 'common',
  INVERTED = 'inverted',
  FILTERS = 'filters',
}
