import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthStack from './AuthStack';
import {navigationRef} from './helper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppNavigation from './AppStack';
import Onboarding from '@screens/Onboarding';

const Stack = createNativeStackNavigator();

const Root = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Authentication" component={AuthStack} />
        <Stack.Screen name="App" component={AppNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
