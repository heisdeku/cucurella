import {Base} from '@components/Base';
import Container from '@components/Container';
import {Text} from '@components/Text';
import updateStatusBar from '@hooks/updateStatusBar';
import {windowHeight} from '@libs/constant';
import {order_empty_illustration, outlineArrowRight} from '@libs/svgs';
import theme from '@libs/theme';
import {navigate} from '@stacks/helper';
import {Fragment, useState} from 'react';
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
      <Base.View mb={'50%'} mx={'auto'} mt="64px">
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
  isComplete = false,
}: {
  isLast: boolean;
  isComplete?: boolean;
}) => {
  updateStatusBar('dark-content');
  const handleNavigate = () => {
    return navigate(!isComplete ? 'OrderCheckout' : 'OrderDetails');
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
            5 items (Chicken, green pepper)...
          </Text.General>
          <Text.General
            mt={'6px'}
            color={theme.colors.neutral06}
            fontSize={'14px'}>
            31 July at 10:34am |{' '}
            <Text.General
              color={
                isComplete ? theme.colors.green07 : theme.colors.goldenYellow
              }
              fontSize={'14px'}>
              {!isComplete ? 'processing' : 'completed'}
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
  return (
    <ScrollView>
      <Base.View>
        <Base.Row
          backgroundColor={theme.colors.white}
          mt={'24px'}
          borderRadius={'8px'}
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
        {activeTab === 'ongoing' && (
          <TabOrdersListing bounces={false}>
            {new Array(10).fill('order').map((_, i) => {
              return <Order key={i} isLast={i + 1 === 5} />;
            })}
          </TabOrdersListing>
        )}
        {activeTab === 'complete' && (
          <TabOrdersListing bounces={false}>
            {new Array(5).fill('order').map((_, i) => {
              return <Order isComplete={true} key={i} isLast={i + 1 === 5} />;
            })}
          </TabOrdersListing>
        )}
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
  max-height: ${windowHeight - 330}px;
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
