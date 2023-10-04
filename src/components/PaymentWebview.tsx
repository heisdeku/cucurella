import {useClearCart} from '@api/index';
import {useCreateOrder} from '@api/orders';
import {usePaymentVerify} from '@api/payment';
import {IS_IOS} from '@libs/constant';
import {arrowRight} from '@libs/svgs';
import theme from '@libs/theme';
import {useCheckoutStore} from '@store/CheckoutStore';
import React, {useRef} from 'react';
import {Alert, Modal, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import WebView from 'react-native-webview';
import {Base} from './Base';
import {LoadingModal} from './LoadingModal';
import {Text} from './Text';

export type WebViewCustomPropsType = {
  onReload?: (type?: string) => void;
  onClose?: (params?: any) => void;
};

const PaymentWebView = (props: WebViewCustomPropsType) => {
  const insets = useSafeAreaInsets();
  const [url, visible, reference, orderDetails, updateCheckoutDetails] =
    useCheckoutStore(state => [
      state.authorization_url,
      state.isOpen,
      state.reference,
      state.orderDetails,
      state.updateCheckoutDetails,
    ]);

  const {mutate, isLoading} = usePaymentVerify();
  const {mutate: createOrderMutate, isLoading: createOrderLoading} =
    useCreateOrder();
  const {mutate: clearCartMutate, isLoading: clearLoading} = useClearCart();

  const clearCheckoutDetails = () => {
    return updateCheckoutDetails('', '', '', false);
  };

  const webViewRef = useRef<WebView>();

  const onCloseHandler = () => {
    clearCheckoutDetails();
    return props.onClose?.();
  };

  const handleCancelClick = () => {
    return Alert.alert(
      'Cancel Transaction',
      'Are you sure you want to cancel this transaction?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => onCloseHandler()},
      ],
    );
  };

  const handleConfirmClick = () => {
    return Alert.alert(
      'Confirm Transaction',
      'Are you sure you completed this transaction?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            await mutate({reference});
            await createOrderMutate({
              ...orderDetails,
              paymentReference: reference,
            });
            await clearCartMutate();
          },
        },
      ],
    );
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onCloseHandler}>
      <Base.View paddingTop={insets.top} minHeight={'100%'}>
        <Base.View paddingBottom={'15px'} backgroundColor={'white'}>
          <Base.Row px={'20px'}>
            <TouchableOpacity onPress={() => handleCancelClick()}>
              <Base.Row>
                <SvgXml xml={arrowRight} style={{marginRight: 10}} />
                <Text.General fontSize={'14px'}>Cancel</Text.General>
              </Base.Row>
            </TouchableOpacity>
            <Text.General width={'25%'} fontSize={'16px'}>
              Checkout
            </Text.General>
            <TouchableOpacity onPress={() => handleConfirmClick()}>
              <Text.Medium color={theme.colors.green08} fontSize={'14px'}>
                Confirm
              </Text.Medium>
            </TouchableOpacity>
          </Base.Row>
        </Base.View>
        {/* <WebViewHeaderCustom
          onReloadCick={onReloadHandler}
          onCloseClick={onCloseHandler}
        /> */}

        <WebView
          source={{uri: url}}
          style={{flex: 1}}
          injectedJavaScript={`
             removeHeader = (event) => {
               const header = document.getElementById('header');
               if (header) {
                 header.style.display='none';
               } else {
                 setTimeout(func, 5)
               }
             };
             removeHeader();
           `}
          //@ts-ignore
          ref={webViewRef}
        />

        {/* Adding bottom padding for iOS devices */}
        {IS_IOS && <Base.View style={{height: 30}} />}
        <LoadingModal loading={isLoading || createOrderLoading} />
      </Base.View>
    </Modal>
  );
};

export default PaymentWebView;
