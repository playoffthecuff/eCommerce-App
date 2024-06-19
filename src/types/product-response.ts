export type Sizing = {
  seatTube: Size;
  topTubeHorizontal: Size;
  headTubeAngle: Size;
  seatAngle: Size;
  chainstays: Size;
  bbHeightToHub: Size;
  wheelBase: Size;
  headTube: Size;
  reach: Size;
  stack: Size;
};

export type Size = {
  small: number;
  medium: number;
  large: number;
};

export type Frameset = {
  frame: string;
  fork: string;
};

export type Drivetrain = {
  crankSet: string;
  chainwheel: string;
  bottomBracket: string;
  sprocket: string;
  freewheel: string;
  rearShifter: string;
  chain: string;
  pedals: string;
};

export type Brakes = {
  frontBrake: string;
  rearBrake: string;
  brakeLever: string;
};

export type Components = {
  handlebar: string;
  stem: string;
  headset: string;
  grips: string;
  saddle: string;
  seatPost: string;
  seatClamp: string;
};

export type Wheels = {
  frontWheel: string;
  rearWheel: string;
  frontHub: string;
  rearHub: string;
  spokes: string;
  rims: string;
  tires: string;
  tubes: string;
};

export interface ProductResponse {
  notes: {
    specifications: string;
  };
  sizing?: Sizing;
  _id: string;
  category: string;
  rating: number;
  title: string;
  description: string;
  shortDescription?: string;
  vendorCode: number;
  price: number;
  discountedPrice?: number;
  color?: string;
  overview: string[];
  specs?: {
    frameset: Frameset;
    drivetrain: Drivetrain;
    brakes: Brakes;
    components: Components;
    wheels: Wheels;
  };
  weight: number;
  thumbs?: string[];
  gallery?: string[];
}

export interface ShortInfoResponse {
  _id: string;
  title: string;
  color: string;
  vendorCode: number;
}
