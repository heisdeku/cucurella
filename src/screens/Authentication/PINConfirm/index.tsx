import React, {useCallback, useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {Base} from '@components/Base';
import Container from '@components/Container';
import {IS_ANDROID} from '@libs/constant';
import {Text} from '@components/Text';
import {readableInputProps, readOnlyInput} from '@libs/helper';
import theme from '@libs/theme';
import KeyboardWrapper from '@components/KeyboardWrapper';
import withBottomDrawer from '@components/withBottomDrawer';
import {DRAWER_CONSTANTS} from '@components/withBottomDrawer/constants';
import {IDrawerChildProps} from '@components/withBottomDrawer/helper';
import {createPinViewStyles, FormGroup} from '../styles';
import {useOnboardingStore} from '@store/OnboardingStore';

const styles = createPinViewStyles();

const PinConfirm: React.FC<IDrawerChildProps> = ({handleOpen}) => {
  const [userCreatedPin] = useOnboardingStore(state => [state.pin]);
  const [code, setCode] = useState<string>('');
  const createRef = useRef<TextInput>(null);

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

  return (
    <KeyboardWrapper hasPaddingTop>
      <Container justifyContent={'space-between'} pt={'29px'}>
        <Base.View>
          <Text.Medium fontSize={'24px'} lineHeight={'31px'}>
            Confirm Pin
          </Text.Medium>
          <Text.General mt={'8px'} color={theme.colors.neutral07}>
            Enter your pin again
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
          onPress={() => handleOpen?.(DRAWER_CONSTANTS.biometrics)}
          disabled={btnDisabled}
        />
      </Container>
    </KeyboardWrapper>
  );
};

export default withBottomDrawer(PinConfirm);
