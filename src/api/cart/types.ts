import {IOfaydProduct} from '@api/types';

export interface IOfaydCart {
  cartTotalProductQuantity: number;
  cartTotalVisibleQuantity: number;
  cartItems: ICartItem[];
}

export interface ICartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: IOfaydProduct;
}
