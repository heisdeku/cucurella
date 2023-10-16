import {Base} from '@components/Base';
import {boldWarningInformation} from '@libs/svgs';
import {SvgXml} from 'react-native-svg';
import {Text} from '@components/Text';
import theme from '@libs/theme';
import {navigate} from '@stacks/helper';
import {Alert} from 'react-native';

const getWarningDetails = (type: string) => {
  switch (type) {
    case 'no-card-detected':
      return {
        headline: 'No card detected',
        description: 'Please add your card to continue',
        buttonType: 'add-card',
        buttonText: 'Add Card',
      };
    case 'no-address-support':
      return {
        headline: 'Sorry we do not deliver to this location  at the moment',
        buttonType: 'add-card',
        buttonText: 'Continue in Explore Mode',
      };
    case 'insufficient-balance':
      return {
        headline: 'Insufficient wallet balance',
        description:
          'Your wallet balance is currently insufficient for this payment. Top up your wallet to continue',
        buttonType: 'default-warning',
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
//@ts-ignore
export const WarningDrawer = ({handleClose, payload}) => {
  const onButtonClick = () => {
    switch (payload?.type) {
      case 'no-card-detected':
        return navigate('AddCard');
      case 'no-address-support':
        return navigate('Home');
      case 'insufficient-balance':
        return Alert.alert(
          'Insufficient wallet balance',
          'Your wallet balance is currently insufficient for this payment. Top up your wallet to continue',
        );

      default:
        return Alert.alert('Button Clicked');
    }
  };
  return (
    <>
      <Base.View
        width={'78px'}
        height="78px"
        borderRadius={118}
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
          {getWarningDetails(payload?.type)?.headline}
        </Text.Medium>
        <Text.General
          textAlign={'center'}
          lineHeight={'21.36px'}
          color={theme.colors.neutral07}
          fontSize={'16px'}>
          {getWarningDetails(payload?.type)?.description}
        </Text.General>
      </Base.View>
      <Base.Button
        onPress={() => {
          handleClose();
          onButtonClick?.();
        }}
        title={getWarningDetails(payload?.type)?.buttonText}
      />
    </>
  );
};
