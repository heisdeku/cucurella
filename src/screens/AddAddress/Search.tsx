import React from 'react';
import theme from '@libs/theme';
import KeyboardWrapper from '@components/KeyboardWrapper';
import {Base} from '@components/Base';
import Container from '@components/Container';
import {Text} from '@components/Text';
import {styled} from 'styled-components/native';
import {Path, Svg, SvgXml} from 'react-native-svg';
import {outlineAdd, outlineMap, search_icon, trash_icon} from '@libs/svgs';
import ScreenHeader from '@components/ScreenHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native';
import {navigate} from '@stacks/helper';

interface IPlace {}

const Place: React.FC<IPlace> = () => {
  return (
    <TouchableOpacity>
      <Base.Row
        borderBottomWidth={'1px'}
        borderBottomColor={theme.colors.neutral03}
        alignItems={'center'}
        padding={'8px'}
        justifyContent={'flex-start'}>
        <SvgXml xml={outlineMap} />
        <Text.Medium ml={'6px'} fontSize={'14px'}>
          Empire homes lekki lagos, Nigeria
        </Text.Medium>
      </Base.Row>
    </TouchableOpacity>
  );
};

const Search = () => {
  return (
    <KeyboardWrapper>
      <ScreenHeader label="Add Address" />

      <Container pt={'24px'}>
        <LocationFiled>
          <SvgXml xml={search_icon} />
          <InputField
            placeholder="Add New Location"
            placeholderTextColor={theme.colors.neutral07}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </LocationFiled>
        <Base.View
          mt={'4px'}
          borderBottomWidth={'1px'}
          borderBottomColor={theme.colors.neutral03}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigate('AddAddressManual')}>
            <Base.Row
              padding={'8px'}
              justifyContent={'flex-start'}
              alignItems={'center'}>
              <SvgXml xml={outlineAdd} />
              <Text.Medium ml={'6px'} fontSize={'14px'}>
                Add your address manually
              </Text.Medium>
            </Base.Row>
          </TouchableOpacity>
        </Base.View>
        <Base.View>
          {new Array(6).fill('').map((_, i) => {
            return <Place key={i} />;
          })}
        </Base.View>
      </Container>
    </KeyboardWrapper>
  );
};

const DeleteButton = styled.TouchableOpacity`
  border-radius: 41px;
  background-color: ${theme.colors.red01};
  width: 27px;
  height: 27px;
  justify-content: center;
  align-items: center;
`;

const LocationFiled = styled.View`
  background-color: ${theme.colors.green01};
  border: 1px solid ${theme.colors.green08};
  padding: 16px 16px;
  height: 50px;
  border-radius: 8px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const InputField = styled.TextInput`
  background-color: transparent;
  flex: 1;
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
  line-height: 15px;
  color: ${theme.colors.black};
  margin-left: 8px;
`;

export default Search;
