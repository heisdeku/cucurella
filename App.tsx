import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ThemeProvider} from 'styled-components/native';
import theme from '@libs/theme';
import Root from '@stacks/RootStack';
import {StyleSheet} from 'react-native';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {APIProvider} from '@api/common';
import {hydrateAuth} from './src/store/AuthStore';
import BootSplash from 'react-native-bootsplash';

hydrateAuth();
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
function App(): JSX.Element {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      return await BootSplash.hide({fade: true});
    });
  }, []);
  return (
    <GestureHandlerRootView style={styles.root}>
      <KeyboardProvider statusBarTranslucent>
        <ThemeProvider theme={theme}>
          <APIProvider>
            <BottomSheetModalProvider>
              <Root />
            </BottomSheetModalProvider>
          </APIProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

export default App;
