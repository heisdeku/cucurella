import {OrderProgressT, useOrder} from '@api/orders';
import {Base} from '@components/Base';
import ScreenHeader from '@components/ScreenHeader';
import {Text} from '@components/Text';
import {convertTo12HourFormat} from '@libs/date';
import {formatMonetaryAmount} from '@libs/helper';
import theme from '@libs/theme';
import {
  tracker_step_one,
  tracker_step_two,
  tracker_step_three,
  tracker_step_four,
  tracker_inactive,
} from '@libs/tracker-svg';
import {useRoute} from '@react-navigation/native';
import {Fragment} from 'react';
import {ActivityIndicator} from 'react-native';
import {Alert} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {styled} from 'styled-components/native';

/**
 * This functions returns the order Progress bar component
 * @param type : OrderProgressT
 * @returns
 */
const getOrderProgressBar = (type: OrderProgressT) => {
  switch (type) {
    case 'confirmed':
      return tracker_step_one;
    case 'processed':
      return tracker_step_two;
    case 'packed':
      return tracker_step_three;
    default:
      return tracker_inactive;
  }
};

const TrackOrder = () => {
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
      <ScreenHeader
        toHome={params?.source === 'order-complete' ? true : false}
        label="Track Order"
      />
      {isLoading && (
        <Base.View mt={'32px'}>
          <ActivityIndicator size={'large'} color={theme.colors.green08} />
        </Base.View>
      )}
      {!isLoading && data && (
        <Fragment>
          <ScrollArea>
            <Base.View
              py={'16px'}
              px={'24px'}
              backgroundColor={theme.colors.white}>
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
            {data?.order?.deliveryCode && (
              <Base.View
                mt={'16px'}
                py={'16px'}
                px={'24px'}
                backgroundColor={theme.colors.white}>
                <Text.General
                  fontSize={'14px'}
                  color={theme.colors.neutral06}
                  mb={'4px'}>
                  Release Code
                </Text.General>
                <Text.H1
                  lineHeight={'32.64px'}
                  color={theme.colors.black}
                  fontSize={'24px'}>
                  {data?.order?.deliveryCode}
                </Text.H1>
                <Text.General
                  mt={'4px'}
                  color={theme.colors.neutral08}
                  fontSize={'12px'}
                  lineHeight="17px">
                  Give this code to the rider after you’ve confirmed that your
                  goods was delivered as requested
                </Text.General>
              </Base.View>
            )}
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
                  <SvgXml
                    xml={getOrderProgressBar(data?.order?.orderProgress)}
                  />
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
                      {data?.order?.orderConfirmedAt
                        ? convertTo12HourFormat(
                            data?.order?.orderConfirmedAt as Date | string,
                          )
                        : '-'}
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
                      {data?.order?.orderProcessedAt
                        ? convertTo12HourFormat(
                            data?.order?.orderProcessedAt as Date | string,
                          )
                        : '-'}
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
                      {data?.order?.orderPackedAt
                        ? convertTo12HourFormat(
                            data?.order?.orderPackedAt as Date | string,
                          )
                        : '-'}
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
                      {data?.order?.orderCompletedAt
                        ? convertTo12HourFormat(
                            data?.order?.orderCompletedAt as Date | string,
                          )
                        : '-'}
                    </Text.Medium>
                  </Base.Row>
                </Base.View>
              </Base.Row>
            </Base.View>

            {data?.order?.driver && (
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
                  {data?.order?.driver?.image ? (
                    <RiderImage
                      source={{
                        uri: data?.order?.driver?.image || '',
                      }}
                    />
                  ) : (
                    <Avatar>
                      <Text.Medium isCapitalize fontSize={'14px'}>
                        {data?.order?.driver?.firstName.split('')[0]}
                        {data?.order?.driver?.lastName.split('')[0]}
                      </Text.Medium>
                    </Avatar>
                  )}
                  <Text.General
                    ml={'10px'}
                    fontFamily="500"
                    color={theme.colors.black}
                    fontSize={'16px'}>
                    {data?.order?.driver?.firstName}{' '}
                    {data?.order?.driver?.lastName}
                  </Text.General>
                </Base.Row>
              </Base.View>
            )}
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
                {data?.order?.products?.map((item, i) => {
                  return (
                    <Base.Row key={i} py={'4px'}>
                      <Text.General
                        isCapitalize
                        color={theme.colors.neutral06}
                        fontSize={'14px'}
                        fontFamily="500">
                        {item.name} ({item?.quantity})
                      </Text.General>
                      <Text.Medium
                        color={theme.colors.neutral08}
                        fontSize={'14px'}>
                        ₦
                        {
                          formatMonetaryAmount(item?.amount * item?.quantity)
                            .figure
                        }
                      </Text.Medium>
                    </Base.Row>
                  );
                })}
              </Base.View>
              {/* this view wraps the pricing which includes: subtotal, discount, delivery fee and total amount */}
              <Base.View>
                <Base.Row mb={'11px'}>
                  <Text.General
                    color={theme.colors.black}
                    fontSize={'14px'}
                    fontFamily="500">
                    Subtotal
                  </Text.General>
                  <Text.Medium color={theme.colors.neutral07} fontSize={'14px'}>
                    ₦{formatMonetaryAmount(data?.order?.subTotalAmount).figure}
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
                    ₦{formatMonetaryAmount(data?.order?.discount).figure}
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
                    ₦{formatMonetaryAmount(data?.order?.deliveryFee).figure}
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
                    ₦{formatMonetaryAmount(data?.order?.totalAmount).figure}
                  </Text.Medium>
                </Base.Row>
              </Base.View>
            </Base.View>
          </ScrollArea>
          {(data?.order?.orderStatus === 'ongoing' ||
            data?.order?.orderStatus === 'assigned') && (
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
          )}
        </Fragment>
      )}
    </Base.View>
  );
};

const RiderImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-color: ${theme.colors.green08};
`;

const Avatar = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-color: #d2ffe4;
  justify-content: center;
  align-items: center;
`;
const ScrollArea = styled.ScrollView`
  margin-bottom: 120px;
`;

export default TrackOrder;
