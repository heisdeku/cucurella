import {useOrdersByType} from '@api/orders';
import {IOrder} from '@api/orders/types';
import {Base} from '@components/Base';
import Container from '@components/Container';
import {Text} from '@components/Text';
import updateStatusBar from '@hooks/updateStatusBar';
import {IS_IOS, windowHeight} from '@libs/constant';
import {formatDateTime} from '@libs/date';
import {order_empty_illustration, outlineArrowRight} from '@libs/svgs';
import theme from '@libs/theme';
import {navigate} from '@stacks/helper';
import {Fragment, useMemo, useState} from 'react';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SvgXml} from 'react-native-svg';
import {styled} from 'styled-components/native';

const types = [
  {
    label: 'Ongoing',
    key: 'ongoing',
  },
  {
    label: 'Complete',
    key: 'complete',
  },
];

const OrdersEmpty = () => {
  return (
    <Fragment>
      <Base.View mb={'30%'} mx={'auto'} mt="64px">
        <SvgXml xml={order_empty_illustration} />
        <Text.Medium
          color={theme.colors.neutral07}
          mt={'24px'}
          fontSize={'16px'}>
          Your orders will show up here
        </Text.Medium>
      </Base.View>
      <Base.Button onPress={() => navigate('Home')} title="Order Now" />
    </Fragment>
  );
};

const Order = ({
  isLast,
  ...order
}: IOrder & {
  isLast: boolean;
}) => {
  updateStatusBar('dark-content');
  const handleNavigate = () => {
    order?.orderStatus !== 'delivered' &&
      navigate('TrackOrder', {orderId: order?.id, packageid: order?.packageId});
    order?.orderStatus === 'delivered' &&
      navigate('OrderDetails', {
        orderId: order?.id,
        packageid: order?.packageId,
      });
  };
  return (
    <TouchableOpacity onPress={handleNavigate}>
      <Base.Row
        pb={'16px'}
        mb={!isLast ? '16px' : '0px'}
        borderBottomWidth={!isLast ? '0.5px' : '0px'}
        borderBottomColor={!isLast ? theme.colors.neutral03 : ''}
        alignItems={'center'}>
        <Base.View>
          <Text.General
            fontFamily="500"
            color={theme.colors.neutral07}
            fontSize={'16px'}>
            {order?.products?.length} items (
            {`${order?.products
              ?.slice(0, 2)
              ?.map(product => product?.name)
              .join(', ')}`}
            )...
          </Text.General>
          <Text.General
            mt={'6px'}
            color={theme.colors.neutral06}
            fontSize={'14px'}>
            {formatDateTime(order?.created_at as Date)} |{' '}
            <Text.General
              color={
                order?.orderStatus !== 'ongoing'
                  ? theme.colors.green07
                  : theme.colors.goldenYellow
              }
              fontSize={'14px'}>
              {order?.orderStatus}
            </Text.General>
          </Text.General>
        </Base.View>
        <SvgXml xml={outlineArrowRight} />
      </Base.Row>
    </TouchableOpacity>
  );
};

const OrdersFilled = () => {
  const [activeTab, setActiveTab] = useState('ongoing');

  const {data: pendingOrdersData} = useOrdersByType({
    variables: {status: 'pending'},
  });
  const {data: ongoingOrdersData} = useOrdersByType({
    variables: {status: 'ongoing'},
  });
  const {data: completedOrdersData} = useOrdersByType({
    variables: {status: 'delivered'},
  });

  const renderOngoingOrders = (orders: IOrder[]) => {
    if (orders?.length < 1) {
      return <OrdersEmpty />;
    }
    return (
      <TabOrdersListing bounces={false}>
        {orders?.map((order, i) => {
          const isLast = i + 1 === orders.length;
          return <Order {...order} key={i} isLast={isLast} />;
        })}
      </TabOrdersListing>
    );
  };

  const renderCompletedOrders = (orders: IOrder[]) => {
    if (orders?.length < 1) {
      return <OrdersEmpty />;
    }
    return (
      <TabOrdersListing bounces={false}>
        {orders?.map((order, i) => {
          const isLast = i + 1 === orders.length;
          return <Order {...order} key={i} isLast={isLast} />;
        })}
      </TabOrdersListing>
    );
  };

  const ongoing = useMemo(
    //@ts-ignore
    () =>
      pendingOrdersData !== undefined && ongoingOrdersData !== undefined
        ? [...pendingOrdersData?.orders, ...ongoingOrdersData?.orders]
        : [],
    [ongoingOrdersData, pendingOrdersData],
  );

  return (
    <ScrollView>
      <Base.View>
        {
          //@ts-ignore
          !ongoing?.length && !completedOrdersData?.orders?.length && (
            <OrdersEmpty />
          )
        }

        {
          //@ts-ignore
          (ongoing?.length > 0 || completedOrdersData?.orders?.length > 0) && (
            <Fragment>
              <Base.Row
                backgroundColor={theme.colors.white}
                mt={'24px'}
                borderRadius={8}
                justifyContent={'space-between'}
                padding={'8px'}>
                {types?.map((type, i) => {
                  return (
                    <TabButton
                      //@ts-ignore
                      isActive={type.key === activeTab}
                      onPress={() => setActiveTab(type?.key)}
                      key={`${type.key}-${i}`}>
                      <Text.Medium
                        color={
                          type.key === activeTab
                            ? theme.colors.white
                            : theme.colors.black
                        }
                        fontFamily={type.key === activeTab ? '500' : '400'}>
                        {type.label}
                      </Text.Medium>
                    </TabButton>
                  );
                })}
              </Base.Row>
              {activeTab === 'ongoing' && renderOngoingOrders(ongoing || [])}
              {activeTab === 'complete' &&
                renderCompletedOrders(completedOrdersData?.orders || [])}
            </Fragment>
          )
        }
      </Base.View>
    </ScrollView>
  );
};

const OrdersScreen = () => {
  return (
    <Container pt={'24px'} mt={'44px'}>
      <Text.Medium fontSize={'24px'}>Orders</Text.Medium>
      <OrdersFilled />
    </Container>
  );
};

const TabOrdersListing = styled.ScrollView`
  margin-top: 16px;
  background-color: ${theme.colors.white};
  padding: 16px;
  border-radius: 12px;
  max-height: ${IS_IOS ? windowHeight - 330 : windowHeight - 300}px;
`;
const TabButton = styled.TouchableOpacity`
  width: 49%;
  padding: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${(props: any) =>
    props?.isActive ? theme.colors.green08 : 'transparent'};
  border-radius: ${(props: any) => (props?.isActive ? '4px' : '0px')};
`;

export default OrdersScreen;
