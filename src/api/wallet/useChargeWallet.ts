import type {AxiosError} from 'axios';
import {createMutation} from 'react-query-kit';
import {client, queryClient} from '../common';

type Variables = {
  amount: number;
  orderDetails: {
    products: {id: string; quantity: number}[];
    items: string[];
    deliveryNote: string;
    subtotal: string;
    discount: string;
    total: string;
    deliveryFee: string;
    description: string;
  };
  metaData?: {
    orderInformation: {
      deliveryAddress: string;
      customerName: string;
    };
  };
};

type Response = {
  status: boolean;
  message: string;
  data: {
    response: {
      amount: string;
      created_at: string;
      currency: string;
      description: null | string;
      direction: string;
      id: string;
      metaData: Record<string, any>;
      orderDetails: Record<string, any>;
      productId: null | string;
      reference: string;
      status: string;
      transactionId: string;
      transactionType: string;
      updated_at: string;
      userId: string;
    };
  };
};

export const useChargeWallet = createMutation<Response, Variables, AxiosError>({
  mutationFn: async variables => {
    return client({
      url: `/wallet/charge`,
      method: 'POST',
      data: variables,
    }).then(response => response?.data);
  },
  onSuccess: async data => {
    queryClient.invalidateQueries({queryKey: ['/user/profile']});
  },
  onError: async error => {
    console.log('something went wrong via wallet', error?.response?.data);
  },
});
