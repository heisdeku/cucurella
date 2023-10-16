import type {AxiosError} from 'axios';
import {createMutation} from 'react-query-kit';
import {client, queryClient} from '../common';

type Variables = {
  shippingAddress: {
    latitude: string;
    longitude: string;
  };
};
type Response = {
  status: boolean;
  message: string;
  data: {delivery: {duration: number; distance: number}};
};

export const useEstimateDeliveryTime = createMutation<
  Response,
  Variables,
  AxiosError
>({
  mutationFn: async variables => {
    return client({
      url: `/calculate/deliveryTime`,
      method: 'POST',
      data: {shippingAddress: variables.shippingAddress},
    }).then(response => response?.data);
  },
});
