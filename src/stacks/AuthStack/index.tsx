import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateAccount from '@screens/Authentication/CreateAccount';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Register" component={CreateAccount} />
    </Stack.Navigator>
  );
};

export default AuthStack;
