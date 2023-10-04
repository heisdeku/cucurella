import {IOfaydProduct} from '@api/types';

export interface IOrder {
  id: string;
  products: IOfaydProduct[];
  shippingAddress: string;
  packageId: string;
  phoneNumber: string;
  totalAmount: number;
  deliveryNote: string;
  deliveryFee: number;
  paymentReference: string;
  paymentProcessor: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  totalItems: number;
  userId: string;
  driverId: string | null;
  driver: string | null;
  shippingMethod: string;
  created_at: Date | string;
  updated_at: Date | string;
  subTotalAmount: number;
  discount: number;
}

export interface ICreateOrder {
  products: {
    productId: string;
    quantity: number;
  }[];
  shippingAddress: string;
  phoneNumber: string;
  subTotalAmount: number;
  totalAmount: number;
  discount: number;
  deliveryNote: string;
  paymentMethod: 'card' | 'wallet' | 'online' | string;
  deliveryFee: number;
  paymentReference: string;
}
