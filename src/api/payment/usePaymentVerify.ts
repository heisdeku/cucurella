import {useCheckoutStore} from '@store/CheckoutStore';
import type {AxiosError} from 'axios';
import {createMutation} from 'react-query-kit';
import {client} from '../common';
import type {IPaymentVerifyData} from './types';

type Variables = {
  reference: string;
};
type Response = {
  status: boolean;
  message: string;
  data: IPaymentVerifyData;
};

export const usePaymentVerify = createMutation<Response, Variables, AxiosError>(
  {
    mutationFn: async variables => {
      const url = `/payment/verify/${variables?.reference}`;
      return client({
        url: url,
        method: 'GET',
      }).then(response => response?.data);
    },
    onSuccess: async data => {
      const {updateCheckoutDetails} = useCheckoutStore.getState();
      updateCheckoutDetails('', '', '', false);
    },
    onError: async error => {
      console.log('something went wrong', error);
    },
  },
);
