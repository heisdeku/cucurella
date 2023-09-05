import {styled} from 'styled-components/native';
import {Base} from '@components/Base';
import {boldWarningInformation, mdiLocation} from '@libs/svgs';
import {SvgXml} from 'react-native-svg';
import {Text} from '@components/Text';
import theme from '@libs/theme';
import {navigate} from '@stacks/helper';
import {requestLocationPermission} from '@libs/helper';

export const WarningDrawer = ({handleClose, payload, handleOpen}) => {
  const getWarningDetails = () => {
    switch (payload?.type) {
      case 'no-card-detected':
        return {
          headline: 'No card detected',
          description: 'Please add your card to continue',
          buttonType: 'add-card',
          buttonText: 'Add Card',
        };
      case 'insufficient-balance':
        return {
          headline: 'Insufficient wallet balance',
          description:
            'Your wallet balance is currently insufficient for this payment. Top up your wallet to continue',
          buttonType: 'add-card',
          buttonText: 'Top up wallet',
        };
      default:
        return {
          headline: 'Warning',
          description:
            'Something Went Wrong, Kindly Close the drawer and try again',
          buttonType: 'default-warning',
          buttonText: 'Close Drawer',
        };
    }
  };
  return (
    <>
      <Base.View
        width={'78px'}
        height="78px"
        borderRadius={'118px'}
        mx={'auto'}
        mb="18px"
        justifyContent={'center'}
        alignItems={'center'}
        backgroundColor={'#FEF3C7'}>
        <SvgXml xml={boldWarningInformation} />
      </Base.View>
      <Base.View width={'320px'} mx={'auto'} mb={'28px'} alignItems={'center'}>
        <Text.Medium
          mb={'6px'}
          textAlign={'center'}
          fontSize={'20px'}
          color={theme.colors.dark}>
          {getWarningDetails().headline}
        </Text.Medium>
        <Text.General
          textAlign={'center'}
          lineHeight={'21.36px'}
          color={theme.colors.neutral07}
          fontSize={'16px'}>
          {getWarningDetails().description}
        </Text.General>
      </Base.View>
      <Base.Button onPress={() => {}} title={getWarningDetails().buttonText} />
    </>
  );
};
