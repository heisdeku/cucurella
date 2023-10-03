import {Base} from '@components/Base';
import {mdiLocation} from '@libs/svgs';
import {SvgXml} from 'react-native-svg';
import {Text} from '@components/Text';
import theme from '@libs/theme';
import {navigate} from '@stacks/helper';
import React from 'react';
import {IDrawerChildProps} from './helper';
import {TouchableOpacity} from 'react-native';
import {useUserStore} from '@store/UserStore';

export const LocationSetDrawer: React.FC<IDrawerChildProps> = ({
  handleClose,
}) => {
  const [currentLocation] = useUserStore(state => [state.user.currentLocation]);
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
      <Base.View
        maxWidth={'290px'}
        mx={'auto'}
        mb={'28px'}
        alignItems={'center'}>
        <Text.Medium
          mb={'3px'}
          textAlign={'center'}
          fontSize={'20px'}
          color={theme.colors.dark}>
          {JSON.parse(currentLocation as string)?.formatted_address}
        </Text.Medium>
        <TouchableOpacity
          onPress={() => {
            navigate('SavedPlaces');
            return handleClose?.();
          }}
          activeOpacity={0.95}>
          <Text.Medium fontSize={'16px'} color={theme.colors.orange07}>
            Not your address?
          </Text.Medium>
        </TouchableOpacity>
      </Base.View>
      <Base.Button
        onPress={() => {
          handleClose?.();
          return navigate('AddAddressSearch');
        }}
        title="Add Address"
      />
    </>
  );
};
