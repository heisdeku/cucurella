import {Base} from '@components/Base';
import {windowHeight} from '@libs/constant';
import theme from '@libs/theme';
import {styled} from 'styled-components/native';
import ScreenHeader from '@components/ScreenHeader';
import {Text} from '@components/Text';

const WalletTransactionDetails = () => {
  return (
    <Base.View>
      <ScreenHeader label="Transaction Details" />
      <TransactionsListing bounces={false}>
        <Text.General
          textAlign={'center'}
          mb={'6px'}
          color={theme.colors.neutral07}
          fontSize={'13px'}
          letterSpacing={'-0.06px'}>
          Funding
        </Text.General>
        <Text.Medium
          fontSize={'24px'}
          color={theme.colors.black}
          letterSpacing={'-0.12px'}
          textAlign={'center'}>
          NGN 50,000
        </Text.Medium>
        <Base.View pt={'16px'}>
          <Base.Row
            py={'16px'}
            mb={'8px'}
            alignItems={'center'}
            borderBottomWidth={'1px'}
            borderBottomColor={theme.colors.slate02}>
            <Text.General
              fontWeight={'500'}
              fontSize={'14px'}
              color={theme.colors.neutral07}>
              Status
            </Text.General>
            <StatusBox>
              <Base.View
                height={'8px'}
                width={'8px'}
                marginRight={'6px'}
                background={theme.colors.green07}
                borderRadius={'100px'}
              />
              <Text.General
                fontSize={'15px'}
                fontWeight={'500'}
                color={theme.colors.green07}>
                Complete
              </Text.General>
            </StatusBox>
          </Base.Row>
          <Base.Row
            py={'16px'}
            mb={'8px'}
            borderBottomWidth={'1px'}
            borderBottomColor={theme.colors.slate02}>
            <Text.General
              fontWeight={'500'}
              fontSize={'14px'}
              color={theme.colors.neutral07}>
              Amount
            </Text.General>
            <Text.General
              fontSize={'15px'}
              fontWeight={'500'}
              color={theme.colors.neutral08}>
              NGN 500,000,000
            </Text.General>
          </Base.Row>
          <Base.Row
            py={'16px'}
            mb={'8px'}
            borderBottomWidth={'1px'}
            borderBottomColor={theme.colors.slate02}>
            <Text.General
              fontWeight={'500'}
              fontSize={'14px'}
              color={theme.colors.neutral07}>
              Transaction type
            </Text.General>
            <Text.General
              fontSize={'15px'}
              fontWeight={'500'}
              color={theme.colors.neutral08}>
              Wallet funding
            </Text.General>
          </Base.Row>
          <Base.Row
            py={'16px'}
            mb={'8px'}
            borderBottomWidth={'1px'}
            borderBottomColor={theme.colors.slate02}>
            <Text.General
              fontWeight={'500'}
              fontSize={'14px'}
              color={theme.colors.neutral07}>
              Date and time
            </Text.General>
            <Text.General
              fontSize={'15px'}
              fontWeight={'500'}
              color={theme.colors.neutral08}>
              10-02-2023 at 10:50 am
            </Text.General>
          </Base.Row>
          <Base.Row
            py={'16px'}
            mb={'8px'}
            borderBottomWidth={'1px'}
            borderBottomColor={theme.colors.slate02}>
            <Text.General
              fontWeight={'500'}
              fontSize={'14px'}
              color={theme.colors.neutral07}>
              Payment for
            </Text.General>
            <Text.General
              fontSize={'15px'}
              fontWeight={'500'}
              color={theme.colors.neutral08}>
              Groceries
            </Text.General>
          </Base.Row>
          <Base.Row py={'16px'}>
            <Text.General
              fontWeight={'500'}
              fontSize={'14px'}
              color={theme.colors.neutral07}>
              Reference
            </Text.General>
            <Text.General
              fontSize={'15px'}
              fontWeight={'500'}
              color={theme.colors.neutral08}>
              209839018036723372737
            </Text.General>
          </Base.Row>
        </Base.View>
      </TransactionsListing>
      <Base.View px={'20px'} mt={'45px'}>
        <Base.Button title="Share Receipt" />
      </Base.View>
    </Base.View>
  );
};

const StatusBox = styled.View`
  flex-direction: row;
  border-radius: 76px;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.green01};
  padding: 10px 16px;
  width: 120px;
`;
const TransactionsListing = styled.ScrollView`
  margin: 24px 20px 0px;
  background-color: ${theme.colors.white};
  padding: 24px 16px;
  border-radius: 12px;
  max-height: ${windowHeight - 160}px;
`;

export default WalletTransactionDetails;
