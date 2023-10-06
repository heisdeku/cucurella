import {navigate} from '@stacks/helper';
import {useAuthStore} from '@store/AuthStore';
import {useCartStore} from '@store/CartStore';

export const onLogout = async () => {
  const {logOut: authLogout} = useAuthStore.getState();
  const {clearCart} = useCartStore.getState();
  clearCart();
  await authLogout();
  return navigate('Authentication');
};
