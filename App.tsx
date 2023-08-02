import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <SafeAreaView>
          <StatusBar barStyle={'dark-content'} />
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <Text>Welcome to Ofayd</Text>
          </ScrollView>
        </SafeAreaView>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
