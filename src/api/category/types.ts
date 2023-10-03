import {IOfaydProduct} from '@api/types';

export interface ICategory {
  id: string;
  name: string;
  description: string;
  thumbnails: string;
  subCategories: null | any[];
  products: IOfaydProduct[];
  created_at: Date | string;
  updated_at: Date | string;
}
