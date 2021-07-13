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

export interface Tailor {}
export interface Customer {}
export interface Comment {}
