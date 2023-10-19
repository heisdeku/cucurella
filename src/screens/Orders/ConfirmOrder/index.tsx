import {useClearCart} from '@api/index';
import {useCreateOrder} from '@api/orders';
import {usePayment} from '@api/payment';
import {useChargeWallet} from '@api/wallet';
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
import {navigate} from '@stacks/helper';
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

type PaymentMethodT = 'wallet' | 'debit-card' | 'online' | null;

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
  const [method, setMethod] = useState<PaymentMethodT>(null);
  const [deliveryNote, setDeliveryNote] = useState('');

  const [
    userCurrentLocation,
    userPhoneNumber,
    userEmail,
    userWallet,
    userFirstName,
    userLastName,
  ] = useUserStore(state => [
    state.user.currentLocation,
    state.user.phoneNumber,
    state.user.email,
    state.user.wallets,
    state.user.firstName,
    state.user.lastName,
  ]);
  const [cartItems] = useCartStore(state => [state.cart.cartItems]);
  const [isLocationGranted] = useGlobalStore(state => [state.locationGranted]);
  const [setOrderDetails] = useCheckoutStore(state => [state.setOrderDetails]);

  /** mutation functions for different actions for order steps which includes: payment, charge wallet, create order and clear cart */
  const {mutate, isLoading} = usePayment();
  const {mutate: chargeMutate, isLoading: chargeIsLoading} = useChargeWallet();
  const {mutate: createOrderMutate, isLoading: createOrderLoading} =
    useCreateOrder();
  const {mutate: clearCartMutate} = useClearCart();

  const handleWalletPayment = () => {
    const walletRequest = {
      amount: Number(getCartTotalAmount()),
      orderDetails: {
        products: cartItems?.map(item => ({
          id: item?.product?.id,
          quantity: item?.quantity,
        })),
        items: cartItems?.map(item => item?.product?.name),
        deliveryNote,
        subtotal: String(getCartTotalAmount()),
        discount: '0',
        total: String(getCartTotalAmount()),
        deliveryFee: '0',
        description: `payment for ${
          cartItems?.length
        } items which includes ${cartItems
          ?.map(product => product?.product?.name)
          .join(', ')}`,
      },
      metaData: {
        orderInformation: {
          //@ts-ignore
          deliveryAddress: JSON.parse(userCurrentLocation)?.formatted_address,
          customerName: `${userFirstName} ${userLastName}`,
        },
      },
    };
    return chargeMutate(walletRequest, {
      onSuccess: () => {
        return createOrderMutate(
          {
            products: cartItems?.map(item => ({
              productId: item?.product?.id,
              quantity: item?.quantity,
            })),
            //@ts-ignore
            shippingAddress: JSON.parse(userCurrentLocation),
            phoneNumber: userPhoneNumber,
            subTotalAmount: getCartTotalAmount(),
            totalAmount: getCartTotalAmount(),
            discount: 0,
            deliveryNote: deliveryNote || 'No Note',
            //@ts-ignore
            // paymentMethod: method === 'wallet' ? method : 'card',
            paymentMethod: 'card',
            deliveryFee: 0,

            paymentReference: '',
          },
          {
            onSuccess: async data => {
              clearCartMutate();
              return navigate('Success', {
                type: 'order',
                orderId: data?.data?.orderId,
              });
            },
          },
        );
      },
    });
  };

  const handleOnlinePayment = async () => {
    return mutate({
      amount: String(getCartTotalAmount()),
      email: userEmail,
    });
  };

  const handlePayment = () => {
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
      // paymentMethod: method === 'wallet' ? method : 'card',
      paymentMethod: 'card',
      deliveryFee: 0,
    });

    if (method === 'online') return handleOnlinePayment();
    if (method === 'wallet') return handleWalletPayment();
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
                borderRadius={40}
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
                borderRadius={40}
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
            {/* <PaymentType
              title="Debit Card"
              typeText="will be deducted from your visa card ****890"
              isSelected={method === 'debit-card'}
              onPress={() => {
                setMethod('debit-card');
                return handleOpen?.(DRAWER_CONSTANTS.warning, {
                  type: 'no-card-detected',
                });
              }}
            /> */}
            <PaymentType
              title="Wallet"
              typeText="will be deducted from your wallet balance"
              isSelected={method === 'wallet'}
              onPress={() => {
                if (
                  Number(userWallet[0]?.balance) < 0 ||
                  Number(userWallet[0]?.balance) < getCartTotalAmount()
                ) {
                  return handleOpen?.(DRAWER_CONSTANTS.warning, {
                    type: 'insufficient-balance',
                  });
                }
                return setMethod('wallet');
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
          disabled={
            !method || isLoading || chargeIsLoading || createOrderLoading
          }
          // onPress={() => navigate('Success', {type: 'order'})}
          onPress={() => handlePayment()}
          isLoading={isLoading || chargeIsLoading || createOrderLoading}
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
