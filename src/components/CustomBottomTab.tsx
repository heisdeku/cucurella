import React from 'react';
import {Platform} from 'react-native';
import {SvgXml} from 'react-native-svg';
import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TABICONS} from '@libs/tab-icons';
import {Row} from './Base/Row';
import theme from '@libs/theme';
import {Text} from './Text';
import {Base} from './Base';
import {useOrdersByType} from '@api/orders';

function CustomBottomTab({state, navigation, handleOpen}: any) {
  const inserts = useSafeAreaInsets();

  const {data: ongoingOrdersData} = useOrdersByType({
    variables: {status: 'ongoing'},
  });
  const {data: pendingOrdersData} = useOrdersByType({
    variables: {status: 'pending'},
  });

  const onPress = (route: any, isFocused: boolean) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      navigation.navigate({name: route.name, merge: true});
    }
  };

  return (
    <Row
      backgroundColor={theme.colors.white}
      borderTopWidth={'1px'}
      borderTopColor={theme.colors.neutral03}
      paddingBottom={Platform.select({android: 12, ios: 16 + inserts.bottom})}
      paddingTop={'16px'}
      px={'20px'}>
      <TabContainer
        activeOpacity={0.65}
        onPress={() => onPress(state?.routes[0], state?.index === 0)}
        key={'Home'}>
        {state?.index === 0 ? (
          <SvgXml xml={TABICONS.home.active} />
        ) : (
          <SvgXml xml={TABICONS.home.default} />
        )}
        <Text.General
          fontSize={'12px'}
          color={
            state?.index === 0 ? theme.colors.green08 : theme.colors.neutral06
          }
          fontFamily={state?.index === 0 ? '700' : '500'}
          mt={'8px'}>
          Shop
        </Text.General>
      </TabContainer>
      <TabContainer
        onPress={() => onPress(state?.routes[1], state?.index === 1)}
        activeOpacity={0.65}
        key={'Orders'}>
        {state?.index === 1 ? (
          <SvgXml xml={TABICONS.orders.active} />
        ) : (
          <SvgXml xml={TABICONS.orders.default} />
        )}
        <Text.General
          fontSize={'12px'}
          color={
            state?.index === 1 ? theme.colors.green08 : theme.colors.neutral06
          }
          fontFamily={state?.index === 1 ? '700' : '500'}
          mt={'8px'}>
          Orders
        </Text.General>
        {Number(ongoingOrdersData?.count) + Number(pendingOrdersData?.count) >
          0 && (
          <Base.View
            position={'absolute'}
            backgroundColor={theme.colors.goldenYellow}
            width={'18px'}
            height={'18px'}
            top={'-5px'}
            right={'15px'}
            justifyContent={'center'}
            display={'flex'}
            alignItems={'center'}
            borderRadius={46.25}>
            <Text.Medium
              color={theme.colors.black}
              lineHeight={'12px'}
              fontSize={'10px'}>
              {
                //@ts-ignore
                ongoingOrdersData?.count + pendingOrdersData?.count
              }
            </Text.Medium>
          </Base.View>
        )}
      </TabContainer>
      <TabContainer
        activeOpacity={0.65}
        onPress={() => onPress(state?.routes[2], state?.index === 2)}
        key={'Wallet'}>
        {state?.index === 2 ? (
          <SvgXml xml={TABICONS.wallet.active} />
        ) : (
          <SvgXml xml={TABICONS.wallet.default} />
        )}
        <Text.General
          fontSize={'12px'}
          color={
            state?.index === 2 ? theme.colors.green08 : theme.colors.neutral06
          }
          fontFamily={state?.index === 2 ? '700' : '500'}
          mt={'8px'}>
          Wallet
        </Text.General>
      </TabContainer>
      <TabContainer
        onPress={() => onPress(state?.routes[3], state?.index === 3)}
        activeOpacity={0.65}
        key={'Account'}>
        {state?.index === 3 ? (
          <SvgXml xml={TABICONS.account.active} />
        ) : (
          <SvgXml xml={TABICONS.account.default} />
        )}
        <Text.General
          fontSize={'12px'}
          color={
            state?.index === 3 ? theme.colors.green08 : theme.colors.neutral06
          }
          fontFamily={state?.index === 3 ? '700' : '500'}
          mt={'8px'}>
          Account
        </Text.General>
      </TabContainer>
    </Row>
  );
}

const TabContainer = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export default CustomBottomTab;
