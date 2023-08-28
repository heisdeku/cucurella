import React, {useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import theme from '@libs/theme';
import {Text} from '@components/Text';
import Container from '@components/Container';
import styled from 'styled-components/native';
import {Base} from '@components/Base';
import {Row} from '@components/Base/Row';
import {input_dropdown, social} from '@libs/svgs';
import {navigate} from '@stacks/helper';
import KeyboardWrapper from '@components/KeyboardWrapper';
import PhoneInput from 'react-native-phone-number-input';
import {TextInput} from 'react-native-gesture-handler';

// interface Props {
//   name?: string;
// }

const Login: React.FC = (): JSX.Element => {
  const phoneInput = useRef(null);
  const [type, setType] = useState<'phone' | 'email'>('phone');
  return (
    <KeyboardWrapper>
      <Container justifyContent={'space-between'} pt={'29px'}>
        <Base.View>
          <Text.Medium fontSize={'24px'}>
            Welcome, Login to continue
          </Text.Medium>
          <Base.View mt="40px">
            <Text.Small fontWeight={'500'} mb={'10px'}>
              Phone Number
            </Text.Small>
            <InputField placeholder="Enter your phone number" maxLength={12} />
          </Base.View>
          <Base.Row justifyContent="flex-start" mt="10px">
            <Text.Caption fontFamily="500" color={theme.colors.neutral07}>
              Don't have an account? {''}
            </Text.Caption>
            <TouchableOpacity onPress={() => console.log('Sign up clicked')}>
              <Text.Caption fontFamily="500" color={theme.colors.green08}>
                Sign Up
              </Text.Caption>
            </TouchableOpacity>
          </Base.Row>
        </Base.View>
        <Base.View>
          <Base.Button
            title="Continue"
            alignSelf="flex-end"
            onPress={() => navigate('VerifyCode')}
          />
          <TouchableOpacity
            style={styles.footer}
            onPress={() => console.log('Continue as a guest')}>
            <Text.Medium>Continue as a guest</Text.Medium>
          </TouchableOpacity>
        </Base.View>
      </Container>
    </KeyboardWrapper>
  );
};

const InputField = styled.TextInput`
  background-color: ${theme.colors.neutral01};
  border: 1px solid ${theme.colors.stroke};
  border-radius: 8px;
  width: 100%;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  color: ${theme.colors.neutral07};
  height: 50px;
  padding-left: 10px;
`;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 10,
  },

  footer: {
    alignItems: 'center',
  },

  signUpLink: {
    color: theme.colors.green08,
  },
});

export default Login;
