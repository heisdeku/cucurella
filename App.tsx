import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ThemeProvider} from 'styled-components/native';
import theme from '@libs/theme';
import Root from '@stacks/RootStack';
import {StyleSheet} from 'react-native';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.root}>
      <KeyboardProvider statusBarTranslucent>
        <ThemeProvider theme={theme}>
          <BottomSheetModalProvider>
            <Root />
          </BottomSheetModalProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

export default App;
