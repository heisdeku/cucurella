import React, {useCallback, useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {Base} from '@components/Base';
import Container from '@components/Container';
import {IS_ANDROID} from '@libs/constant';
import {Text} from '@components/Text';
import {readableInputProps, readOnlyInput} from '@libs/helper';
import KeyboardWrapper from '@components/KeyboardWrapper';
import {createPinViewStyles, FormGroup} from '../styles';
import {useAuthStore} from '@store/AuthStore';
import {client} from '@api/common';
import {handleServerError, showErrorMessage} from '@libs/error';
import {useRoute} from '@react-navigation/native';
const styles = createPinViewStyles();

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
          <Text.Medium fontSize={'24px'} lineHeight={'31px'}>
            Enter your 4-digit account PIN
          </Text.Medium>
          <Base.View mt={'10px'}>
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
                style={styles.inputCode}
                maxLength={5}
                textContentType="oneTimeCode"
                blurOnSubmit={false}
                caretHidden={IS_ANDROID}
              />
              <Base.Row
                height={'54px'}
                width={'231px'}
                mx={'auto'}
                zIndex={'1'}>
                {[0, 1, 2, 3].map(i => (
                  <TextInput
                    key={`${i}`}
                    secureTextEntry={!!splitCode[i]}
                    style={readOnlyInput(60, splitCode[i] ? true : false)}
                    value={splitCode[i] || ''}
                    maxLength={5}
                    blurOnSubmit={false}
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

export default EnterPin;
