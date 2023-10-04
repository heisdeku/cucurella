import React, {useCallback, useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {Base} from '@components/Base';
import Container from '@components/Container';
import {IS_ANDROID} from '@libs/constant';
import {Text} from '@components/Text';
import {readableInputProps, readOnlyInput} from '@libs/helper';
import {navigate} from '@stacks/helper';
import KeyboardWrapper from '@components/KeyboardWrapper';
import {useOnboardingStore} from '@store/OnboardingStore';
import {createPinViewStyles, FormGroup} from '../styles';
import {useRoute} from '@react-navigation/native';

export const VerifyCode = () => {
  const params = useRoute().params as {source: string};
  const [updateStateItem] = useOnboardingStore(state => [
    state.updateStateItem,
  ]);
  const [pinCode, setPinCode] = useState<string>('');
  const [btnDisbled, setBtnDisabled] = useState<boolean>(true);

  const styles = createPinViewStyles();
  const inputRef = useRef<any>(null);

  const splitCode = pinCode.split('');

  const resetAll = () => {
    setPinCode('');
  };

  const handleTextChange = useCallback((value = '') => {
    if (value.length > 4) {
      return;
    }
    setPinCode(value);
  }, []);

  const handlePinComplete = () => {
    updateStateItem('otp', pinCode);
    return navigate('MoreInformation', {source: params?.source});
  };

  useEffect(() => {
    if (pinCode.length > 3) {
      setBtnDisabled(false);
    }
  }, [pinCode]);

  return (
    <KeyboardWrapper hasPaddingTop>
      <Container pt={'29px'}>
        <Base.View mb={'auto'}>
          <Text.Medium fontSize={'24px'} lineHeight={'31px'}>
            Enter the 4-digit code sent to your{' '}
            {params?.source === 'email' ? 'email address' : 'phone number'}
          </Text.Medium>
          <FormGroup>
            <TextInput
              ref={inputRef}
              autoFocus={true}
              onFocus={resetAll}
              autoCapitalize="none"
              keyboardType="number-pad"
              value={pinCode}
              selectionColor="transparent"
              onChangeText={handleTextChange}
              style={styles.inputCode}
              maxLength={5}
              textContentType="oneTimeCode"
              blurOnSubmit={false}
              caretHidden={IS_ANDROID}
            />
            <Base.Row height={'54px'} width={'231px'} mx={'auto'} zIndex={'1'}>
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
        <Base.Button
          title="Continue"
          onPress={() => handlePinComplete()}
          disabled={btnDisbled}
        />
      </Container>
    </KeyboardWrapper>
  );
};
