import {IOrder, useOrder} from '@api/orders';
import {IOfaydProduct} from '@api/types';
import {Base} from '@components/Base';
import ScreenHeader from '@components/ScreenHeader';
import {Text} from '@components/Text';
import {formatMonetaryAmount} from '@libs/helper';
import {linear_call, mdiLocation} from '@libs/svgs';
import theme from '@libs/theme';
import {useRoute} from '@react-navigation/native';
import {navigate} from '@stacks/helper';
import {Fragment} from 'react';
import {ActivityIndicator} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {styled} from 'styled-components/native';

const renderOrderProducts = (products: IOfaydProduct[]) => {
  return products?.map((order, i) => {
    return (
      <Base.Row key={i} py={'4px'}>
        <Text.General
          color={theme.colors.neutral06}
          fontSize={'14px'}
          fontFamily="500"
          isCapitalize>
          {order.name} (x{order?.quantity})
        </Text.General>
        <Text.Medium color={theme.colors.neutral08} fontSize={'14px'}>
          ₦
          {
            formatMonetaryAmount(order?.amount * order?.quantity)
              ?.formattedValue
          }
        </Text.Medium>
      </Base.Row>
    );
  });
};

const OrderAddress = ({address}: {address: string}) => {
  return (
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
          <Text.General fontSize={'14px'} color={theme.colors.neutral06}>
            {address}
          </Text.General>
        </Base.View>
      </Base.Row>
    </Base.Row>
  );
};
const OrderPhoneNumber = ({phoneNumber}: {phoneNumber: string}) => {
  return (
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
          <Text.General fontSize={'14px'} color={theme.colors.neutral06}>
            {phoneNumber}
          </Text.General>
        </Base.View>
      </Base.Row>
    </Base.Row>
  );
};

const OrderDetails = () => {
  const params = useRoute().params as {
    orderId: string;
    packageId: string;
    source: 'order-complete' | 'view-order';
  };
  const {data, isLoading} = useOrder({
    variables: {orderId: params?.orderId},
  });

  return (
    <Base.View>
      <ScreenHeader label={`Order #${data?.order?.packageId || ''}`} />
      {isLoading && (
        <Base.View mt={'32px'}>
          <ActivityIndicator size={'large'} color={theme.colors.green08} />
        </Base.View>
      )}
      {!isLoading && data && (
        <Fragment>
          <ScrollArea>
            <Base.View
              mt={'16px'}
              px={'24px'}
              backgroundColor={theme.colors.white}>
              <OrderAddress
                address={
                  JSON.parse(data?.order?.shippingAddress)?.formatted_address ||
                  ''
                }
              />
              <OrderPhoneNumber phoneNumber={data?.order?.phoneNumber} />
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
                isCapitalize
                mt={'8px'}
                color={theme.colors.neutral07}
                fontSize={'14px'}>
                {data?.order?.paymentMethod}
              </Text.General>
            </Base.View>
            <Base.View
              mt={'16px'}
              px="18px"
              pt={'22px'}
              backgroundColor={theme.colors.white}>
              <Text.Medium
                mb={'13px'}
                color={theme.colors.dark}
                fontSize={'20px'}>
                Order Details
              </Text.Medium>
              <Base.View mb={'24px'}>
                {renderOrderProducts(data?.order?.products)}
              </Base.View>
              {/* pricing for the order details */}
              <Base.View>
                <Base.Row mb={'11px'}>
                  <Text.General
                    color={theme.colors.black}
                    fontSize={'14px'}
                    fontFamily="500">
                    Subtotal
                  </Text.General>
                  <Text.Medium color={theme.colors.neutral07} fontSize={'14px'}>
                    ₦
                    {
                      formatMonetaryAmount(data?.order?.subTotalAmount)
                        ?.formattedValue
                    }
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
                    ₦
                    {
                      formatMonetaryAmount(data?.order?.discount)
                        ?.formattedValue
                    }
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
                    ₦
                    {
                      formatMonetaryAmount(data?.order?.deliveryFee)
                        ?.formattedValue
                    }
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
                    ₦
                    {
                      formatMonetaryAmount(data?.order?.totalAmount)
                        ?.formattedValue
                    }
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
        </Fragment>
      )}
    </Base.View>
  );
};

const ScrollArea = styled.ScrollView``;

export default OrderDetails;
