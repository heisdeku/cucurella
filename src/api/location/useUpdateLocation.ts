import type {AxiosError} from 'axios';
import {showMessage} from 'react-native-flash-message';
import {createMutation} from 'react-query-kit';
import {client, queryClient} from '../common';

type Variables = {
  userId: string;
  location: {latitude: number; longitude: number; formatted_address: string};
};
type Response = {
  status: boolean;
  message: string;
  data: {id: string; userId: string; description: string; location: string};
};

export const useUpdateUserLocation = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async variables => {
    return client({
      url: `/user/update-location/${variables?.userId}`,
      method: 'POST',
      data: {location: variables.location},
    }).then(response => response?.data);
  },
  onSuccess: async () => {
    queryClient.invalidateQueries({queryKey: ['/user/profile']});
    showMessage({message: 'Your Location has been updated', type: 'success'});
  },
});
