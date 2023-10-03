import {useCategory} from '@api/category';
import {usePromotion} from '@api/promotions';
import {Base} from '@components/Base';
import CartViewWrapper from '@components/CartContainer';
import {OfaydProduct} from '@components/OfaydProduct';
import {Text} from '@components/Text';
import withBottomDrawer from '@components/withBottomDrawer';
import {IDrawerChildProps} from '@components/withBottomDrawer/helper';
import {arrowRight} from '@libs/svgs';
import theme from '@libs/theme';
import {useRoute} from '@react-navigation/native';
import {goBack} from '@stacks/helper';
import {ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';

export interface ICategoryRouteParam {
  name: string;
  id: string;
  description: string;
}

const CategoryScreen: React.FC<IDrawerChildProps> = () => {
  const {id, name, description} = useRoute()?.params as ICategoryRouteParam;
  const {data, isLoading, isError} = useCategory({
    variables: {categoryId: id},
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
              {description}
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
              {data?.products?.map((product, i) => {
                const productDetails = product;
                return <OfaydProduct {...productDetails} key={i} />;
              })}
            </Base.Row>
          )}
        </Base.View>
      </ScrollView>
    </CartViewWrapper>
  );
};

export default withBottomDrawer(CategoryScreen);
