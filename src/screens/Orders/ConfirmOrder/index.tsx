import {usePayment} from '@api/payment';
import {Base} from '@components/Base';
import PaymentWebView from '@components/PaymentWebview';
import ScreenHeader from '@components/ScreenHeader';
import {Text} from '@components/Text';
import withBottomDrawer from '@components/withBottomDrawer';
import {DRAWER_CONSTANTS} from '@components/withBottomDrawer/constants';
import {IDrawerChildProps} from '@components/withBottomDrawer/helper';
import {formatMonetaryAmount} from '@libs/helper';
import {linear_call, mdiLocation, select_checkbox} from '@libs/svgs';
import theme from '@libs/theme';
import {getCartTotalAmount, useCartStore} from '@store/CartStore';
import {useCheckoutStore} from '@store/CheckoutStore';
import {useGlobalStore} from '@store/GlobalStore';
import {useUserStore} from '@store/UserStore';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {styled} from 'styled-components/native';

type PaymentTypeT = {
  onPress?: () => void;
  title: string;
  isSelected: boolean;
  typeText: string;
};

const PaymentType = ({onPress, title, isSelected, typeText}: PaymentTypeT) => {
  const cartAmount = getCartTotalAmount();
  return (
    <PaymentMethod
      onPress={() => onPress?.()}
      //@ts-ignore
      selected={isSelected}>
      <Base.Row>
        <Base.View width={'80%'}>
          <Text.Medium fontSize={'16px'} lineHeight={'24px'}>
            {title}
          </Text.Medium>
          <Text.General
            fontSize={'14px'}
            mt={'3px'}
            color={theme.colors.neutral07}
            fontFamily="400"
            lineHeight={'20px'}>
            <Text.Medium
              fontSize={'14px'}
              fontWeight={'500'}
              lineHeight={'20px'}
              color={theme.colors.neutral09}>
              NGN {formatMonetaryAmount(cartAmount).figure}
            </Text.Medium>{' '}
            {typeText}
          </Text.General>
        </Base.View>
        <TouchableOpacity>
          <SvgXml
            xml={isSelected ? select_checkbox.active : select_checkbox.inactive}
          />
        </TouchableOpacity>
      </Base.Row>
    </PaymentMethod>
  );
};

const ConfirmOrderDetails = ({handleOpen}: IDrawerChildProps) => {
  const [method, setMethod] = useState<
    'wallet' | 'debit-card' | 'online' | null
  >(null);
  const [deliveryNote, setDeliveryNote] = useState('');

  const [userCurrentLocation, userPhoneNumber, userEmail] = useUserStore(
    state => [
      state.user.currentLocation,
      state.user.phoneNumber,
      state.user.email,
    ],
  );
  const [cartItems] = useCartStore(state => [state.cart.cartItems]);
  const [isLocationGranted] = useGlobalStore(state => [state.locationGranted]);
  const [setOrderDetails] = useCheckoutStore(state => [state.setOrderDetails]);

  const {mutate, isLoading} = usePayment();

  const handlePayment = async () => {
    const cartProducts = cartItems?.map(item => ({
      productId: item?.product?.id,
      quantity: item?.quantity,
    }));
    //@ts-ignore
    setOrderDetails({
      products: cartProducts,
      //@ts-ignore
      shippingAddress: JSON.parse(userCurrentLocation),
      phoneNumber: userPhoneNumber,
      subTotalAmount: getCartTotalAmount(),
      totalAmount: getCartTotalAmount(),
      discount: 0,
      deliveryNote: deliveryNote || 'No Note',
      //@ts-ignore
      paymentMethod: method === 'wallet' ? method : 'card',
      deliveryFee: 0,
    });
    await mutate({
      amount: String(getCartTotalAmount()),
      email: userEmail,
    });
  };

  return (
    <Base.View>
      <ScreenHeader label="Confirm Order Details" />
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
            {/* #Order346HYT */}
            New Order
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
            <Base.Row width={'60%'} alignItems={'flex-start'}>
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
                  lineHeight={'17.25px'}
                  fontSize={'13px'}
                  color={theme.colors.neutral06}>
                  {JSON.parse(userCurrentLocation as string)?.formatted_address}
                </Text.General>
              </Base.View>
            </Base.Row>
            <TouchableOpacity
              onPress={() => {
                isLocationGranted
                  ? handleOpen?.(DRAWER_CONSTANTS.locationSet)
                  : handleOpen?.(DRAWER_CONSTANTS.location);
              }}>
              <Text.General
                color={theme.colors.orange07}
                fontSize={'14px'}
                style={{textDecorationLine: 'underline'}}>
                Edit Address
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
                  lineHeight={'17.25px'}
                  fontSize={'13px'}
                  color={theme.colors.neutral06}>
                  {userPhoneNumber}
                </Text.General>
              </Base.View>
            </Base.Row>
            {/* <TouchableOpacity>
              <Text.General
                color={theme.colors.orange07}
                fontSize={'14px'}
                style={{textDecorationLine: 'underline'}}>
                Edit Number
              </Text.General>
            </TouchableOpacity> */}
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
            <PaymentType
              title="Debit Card"
              typeText="will be deducted from your visa card ****890"
              isSelected={method === 'debit-card'}
              onPress={() => {
                setMethod('debit-card');
                return handleOpen?.(DRAWER_CONSTANTS.warning, {
                  type: 'no-card-detected',
                });
              }}
            />
            <PaymentType
              title="Wallet"
              typeText=" will be deducted from your wallet balance"
              isSelected={method === 'wallet'}
              onPress={() => {
                setMethod('wallet');
                return handleOpen?.(DRAWER_CONSTANTS.warning, {
                  type: 'insufficient-balance',
                });
              }}
            />
            <PaymentType
              title="Pay Online"
              typeText="would be debited from your bank account"
              isSelected={method === 'online'}
              onPress={() => {
                return setMethod('online');
              }}
            />
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
            value={deliveryNote}
            onChangeText={(text: string) => setDeliveryNote(text)}
            multiline
            placeholder="Add a note"
            placeholderTextColor={theme.colors.neutral07}
          />
        </Base.View>
        {/* order pricing */}
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
              ₦ {formatMonetaryAmount(getCartTotalAmount()).figure}
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
              ₦ {formatMonetaryAmount(0).figure}
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
              ₦{formatMonetaryAmount(0).figure}
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
              ₦ {formatMonetaryAmount(getCartTotalAmount()).figure}
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
        <Base.Button
          title="Pay now"
          disabled={!method}
          // onPress={() => navigate('Success', {type: 'order'})}
          onPress={() => handlePayment()}
          isLoading={isLoading}
        />
      </Base.View>
      <PaymentWebView />
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

const ScrollArea = styled.ScrollView``;

export default withBottomDrawer(ConfirmOrderDetails);
