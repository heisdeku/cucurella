import {Base} from '@components/Base';
import {windowHeight} from '@libs/constant';
import theme from '@libs/theme';
import {styled} from 'styled-components/native';
import {TransactionComponent} from './base';
import ScreenHeader from '@components/ScreenHeader';

const WalletTransactions = () => {
  return (
    <Base.View>
      <ScreenHeader label="Transactions" />
      <TransactionsListing>
        {new Array(Math.floor(25)).fill('order').map((_, i) => {
          return <TransactionComponent key={i} />;
        })}
      </TransactionsListing>
    </Base.View>
  );
};

const TransactionsListing = styled.ScrollView`
  margin: 16px 20px 0px;
  background-color: ${theme.colors.white};
  padding: 4px 16px;
  border-radius: 12px;
  max-height: ${windowHeight - 160}px;
`;

export default WalletTransactions;
