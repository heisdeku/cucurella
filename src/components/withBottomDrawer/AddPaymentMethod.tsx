import {styled} from 'styled-components/native';
import {Base} from '@components/Base';
import {Text} from '@components/Text';
import theme from '@libs/theme';
import {IDrawerChildProps} from './helper';
import {navigate} from '@stacks/helper';
import {TouchableOpacity} from 'react-native';
import {outlineArrowRight, outlineCards, outlineWallet} from '@libs/svgs';
import {SvgXml} from 'react-native-svg';

export const AddPaymentMethod: React.FC<IDrawerChildProps> = ({
  handleClose,
}) => {
  return (
    <>
      <Text.Medium
        mb={'6px'}
        fontSize={'19px'}
        lineHeight="26.7px"
        color={theme.colors.dark}>
        Add a payment method
      </Text.Medium>
      <Text.General
        mb={'27px'}
        lineHeight="21.36px"
        color={theme.colors.neutral07}>
        Add a payment method to enable a stress free checkout
      </Text.General>
      <Base.View>
        <TouchableOpacity
          onPress={() => {
            handleClose?.();
            return navigate('AddCard');
          }}
          activeOpacity={0.75}>
          <Base.Row
            paddingY={'8px'}
            px="16px"
            backgroundColor={theme.colors.neutral01}
            borderRadius="9px"
            mb={'16px'}>
            <Base.Row height={'62px'}>
              <MethodIcon>
                <SvgXml xml={outlineCards} />
              </MethodIcon>
              <Base.View>
                <Text.Medium
                  color={theme.colors.black}
                  fontSize={'16px'}
                  lineHeight="20px">
                  Add your card
                </Text.Medium>
                <Text.General
                  mt={'3px'}
                  fontSize={'13px'}
                  color={theme.colors.neutral07}>
                  Add a debit card{' '}
                </Text.General>
              </Base.View>
            </Base.Row>
            <SvgXml xml={outlineArrowRight} />
          </Base.Row>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.75}>
          <Base.Row
            paddingY={'8px'}
            px="16px"
            backgroundColor={theme.colors.neutral01}
            borderRadius="9px"
            mb={'24px'}>
            <Base.Row height={'62px'}>
              <MethodIcon>
                <SvgXml xml={outlineWallet} />
              </MethodIcon>
              <Base.View>
                <Text.Medium
                  color={theme.colors.black}
                  fontSize={'16px'}
                  lineHeight="20px">
                  Fund your wallet
                </Text.Medium>
                <Text.General
                  mt={'3px'}
                  fontSize={'13px'}
                  color={theme.colors.neutral07}>
                  Add funds to your wallet
                </Text.General>
              </Base.View>
            </Base.Row>
            <SvgXml xml={outlineArrowRight} />
          </Base.Row>
        </TouchableOpacity>
      </Base.View>
      <Base.Button
        title={`I'll do this later`}
        onPress={() => handleClose?.()}
      />
    </>
  );
};

const MethodIcon = styled.View`
  border-radius: 52px;
  height: 40px;
  width: 40px;
  background-color: ${theme.colors.green02};
  margin-right: 8px;
  align-items: center;
  justify-content: center;
`;
