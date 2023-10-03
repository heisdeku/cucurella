import {Fragment, useEffect} from 'react';
import {Base} from './Base';
import {Text} from './Text';
import theme from '@libs/theme';
import {TouchableOpacity} from 'react-native';
import {useCart} from '@api/cart';
import {getCartTotalAmount, useCartStore} from '@store/CartStore';
import {navigate} from '@stacks/helper';
import {formatMonetaryAmount} from '@libs/helper';

//@ts-ignore
const CartViewWrapper = ({children}) => {
  const {data} = useCart();
  const [cart, updateCartState] = useCartStore(state => [
    state.cart,
    state.updateCartState,
  ]);

  useEffect(() => {
    if (data) {
      return updateCartState(data);
    }
  }, [data]);

  return (
    <Fragment>
      {children}
      {Number(cart?.cartTotalVisibleQuantity) > 0 && (
        <Base.View top={'89%'} position={'absolute'} width={'90%'} left={'5%'}>
          <TouchableOpacity
            onPress={() => navigate('OrderCheckout')}
            activeOpacity={0.95}>
            <Base.Row
              borderRadius={'8px'}
              py={'16px'}
              px={'24px'}
              backgroundColor={theme.colors.green07}>
              <Text.Medium color={theme.colors.white} fontSize={'16px'}>
                Checkout ({cart?.cartTotalVisibleQuantity} item)
              </Text.Medium>
              <Text.Medium
                fontSize={'16px'}
                color={theme.colors.white}
                lineHeight={'20px'}>
                ₦{formatMonetaryAmount(getCartTotalAmount())?.figure}
              </Text.Medium>
            </Base.Row>
          </TouchableOpacity>
        </Base.View>
      )}
    </Fragment>
  );
};

export default CartViewWrapper;
