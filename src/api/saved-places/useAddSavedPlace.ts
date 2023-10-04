import {goBack} from '@stacks/helper';
import type {AxiosError} from 'axios';
import {createMutation} from 'react-query-kit';
import {client, queryClient} from '../common';
import {IAddSavedPlaceVariable} from './types';

type Variables = IAddSavedPlaceVariable;

type Response = {
  status: boolean;
  message: string;
  data: {
    id: string;
    userId: string;
    description: string;
    location: string;
  };
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
