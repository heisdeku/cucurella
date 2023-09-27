import {styled} from 'styled-components/native';
import {Base} from '@components/Base';
import {Text} from '@components/Text';
import theme from '@libs/theme';
import {IDrawerChildProps} from './helper';

export const BankDetailsDrawer: React.FC<IDrawerChildProps> = () => {
  return (
    <>
      <Text.Medium mb={'12px'} fontSize={'24px'} color={theme.colors.dark}>
        Bank Details
      </Text.Medium>
      <Base.View
        backgroundColor={theme.colors.neutral02}
        borderRadius={'11px'}
        px={'19px'}
        py={'23px'}>
        <Base.View mb={'16px'}>
          <Text.General color={theme.colors.neutral07} fontSize={'13px'}>
            Account Name
          </Text.General>
          <Text.Medium
            color={theme.colors.black}
            fontSize={'16px'}
            lineHeight={'21.6px'}
            mt={'4px'}>
            Ofayd - Jane Doe
          </Text.Medium>
        </Base.View>
        <Base.View mb={'16px'}>
          <Text.General color={theme.colors.neutral07} fontSize={'13px'}>
            Account Number
          </Text.General>
          <Base.Row justifyContent={'flex-start'} mt={'4px'}>
            <Text.Medium
              color={theme.colors.black}
              fontSize={'16px'}
              lineHeight={'21.6px'}>
              0099887766
            </Text.Medium>
            <CopyButton>
              <Text.General color={theme.colors.black} fontSize={'12px'}>
                Copy
              </Text.General>
            </CopyButton>
          </Base.Row>
        </Base.View>
        <Base.View>
          <Text.General color={theme.colors.neutral07} fontSize={'13px'}>
            Bank Name
          </Text.General>
          <Text.Medium
            color={theme.colors.black}
            fontSize={'16px'}
            lineHeight={'21.6px'}
            mt={'4px'}>
            VFD
          </Text.Medium>
        </Base.View>
      </Base.View>
      <Text.Medium
        color={theme.colors.neutral07}
        fontSize={'14px'}
        lineHeight={'18.9px'}
        mt={'12px'}>
        Make a transfer to the account number above to add money money to your
        wallet
      </Text.Medium>
    </>
  );
};

const CopyButton = styled.TouchableOpacity`
  border-radius: 39px;
  background-color: ${theme.colors.neutral03};
  margin-left: 7px;
  padding: 8px;
  width: 55px;
  justify-content: center;
  align-items: center;
`;
