import React from 'react';
import {Keyboard, KeyboardAvoidingView, ScrollView} from 'react-native';
import {IS_ANDROID, windowHeight} from '@libs/constant';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IKeyboardWrapper {
  children: any;
  hasPaddingTop?: boolean;
}
function KeyboardWrapper({children, hasPaddingTop}: IKeyboardWrapper) {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      behavior={IS_ANDROID ? 'height' : 'height'}
      style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: windowHeight - 40,
          paddingBottom: 20,
          paddingTop: hasPaddingTop ? insets.top : 0,
        }}
        onTouchStart={() => {
          Keyboard.dismiss();
        }}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default KeyboardWrapper;
