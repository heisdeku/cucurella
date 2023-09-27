import {Fragment} from 'react';
import {Base} from './Base';
import {Text} from './Text';
import theme from '@libs/theme';
import {TouchableOpacity} from 'react-native';

//@ts-ignore
const CartViewWrapper = ({children}) => {
  return (
    <Fragment>
      {children}
      {false && (
        <Base.View top={'89%'} position={'absolute'} width={'90%'} left={'5%'}>
          <TouchableOpacity activeOpacity={0.8}>
            <Base.Row
              borderRadius={'8px'}
              py={'16px'}
              px={'24px'}
              backgroundColor={theme.colors.green07}>
              <Text.Medium color={theme.colors.white} fontSize={'16px'}>
                Checkout (1item)
              </Text.Medium>
              <Text.Medium
                fontSize={'16px'}
                color={theme.colors.white}
                lineHeight={'20px'}>
                ₦200,000,50.00
              </Text.Medium>
            </Base.Row>
          </TouchableOpacity>
        </Base.View>
      )}
    </Fragment>
  );
};

export default CartViewWrapper;
