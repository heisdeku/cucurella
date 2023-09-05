import {Base} from '@components/Base';
import KeyboardWrapper from '@components/KeyboardWrapper';
import {Text} from '@components/Text';
import withBottomDrawer from '@components/withBottomDrawer';
import {DRAWER_CONSTANTS} from '@components/withBottomDrawer/constants';
import {windowHeight} from '@libs/constant';
import {
  add_icon,
  arrowRight,
  linear_call,
  mdiLocation,
  minus_icon,
  select_checkbox,
} from '@libs/svgs';
import theme from '@libs/theme';
import {goBack, navigate} from '@stacks/helper';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {styled} from 'styled-components/native';

const Order = () => {
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

const ConfirmOrderDetails = ({handleOpen}) => {
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
          Confirm Order Details
        </Text.Medium>
        <Base.View width={'10%'} />
      </Base.Row>
      <ScrollArea>
        <Base.View
          mt={'16px'}
          py={'16px'}
          px={'24px'}
          backgroundColor={theme.colors.white}>
          <Text.General
            fontSize={'14px'}
            color={theme.colors.neutral07}
            mb={'4px'}>
            Order ID
          </Text.General>
          <Text.H1 lineHeight={'32.64px'} fontSize={'24px'}>
            #Order346HYT
          </Text.H1>
        </Base.View>
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
            <TouchableOpacity>
              <Text.General
                color={theme.colors.orange07}
                fontSize={'14px'}
                style={{textDecorationLine: 'underline'}}>
                Edit Number
              </Text.General>
            </TouchableOpacity>
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
            <TouchableOpacity>
              <Text.General
                color={theme.colors.orange07}
                fontSize={'14px'}
                style={{textDecorationLine: 'underline'}}>
                Edit Number
              </Text.General>
            </TouchableOpacity>
          </Base.Row>
        </Base.View>
        <Base.View
          mt={'16px'}
          py={'16px'}
          px={'24px'}
          backgroundColor={theme.colors.white}>
          <Text.Medium color={theme.colors.dark} fontSize={'16px'}>
            Select payment method
          </Text.Medium>
          <Base.View mt={'15px'}>
            <PaymentMethod
              onPress={() => {
                setMethod('debit-card');
                handleOpen(DRAWER_CONSTANTS.warning, {
                  type: 'no-card-detected',
                });
              }}
              //@ts-ignore
              selected={method === 'debit-card'}>
              <Base.Row>
                <Base.View width={'60%'}>
                  <Text.Medium fontSize={'16px'} lineHeight={'24px'}>
                    Debit Card
                  </Text.Medium>
                  <Text.General
                    fontSize={'14px'}
                    mt={'3px'}
                    color={theme.colors.neutral07}
                    fontFamily="300"
                    lineHeight={'20px'}>
                    <Text.Medium
                      fontSize={'14px'}
                      lineHeight={'20px'}
                      color={theme.colors.neutral09}>
                      NGN 50,000
                    </Text.Medium>{' '}
                    will be deducted from your visa card ****890
                  </Text.General>
                </Base.View>
                <TouchableOpacity>
                  <SvgXml
                    xml={
                      method === 'debit-card'
                        ? select_checkbox.active
                        : select_checkbox.inactive
                    }
                  />
                </TouchableOpacity>
              </Base.Row>
            </PaymentMethod>
            <PaymentMethod
              onPress={() => {
                setMethod('wallet');
                handleOpen(DRAWER_CONSTANTS.warning, {
                  type: 'insufficient-balance',
                });
              }}
              //@ts-ignore
              selected={method === 'wallet'}>
              <Base.Row>
                <Base.View width={'60%'}>
                  <Text.Medium fontSize={'16px'} lineHeight={'24px'}>
                    Wallet
                  </Text.Medium>
                  <Text.General
                    fontSize={'14px'}
                    mt={'3px'}
                    color={theme.colors.neutral07}
                    fontFamily="300"
                    lineHeight={'20px'}>
                    <Text.Medium
                      fontSize={'14px'}
                      lineHeight={'20px'}
                      color={theme.colors.neutral09}>
                      NGN 50,000
                    </Text.Medium>{' '}
                    will be deducted from your wallet balance
                  </Text.General>
                </Base.View>
                <TouchableOpacity>
                  <SvgXml
                    xml={
                      method === 'wallet'
                        ? select_checkbox.active
                        : select_checkbox.inactive
                    }
                  />
                </TouchableOpacity>
              </Base.Row>
            </PaymentMethod>
          </Base.View>
        </Base.View>
        <Base.View
          mt={'16px'}
          py={'16px'}
          px={'24px'}
          backgroundColor={theme.colors.white}>
          <Text.Medium color={theme.colors.dark} fontSize={'16px'}>
            Add Delivery note
          </Text.Medium>
          <DeliveryNoteField
            multiline
            placeholder="add a note"
            placeholderTextColor={theme.colors.neutral07}
          />
        </Base.View>
        <Base.View
          mt={'16px'}
          px="18px"
          pt={'22px'}
          backgroundColor={theme.colors.white}>
          <Base.Row mb={'11px'}>
            <Text.General
              color={theme.colors.neutral06}
              fontSize={'14px'}
              fontFamily="500">
              Subtotal
            </Text.General>
            <Text.Medium color={theme.colors.neutral08} fontSize={'14px'}>
              ₦200,000,000,000
            </Text.Medium>
          </Base.Row>
          <Base.Row mb={'11px'}>
            <Text.General
              color={theme.colors.neutral06}
              fontSize={'14px'}
              fontFamily="500">
              Discount
            </Text.General>
            <Text.Medium color={theme.colors.neutral08} fontSize={'14px'}>
              ₦200
            </Text.Medium>
          </Base.Row>
          <Base.Row mb={'11px'}>
            <Text.General
              color={theme.colors.neutral06}
              fontSize={'14px'}
              fontFamily="500">
              Delivery Fee
            </Text.General>
            <Text.Medium color={theme.colors.neutral08} fontSize={'14px'}>
              ₦200
            </Text.Medium>
          </Base.Row>
          <Base.Row mb={'11px'}>
            <Text.General
              color={theme.colors.neutral06}
              fontSize={'14px'}
              fontFamily="500">
              Total
            </Text.General>
            <Text.Medium color={theme.colors.neutral08} fontSize={'14px'}>
              ₦200,000,000,000
            </Text.Medium>
          </Base.Row>
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
        <Base.Button title="Pay now" onPress={() => navigate('OrderSuccess')} />
      </Base.View>
    </Base.View>
  );
};

const DeliveryNoteField = styled.TextInput`
  padding: 19px 16px;
  font-size: 12px;
  color: ${theme.colors.black};
  background-color: ${theme.colors.neutral01};
  border-radius: 8px;
  margin-top: 8px;
  min-height: 84px;
  border: 1px solid ${theme.colors.neutral03};
`;
const PaymentMethod = styled.TouchableOpacity`
  border-radius: 8px;
  border: 1px solid
    ${(props: any) =>
      !props.selected ? theme.colors.neutral03 : theme.colors.green07};
  background-color: ${theme.colors.white};
  padding: 8px 16px;
  margin-bottom: 12px;
`;

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
const ScrollArea = styled.ScrollView``;

export default withBottomDrawer(ConfirmOrderDetails);
