import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const FormGroup = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 54px;
  width: 250px;
  margin: 40px auto 0;
`;

export function createPinViewStyles() {
  return StyleSheet.create({
    inputCode: {
      color: 'transparent',
      fontSize: 30,
      flex: 1,
      paddingLeft: 60,
      letterSpacing: 55,
      height: 54,
      position: 'absolute',
      zIndex: 2,
      top: 0,
      left: 0,
      textAlign: 'center',
      width: '100%',
      backgroundColor: 'transparent',
    },
  });
}
