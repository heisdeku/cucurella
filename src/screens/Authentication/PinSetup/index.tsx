import React, {useCallback, useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {Base} from '@components/Base';
import Container from '@components/Container';
import {IS_ANDROID} from '@libs/constant';
import {Text} from '@components/Text';
import {readableInputProps, readOnlyInput} from '@libs/helper';
import {navigate} from '@stacks/helper';
import theme from '@libs/theme';
import KeyboardWrapper from '@components/KeyboardWrapper';
import {createPinViewStyles, FormGroup} from '../styles';
import {useOnboardingStore} from '@store/OnboardingStore';

const styles = createPinViewStyles();

export const PinSetup: React.FC = () => {
  const [updateStateItem] = useOnboardingStore(state => [
    state.updateStateItem,
  ]);
  const [code, setCode] = useState<string>('');
  const createRef = useRef<any>(null);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

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

  useEffect(() => {
    if (code.length > 3) {
      setBtnDisabled(false);
    }
  }, [code]);

  const handleContinue = () => {
    updateStateItem('pin', code);
    return navigate('PinConfirm');
  };

  return (
    <KeyboardWrapper hasPaddingTop>
      <Container justifyContent={'space-between'} pt={'29px'}>
        <Base.View>
          <Text.Medium fontSize={'24px'} lineHeight={'31px'}>
            Create a four digit pin
          </Text.Medium>
          <Text.General mt={'8px'} color={theme.colors.neutral07}>
            Use this pin when you want to log in next time
          </Text.General>
          <Base.View mt={'40px'}>
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
          onPress={() => handleContinue()}
          disabled={btnDisabled}
        />
      </Container>
    </KeyboardWrapper>
  );
};
