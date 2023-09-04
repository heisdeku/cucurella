import {Platform, TextStyle} from 'react-native';
import theme from './theme';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

export const readOnlyInput = (
  size: number,
  isCodeInvalid: boolean,
): TextStyle => {
  return {
    color: theme.colors.black,
    backgroundColor: !isCodeInvalid
      ? theme.colors.neutral01
      : theme.colors.green01,
    fontSize: 25,
    borderWidth: 1,
    borderColor: !isCodeInvalid ? theme.colors.stroke : theme.colors.green07,
    fontFamily: theme.fonts[500],
    height: 54,
    width: 52,
    textAlign: 'center',
    borderRadius: 8,
  };
};

export const requestLocationPermission = async () => {
  try {
    let permission;

    // Check if the app already has permission
    if (Platform.OS === 'ios') {
      permission = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    if (Platform.OS === 'android') {
      permission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } else {
      permission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    // If permission is granted, you can proceed with location-related tasks
    if (permission === RESULTS.GRANTED) {
      // Your code for location-related tasks here
      console.log('code block one');
    } else {
      // If permission is not granted, request it
      if (Platform.OS === 'ios') {
        permission = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      } else {
        permission = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      }

      // Handle the result of the permission request
      if (permission === RESULTS.GRANTED) {
        console.log(`evidenece`);
        // Permission granted, proceed with location-related tasks
      } else {
        // Permission denied, handle accordingly
        // You may want to show a message to the user or disable location features
      }
    }
  } catch (error) {
    console.error('Error requesting location permission:', error);
  }
};
