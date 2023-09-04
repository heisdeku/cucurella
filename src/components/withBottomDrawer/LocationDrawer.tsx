import {styled} from 'styled-components/native';
import {Base} from '@components/Base';
import {mdiLocation} from '@libs/svgs';
import {SvgXml} from 'react-native-svg';
import {Text} from '@components/Text';
import theme from '@libs/theme';
import {navigate} from '@stacks/helper';
import {requestLocationPermission} from '@libs/helper';

export const LocationDrawer = ({handleClose}) => {
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
        backgroundColor={'#EBFFF1'}>
        <SvgXml xml={mdiLocation} width={30} height={44} />
      </Base.View>
      <Base.View width={'260px'} mx={'auto'} mb={'28px'} alignItems={'center'}>
        <Text.Medium
          mb={'8px'}
          textAlign={'center'}
          fontSize={'20px'}
          color={theme.colors.dark}>
          Allow Ofayd to access your location
        </Text.Medium>
      </Base.View>
      <Base.Button
        onPress={() => {
          requestLocationPermission();
        }}
        title="Allow"
      />
      <SecondaryButton
        onPress={() => {
          navigate('Login');
          return handleClose();
        }}>
        <Text.Medium fontSize={'16px'}>Continue without location</Text.Medium>
      </SecondaryButton>
    </>
  );
};

const Close = styled.TouchableOpacity`
  background-color: ${theme.colors.offsetGray2};
  height: 35px;
  width: 35px;
  margin-left: auto;
  border-radius: 9999px;
  justify-content: center;
  align-items: center;
  margin-bottom: 7px;
`;

const SecondaryButton = styled.TouchableOpacity`
  margin-top: 10px;
  justify-content: center;
  width: 100%;
  align-items: center;
`;
