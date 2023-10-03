import {IOfaydProduct} from '@api/types';
import type {AxiosError} from 'axios';
import {createQuery} from 'react-query-kit';
import {client} from '../common';

type Response = {product: IOfaydProduct[]; count: number};
type Variables = void;

export const useProducts = createQuery<Response, Variables, AxiosError>({
  primaryKey: '/product',
  queryFn: ({queryKey: [primaryKey]}) => {
    return client.get(`${primaryKey}`).then(response => response.data.data);
  },
});
