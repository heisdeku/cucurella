import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateAccount from '@screens/Authentication/CreateAccount';
import {VerifyCode} from '@screens/Authentication/VerifyCode';
import MoreInformation from '@screens/Authentication/MoreInformation';
import {PinSetup} from '@screens/Authentication/PinSetup';
import Login from '@screens/Authentication/Login';
import PinConfirm from '@screens/Authentication/PINConfirm';
import EnterPin from '@screens/Authentication/Login/EnterPin';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="LoginEnterPin" component={EnterPin} />
      <Stack.Screen name="Register" component={CreateAccount} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} />
      <Stack.Screen name="MoreInformation" component={MoreInformation} />
      <Stack.Screen name="PinSetup" component={PinSetup} />
      <Stack.Screen name="PinConfirm" component={PinConfirm} />
    </Stack.Navigator>
  );
};

export default AuthStack;
