import type {AxiosError} from 'axios';
import {createQuery} from 'react-query-kit';
import {client} from '../common';
import {IPromotionProduct} from './types';

type Response = IPromotionProduct[];
type Variables = {promotionId: string};

export const usePromotion = createQuery<Response, Variables, AxiosError>({
  primaryKey: `deals`,
  queryFn: ({queryKey: [_, variables]}) => {
    return client
      .get(`/promotion/${variables?.promotionId}?products=true`)
      .then(response => response.data.data);
  },
});
