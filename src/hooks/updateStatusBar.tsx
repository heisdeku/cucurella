import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {Platform, StatusBar, StatusBarStyle} from 'react-native';

export default (
  style: StatusBarStyle = 'light-content',
  backgroundColor = '#fff',
  translucent: boolean = false,
) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(style);
      if (Platform.OS === 'android') {
        StatusBar.setTranslucent(translucent);
        StatusBar.setBackgroundColor(backgroundColor);
      }
    }, [backgroundColor, style, translucent]),
  );
};
