import styled from 'styled-components/native';
import {
  color,
  space,
  layout,
  flexbox,
  border,
  position,
  compose,
  ColorProps,
  FlexboxProps,
  background,
  SpaceProps,
  LayoutProps,
  BorderProps,
  PositionProps,
  BackgroundProps,
} from 'styled-system';

export const View = styled.View<
  ColorProps &
    SpaceProps &
    LayoutProps &
    FlexboxProps &
    BorderProps &
    PositionProps &
    BackgroundProps
>(compose(color, space, layout, flexbox, border, position, background));
