import {navigate} from '@stacks/helper';
import {useState} from 'react';
import {Base} from './Base';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {add_icon, minus_icon} from '@libs/svgs';
import {Text} from './Text';
import theme from '@libs/theme';

interface IProduct {}

export const OfaydProduct: React.FC<IProduct> = () => {
  const goToProduct = () => {
    return navigate('Product');
  };
  const [stockLevel, setStockLevel] = useState(0);
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
            uri: 'https://res.cloudinary.com/heisdeku/image/upload/v1692820452/ofayd-mocks/ymjrrmeofornej3m6u1s.png',
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <Base.View mt={'8px'}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => goToProduct()}>
          <Text.Medium fontSize={'16px'} color={theme.colors.black12}>
            Chicken
          </Text.Medium>
          <Text.General fontSize={'15px'} color={theme.colors.neutral06}>
            ₦1150.00/kg
          </Text.General>
        </TouchableOpacity>
        {stockLevel < 1 && (
          <AddToCartButton onPress={() => setStockLevel(1)}>
            <Text.Medium color={theme.colors.black12} fontSize={'13px'}>
              Add to Cart
            </Text.Medium>
          </AddToCartButton>
        )}
        {stockLevel > 0 && (
          <Base.Row marginTop={'11px'}>
            <RangeButton
              onPress={() => {
                setStockLevel(stockLevel === 0 ? 0 : stockLevel - 1);
              }}>
              <SvgXml xml={minus_icon} />
            </RangeButton>
            <Text.Medium fontSize={'16px'} mx={'11px'}>
              {stockLevel}
            </Text.Medium>
            <RangeButton onPress={() => setStockLevel(stockLevel + 1)}>
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
`;

const RangeButton = styled.TouchableOpacity`
  border: 1px solid ${theme.colors.green08};
  padding: 8px;
  border-radius: 6px;
`;
