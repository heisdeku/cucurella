import type {AxiosError} from 'axios';
import {createQuery} from 'react-query-kit';
import {client} from '../common';
import {IOrder} from './types';

type Response = {orders: IOrder[]; count: number};
type Variables = void;

export const useOrders = createQuery<Response, Variables, AxiosError>({
  primaryKey: '/order/user/all',
  queryFn: ({queryKey: [primaryKey]}) => {
    return client.get(`${primaryKey}`).then(response => response.data.data);
  },
});
