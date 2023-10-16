import {styled} from 'styled-components/native';
import {Base} from '@components/Base';
import {mdiLocation} from '@libs/svgs';
import {SvgXml} from 'react-native-svg';
import {Text} from '@components/Text';
import theme from '@libs/theme';
import React from 'react';
import {IDrawerChildProps} from './helper';
import {useGlobalStore} from '@store/GlobalStore';
import {DRAWER_CONSTANTS} from './constants';
import {requestLocationPermissions} from '@libs/geolocation';
import {useUserStore} from '@store/UserStore';

export const LocationDrawer: React.FC<IDrawerChildProps> = ({
  handleClose,
  handleOpen,
}) => {
  const [isFirstTimeLogin, setFirstTimeLogin] = useGlobalStore(state => [
    state.firstTimeLogin,
    state.setFirstTimeLogin,
  ]);
  const [updateCurrentLocation] = useUserStore(state => [
    state.updateCurrentLocation,
  ]);

  const handleAllowLocationPermission = async () => {
    //@ts-ignore
    const data = await requestLocationPermissions();
    if (data?.address || data?.coordinates) {
      updateCurrentLocation(
        JSON.stringify({
          ...data?.coordinates,
          formatted_address: data?.address,
        }),
      );
      setFirstTimeLogin(false);
      return handleClose?.();
    }
    return handleClose?.();
  };

  const handleContinueWithoutLocation = () => {
    setFirstTimeLogin(false);
    handleOpen?.(DRAWER_CONSTANTS.addPaymentMethod);
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
        backgroundColor={theme.colors.greenRandom}>
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
        onPress={() => handleAllowLocationPermission()}
        title="Allow"
      />
      {isFirstTimeLogin && (
        <SecondaryButton onPress={() => handleContinueWithoutLocation()}>
          <Text.Medium fontSize={'16px'}>Continue without location</Text.Medium>
        </SecondaryButton>
      )}
    </>
  );
};

const SecondaryButton = styled.TouchableOpacity`
  margin-top: 10px;
  justify-content: center;
  width: 100%;
  align-items: center;
`;
