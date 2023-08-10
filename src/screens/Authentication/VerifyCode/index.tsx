import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {Base} from '@components/Base';
import Container from '@components/Container';
import {IS_ANDROID} from '@libs/constant';
import {Text} from '@components/Text';
import {readOnlyInput} from '@libs/helper';
import MainAppBaseView from '@components/AppSafeView';
import {styled} from 'styled-components/native';
import {navigate} from '@stacks/helper';

const styles = createStyles();

export const VerifyCode: React.FC = () => {
  const [pinCode, setPinCode] = useState<string>('');
  const [
    isInvalid,
    // setIsInvalid
  ] = useState<boolean>(false);
  //   const [btnDisbled, setBtnDisabled] = useState<boolean>(true);

  const inputRef = useRef<any>(null);

  const splitCode = pinCode.split('');
  const readableInputProps: TextInputProps = {
    editable: false,
    autoCapitalize: 'none',
    keyboardType: 'number-pad',
    selectionColor: 'transparent',
    maxLength: 4,
  };

  const resetAll = () => {
    setPinCode('');
  };

  const handleTextChange = useCallback((value = '') => {
    if (value.length > 4) {
      return;
    }
    setPinCode(value);
  }, []);

  useEffect(() => {
    if (isInvalid) {
      setPinCode('');
    }
  }, [isInvalid]);

  useEffect(() => {
    if (pinCode.length > 3) {
      setBtnDisabled(false);
    }
  }, [pinCode]);

  return (
    <MainAppBaseView>
      <Container pb={'70px'} pt={'29px'}>
        <Base.View mb={'168px'}>
          <Text.Medium fontSize={'24px'} lineHeight={'31px'}>
            Enter the 4-digit code sent to your email address
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
          onPress={() => navigate('MoreInformation')}
        />
      </Container>
    </MainAppBaseView>
  );
};

const FormGroup = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 54px;
  width: 250px;
  margin: 40px auto 0;
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
