import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {Base} from '@components/Base';
import Container from '@components/Container';
import {IS_ANDROID, IS_IOS} from '@libs/constant';
import {Text} from '@components/Text';
import {readableInputProps} from '@libs/helper';
import KeyboardWrapper from '@components/KeyboardWrapper';

import {useAuthStore} from '@store/AuthStore';
import {client} from '@api/common';
import {handleServerError, showErrorMessage} from '@libs/error';
import {useRoute} from '@react-navigation/native';
import theme from '@libs/theme';
import styled from 'styled-components/native';

const EnterPin: React.FC = () => {
  const {phoneNumber} = useRoute().params as {phoneNumber: string};

  const [authenticate] = useAuthStore(state => [state.authenticate]);

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string>('');
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

  const createRef = useRef<TextInput>(null);

  const splitCode = code.split('');

  const resetAll = () => {
    setCode('');
  };

  const handleTextChange = useCallback((value = '') => {
    if (value.length > 4) {
      return;
    }
    setCode(value);
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await client.post(`/user/login/phone`, {
        phoneNumber,
        pin: code,
      });
      if (response.status === 200 || response.status === 201) {
        const {token} = response.data.data;
        setLoading(false);
        return authenticate({accessToken: token});
      }
    } catch (e) {
      setLoading(false);
      const message = handleServerError(e);
      return showErrorMessage(message);
    }
  };

  useEffect(() => {
    if (code.length > 3) {
      setBtnDisabled(false);
    }
  }, [code]);

  return (
    <KeyboardWrapper hasPaddingTop>
      <Container justifyContent={'space-between'} pt={'29px'}>
        <Base.View>
          <Text.Medium fontSize={'24px'} lineHeight={'31px'} width="90%">
            Welcome back, Enter your 4-Digit Pin
          </Text.Medium>
          <Base.Row mt={13} justifyContent={'flex-start'}>
            <Text.General color={'#809C98'}>Not your acccount? </Text.General>
            <TouchableOpacity onPress={() => {}}>
              <Text.General fontWeight={'500'} style={style.signUpLink}>
                Log Out
              </Text.General>
            </TouchableOpacity>
          </Base.Row>
          <Base.View mt={'28px'}>
            <FormGroup>
              <TextInput
                ref={createRef}
                autoFocus={true}
                onFocus={resetAll}
                autoCapitalize="none"
                keyboardType="number-pad"
                value={code}
                selectionColor="transparent"
                onChangeText={handleTextChange}
                style={style.inputCode}
                maxLength={5}
                textContentType="oneTimeCode"
                blurOnSubmit={false}
                caretHidden={IS_ANDROID}
              />
              <Base.Row
                height={'33px'}
                width={'100%'}
                paddingX={14}
                zIndex={'1'}>
                {[0, 1, 2, 3].map(i => (
                  <View
                    key={`${i}`}
                    style={readOnlyInput(splitCode[i] ? true : false)}
                    value={splitCode[i] || ''}
                    maxLength={5}
                    caretHidden={IS_ANDROID}
                    {...readableInputProps}
                  />
                ))}
              </Base.Row>
            </FormGroup>
          </Base.View>
        </Base.View>
        <Base.Button
          title="Continue"
          onPress={() => handleLogin()}
          disabled={btnDisabled || loading}
          isLoading={loading}
        />
      </Container>
    </KeyboardWrapper>
  );
};

export const FormGroup = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 33px;
  width: 80px;
  background-color: #f8fafc;
  border: 1px solid #edf0f4;
  border-radius: 8px;
`;

const style = StyleSheet.create({
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
  inputCode: {
    color: 'transparent',
    fontSize: 30,
    flex: 1,
    paddingLeft: 60,
    letterSpacing: 55,
    height: 33,
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    textAlign: 'center',
    width: '100%',
    backgroundColor: 'transparent',
  },
});

export const readOnlyInput = (isCodeInvalid: boolean) => {
  return {
    backgroundColor: !isCodeInvalid ? '#94A3B8' : theme.colors.black,
    width: 4,
    height: 4,
    borderRadius: 10,
    fontFamily: theme.fonts[500],
    textAlign: 'center',
  };
};

export default EnterPin;
