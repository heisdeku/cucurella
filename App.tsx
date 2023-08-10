import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ThemeProvider} from 'styled-components/native';
import theme from '@libs/theme';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <SafeAreaView>
            <StatusBar barStyle={'dark-content'} />
            <ScrollView contentInsetAdjustmentBehavior="automatic">
              <Text>Welcome to Ofayd</Text>
            </ScrollView>
          </SafeAreaView>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
