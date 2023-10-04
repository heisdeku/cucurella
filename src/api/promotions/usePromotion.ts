import type {AxiosError} from 'axios';
import {createQuery} from 'react-query-kit';
import {client} from '../common';
import {IPromotionProduct} from './types';

type Response = IPromotionProduct[];
type Variables = {promotionId: string};

export const usePromotion = createQuery<Response, Variables, AxiosError>({
  primaryKey: `deals`,
  queryFn: async ({queryKey: [_, variables]}) => {
    const response = await client.get(
      `/promotion/${variables?.promotionId}?products=true`,
    );
    return response.data.data;
  },
});
