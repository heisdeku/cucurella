import {IOfaydProduct} from '@api/types';

export interface IPromotionProduct {
  id: string;
  productId: string;
  promotionId: string;
  created_at: string;
  updated_at: string;
  product: IOfaydProduct;
}

export interface IPromotion {
  id?: string;
  discountType?: string;
  name: string;
  status?: null | string;
  discountPercentage?: number;
  minimumSpent?: number;
  condition?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  products: IPromotionProduct[];
  created_at?: Date | string;
  updated_at?: Date | string;
}
