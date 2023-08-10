import styled from 'styled-components';
import {
  color,
  flexbox,
  layout,
  maxWidth,
  space,
  textStyle,
  typography,
  width,
} from 'styled-system';
import * as Animatable from 'react-native-animatable';

export const Text = styled(Animatable.Text)`
  ${color}
  ${space}
  ${textStyle}
  ${typography}
  ${layout}
  ${flexbox}
  ${width}
  ${maxWidth}
`;
