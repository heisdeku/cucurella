import {styled} from 'styled-components/native';
import {Base} from '@components/Base';
import {mdiLocation} from '@libs/svgs';
import {SvgXml} from 'react-native-svg';
import {Text} from '@components/Text';
import theme from '@libs/theme';
import {navigate} from '@stacks/helper';
import {requestLocationPermission} from '@libs/helper';
import React from 'react';
import {IDrawerChildProps} from './helper';
import {TouchableOpacity} from 'react-native';

export const LocationSetDrawer: React.FC<IDrawerChildProps> = ({
  handleClose,
}) => {
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
          mb={'3px'}
          textAlign={'center'}
          fontSize={'20px'}
          color={theme.colors.dark}>
          26B empire homes estate chevron drive Lekki
        </Text.Medium>
        <TouchableOpacity
          onPress={() => {
            handleClose?.();
            return navigate('AddAddressSearch');
          }}>
          <Text.Medium fontSize={'16px'} color={theme.colors.orange07}>
            Not your address?
          </Text.Medium>
        </TouchableOpacity>
      </Base.View>
      <Base.Button onPress={() => handleClose?.()} title="Add Address" />
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
