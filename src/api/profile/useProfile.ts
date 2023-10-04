import type {AxiosError} from 'axios';
import {createQuery} from 'react-query-kit';
import {client} from '../common';
import {IUser} from '@store/UserStore';

type Response = IUser;
type Variables = void;

export const useProfile = createQuery<Response, Variables, AxiosError>({
  primaryKey: '/user/profile',
  queryFn: async ({queryKey: [primaryKey]}) => {
    const response = await client.get(`${primaryKey}`);
    return response.data?.data;
  },
});
