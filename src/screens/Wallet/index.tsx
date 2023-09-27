import {Base} from '@components/Base';
import {Text} from '@components/Text';
import withBottomDrawer from '@components/withBottomDrawer';
import {DRAWER_CONSTANTS} from '@components/withBottomDrawer/constants';
import {IDrawerChildProps} from '@components/withBottomDrawer/helper';
import updateStatusBar from '@hooks/updateStatusBar';
import {outlineArrowRight} from '@libs/svgs';
import theme from '@libs/theme';
import {navigate} from '@stacks/helper';
import {Platform, ScrollView, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import styled from 'styled-components/native';

export interface IWalletTransaction {
  isDebit?: boolean;
}
export const Transaction = ({isDebit}: IWalletTransaction) => {
  return (
    <TouchableOpacity onPress={() => navigate('WalletTransactionDetails')}>
      <Base.Row
        alignItems={'center'}
        py={'12px'}
        borderBottomWidth={'1px'}
        borderBottomColor={theme.colors.neutral03}>
        <Base.View>
          <Text.Medium
            mb={'6px'}
            fontSize={'16px'}
            color={theme.colors.neutral08}>
            Wallet Funding
          </Text.Medium>
          <Text.General
            color={theme.colors.neutral06}
            fontSize={'14px'}
            lineHeight={'15px'}
            letterSpacing={'-0.07px'}>
            <Text.General
              color={!isDebit ? theme.colors.neutral06 : theme.colors.red07}
              fontSize={'14px'}
              lineHeight={'15px'}
              letterSpacing={'-0.07px'}>
              NGN500,000,000
            </Text.General>{' '}
            | 10:50am
          </Text.General>
        </Base.View>
        <SvgXml xml={outlineArrowRight} />
      </Base.Row>
    </TouchableOpacity>
  );
};

const WalletScreen: React.FC<IDrawerChildProps> = ({handleOpen}) => {
  updateStatusBar('dark-content');
  const inserts = useSafeAreaInsets();
  return (
    <Base.View minHeight={'100%'}>
      <Base.View
        pt={inserts.top + 24}
        paddingX={24}
        paddingBottom={24}
        backgroundColor={theme.colors.white}
        borderBottomRightRadius={24}
        borderBottomLeftRadius={24}>
        <Text.Medium fontSize={'24px'}>Wallet</Text.Medium>
        <Base.View
          backgroundColor={'#001D18'}
          marginTop={16}
          height={171}
          borderRadius={'8px'}>
          <StyledImageBackground
            source={require('../../../assets/images/wallet-card-background.png')}
            imageStyle={{borderRadius: 8}}>
            <Text.General
              fontSize={'12px'}
              lineHeight={'15px'}
              mb={'6.5px'}
              color={theme.colors.slate04}>
              Wallet Balance
            </Text.General>
            <Text.Medium
              mb={'auto'}
              color={'white'}
              fontSize={'24px'}
              lineHeight={'24px'}>
              NGN 90,000.00
            </Text.Medium>
            <Base.Button
              onPress={() => handleOpen?.(DRAWER_CONSTANTS.bankDetails)}
              title="Add Cash"
            />
          </StyledImageBackground>
        </Base.View>
      </Base.View>
      <Base.View
        mt="16px"
        mb={'500px'}
        backgroundColor={'white'}
        py={'24px'}
        px={'24px'}
        borderTopLeftRadius={24}
        borderTopRightRadius={24}
        minHeight={'100%'}>
        <Base.Row mb={'16x'}>
          <Text.Medium
            fontSize={'17px'}
            lineHeight={'22.5px'}
            color={theme.colors.black}>
            Recent Transactions
          </Text.Medium>
          <TouchableOpacity onPress={() => navigate('WalletTransactions')}>
            <Text.Medium
              fontSize={'14px'}
              lineHeight={'17.5px'}
              color={theme.colors.neutral06}>
              View all
            </Text.Medium>
          </TouchableOpacity>
        </Base.Row>
        <TransactionsListView>
          <Transaction />
          <Transaction isDebit={true} />
          <Transaction />
          <Transaction isDebit={true} />
          <Transaction />
          <Transaction isDebit={true} />
        </TransactionsListView>
      </Base.View>
    </Base.View>
  );
};

const StyledImageBackground = styled.ImageBackground`
  height: 171px;
  border-radius: 8px;
  padding: 24px;
`;

const TransactionsListView = styled.ScrollView`
  flex: 1;
`;

export default withBottomDrawer(WalletScreen);
