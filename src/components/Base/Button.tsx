import React, {ReactNode} from 'react';
import {ActivityIndicator, GestureResponderEvent} from 'react-native';
import {Text} from '@components/Text';
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
import theme from '@libs/theme';

interface ButtonProps
  extends ColorProps,
    SpaceProps,
    LayoutProps,
    FlexboxProps,
    BorderProps,
    PositionProps,
    BackgroundProps {
  title: string;
  textColor?: string;
  disabled?: boolean;
  rightElement?: ReactNode;
  leftElement?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  isLoading?: boolean;
}

const ButtonBase = styled.TouchableOpacity<
  ColorProps &
    SpaceProps &
    LayoutProps &
    FlexboxProps &
    BorderProps &
    PositionProps &
    BackgroundProps
>(compose(color, space, layout, flexbox, border, position, background));

/**
 * Base button
 * This components extends basetext components to display the text
 * you can use baseTextProps to control how th text look.
 */

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  textColor = 'white',
  leftElement,
  rightElement,
  disabled,
  isLoading,
  alignSelf,
  ...rest
}) => {
  return (
    <ButtonBase
      borderRadius={8}
      backgroundColor={theme.colors.green08}
      height={'58px'}
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      alignItems={'center'}
      justifyContent={'center'}
      opacity={disabled ? 0.45 : 1}
      {...rest}>
      {leftElement}
      {isLoading && <ActivityIndicator animating color={theme.colors.white} />}
      {!isLoading && (
        <Text.Medium color={textColor} textAlign={'center'} fontSize={'16px'}>
          {title}
        </Text.Medium>
      )}

      {rightElement}
    </ButtonBase>
  );
};
