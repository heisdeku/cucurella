import React, {useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import theme from '@libs/theme';
import {Text} from '@components/Text';
import Container from '@components/Container';
import styled from 'styled-components/native';
import {Base} from '@components/Base';
import {navigate} from '@stacks/helper';
import KeyboardWrapper from '@components/KeyboardWrapper';

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
            <Text.Small fontWeight={'500'} mb={'8px'}>
              Phone Number
            </Text.Small>
            <InputField placeholder="Enter your phone number" maxLength={12} />
          </Base.View>
          <Base.View style={styles.container}>
            <Text.General mb="50px">
              Don't have an acccount?{' '}
              <TouchableOpacity onPress={() => console.log('Sign Up clicked')}>
                <Text.General style={styles.signUpLink}>Sign Up</Text.General>
              </TouchableOpacity>
            </Text.General>
          </Base.View>
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
