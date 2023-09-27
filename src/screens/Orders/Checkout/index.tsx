import {Base} from '@components/Base';
import ScreenHeader from '@components/ScreenHeader';
import {Text} from '@components/Text';
import {windowHeight} from '@libs/constant';
import {add_icon, minus_icon} from '@libs/svgs';
import theme from '@libs/theme';
import {navigate} from '@stacks/helper';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {styled} from 'styled-components/native';

export interface IOrder {}
const Order: React.FC<IOrder> = () => {
  const [amount, setAmount] = useState(1);
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
              uri: 'https://res.cloudinary.com/heisdeku/image/upload/v1692820452/ofayd-mocks/ymjrrmeofornej3m6u1s.png',
            }}
            resizeMethod="auto"
            resizeMode="cover"
          />
          <Base.View>
            <Text.Medium lineHeight={'16px'} fontSize={'16px'}>
              Mangoes
            </Text.Medium>
            <Text.General color={theme.colors.neutral06} fontSize={'12px'}>
              10kg
            </Text.General>
            <Text.General
              color={theme.colors.neutral07}
              fontSize={'14px'}
              fontFamily="500"
              mt={'5.5px'}>
              ₦200
            </Text.General>
          </Base.View>
        </Base.Row>
        <TouchableOpacity>
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
        <RangeButton onPress={() => setAmount(amount === 0 ? 0 : amount - 1)}>
          <SvgXml xml={minus_icon} />
        </RangeButton>
        <Text.Medium fontSize={'12px'} mx={'7.65px'}>
          {amount}
        </Text.Medium>
        <RangeButton onPress={() => setAmount(amount + 1)}>
          <SvgXml xml={add_icon} />
        </RangeButton>
      </Base.Row>
    </Base.Row>
  );
};

const Checkout = () => {
  return (
    <Base.View>
      <ScreenHeader label="Checkout" />
      <OrderList>
        {new Array(Math.floor(Math.random() * 6)).fill('order').map((_, i) => {
          return <Order key={i} />;
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
`;
const OrderList = styled.ScrollView`
  height: ${windowHeight - 200}px;
  padding: 16px 20px;
`;

export default Checkout;
