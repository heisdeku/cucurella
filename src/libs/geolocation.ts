import {getPostCodeAddressFromLatAndLong} from '@api/location';
import {Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {IS_ANDROID, IS_IOS} from './constant';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import {useGlobalStore} from '@store/GlobalStore';

type Coords = {
  latitude: string;
  longitude: string;
};

export interface IPermissionResTrue {
  address: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
}

export const requestLocationPermission = async () => {
  const {setLocationGranted} = useGlobalStore.getState();
  try {
    let permission;
    // Check if the app already has permission
    if (IS_IOS) {
      permission = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permission = await check(PERMISSIONS.IOS.LOCATION_ALWAYS);
    }

    if (permission === RESULTS.GRANTED) {
      setLocationGranted(true);
      return true;
    } else {
      permission = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      permission = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
    }

    // for android
    if (IS_ANDROID) {
      permission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } else {
      permission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    if (permission === RESULTS.GRANTED) {
      setLocationGranted(true);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error requesting location permission:', error);
  }
};

export const getCurrentLocation: () => Promise<Coords | any> = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve(position.coords);
      },
      error => {
        reject(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        accuracy: {
          ios: 'bestForNavigation',
          android: 'high',
        },
      },
    );
  });
};

export const getLiveLocation: () => Promise<Coords> = async () => {
  IS_IOS && (await Geolocation.requestAuthorization('always'));
  const coordinates = await getCurrentLocation();
  return coordinates;
};

const handleLocationPermissionTrue = async (): Promise<IPermissionResTrue> => {
  // console.log('before get current location --->');
  const coords = (await getCurrentLocation()) as unknown as Coords;
  // console.log('after get current location --->');
  const {latitude, longitude} = coords;
  // console.log('before get post code address from lat and long --->');
  const [error, response] = await getPostCodeAddressFromLatAndLong(
    coords.latitude,
    coords.longitude,
  );
  // console.log('after get post code address from lat and long --->');
  if (!error) {
    // console.log(
    //   'after get post code address from lat and long and no error --->',
    // );
    const currentLocation = response.results[0].formatted_address;
    return {
      address: currentLocation,
      coordinates: {
        latitude,
        longitude,
      },
    };
  }
  // console.log(
  //   'error: ',
  //   error,
  //   'after get post code address from lat and long and there is error --->',
  // );
  return Promise.reject({
    error: true,
    message: 'Something went wrong getting user current location',
  });
};

export const requestLocationPermissions = async (): Promise<
  IPermissionResTrue | undefined
> => {
  return requestLocationPermission().then(async state => {
    if (state) {
      const {address, coordinates} = await handleLocationPermissionTrue();
      return {address, coordinates};
    }
    return undefined;
  });
};
