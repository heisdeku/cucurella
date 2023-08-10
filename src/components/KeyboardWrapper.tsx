/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import MainAppBaseView from '@components/AppSafeView';

import {Keyboard, KeyboardAvoidingView, ScrollView} from 'react-native';

import {IS_ANDROID, windowHeight} from '@libs/constant';

function KeyboardWrapper({children}: {children: any}) {
  return (
    <MainAppBaseView>
      <KeyboardAvoidingView
        behavior={IS_ANDROID ? 'height' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            minHeight: windowHeight - 80,
            paddingBottom: 79,
          }}
          onTouchStart={() => {
            Keyboard.dismiss();
          }}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </MainAppBaseView>
  );
}

export default KeyboardWrapper;
