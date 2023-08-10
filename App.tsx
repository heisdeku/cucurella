import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ThemeProvider} from 'styled-components/native';
import theme from '@libs/theme';
import Root from '@stacks/RootStack';
import {View} from 'react-native';
import {windowHeight} from '@libs/constant';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView>
      <ThemeProvider theme={theme}>
        <View style={{minHeight: windowHeight}}>
          <Root />
        </View>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
