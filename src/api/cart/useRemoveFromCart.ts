import type {AxiosError} from 'axios';
import {createMutation} from 'react-query-kit';
import {client, queryClient} from '../common';

type Variables = {
  productId: string;
};

type Response = {status: boolean; message: string};

export const useRemoveFromCart = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async variables => {
    return client({
      url: `/cart/${variables?.productId}`,
      method: 'DELETE',
    }).then(response => response?.data);
  },
  onSuccess: async () => {
    await queryClient.cancelQueries({queryKey: ['/cart/cart']});
    return queryClient.invalidateQueries({queryKey: ['/cart/cart']});
  },
});
