import {IOfaydProduct} from '@api/types';
import {IUser} from '@store/UserStore';

export interface IDriver {
  Vehicle: string;
  acceptTermsAndCondition: boolean;
  created_at: Date | string;
  currentLocation: string;
  driverId: string | null;
  driversLicence: string;
  email: string;
  fcmToken: string | null;
  firstName: string;
  id: string;
  image: string | null;
  isAvailable: boolean;
  isSuspended: boolean;
  isVerified: boolean;
  lastName: string;
  licencePlate: string;
  onlineStatus: 'online' | 'offline';
  passportNumber: string;
  passportPicture: string | null;
  password: string;
  phoneNumber: string;
  rideStatus: boolean;
  role: string;
  shiftPreference: string | null;
  updated_at: Date | string;
  verificationCode: 'null';
  warehouseId: string | null;
}
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
  driver: IDriver;
  shippingMethod: string;
  created_at: Date | string;
  updated_at: Date | string;
  subTotalAmount: number;
  discount: number;
  orderCompletedAt: Date | string;
  orderConfirmedAt: Date | null;
  orderPackedAt: Date | null;
  orderProcessedAt: Date | null;
  orderProgress: string | null;
  user: IUser;
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
