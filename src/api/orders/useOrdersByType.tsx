import type {AxiosError} from 'axios';
import {createQuery} from 'react-query-kit';
import {client} from '../common';
import {IOrder} from './types';

type Response = {orders: IOrder[]; count: number};
type Variables = {status: 'delivered' | 'assigned' | 'ongoing' | 'pending'};

export const useOrdersByType = createQuery<Response, Variables, AxiosError>({
  primaryKey: 'orders',
  queryFn: async ({queryKey: [_, variables]}) => {
    const response = await client.get(
      `/order/user/all?status=${variables?.status}`,
    );
    return response.data.data;
  },
});
