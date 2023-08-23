import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {Base} from '@components/Base';
import Container from '@components/Container';
import {IS_ANDROID} from '@libs/constant';
import {Text} from '@components/Text';
import {readOnlyInput} from '@libs/helper';
import {styled} from 'styled-components/native';
import theme from '@libs/theme';
import KeyboardWrapper from '@components/KeyboardWrapper';
import {
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import CustomBackdrop from '@components/CustomBackdrop';
import {SvgXml} from 'react-native-svg';
import {biometrics, close_icon} from '@libs/svgs';

const styles = createStyles();

const readableInputProps: TextInputProps = {
  editable: false,
  autoCapitalize: 'none',
  keyboardType: 'number-pad',
  selectionColor: 'transparent',
  maxLength: 4,
};

export const PinConfirm: React.FC = () => {
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

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const initialSnapPoints = useMemo(() => ['25%', 'CONTENT_HEIGHT'], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  return (
    <KeyboardWrapper>
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
          onPress={() => handlePresentModalPress()}
          disabled={btnDisabled}
        />
      </Container>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={animatedSnapPoints}
        onChange={handleSheetChanges}
        handleStyle={{display: 'none'}}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        backdropComponent={({animatedIndex, style, animatedPosition}) => (
          <CustomBackdrop
            animatedPosition={animatedPosition}
            animatedIndex={animatedIndex}
            style={style}
          />
        )}>
        <BottomSheetView onLayout={handleContentLayout}>
          <Base.View px={'20px'} py="26px" mb={'45px'}>
            <Close>
              <SvgXml xml={close_icon} />
            </Close>
            <Base.View
              width={'64px'}
              height="64px"
              borderRadius={'49px'}
              mx={'auto'}
              mb="18px"
              justifyContent={'center'}
              alignItems={'center'}
              backgroundColor={theme.colors.offsetGray}>
              <SvgXml xml={biometrics.face} />
            </Base.View>
            <Base.View mb={'29px'} alignItems={'center'}>
              <Text.Medium
                mb={'8px'}
                fontSize={'20px'}
                color={theme.colors.dark}>
                Enable Biometrics
              </Text.Medium>
              <Text.General fontSize={'14px'} color={theme.colors.dark}>
                Use Finger print to log in
              </Text.General>
            </Base.View>
            <Base.Button title="Enable Biometrics" />
            <ContinueWithoutBiometrics>
              <Text.Medium fontSize={'16px'}>
                Continue without Biometrics
              </Text.Medium>
            </ContinueWithoutBiometrics>
          </Base.View>
        </BottomSheetView>
      </BottomSheetModal>
    </KeyboardWrapper>
  );
};

const Close = styled.TouchableOpacity`
  background-color: ${theme.colors.offsetGray2};
  height: 35px;
  width: 35px;
  margin-left: auto;
  border-radius: 9999px;
  justify-content: center;
  align-items: center;
  margin-bottom: 7px;
`;

const ContinueWithoutBiometrics = styled.TouchableOpacity`
  margin-top: 10px;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

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
