import type {AxiosError} from 'axios';
import {createQuery} from 'react-query-kit';
import {client} from '../common';
import {ICategory} from './types';

type Response = ICategory;
type Variables = {categoryId: string};

export const useCategory = createQuery<Response, Variables, AxiosError>({
  primaryKey: `category`,
  queryFn: ({queryKey: [_, variables]}) => {
    return client
      .get(`/category/${variables?.categoryId}?products=true`)
      .then(response => response.data.data);
  },
});
