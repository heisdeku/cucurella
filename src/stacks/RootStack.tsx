import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthStack from './AuthStack';
import {navigationRef} from './helper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppNavigation from './AppStack';
import Onboarding from '@screens/Onboarding';
import {useIsFirstTime} from '@hooks/useIsFirstTime';
import {useAuthStore} from '@store/AuthStore';

const Stack = createNativeStackNavigator();

const Root = () => {
  const [isFirstTime] = useIsFirstTime();
  const [authStatus] = useAuthStore(state => [state.status]);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        {isFirstTime && (
          <Stack.Group>
            <Stack.Screen name="Onboarding" component={Onboarding} />
          </Stack.Group>
        )}
        {!isFirstTime && (
          <Stack.Group>
            {(authStatus === 'idle' || authStatus === 'signOut') && (
              <Stack.Screen name="Authentication" component={AuthStack} />
            )}
            {authStatus === 'signIn' && (
              <Stack.Screen name="App" component={AppNavigation} />
            )}
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
