import {appStorage} from '@libs/storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import type {IOfaydCart} from '@api/cart';

interface ICartStore {
  cart: IOfaydCart;
  updateCartState: (cart: IOfaydCart) => void;
  clearCart: () => void;
}

export const useCartStore = create(
  persist<ICartStore>(
    (set, get) => ({
      cart: {
        cartTotalProductQuantity: get()?.cart.cartTotalProductQuantity || 0,
        cartTotalVisibleQuantity: get()?.cart.cartTotalProductQuantity || 0,
        cartItems: [],
      },
      updateCartState: (cart: IOfaydCart) => set({cart}),
      clearCart: () =>
        set({
          cart: {
            cartItems: [],
            cartTotalProductQuantity: 0,
            cartTotalVisibleQuantity: 0,
          },
        }),
    }),
    {name: 'ofayd-cart-store', storage: createJSONStorage(() => appStorage)},
  ),
);

export const getCartTotalAmount = () => {
  const {cartItems} = useCartStore.getState().cart;
  const totalAmount = cartItems.reduce((accumulator, cartItem) => {
    const itemAmount =
      Number(cartItem?.product?.amount) * Number(cartItem?.quantity);
    const price = accumulator + itemAmount;
    return price;
  }, 0);

  return totalAmount || 0;
};

export const findProductInCart = (productIdToFind: string) => {
  const {cartItems} = useCartStore.getState().cart;
  const foundProduct = cartItems.find(
    cartItem => cartItem.productId === productIdToFind,
  );

  if (foundProduct) {
    return foundProduct; // Return the product data if found
  } else {
    return null; // Return null if the product is not found
  }
};

export const isProductPresentInCart = (productIdToCheck: string) => {
  const {cartItems} = useCartStore.getState().cart;
  return cartItems.some(cartItem => cartItem.productId === productIdToCheck);
};
