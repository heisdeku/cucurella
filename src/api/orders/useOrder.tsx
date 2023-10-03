import type {AxiosError} from 'axios';
import {createQuery} from 'react-query-kit';
import {client} from '../common';
import {IOrder} from './types';

type Response = {order: IOrder};
type Variables = {orderId: string};

export const useOrder = createQuery<Response, Variables, AxiosError>({
  primaryKey: 'order',
  queryFn: ({queryKey: [_, variables]}) => {
    return client
      .get(`/order/${variables?.orderId}`)
      .then(response => response.data.data);
  },
});
