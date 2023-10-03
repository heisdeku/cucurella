import {IOfaydProduct} from '@api/types';
import type {AxiosError} from 'axios';
import {createQuery} from 'react-query-kit';
import {client} from '../common';

type Response = IOfaydProduct;
type Variables = {productId: string};

export const useProduct = createQuery<Response, Variables, AxiosError>({
  primaryKey: '/product',
  queryFn: ({queryKey: [primaryKey, variables]}) => {
    return client
      .get(`${primaryKey}/${variables?.productId}`)
      .then(response => response.data.data);
  },
});
