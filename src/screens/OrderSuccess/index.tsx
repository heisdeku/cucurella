import {Base} from '@components/Base';
import Container from '@components/Container';
import {Text} from '@components/Text';
import {windowHeight} from '@libs/constant';
import {order_success_illustration} from '@libs/svgs';
import theme from '@libs/theme';
import {navigate} from '@stacks/helper';
import {SvgXml} from 'react-native-svg';

const OrderSuccess = () => {
  return (
    <Base.View
      height={windowHeight}
      pt={'44px'}
      backgroundColor={theme.colors.white}>
      <Base.View
        width={'237px'}
        pt={'40%'}
        alignItems={'center'}
        alignSelf={'center'}>
        <SvgXml xml={order_success_illustration} />
        <Text.Medium
          fontSize={'18px'}
          mx={'auto'}
          textAlign={'center'}
          mt={'44px'}
          lineHeight={'24px'}>
          Your order has been placed successfully
        </Text.Medium>
      </Base.View>
      <Base.View mt={'70%'} px={'18px'}>
        <Base.Button onPress={() => navigate('Home')} title="Track Order" />
      </Base.View>
    </Base.View>
  );
};

export default OrderSuccess;
