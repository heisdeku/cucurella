import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {Base} from '@components/Base';
import Container from '@components/Container';
import {IS_ANDROID} from '@libs/constant';
import {Text} from '@components/Text';
import {readOnlyInput} from '@libs/helper';
import {styled} from 'styled-components/native';
import {navigate} from '@stacks/helper';
import theme from '@libs/theme';
import KeyboardWrapper from '@components/KeyboardWrapper';

const styles = createStyles();

const readableInputProps: TextInputProps = {
  editable: false,
  autoCapitalize: 'none',
  keyboardType: 'number-pad',
  selectionColor: 'transparent',
  maxLength: 4,
};

export const PinSetup: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const createRef = useRef<any>(null);
  const [
    isInvalid,
    // setIsInvalid
  ] = useState<boolean>(false);
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
    if (isInvalid) {
      setCode('');
    }
  }, [isInvalid]);

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
          onPress={() => navigate('PinConfirm')}
          disabled={btnDisabled}
        />
      </Container>
    </KeyboardWrapper>
  );
};

const FormGroup = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 54px;
  width: 250px;
  margin: 0 auto 42px;
`;

function createStyles() {
  return StyleSheet.create({
    inputCode: {
      color: 'transparent',
      fontSize: 30,
      flex: 1,
      paddingLeft: 60,
      letterSpacing: 55,
      height: 54,
      position: 'absolute',
      zIndex: 2,
      top: 0,
      left: 0,
      textAlign: 'center',
      width: '100%',
      backgroundColor: 'transparent',
    },
  });
}
