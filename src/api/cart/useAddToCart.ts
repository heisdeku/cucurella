import type {AxiosError} from 'axios';
import {createMutation} from 'react-query-kit';
import {client, queryClient} from '../common';

type Variables = {productId: string; quantity: number};
type Response = {status: boolean; message: string};

export const useAddToCart = createMutation<Response, Variables, AxiosError>({
  mutationFn: async variables => {
    return client({url: '/cart', method: 'POST', data: variables}).then(
      response => response?.data,
    );
  },
  onSuccess: async () => {
    queryClient.invalidateQueries({queryKey: ['/cart/cart']});
  },
});
