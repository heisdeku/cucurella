import {Base} from '@components/Base';
import {Text} from '@components/Text';
import {windowHeight} from '@libs/constant';
import {order_success_illustration} from '@libs/svgs';
import theme from '@libs/theme';
import {useRoute} from '@react-navigation/native';
import {navigate} from '@stacks/helper';
import {SvgXml} from 'react-native-svg';

const Success = () => {
  const params = useRoute().params;
  const getMessage = () => {
    //@ts-ignore
    switch (params?.type) {
      case 'card-added':
        return 'Your card has been added successfully';
      case 'order':
        return 'Your order has been placed successfully';
      default:
        return '';
    }
  };
  const getButtonLabel = () => {
    //@ts-ignore
    switch (params?.type) {
      case 'card-added':
        return 'Continue';
      case 'order':
        return 'Track Order';
      default:
        return '';
    }
  };
  const getButtonPress = () => {
    //@ts-ignore
    switch (params?.type) {
      case 'card-added':
        return navigate('Main');
      case 'order':
        return navigate('TrackOrder');
      default:
        return '';
    }
  };
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
          {getMessage()}
        </Text.Medium>
      </Base.View>
      <Base.View mt={'70%'} px={'18px'}>
        <Base.Button
          onPress={() => getButtonPress()}
          title={getButtonLabel()}
        />
      </Base.View>
    </Base.View>
  );
};

export default Success;
