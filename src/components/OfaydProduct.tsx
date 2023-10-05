import {navigate} from '@stacks/helper';
import {useState} from 'react';
import {Base} from './Base';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {add_icon, minus_icon} from '@libs/svgs';
import {Text} from './Text';
import theme from '@libs/theme';
import {IOfaydProduct} from '@api/types';
import {useAddToCart, useManageQuantity, useRemoveFromCart} from '@api/index';
import {findProductInCart} from '@store/CartStore';
import {formatMonetaryAmount} from '@libs/helper';

export const OfaydProduct: React.FC<IOfaydProduct> = props => {
  const productInCart = findProductInCart(props?.id);

  const [stockLevel, setStockLevel] = useState(
    productInCart ? productInCart?.quantity : 0,
  );

  const {mutate: addToCart} = useAddToCart();
  const {mutate: removeFromCart} = useRemoveFromCart();
  const {mutate: manageQuantity} = useManageQuantity();

  const goToProduct = () => {
    return navigate('Product', {productId: props?.id});
  };

  const handleAddProductToCart = () => {
    setStockLevel(1);
    return addToCart({productId: props?.id, quantity: 1});
  };

  const handleDecreaseQuantity = () => {
    const newStockLevel = stockLevel === 0 ? 0 : stockLevel - 1;
    setStockLevel(newStockLevel);
    if (stockLevel === 1) {
      return removeFromCart({productId: props?.id});
    }
    return manageQuantity({
      productId: props?.id,
      type: 'decrease',
      quantity: newStockLevel,
    });
  };

  const handleIncreaseQuantity = () => {
    const newStockLevel =
      stockLevel < props?.quantity ? stockLevel + 1 : stockLevel;
    setStockLevel(newStockLevel);
    manageQuantity({
      productId: props?.id,
      type: 'increase',
      quantity: 1,
    });
  };

  return (
    <Base.View
      borderRadius={'10px'}
      borderWidth={'1px'}
      py={'8px'}
      width={'49%'}
      mb={'24px'}
      px="6px"
      borderColor={theme.colors.neutral02}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => goToProduct()}>
        <ProductImage
          source={{
            uri: props?.images[0],
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <Base.View mt={'8px'}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => goToProduct()}>
          <Text.Medium
            isCapitalize
            fontSize={'16px'}
            color={theme.colors.black12}>
            {props?.name}
          </Text.Medium>
          <Text.General fontSize={'15px'} color={theme.colors.neutral06}>
            ₦ {formatMonetaryAmount(props?.amount).figure}/kg
          </Text.General>
        </TouchableOpacity>
        {stockLevel < 1 && (
          <AddToCartButton onPress={() => handleAddProductToCart()}>
            <Text.Medium color={theme.colors.black12} fontSize={'13px'}>
              Add to Cart
            </Text.Medium>
          </AddToCartButton>
        )}
        {stockLevel > 0 && (
          <Base.Row marginTop={'11px'}>
            <RangeButton onPress={() => handleDecreaseQuantity()}>
              <SvgXml xml={minus_icon} />
            </RangeButton>
            <Text.Medium fontSize={'16px'} mx={'11px'}>
              {stockLevel}
            </Text.Medium>
            <RangeButton onPress={() => handleIncreaseQuantity()}>
              <SvgXml xml={add_icon} />
            </RangeButton>
          </Base.Row>
        )}
      </Base.View>
    </Base.View>
  );
};

const AddToCartButton = styled.TouchableOpacity`
  align-items: center;
  margin-top: 11px;
  padding: 8px 13px;
  background-color: ${theme.colors.green02};
  border-radius: 7px;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 97px;
  border-radius: 9px;
  background-color: ${theme.colors.green08};
`;

const RangeButton = styled.TouchableOpacity`
  border: 1px solid ${theme.colors.green08};
  padding: 8px;
  border-radius: 6px;
`;
