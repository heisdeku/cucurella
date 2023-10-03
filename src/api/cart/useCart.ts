import type {AxiosError} from 'axios';
import {createQuery} from 'react-query-kit';
import {IOfaydCart} from '..';
import {client} from '../common';

type Response = IOfaydCart;
type Variables = void;

export const useCart = createQuery<Response, Variables, AxiosError>({
  primaryKey: '/cart/cart',
  queryFn: ({queryKey: [primaryKey]}) => {
    return client.get(`${primaryKey}`).then(response => response.data.data);
  },
});
