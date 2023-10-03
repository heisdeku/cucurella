import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import theme from '@libs/theme';
import {Text} from '@components/Text';
import Container from '@components/Container';
import {Base} from '@components/Base';
import {navigate} from '@stacks/helper';
import KeyboardWrapper from '@components/KeyboardWrapper';
import Input from '@components/Base/Input';
import {handleContinueAsGuest} from '@store/UserStore';

const Login: React.FC = (): JSX.Element => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  return (
    <KeyboardWrapper hasPaddingTop>
      <Container justifyContent={'space-between'} pt={'29px'}>
        <Base.View>
          <Text.Medium fontSize={'24px'} mb={'34px'}>
            Welcome, Login to continue
          </Text.Medium>
          <Base.View>
            <Input
              label="Phone Number"
              keyboardType="number-pad"
              placeholder="08082134567"
              value={phoneNumber}
              setValue={setPhoneNumber}
            />
          </Base.View>
          <Base.Row mt={10} justifyContent={'flex-start'}>
            <Text.General>Don't have an acccount? </Text.General>
            <TouchableOpacity onPress={() => navigate('Register')}>
              <Text.General style={styles.signUpLink}>Sign Up</Text.General>
            </TouchableOpacity>
          </Base.Row>
        </Base.View>
        <Base.View>
          <Base.Button
            title="Continue"
            alignSelf="flex-end"
            onPress={() => navigate('LoginEnterPin', {phoneNumber})}
            disabled={!phoneNumber || phoneNumber?.length < 10}
          />
          <TouchableOpacity
            style={styles.footer}
            onPress={() => handleContinueAsGuest()}>
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
    marginTop: 10,
  },
  signUpLink: {
    color: theme.colors.green08,
  },
});

export default Login;
