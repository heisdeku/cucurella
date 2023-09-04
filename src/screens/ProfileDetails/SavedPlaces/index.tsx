import React from 'react';
import theme from '@libs/theme';
import KeyboardWrapper from '@components/KeyboardWrapper';
import {Base} from '@components/Base';
import Container from '@components/Container';
import {Text} from '@components/Text';
import {styled} from 'styled-components/native';
import {Path, Svg, SvgXml} from 'react-native-svg';
import {arrowRight, trash_icon} from '@libs/svgs';
import {TouchableOpacity} from 'react-native';
import {goBack} from '@stacks/helper';

const SavedPlaces = () => {
  return (
    <KeyboardWrapper>
      <Base.Row
        pb={'16px'}
        px={'20px'}
        pt={'16px'}
        backgroundColor={theme.colors.white}
        borderBottomWidth={'1px'}
        borderBottomColor={theme.colors.neutral03}
        justifyContent={'flex-start'}
        alignItems={'center'}>
        <TouchableOpacity onPress={() => goBack()}>
          <SvgXml xml={arrowRight} />
        </TouchableOpacity>
        <Text.Medium
          mx={'auto'}
          flex={'1'}
          fontFamily={'700'}
          textAlign={'center'}>
          Saved places
        </Text.Medium>
        <Base.View width={'10%'} />
      </Base.Row>
      <Container pt={'24px'}>
        <LocationFiled>
          <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <Path
              d="M12 8.5H4C3.72667 8.5 3.5 8.27333 3.5 8C3.5 7.72667 3.72667 7.5 4 7.5H12C12.2733 7.5 12.5 7.72667 12.5 8C12.5 8.27333 12.2733 8.5 12 8.5Z"
              fill="#64748B"
            />
            <Path
              d="M8 12.5C7.72667 12.5 7.5 12.2733 7.5 12V4C7.5 3.72667 7.72667 3.5 8 3.5C8.27333 3.5 8.5 3.72667 8.5 4V12C8.5 12.2733 8.27333 12.5 8 12.5Z"
              fill="#64748B"
            />
          </Svg>
          <InputField
            placeholder="Add New Location"
            placeholderTextColor={theme.colors.neutral07}
          />
        </LocationFiled>
        <Base.View my={'14px'}>
          {new Array(6).fill('').map((_, i) => {
            return (
              <Base.Row
                key={i}
                borderBottomWidth={'1px'}
                borderBottomColor={theme.colors.neutral03}
                alignItems={'center'}
                px={'8px'}
                py={'16px'}>
                <Text.Medium fontSize={'14px'}>
                  Empire homes lekki lagos, Nigeria
                </Text.Medium>
                <DeleteButton>
                  <SvgXml xml={trash_icon} />
                </DeleteButton>
              </Base.Row>
            );
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
  background-color: ${theme.colors.neutral01};
  padding: 19px 16px;
  border: 1px solid ${theme.colors.stroke};
  border-radius: 8px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const InputField = styled.TextInput`
  background-color: transparent;
  flex: 1;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: 15px;
  color: ${theme.colors.neutral07};
  margin-left: 8px;
`;

export default SavedPlaces;
