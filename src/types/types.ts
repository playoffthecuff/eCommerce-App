interface Note {
  Specifications: string;
}

interface SizingDetails {
  'Seat Tube': number;
  'Top Tube Horizontal': number;
  'Head Tube Angle': number;
  'Seat Angle': number;
  Chainstays: number;
  'BB-Height to Hub': number;
  'Wheel Base': number;
  'Head Tube': number;
  Reach: number;
  Stack: number;
  _id: string;
}

interface Sizing {
  [key: string]: SizingDetails;
}

interface Frameset {
  Frame: string;
  Fork: string;
}

interface Drivetrain {
  'Crank Set': string;
  Chainwheel: string;
  'Bottom Bracket': string;
  Sprocket: string | null;
  Freewheel: string | null;
  'Rear Shifter': string;
  Chain: string;
  Pedals: string;
}

interface Brakes {
  'Front Brake': string;
  'Rear Brake': string;
  'Brake Lever': string;
}

interface Components {
  Handlebar: string;
  Stem: string;
  Headset: string;
  Grips: string;
  Saddle: string;
  'Seat Post': string;
  'Seat Clamp': string;
}

interface Wheels {
  'Front Wheel': string;
  'Rear Wheel': string;
  'Front Hub': string;
  'Rear Hub': string;
  Spokes: string;
  Rims: string;
  Tires: string;
  Tubes: string;
}

interface Specs {
  frameset: Frameset;
  drivetrain: Drivetrain;
  brakes: Brakes;
  components: Components;
  wheels: Wheels;
  _id: string;
}

export interface ProductData {
  notes?: Note;
  sizing: Sizing;
  _id: string;
  category?: string;
  rating: number;
  title: string;
  description?: string;
  'vendor code'?: number;
  price: number;
  'discounted price'?: number;
  color?: string;
  overview?: string[];
  specs?: Specs;
  weight?: number;
}
export interface ProductSummary {
  price: number;
  rating: number;
  title: string;
  _id: string;
  discountedPrice?: number;
  vendorCode: number;
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

export interface Filter {
  key: string;
  value: string[] | number[];
}

export interface Sort {
  field: string;
  order: 'ASC' | 'DESC';
}

export interface Payload {
  query: string;
  filters: FiltersData;
  // sorts: Sort[];
  page: number;
  pageSize: number;
}

export enum ButtonVariety {
  COMMON = 'common',
  INVERTED = 'inverted',
  FILTERS = 'filters',
}
