/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import theme from '@libs/theme';
import {Text} from '@components/Text';
import Container from '@components/Container';
import styled from 'styled-components/native';
import {Base} from '@components/Base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Row} from '@components/Base/Row';
import PhoneInput from 'react-native-phone-number-input';
import {input_dropdown, social} from '@libs/svgs';
import {SvgXml} from 'react-native-svg';
import {navigate} from '@stacks/helper';
import KeyboardWrapper from '@components/KeyboardWrapper';

function CreateAccount(): JSX.Element {
  const phoneInput = useRef(null);
  const [type, setType] = useState<'phone' | 'email'>('phone');
  return (
    <KeyboardWrapper>
      <Container justifyContent={'space-between'} pt={'29px'}>
        <Base.View>
          <Text.Medium fontSize={'24px'}>
            Enter your {type === 'phone' ? 'phone number' : 'email address'}
          </Text.Medium>
          <InputContainer>
            <Base.View>
              {type === 'phone' && (
                <Base.View>
                  <Text.Small fontWeight={'500'} mb={'8px'}>
                    Phone Number
                  </Text.Small>
                  <PhoneInput
                    ref={phoneInput}
                    defaultCode="NG"
                    layout="first"
                    withShadow={false}
                    textInputProps={{maxLength: 12}}
                    onChangeFormattedText={text => {
                      console.log(text);
                    }}
                    placeholder="Enter your phone number"
                    flagButtonStyle={styles.flagButton}
                    textContainerStyle={styles.textContainer}
                    textInputStyle={styles.textInput}
                    codeTextStyle={styles.codeText}
                    containerStyle={{
                      width: '100%',
                    }}
                    renderDropdownImage={<SvgXml xml={input_dropdown} />}
                  />
                </Base.View>
              )}
              {type === 'email' && (
                <Base.View>
                  <Text.Small fontWeight={'500'} mb={'8px'}>
                    Email Address
                  </Text.Small>
                  <InputField
                    placeholder="Enter your 11 digits phone number"
                    keyboardType="phone-pad"
                  />
                </Base.View>
              )}
              <Base.Row justifyContent={'flex-start'} mt="10px">
                <Text.Caption fontFamily="500" color={theme.colors.neutral07}>
                  Can’t receive otp?
                </Text.Caption>
                <TouchableOpacity
                  onPress={() => setType(type === 'email' ? 'phone' : 'email')}>
                  <Text.Caption fontFamily="500" color={theme.colors.green08}>
                    {' '}
                    Use {type === 'phone' ? 'email' : 'phone number'} instead
                  </Text.Caption>
                </TouchableOpacity>
              </Base.Row>
            </Base.View>
          </InputContainer>
          <Row mb={'24px'} alignItems={'center'} mx={'auto'}>
            <Line />
            <Text.General
              lineHeight={'17.5px'}
              fontWeight={'400'}
              fontSize={'14px'}
              mt={'2px'}
              mx={'16px'}
              color={theme.colors.black}>
              Or sign up with
            </Text.General>
            <Line />
          </Row>
          <Row width={'250px'} mx={'auto'}>
            <SocialAuth activeOpacity={0.8}>
              <SvgXml xml={social.google} />
              <Text.General
                lineHeight={'17.5px'}
                fontWeight={'400'}
                fontSize={'14px'}
                mt={'2px'}
                color={theme.colors.black}>
                Google
              </Text.General>
            </SocialAuth>
            <SocialAuth activeOpacity={0.8}>
              <SvgXml xml={social.apple} />
              <Text.General
                lineHeight={'17.5px'}
                fontWeight={'400'}
                fontSize={'14px'}
                mt={'2px'}
                color={theme.colors.black}>
                Apple
              </Text.General>
            </SocialAuth>
            <SocialAuth activeOpacity={0.8}>
              <SvgXml xml={social.facebook} />
              <Text.General
                lineHeight={'17.5px'}
                fontWeight={'400'}
                fontSize={'14px'}
                mt={'4px'}
                color={theme.colors.black}>
                Facebook
              </Text.General>
            </SocialAuth>
          </Row>
        </Base.View>
        <Base.Button title="Continue" onPress={() => navigate('VerifyCode')} />
      </Container>
    </KeyboardWrapper>
  );
}

const Line = styled.View`
  height: 1px;
  width: 80px;
  background-color: ${theme.colors.neutral03};
`;

const SocialAuth = styled.TouchableOpacity`
  border-radius: 4.529px;
  justify-content: center;
  align-items: center;
  border: 1.136px solid ${theme.colors.neutral03};
  padding: 15px 0px;
  width: 77px;
  height: 66px;
`;

const InputField = styled.TextInput`
  background-color: ${theme.colors.neutral01};
  padding: 19px 16px;
  border: 1px solid ${theme.colors.stroke};
  border-radius: 8px;
  width: 100%;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: 15px;
  color: ${theme.colors.neutral07};
`;

const InputContainer = styled.View`
  margin: 28px 0 85px;
`;

const styles = StyleSheet.create({
  flagButton: {
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    borderRadius: 8,
    height: 50,
    backgroundColor: theme.colors.neutral01,
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    borderRadius: 8,
    height: 50,
    backgroundColor: theme.colors.neutral01,
  },
  textInput: {
    fontSize: 12,
    color: theme.colors.neutral07,
    fontWeight: '300',
    lineHeight: 15,
  },
  codeText: {
    fontSize: 12,
    display: 'none',
  },
});

export default CreateAccount;
