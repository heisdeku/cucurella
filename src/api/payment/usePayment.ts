import {useCheckoutStore} from '@store/CheckoutStore';
import type {AxiosError} from 'axios';
import {createMutation} from 'react-query-kit';
import {client} from '../common';

type Variables = {
  email: string;
  amount: string;
};
type Response = {
  status: boolean;
  message: string;
  data: {authorization_url: string; access_code: string; reference: string};
};

export const usePayment = createMutation<Response, Variables, AxiosError>({
  mutationFn: async variables => {
    return client({
      url: `/payment/initiate`,
      method: 'POST',
      data: variables,
    }).then(response => response?.data);
  },
  onSuccess: async data => {
    const {updateCheckoutDetails} = useCheckoutStore.getState();
    const {access_code, authorization_url, reference} = data?.data;
    return updateCheckoutDetails(
      access_code,
      authorization_url,
      reference,
      true,
    );
  },
  onError: async error => {
    console.log('something went wrong', error);
  },
});
