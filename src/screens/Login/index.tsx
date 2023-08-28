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
    <KeyboardWrapper>
      <Container justifyContent={'space-between'} pt={'29px'}>
        <Base.View>
          <Text.Medium fontSize={'24px'} mb={'34px'}>
            Welcome, Login to continue
          </Text.Medium>
          <Input
            label="Phone Number"
            placeholder="Enter your 11 digits phone number"
            keyboardType="phone-pad"
          />
          <Base.Row justifyContent={'flex-start'} mt="10px">
            <Text.Caption fontFamily="400" color={theme.colors.neutral07}>
              Don't have an account
            </Text.Caption>
            <TouchableOpacity onPress={() => navigate('Register')}>
              <Text.Caption fontFamily="400" color={theme.colors.green08}>
                {' '}
                Sign up
              </Text.Caption>
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
