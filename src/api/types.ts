export type ErrorResponse = {
  data?: any;
  errors?: any;
  message: string;
  status: 'error';
  errorMessage: string;
};

export type RequestResponse<T> = [ErrorResponse | null, T | null];

export interface IOfaydProduct {
  id: string;
  name: string;
  amount: number;
  description: string;
  images: string[];
  quantity: number;
  categoryId: string;
  rating: null | number;
  priceType: string;
  tags: null | string[];
  outOfStock: boolean;
  created_at: string;
  updated_at: string;
  sizeType: null | string;
}
