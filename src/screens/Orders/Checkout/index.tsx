import {ICartItem, useManageQuantity, useRemoveFromCart} from '@api/index';
import {Base} from '@components/Base';
import ScreenHeader from '@components/ScreenHeader';
import {Text} from '@components/Text';
import updateStatusBar from '@hooks/updateStatusBar';
import {windowHeight} from '@libs/constant';
import {formatMonetaryAmount} from '@libs/helper';
import {add_icon, minus_icon} from '@libs/svgs';
import theme from '@libs/theme';
import {navigate} from '@stacks/helper';
import {useCartStore} from '@store/CartStore';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {styled} from 'styled-components/native';

const CartItem: React.FC<ICartItem> = ({...item}) => {
  updateStatusBar('dark-content');
  const [stockLevel, setStockLevel] = useState(item?.quantity);

  const {mutate: removeFromCart} = useRemoveFromCart();
  const {mutate: manageQuantity, isLoading: manageIsLoading} =
    useManageQuantity();

  const handleDecreaseQuantity = () => {
    const newStockLevel = stockLevel === 0 ? 0 : stockLevel - 1;
    setStockLevel(newStockLevel);
    if (stockLevel === 1) {
      return removeFromCart({productId: item?.product?.id});
    }
    return manageQuantity({
      productId: item?.product?.id,
      type: 'decrease',
      quantity: newStockLevel,
    });
  };

  const handleIncreaseQuantity = () => {
    const newStockLevel =
      stockLevel < item?.quantity ? stockLevel + 1 : stockLevel;
    setStockLevel(newStockLevel);
    manageQuantity({
      productId: item?.product?.id,
      type: 'increase',
      quantity: 1,
    });
  };
  return (
    <Base.Row
      borderRadius={'8px'}
      backgroundColor={theme.colors.white}
      padding={'16px'}
      mb={'16px'}
      alignItems={'flex-end'}>
      <Base.View>
        <Base.Row mb={'16px'}>
          <ProductImage
            source={{
              uri: item?.product?.images[0],
            }}
            resizeMethod="auto"
            resizeMode="cover"
          />
          <Base.View pt={'5px'}>
            <Text.Medium lineHeight={'16px'} isCapitalize fontSize={'16px'}>
              {item?.product?.name}
            </Text.Medium>
            <Text.General color={theme.colors.neutral06} fontSize={'12px'}>
              10kg
            </Text.General>
            <Text.General
              color={theme.colors.neutral07}
              fontSize={'14px'}
              fontFamily="500"
              mt={'5.5px'}>
              ₦
              {
                formatMonetaryAmount(item?.product?.amount * item?.quantity)
                  .figure
              }
            </Text.General>
          </Base.View>
        </Base.Row>
        <TouchableOpacity
          onPress={() => removeFromCart({productId: item?.product?.id})}>
          <Text.General
            fontFamily="400"
            fontSize={'12px'}
            style={{textDecorationLine: 'underline'}}
            color={theme.colors.red07}>
            Delete Item
          </Text.General>
        </TouchableOpacity>
      </Base.View>
      <Base.Row>
        <RangeButton onPress={() => handleDecreaseQuantity()}>
          <SvgXml xml={minus_icon} />
        </RangeButton>
        <Text.Medium fontSize={'12px'} mx={'7.65px'}>
          {stockLevel}
        </Text.Medium>
        <RangeButton onPress={() => handleIncreaseQuantity()}>
          <SvgXml xml={add_icon} />
        </RangeButton>
      </Base.Row>
    </Base.Row>
  );
};

const Checkout = () => {
  const [cart] = useCartStore(state => [state.cart]);
  return (
    <Base.View>
      <ScreenHeader label="Checkout" />
      <OrderList>
        {cart?.cartItems?.map((item, i) => {
          return <CartItem {...item} key={i} />;
        })}
      </OrderList>
      <Base.View px={'20px'}>
        <Base.Button
          title="Checkout"
          onPress={() => navigate('ConfirmDetails')}
        />
      </Base.View>
    </Base.View>
  );
};

const RangeButton = styled.TouchableOpacity`
  border: 1px solid ${theme.colors.green08};
  padding: 5.5px;
  border-radius: 6px;
`;

const ProductImage = styled.Image`
  width: 62px;
  height: 48px;
  border-radius: 3px;
  margin-right: 8px;
  background-color: ${theme.colors.green08};
`;
const OrderList = styled.ScrollView`
  height: ${windowHeight - 200}px;
  padding: 16px 20px;
`;

export default Checkout;
