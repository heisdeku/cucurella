import {ICreateOrder} from '@api/orders/types';
import {create} from 'zustand';

interface ICheckoutStore {
  access_code: string;
  authorization_url: string;
  reference: string;
  isOpen: boolean;
  orderDetails: ICreateOrder;
  updateCheckoutDetails: (
    access_code: string,
    authorization_url: string,
    reference: string,
    isOpen: boolean,
  ) => void;
  setOrderDetails: (orderDetails: ICreateOrder) => void;
}

export const useCheckoutStore = create<ICheckoutStore>((set, get) => ({
  access_code: '',
  authorization_url: '',
  reference: '',
  isOpen: false,
  orderDetails: {
    products: [],
    shippingAddress: '',
    phoneNumber: '',
    subTotalAmount: 0,
    totalAmount: 0,
    discount: 0,
    deliveryNote: '',
    paymentMethod: '',
    deliveryFee: 0,
    paymentReference: get()?.reference,
  },
  updateCheckoutDetails: (
    access_code: string,
    authorization_url: string,
    reference: string,
    isOpen: boolean,
  ) =>
    set({
      access_code: access_code,
      authorization_url: authorization_url,
      reference: reference,
      isOpen,
    }),
  setOrderDetails: (orderDetails: ICreateOrder) =>
    set({orderDetails: {...orderDetails}}),
}));
