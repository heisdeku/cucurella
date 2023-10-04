import {useCheckoutStore} from '@store/CheckoutStore';
import type {AxiosError} from 'axios';
import {createMutation} from 'react-query-kit';
import {client} from '../common';

type Variables = {
  cvv: string;
  cardNumber: string;
  expirationDate: string;
  cardType: 'visa' | 'mastercard' | string;
};

type Response = {
  status: boolean;
  message: string;
  data: {authorization_url: string; access_code: string; reference: string};
};

export const useAddCard = createMutation<Response, Variables, AxiosError>({
  mutationFn: async variables => {
    return client({
      url: `/card/add`,
      method: 'POST',
      data: variables,
    }).then(response => response?.data);
  },
  onSuccess: async data => {
    console.log(data, 'add card success');
  },
  onError: async error => {
    console.log('something went wrong', error);
  },
});
