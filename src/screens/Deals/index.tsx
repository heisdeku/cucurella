import {usePromotion} from '@api/promotions';
import {Base} from '@components/Base';
import CartViewWrapper from '@components/CartContainer';
import {OfaydProduct} from '@components/OfaydProduct';
import {Text} from '@components/Text';
import withBottomDrawer from '@components/withBottomDrawer';
import {IDrawerChildProps} from '@components/withBottomDrawer/helper';
import {calculateCountdown} from '@libs/helper';
import {arrowRight} from '@libs/svgs';
import theme from '@libs/theme';
import {useRoute} from '@react-navigation/native';
import {goBack} from '@stacks/helper';
import {ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';

export interface IDealRouteParam {
  name: string;
  condition: string;
  id: string;
  startDate: Date | string;
  endDate: Date | string;
}

const DealsScreen: React.FC<IDrawerChildProps> = () => {
  const {id, name, condition, startDate, endDate} = useRoute()
    ?.params as IDealRouteParam;

  const {data, isLoading} = usePromotion({
    variables: {promotionId: id},
  });

  const insets = useSafeAreaInsets();
  return (
    <CartViewWrapper>
      <Base.View
        pt={insets.top + 10 + 8}
        px={'20px'}
        backgroundColor={theme.colors.white}>
        <TouchableOpacity onPress={() => goBack()}>
          <SvgXml xml={arrowRight} />
        </TouchableOpacity>
        <Base.Row mt={'17px'} alignItems={'flex-end'} pb={'16px'}>
          <Base.View>
            <Text.Medium
              isCapitalize
              fontWeight={'700'}
              fontSize={'20px'}
              color={theme.colors.black}
              mb={'8px'}>
              {name}
            </Text.Medium>
            <Text.General
              fontWeight={'500'}
              fontSize={'16px'}
              color={theme.colors.amber07}>
              {condition}
            </Text.General>
          </Base.View>
          <Base.View>
            <Text.Medium fontSize={'16px'} textAlign={'right'}>
              Time left
            </Text.Medium>
            <Text.General
              fontSize={'14px'}
              textAlign={'right'}
              color={theme.colors.amber07}>
              {calculateCountdown(new Date(startDate), new Date(endDate))}
            </Text.General>
          </Base.View>
        </Base.Row>
      </Base.View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Base.View
          px={'20px'}
          py={'16px'}
          mt={'16px'}
          minHeight="100%"
          backgroundColor={theme.colors.white}>
          {isLoading && (
            <Base.View mt={'16px'}>
              <ActivityIndicator size={'large'} color={theme.colors.green08} />
            </Base.View>
          )}
          {!isLoading && data && (
            <Base.Row flexWrap={'wrap'}>
              {data?.map((product, i) => {
                const productDetails = product?.product;
                return <OfaydProduct {...productDetails} key={i} />;
              })}
            </Base.Row>
          )}
        </Base.View>
      </ScrollView>
    </CartViewWrapper>
  );
};

export default withBottomDrawer(DealsScreen);
