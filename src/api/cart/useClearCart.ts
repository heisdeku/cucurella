import type {AxiosError} from 'axios';
import {createMutation} from 'react-query-kit';
import {client, queryClient} from '../common';

type Variables = void;

type Response = {status: boolean; message: string};

export const useClearCart = createMutation<Response, Variables, AxiosError>({
  mutationFn: async () => {
    return client({
      url: `/cart`,
      method: 'DELETE',
    }).then(response => response?.data);
  },
  onSuccess: async data => {
    console.log('success', data);
    await queryClient.cancelQueries({queryKey: ['/cart/cart']});
    return queryClient.invalidateQueries({queryKey: ['/cart/cart']});
  },
  onError: async e => {
    console.log(e?.response?.data);
  },
});