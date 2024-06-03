export interface ProductSummary {
  price: number;
  rating: number;
  title: string;
  _id: string;
  discountedPrice?: number;
  vendorCode: number;
  thumbs: string;
}

export interface ResponseData {
  products: ProductSummary[];
  total: number;
}

export type FiltersData = {
  categories?: string[];
  colors?: string[];
  rating?: number[];
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

export enum ButtonVariety {
  COMMON = 'common',
  INVERTED = 'inverted',
  FILTERS = 'filters',
}
