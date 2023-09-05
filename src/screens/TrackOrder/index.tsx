import {Base} from '@components/Base';
import {Text} from '@components/Text';
import {
  arrowRight,
  linear_call,
  mdiLocation,
  order_progress__tracker,
} from '@libs/svgs';
import theme from '@libs/theme';
import {goBack, navigate} from '@stacks/helper';
import {useState} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {styled} from 'styled-components/native';

const orders = [
  {
    name: '3kg chicken',
    price: '570.00',
  },
  {
    name: '3kg chicken',
    price: '570.00',
  },
  {
    name: '5kg bag of rice',
    price: '570.00',
  },
  {
    name: '3kg chicken',
    price: '570.00',
  },
  {
    name: '3kg chicken',
    price: '570.00',
  },
];
const TrackOrder = () => {
  const [method, setMethod] = useState<'wallet' | 'debit-card' | null>(null);
  return (
    <Base.View>
      <Base.Row
        pb={'16px'}
        px={'20px'}
        pt={'60px'}
        backgroundColor={theme.colors.white}
        borderBottomWidth={'1px'}
        borderBottomColor={theme.colors.neutral03}
        justifyContent={'flex-start'}
        alignItems={'center'}>
        <TouchableOpacity onPress={() => goBack()}>
          <SvgXml xml={arrowRight} />
        </TouchableOpacity>
        <Text.Medium
          mx={'auto'}
          flex={'1'}
          fontFamily={'700'}
          textAlign={'center'}>
          Track Order
        </Text.Medium>
        <Base.View width={'10%'} />
      </Base.Row>
      <ScrollArea>
        <Base.View py={'16px'} px={'24px'} backgroundColor={theme.colors.white}>
          <Text.General
            fontSize={'14px'}
            color={theme.colors.neutral06}
            mb={'4px'}>
            Estimated delivery time
          </Text.General>
          <Text.H1 lineHeight={'32.64px'} fontSize={'24px'}>
            18:42
          </Text.H1>
        </Base.View>
        <Base.View
          mt={'16px'}
          py={'16px'}
          px={'24px'}
          backgroundColor={theme.colors.white}>
          <Text.Medium color={theme.colors.black} fontSize={'20px'}>
            Order Progress
          </Text.Medium>
          <Base.Row mt={'18px'}>
            <Base.View width={'10%'}>
              <SvgXml xml={order_progress__tracker} />
            </Base.View>
            <Base.View width={'90%'}>
              <Base.Row mb={'20px'} justifyContent={'space-between'}>
                <Text.Medium
                  fontFamily="400"
                  fontSize={'14px'}
                  color={theme.colors.neutral07}>
                  Order has been confirmed
                </Text.Medium>
                <Text.Medium
                  fontFamily="400"
                  fontSize={'14px'}
                  color={theme.colors.neutral07}>
                  18:22
                </Text.Medium>
              </Base.Row>
              <Base.Row mb={'20px'} justifyContent={'space-between'}>
                <Text.Medium
                  fontFamily="400"
                  fontSize={'14px'}
                  color={theme.colors.neutral07}>
                  Order has being processed
                </Text.Medium>
                <Text.Medium
                  fontFamily="400"
                  fontSize={'14px'}
                  color={theme.colors.neutral07}>
                  18:23
                </Text.Medium>
              </Base.Row>
              <Base.Row mb={'20px'} justifyContent={'space-between'}>
                <Text.Medium
                  fontFamily="400"
                  fontSize={'14px'}
                  color={theme.colors.neutral07}>
                  Order has been packed
                </Text.Medium>
                <Text.Medium
                  fontFamily="400"
                  fontSize={'14px'}
                  color={theme.colors.neutral07}>
                  18:24
                </Text.Medium>
              </Base.Row>
              <Base.Row justifyContent={'space-between'}>
                <Text.Medium
                  fontFamily="400"
                  fontSize={'14px'}
                  color={theme.colors.neutral07}
                  width={'65%'}>
                  Order picked up by rider and is on the way
                </Text.Medium>
                <Text.Medium
                  fontFamily="400"
                  fontSize={'14px'}
                  color={theme.colors.neutral07}>
                  18:26
                </Text.Medium>
              </Base.Row>
            </Base.View>
          </Base.Row>
        </Base.View>
        <Base.View
          mt={'16px'}
          py={'16px'}
          px={'24px'}
          backgroundColor={theme.colors.white}>
          <Text.Medium color={theme.colors.black} fontSize={'20px'}>
            Rider details
          </Text.Medium>
          <Base.Row
            mt={'12.5px'}
            justifyContent={'flex-start'}
            alignItems={'center'}>
            <RiderImage
              source={{
                uri: 'https://res.cloudinary.com/heisdeku/image/upload/v1693918981/jwtwpubur07ekvnoxgkv.png',
              }}
            />
            <Text.General
              ml={'10px'}
              fontFamily="500"
              color={theme.colors.black}
              fontSize={'16px'}>
              Tess Ogan
            </Text.General>
          </Base.Row>
        </Base.View>

        <Base.View
          mt={'16px'}
          px="18px"
          pt={'22px'}
          backgroundColor={theme.colors.white}>
          <Text.Medium mb={'13px'} color={theme.colors.dark} fontSize={'20px'}>
            Order Details
          </Text.Medium>
          <Base.View mb={'24px'}>
            {orders.map((order, i) => {
              return (
                <Base.Row key={i} py={'4px'}>
                  <Text.General
                    color={theme.colors.neutral06}
                    fontSize={'14px'}
                    fontFamily="500">
                    {order.name}
                  </Text.General>
                  <Text.Medium color={theme.colors.neutral08} fontSize={'14px'}>
                    ₦{order.price}
                  </Text.Medium>
                </Base.Row>
              );
            })}
          </Base.View>
          <Base.View>
            <Base.Row mb={'11px'}>
              <Text.General
                color={theme.colors.black}
                fontSize={'14px'}
                fontFamily="500">
                Subtotal
              </Text.General>
              <Text.Medium color={theme.colors.neutral07} fontSize={'14px'}>
                ₦200,000,000,000
              </Text.Medium>
            </Base.Row>
            <Base.Row mb={'11px'}>
              <Text.General
                color={theme.colors.black}
                fontSize={'14px'}
                fontFamily="500">
                Discount
              </Text.General>
              <Text.Medium color={theme.colors.neutral07} fontSize={'14px'}>
                ₦200
              </Text.Medium>
            </Base.Row>
            <Base.Row mb={'11px'}>
              <Text.General
                color={theme.colors.black}
                fontSize={'14px'}
                fontFamily="500">
                Delivery Fee
              </Text.General>
              <Text.Medium color={theme.colors.neutral07} fontSize={'14px'}>
                ₦200
              </Text.Medium>
            </Base.Row>
            <Base.Row mb={'11px'}>
              <Text.General
                color={theme.colors.black}
                fontSize={'14px'}
                fontFamily="500">
                Total
              </Text.General>
              <Text.Medium color={theme.colors.neutral07} fontSize={'14px'}>
                ₦200,000,000,000
              </Text.Medium>
            </Base.Row>
          </Base.View>
        </Base.View>
      </ScrollArea>
      <Base.View
        mt={'auto'}
        pt="20px"
        pb={'30px'}
        borderTopWidth={'1px'}
        borderTopColor={theme.colors.neutral03}
        backgroundColor={theme.colors.white}
        px={'20px'}>
        <Base.Button
          title="Call Rider"
          onPress={() => Alert.alert('Call Rider')}
        />
      </Base.View>
    </Base.View>
  );
};

const RiderImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 50px;
`;
const ScrollArea = styled.ScrollView``;

export default TrackOrder;
