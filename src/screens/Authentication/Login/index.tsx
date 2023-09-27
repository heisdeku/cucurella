import React, {useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import theme from '@libs/theme';
import {Text} from '@components/Text';
import Container from '@components/Container';
import styled from 'styled-components/native';
import {Base} from '@components/Base';
import {navigate} from '@stacks/helper';
import KeyboardWrapper from '@components/KeyboardWrapper';
import Input from '@components/Base/Input';

const Login: React.FC = (): JSX.Element => {
  return (
    <KeyboardWrapper hasPaddingTop>
      <Container justifyContent={'space-between'} pt={'29px'}>
        <Base.View>
          <Text.Medium fontSize={'24px'} mb={'34px'}>
            Welcome, Login to continue
          </Text.Medium>
          <Base.View>
            <Input label="Phone Number" placeholder="08082134567" />
          </Base.View>
          <Base.Row mt={10} justifyContent={'flex-start'}>
            <Text.General>Don't have an acccount? </Text.General>
            <TouchableOpacity onPress={() => console.log('Sign Up clicked')}>
              <Text.General style={styles.signUpLink}>Sign Up</Text.General>
            </TouchableOpacity>
          </Base.Row>
        </Base.View>
        <Base.View>
          <Base.Button
            title="Continue"
            alignSelf="flex-end"
            onPress={() => navigate('App')}
          />
          <TouchableOpacity
            style={styles.footer}
            onPress={() => navigate('App')}>
            <Text.Medium fontSize={'14px'}>Continue as a guest</Text.Medium>
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
