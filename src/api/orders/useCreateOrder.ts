import type {AxiosError} from 'axios';
import {createMutation} from 'react-query-kit';
import {client} from '../common';
import {ICreateOrder} from './types';

type Variables = ICreateOrder;
type Response = {
  status: boolean;
  message: string;
  data: {orderId: string};
};

export const useCreateOrder = createMutation<Response, Variables, AxiosError>({
  mutationFn: async variables => {
    return client({
      url: `/order`,
      method: 'POST',
      data: variables,
    }).then(response => response?.data);
  },
  onError: async error => {
    console.error(
      'something went wrong via creating order',
      error?.response?.data,
    );
  },
});
