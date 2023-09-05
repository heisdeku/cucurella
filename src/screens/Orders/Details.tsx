import {Base} from '@components/Base';
import {Text} from '@components/Text';
import {arrowRight, linear_call, mdiLocation} from '@libs/svgs';
import theme from '@libs/theme';
import {goBack, navigate} from '@stacks/helper';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
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
const OrderDetails = () => {
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
          #Order346HYT
        </Text.Medium>
        <Base.View width={'10%'} />
      </Base.Row>
      <ScrollArea>
        <Base.View mt={'16px'} px={'24px'} backgroundColor={theme.colors.white}>
          <Base.Row
            py={'16px'}
            borderBottomWidth={'1px'}
            borderBottomColor={theme.colors.neutral03}
            mb={'6px'}
            alignItems={'flex-end'}
            justifyContent={'space-between'}>
            <Base.Row width={'50%'} alignItems={'flex-start'}>
              <Base.View
                backgroundColor={theme.colors.greenRandom}
                width={'32px'}
                height={'32px'}
                justifyContent={'center'}
                alignItems={'center'}
                borderRadius={'40px'}
                mr={'8px'}>
                <SvgXml xml={mdiLocation} width={16} height={16} />
              </Base.View>
              <Base.View>
                <Text.Medium fontSize={'16px'} color={theme.colors.dark}>
                  Address
                </Text.Medium>
                <Text.General
                  fontFamily="300"
                  fontSize={'14px'}
                  color={theme.colors.neutral06}>
                  28b empire homes estate chevron alternative lekki
                </Text.General>
              </Base.View>
            </Base.Row>
          </Base.Row>
          <Base.Row py={'16px'} alignItems={'flex-end'}>
            <Base.Row alignItems={'flex-start'}>
              <Base.View
                backgroundColor={theme.colors.greenRandom}
                width={'32px'}
                height={'32px'}
                justifyContent={'center'}
                alignItems={'center'}
                borderRadius={'40px'}
                mr={'8px'}>
                <SvgXml xml={linear_call} width={16} height={16} />
              </Base.View>
              <Base.View>
                <Text.Medium fontSize={'16px'} color={theme.colors.dark}>
                  Phone Number
                </Text.Medium>
                <Text.General
                  fontFamily="300"
                  fontSize={'14px'}
                  color={theme.colors.neutral06}>
                  0705678990
                </Text.General>
              </Base.View>
            </Base.Row>
          </Base.Row>
        </Base.View>
        <Base.View
          mt={'16px'}
          py={'16px'}
          px={'24px'}
          backgroundColor={theme.colors.white}>
          <Text.Medium color={theme.colors.dark} fontSize={'16px'}>
            Payment method
          </Text.Medium>
          <Text.General
            mt={'8px'}
            color={theme.colors.neutral07}
            fontSize={'14px'}>
            Debit Card
          </Text.General>
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
          title="Repeat Order"
          onPress={() => navigate('ConfirmDetails')}
        />
      </Base.View>
    </Base.View>
  );
};

const ScrollArea = styled.ScrollView``;

export default OrderDetails;
