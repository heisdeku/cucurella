import {createMutation} from 'react-query-kit';
import type {AxiosError} from 'axios';
import {client, queryClient} from '../common';

type Variables = any;

export const useAddImage = createMutation<Response, Variables, AxiosError>({
  mutationFn: async variables => {
    return client({
      url: `/user/profile/image`,
      method: 'POST',
      data: variables,
    }).then(response => response?.data);
  },
  onSuccess: async data => {
    queryClient.invalidateQueries({queryKey: ['/user/profile']});
  },
  onError: async error => {
    console.log('something went wrong via updating', error);
  },
});
