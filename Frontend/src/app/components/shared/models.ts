export interface Order {
  customer_id: string;
  customer_name: string;
  tailor_id: string;
  status: string;
  design: Array<string>;
  customer_sizes: {
    chest: number;
    armLength: number;
    waist: number;
    hight: number;
    inseam: number;
    shoulder: number;
    collar: number;
    sleeve: number;
  };
}

export interface Customer {
  email: String;
  phone: String;
  name: String;
  password: String;
}

export interface User {
  email: String;
  password: String;
}

export interface Tailor {}
export interface Comment {}
