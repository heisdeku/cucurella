import {Dimensions, Platform} from 'react-native';

export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
