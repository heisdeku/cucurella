import {useAddToCart, useManageQuantity} from '@api/index';
import {useProduct} from '@api/products';
import {Base} from '@components/Base';
import {Text} from '@components/Text';
import withBottomDrawer from '@components/withBottomDrawer';
import {DRAWER_CONSTANTS} from '@components/withBottomDrawer/constants';
import {IDrawerChildProps} from '@components/withBottomDrawer/helper';
import updateStatusBar from '@hooks/updateStatusBar';
import {formatMonetaryAmount} from '@libs/helper';
import {
  add_icon,
  arrowLeft,
  boldHeart,
  minus_icon,
  sendTwo,
  shoppingBag,
} from '@libs/svgs';
import theme from '@libs/theme';
import {useRoute} from '@react-navigation/native';
import {goBack, navigate} from '@stacks/helper';
import {findProductInCart, useCartStore} from '@store/CartStore';
import {useGlobalStore} from '@store/GlobalStore';
import {useUserStore} from '@store/UserStore';
import {Fragment, useState} from 'react';
import {ActivityIndicator, Alert, Dimensions, ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {styled} from 'styled-components/native';

const ProductScreen = ({handleOpen, handleClose}: IDrawerChildProps) => {
  const insets = useSafeAreaInsets();
  updateStatusBar('light-content');

  const params = useRoute().params as {productId: string};

  const productInCart = findProductInCart(params?.productId);

  const {data, isLoading} = useProduct({
    variables: {productId: params.productId},
  });
  const {mutate: addToCart, isLoading: addIsLoading} = useAddToCart();
  const {mutate: manageQuantity, isLoading: manageIsLoading} =
    useManageQuantity();

  const [cartTotal] = useCartStore(state => [
    state.cart.cartTotalVisibleQuantity,
  ]);
  const [isLocationGranted] = useGlobalStore(state => [state.locationGranted]);
  const [currentLocation] = useUserStore(state => [state.user.currentLocation]);

  const [stockLevel, setStockLevel] = useState(
    productInCart ? productInCart?.quantity : 0,
  );

  const handleAddProductToCart = () => {
    setStockLevel(1);
    return addToCart({productId: data?.id as string, quantity: 1});
  };

  const handleQuantity = () => {
    const decreasedStockLevel = stockLevel === 0 ? 0 : stockLevel - 1;
    const increasedStockLevel =
      stockLevel < (data?.quantity as number) ? stockLevel + 1 : stockLevel;

    return manageQuantity({
      productId: params?.productId,
      type:
        stockLevel > (productInCart?.quantity as number)
          ? 'increase'
          : 'decrease',
      quantity:
        stockLevel > (productInCart?.quantity as number)
          ? increasedStockLevel
          : decreasedStockLevel,
    });
  };

  const handleButtonPress = () => {
    stockLevel > 0 ? handleQuantity() : handleAddProductToCart();
  };

  return (
    <Base.View
      height={Dimensions.get('screen').height}
      backgroundColor={theme.colors.white}>
      <ProductImage
        source={{
          uri: data?.images[0],
        }}>
        <Base.Row px={'20px'} pt={insets.top + 18}>
          <Button onPress={() => goBack()}>
            <SvgXml xml={arrowLeft} />
          </Button>
          {Number(cartTotal) > 0 && (
            <Button onPress={() => navigate('OrderCheckout')}>
              <Base.View
                position={'absolute'}
                zIndex={2}
                borderRadius={'999px'}
                top={'-5px'}
                right={'-5px'}
                width={'17.5px'}
                height={'17.5px'}
                justifyContent={'center'}
                alignItems={'center'}
                backgroundColor={theme.colors.goldenYellow}>
                <Text.General fontFamily="700" fontSize={'8.75px'}>
                  {cartTotal}
                </Text.General>
              </Base.View>
              <SvgXml xml={shoppingBag} />
            </Button>
          )}
        </Base.Row>
      </ProductImage>
      {isLoading && (
        <Base.View mt={'32px'}>
          <ActivityIndicator size={'large'} color={theme.colors.green08} />
        </Base.View>
      )}
      {!isLoading && (
        <Fragment>
          <ScrollView style={{backgroundColor: theme.colors.white}}>
            <Base.View p={'20px'}>
              <Base.Row alignItems={'flex-start'}>
                <Base.View>
                  <Text.General
                    isCapitalize
                    fontSize={'24px'}
                    color={theme.colors.black}
                    fontWeight="500"
                    lineHeight={'30px'}>
                    {data?.name}
                  </Text.General>
                  <Text.General
                    fontSize={'14px'}
                    lineHeight={'17.5px'}
                    my={'7px'}
                    color={theme.colors.neutral07}>
                    Over 200 pieces sold
                  </Text.General>
                  <Text.General
                    mb={'16px'}
                    lineHeight={'17.5px'}
                    fontSize={'14px'}
                    color={theme.colors.neutral07}>
                    1 gram = 1 peice
                  </Text.General>
                  <UnderlinedButton
                    onPress={() => Alert.alert('You need to message support')}>
                    <Text.General
                      lineHeight={'20px'}
                      fontSize={'16px'}
                      style={{textDecorationLine: 'underline'}}
                      color={theme.colors.neutral07}>
                      Get more details
                    </Text.General>
                  </UnderlinedButton>
                </Base.View>
                {/* <LikeProductButton>
                  <SvgXml xml={boldHeart} />
                </LikeProductButton> */}
              </Base.Row>
              <Base.View mt={'24px'}>
                <Text.General fontSize={'18px'} lineHeight={'22.5px'}>
                  Description
                </Text.General>
                <Text.Small fontSize={'16px'} lineHeight={'20px'} mt={'8px'}>
                  {data?.description}{' '}
                  {data?.tags && `, tags: ${JSON.stringify(data?.tags)}`}
                </Text.Small>
              </Base.View>
              <Base.View mt={'24px'}>
                <Text.General fontSize={'18px'} lineHeight={'22.5px'}>
                  Delivery details
                </Text.General>
                <Text.Small
                  mb={'8px'}
                  fontSize={'16px'}
                  lineHeight={'20px'}
                  mt={'8px'}>
                  {JSON.parse(currentLocation as string)?.formatted_address}
                </Text.Small>
                <UnderlinedButton
                  onPress={() => {
                    isLocationGranted
                      ? handleOpen?.(DRAWER_CONSTANTS.locationSet)
                      : handleOpen?.(DRAWER_CONSTANTS.location);
                  }}>
                  <Text.General
                    lineHeight={'20px'}
                    fontSize={'16px'}
                    style={{textDecorationLine: 'underline'}}
                    color={theme.colors.neutral07}>
                    Change Delivery Address
                  </Text.General>
                </UnderlinedButton>
              </Base.View>
              <ShareProductButton>
                <Base.Row mx={'auto'}>
                  <SvgXml xml={sendTwo} />
                  <Text.General ml={'8px'} color={theme.colors.neutral08}>
                    Share Product
                  </Text.General>
                </Base.Row>
              </ShareProductButton>
            </Base.View>
          </ScrollView>
          <Base.View
            borderTopWidth={'1px'}
            borderTopColor={theme.colors.neutral03}
            pt={'16px'}
            pb={'50px'}
            px={'20px'}>
            <Base.Row>
              {stockLevel > 0 && (
                <Base.Row marginRight={'8px'}>
                  <RangeButton
                    onPress={() => {
                      setStockLevel(stockLevel === 0 ? 0 : stockLevel - 1);
                    }}>
                    <SvgXml xml={minus_icon} />
                  </RangeButton>
                  <Text.General fontSize={'16px'} mx={'11px'}>
                    {stockLevel}
                  </Text.General>
                  <RangeButton onPress={() => setStockLevel(stockLevel + 1)}>
                    <SvgXml xml={add_icon} />
                  </RangeButton>
                </Base.Row>
              )}
              <Base.Button
                title={
                  stockLevel > 0
                    ? `Add ₦${
                        formatMonetaryAmount(
                          (data?.amount as number) * stockLevel,
                        )?.formattedValue
                      }`
                    : 'Add to cart'
                }
                flex={'1'}
                onPress={() => handleButtonPress()}
                height={stockLevel > 0 ? '48px' : '60px'}
                isLoading={addIsLoading || manageIsLoading}
              />
            </Base.Row>
          </Base.View>
        </Fragment>
      )}
    </Base.View>
  );
};

const RangeButton = styled.TouchableOpacity`
  border: 1px solid ${theme.colors.green08};
  padding: 8px;
  border-radius: 6px;
`;

const ShareProductButton = styled.TouchableOpacity`
  border-radius: 35px;
  background-color: ${theme.colors.neutral02};
  padding: 8px 12px;
  width: 155px;
  margin-top: 20px;
`;

const LikeProductButton = styled.TouchableOpacity`
  border-radius: 74px;
  background-color: ${theme.colors.neutral02};
  padding: 8px;
`;

const UnderlinedButton = styled.TouchableOpacity``;

const Button = styled.TouchableOpacity`
  background-color: ${theme.colors.black};
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 37.143px;
  position: relative;
`;

const ProductImage = styled.ImageBackground`
  width: 100%;
  height: 248px;
  background-color: ${theme.colors.green08};
`;

export default withBottomDrawer(ProductScreen);
