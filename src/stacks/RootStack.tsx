import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthStack from './AuthStack';
import {navigationRef} from './helper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppNavigation from './AppStack';
import Onboarding from '@screens/Onboarding';
import {useIsFirstTime} from '@hooks/useIsFirstTime';

const Stack = createNativeStackNavigator();

const Root = () => {
  const [isFirstTime] = useIsFirstTime();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isFirstTime && (
          <Stack.Group>
            <Stack.Screen name="Onboarding" component={Onboarding} />
          </Stack.Group>
        )}
        {!isFirstTime && (
          <Stack.Group>
            <Stack.Screen name="Authentication" component={AuthStack} />
            <Stack.Screen name="App" component={AppNavigation} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
