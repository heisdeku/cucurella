import type {AxiosError} from 'axios';
import {createQuery} from 'react-query-kit';
import {client} from '../common';
import {IPromotion} from './types';

type Response = {promotions: IPromotion[]; count: number};
type Variables = void;

export const usePromotions = createQuery<Response, Variables, AxiosError>({
  primaryKey: '/promotion',
  queryFn: ({queryKey: [primaryKey]}) => {
    return client
      .get(`${primaryKey}?products=true`)
      .then(response => response.data.data);
  },
});
