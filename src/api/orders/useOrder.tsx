import type {AxiosError} from 'axios';
import {createQuery} from 'react-query-kit';
import {client} from '../common';
import {IOrder} from './types';

type Response = {order: IOrder};
type Variables = {orderId: string};

export const useOrder = createQuery<Response, Variables, AxiosError>({
  primaryKey: 'order',
  queryFn: async ({queryKey: [_, variables]}) => {
    const response = await client.get(`/order/${variables?.orderId}`);
    return response.data.data;
  },
});
