import {goBack} from '@stacks/helper';
import type {AxiosError} from 'axios';
import {createMutation} from 'react-query-kit';
import {client, queryClient} from '../common';

type Variables = {
  description: string;
  location: {latitude: string; longitude: string; formatted_address: string};
};
type Response = {
  status: boolean;
  message: string;
  data: {id: string; userId: string; description: string; location: string};
};

export const useAddSavedPlace = createMutation<Response, Variables, AxiosError>(
  {
    mutationFn: async variables => {
      return client({
        url: '/user/save-address',
        method: 'POST',
        data: variables,
      }).then(response => response?.data);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({queryKey: ['/user/saved-places']});
      return goBack();
    },
  },
);
