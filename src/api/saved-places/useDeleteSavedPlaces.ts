import type {AxiosError} from 'axios';
import {createMutation} from 'react-query-kit';
import {client, queryClient} from '../common';

type Variables = {
  placeId: string;
};

type Response = {status: boolean; message: string};

export const useDeleteSavedPlaces = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async variables => {
    return client({
      url: `/user/saved-places/delete/${variables?.placeId}`,
      method: 'DELETE',
    }).then(response => response?.data);
  },
  onSuccess: async () => {
    await queryClient.cancelQueries({queryKey: ['/user/saved-places']});
    return queryClient.invalidateQueries({queryKey: ['/user/saved-places']});
  },
  onError: async e => {
    console.log(e?.response?.data);
  },
});
