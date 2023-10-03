import type {AxiosError} from 'axios';
import {createQuery} from 'react-query-kit';
import {client} from '../common';
import {IUser} from '@store/UserStore';

type Response = IUser;
type Variables = void;

export const useProfile = createQuery<Response, Variables, AxiosError>({
  primaryKey: '/user/profile',
  queryFn: ({queryKey: [primaryKey]}) => {
    return client.get(`${primaryKey}`).then(response => response.data?.data);
  },
});
