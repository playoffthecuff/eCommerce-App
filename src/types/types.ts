export interface Product {
  _id: {
    $oid: string;
  };
  category: string;
  rating: number;
  title: string;
  description: string;
  'vendor code': number;
  price: number;
  color: string;
  overview: string[];
  specs: {
    frameset: {
      Frame: string;
      Fork: string;
    };
    drivetrain: {
      'Crank Set': string;
      Chainwheel: string;
      'Bottom Bracket': string;
      Sprocket: string;
      Freewheel: string | null;
      'Rear Shifter': string;
      Chain: string;
      Pedals: string;
    };
    brakes: {
      'Front Brake': string;
      'Rear Brake': string;
      'Brake Lever': string;
    };
    components: {
      Handlebar: string;
      Stem: string;
      Headset: string;
      Grips: string;
      Saddle: string;
      'Seat Post': string;
      'Seat Clamp': string;
    };
    wheels: {
      'Front Wheel': string;
      'Rear Wheel': string;
      'Front Hub': string;
      'Rear Hub': string;
      Spokes: string;
      Rims: string;
      Tires: string;
      Tubes: string;
    };
  };
  weight: number;
  notes: {
    Specifications: string;
  };
  sizing: {
    'Small (43cm)': SizeDetails;
    'Medium (45cm)': SizeDetails;
  };
}

export interface SizeDetails {
  'Seat Tube (C-T) A': number;
  'Top Tube (Effective) B': number;
  'Head Angle C': number;
  'Seat Angle D': number;
  'Chainstay E': number;
  'BB Drop F': number;
  'Fork Offset G': number;
  'Wheel Base H': number;
  'Head Tube Length I': number;
  Standover: number;
}
