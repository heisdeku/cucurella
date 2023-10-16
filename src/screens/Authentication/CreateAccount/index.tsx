/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
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
import {useOnboardingStore} from '@store/OnboardingStore';
import {client} from '@api/common';
import {handleServerError, showErrorMessage} from '@libs/error';
import {showMessage} from 'react-native-flash-message';
import updateStatusBar from '@hooks/updateStatusBar';

function CreateAccount(): JSX.Element {
  updateStatusBar('dark-content');

  const [value, setValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // GET both the updateStateItem and source values from the onboarding State
  const [updateStateItem, source] = useOnboardingStore(state => [
    state.updateStateItem,
    state.source,
  ]);

  const handleChangeOnboardingSource = () => {
    return updateStateItem('source', source === 'phone' ? 'email' : 'phone');
  };
  const handleCreateAccount = async () => {
    setIsLoading(true);
    const key = source === 'phone' ? 'phoneNumber' : 'email';
    try {
      const response = await client.post(`/user/register/${source}`, {
        [key]: value,
      });
      if (response.status === 200) {
        updateStateItem(key, value);
        setIsLoading(false);
        navigate('VerifyCode', {source});
        return showMessage({message: `Kindly check your ${key} for the OTP`});
      }
    } catch (e) {
      const message = handleServerError(e);
      setIsLoading(false);
      return showErrorMessage(message);
    }
  };

  return (
    <KeyboardWrapper hasPaddingTop>
      <Container justifyContent={'space-between'} pt={'29px'}>
        <Base.View>
          <Text.Medium fontSize={'24px'} mb={'34px'}>
            Enter your {source === 'phone' ? 'phone number' : 'email address'}
          </Text.Medium>
          <Input
            label={source === 'phone' ? 'Phone Number' : 'Email Address'}
            placeholder={
              source === 'phone'
                ? 'Enter your 11 digits phone number'
                : 'Enter your email address'
            }
            value={value}
            //@ts-ignore
            setValue={setValue}
            keyboardType={source === 'phone' ? 'phone-pad' : 'email-address'}
          />
          <Base.Row justifyContent={'flex-start'} mt="10px">
            <Text.Caption fontFamily="500" color={theme.colors.neutral07}>
              Can't receive otp?
            </Text.Caption>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handleChangeOnboardingSource()}>
              <Text.Caption fontFamily="500" color={theme.colors.green08}>
                {' '}
                {source === 'phone'
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
            // onPress={() => }
            onPress={() => handleCreateAccount()}
            disabled={
              !value || (source === 'phone' && value.length < 10) || isLoading
            }
            isLoading={isLoading}
          />
          <TouchableOpacity onPress={() => navigate('Login')}>
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
          </TouchableOpacity>
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
