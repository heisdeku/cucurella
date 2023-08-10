import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthStack from './AuthStack';
import {navigationRef} from './helper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Root = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Authentication" component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
