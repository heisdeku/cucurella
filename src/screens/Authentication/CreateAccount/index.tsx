/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import theme from '@libs/theme';
import {Text} from '@components/Text';
import Container from '@components/Container';
import styled from 'styled-components/native';
import {Base} from '@components/Base';
import {TouchableOpacity} from 'react-native';
import {Row} from '@components/Base/Row';
import {social} from '@libs/svgs';
import {SvgXml} from 'react-native-svg';
import {navigate} from '@stacks/helper';
import KeyboardWrapper from '@components/KeyboardWrapper';
import Input from '@components/Base/Input';

function CreateAccount(): JSX.Element {
  const [type, setType] = useState<'phone' | 'email'>('phone');
  return (
    <KeyboardWrapper hasPaddingTop>
      <Container justifyContent={'space-between'} pt={'29px'}>
        <Base.View>
          <Text.Medium fontSize={'24px'} mb={'34px'}>
            Enter your {type === 'phone' ? 'phone number' : 'email address'}
          </Text.Medium>
          <Input
            label={type === 'phone' ? 'Phone Number' : 'Email Address'}
            placeholder={
              type === 'phone'
                ? 'Enter your 11 digits phone number'
                : 'Enter your email address'
            }
            keyboardType={type === 'phone' ? 'phone-pad' : 'email-address'}
          />
          <Base.Row justifyContent={'flex-start'} mt="10px">
            <Text.Caption fontFamily="500" color={theme.colors.neutral07}>
              Can't receive otp?
            </Text.Caption>
            <TouchableOpacity
              onPress={() => setType(type === 'phone' ? 'email' : 'phone')}>
              <Text.Caption fontFamily="500" color={theme.colors.green08}>
                {' '}
                {type === 'phone'
                  ? 'Use email instead'
                  : 'Use phone number instead'}
              </Text.Caption>
            </TouchableOpacity>
          </Base.Row>
          <Row mb={'24px'} mt={'45%'} alignItems={'center'} mx={'auto'}>
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
        <Base.View>
          <Base.Button
            title="Continue"
            onPress={() => navigate('VerifyCode')}
          />
          <Base.Row justifyContent={'center'} mt={'10px'}>
            <Text.Caption
              fontSize={'14px'}
              fontFamily="500"
              color={theme.colors.neutral07}>
              Have an account?
            </Text.Caption>
            <TouchableOpacity onPress={() => navigate('Login')}>
              <Text.Caption
                fontSize={'14px'}
                fontFamily="500"
                color={theme.colors.green08}>
                {' '}
                Login
              </Text.Caption>
            </TouchableOpacity>
          </Base.Row>
        </Base.View>
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

export default CreateAccount;
