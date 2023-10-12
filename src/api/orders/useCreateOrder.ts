import {navigate} from '@stacks/helper';
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
    console.log(variables, 'variables');
    return client({
      url: `/order`,
      method: 'POST',
      data: variables,
    }).then(response => response?.data);
  },
  onSuccess: async data => {
    // navigate('Home');
    // return navigate('Success', {type: 'order'});
  },
  onError: async error => {
    console.log(
      'something went wrong via creating order',
      error?.response?.data,
    );
  },
});
