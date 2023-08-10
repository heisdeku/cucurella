import {TextStyle} from 'react-native';
import theme from './theme';

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
