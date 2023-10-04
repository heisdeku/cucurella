import type {AxiosError} from 'axios';
import {createQuery} from 'react-query-kit';
import {client} from '../common';
import {ISavedPlace} from './types';

type Response = ISavedPlace[];
type Variables = void;

export const useSavedPlaces = createQuery<Response, Variables, AxiosError>({
  primaryKey: '/user/saved-places',
  queryFn: async ({queryKey: [primaryKey]}) => {
    const response = await client.get(`${primaryKey}`);
    return response.data?.data;
  },
});
