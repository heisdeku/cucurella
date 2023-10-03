import type {AxiosError} from 'axios';
import {createQuery} from 'react-query-kit';
import {client} from '../common';
import {ICategory} from './types';

type Response = {category: ICategory[]; count: number};
type Variables = void;

export const useCategories = createQuery<Response, Variables, AxiosError>({
  primaryKey: '/category',
  queryFn: ({queryKey: [primaryKey]}) => {
    return client.get(`${primaryKey}`).then(response => response.data.data);
  },
});
