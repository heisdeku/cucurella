import {styled} from 'styled-components/native';
import {Base} from '@components/Base';
import {biometrics} from '@libs/svgs';
import {SvgXml} from 'react-native-svg';
import {Text} from '@components/Text';
import theme from '@libs/theme';
import {navigate} from '@stacks/helper';
import {IDrawerChildProps} from './helper';

export const BiometricsDrawer: React.FC<IDrawerChildProps> = ({
  handleClose,
}) => {
  return (
    <>
      <Base.View
        width={'64px'}
        height="64px"
        borderRadius={'49px'}
        mx={'auto'}
        mb="18px"
        justifyContent={'center'}
        alignItems={'center'}
        backgroundColor={theme.colors.offsetGray}>
        <SvgXml xml={biometrics.face} />
      </Base.View>
      <Base.View mb={'29px'} alignItems={'center'}>
        <Text.Medium mb={'8px'} fontSize={'20px'} color={theme.colors.dark}>
          Enable Biometrics
        </Text.Medium>
        <Text.General fontSize={'14px'} color={theme.colors.dark}>
          Use Finger print to log in
        </Text.General>
      </Base.View>
      <Base.Button
        onPress={() => {
          navigate('Login');
          return handleClose?.();
        }}
        title="Enable Biometrics"
      />
      <SecondaryButton
        onPress={() => {
          navigate('Login');
          return handleClose?.();
        }}>
        <Text.Medium fontSize={'16px'}>Continue without Biometrics</Text.Medium>
      </SecondaryButton>
    </>
  );
};

const SecondaryButton = styled.TouchableOpacity`
  margin-top: 10px;
  justify-content: center;
  width: 100%;
  align-items: center;
`;
