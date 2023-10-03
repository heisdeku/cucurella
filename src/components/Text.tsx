import React, {ReactNode} from 'react';
import {TextProps, TextStyle} from 'react-native';
import {
  ColorProps,
  FlexProps,
  LayoutProps,
  SpaceProps,
  TextStyleProps,
  TypographyProps,
} from 'styled-system';
import {Base} from './Base';
import * as Animatable from 'react-native-animatable';
import theme from '@libs/theme';

interface CustomTextProps
  extends TextProps,
    TextStyleProps,
    TypographyProps,
    SpaceProps,
    ColorProps,
    LayoutProps,
    FlexProps,
    Animatable.AnimatableProperties<TextStyle> {
  children: ReactNode;
  fontFamily?: '300' | '400' | '500' | '600' | '700' | '800' | '9000';
  isCapitalize?: boolean;
}

/**
 * Feature text component, you con proceed to change the font famil to get the variant.
 * Font size 12px
 * line heaight 16px
 */
const Caption: React.FC<CustomTextProps> = ({children, ...rest}) => {
  return (
    <Base.Text
      fontFamily="300"
      fontSize={'12px'}
      lineHeight={'15.6px'}
      color={theme.colors.black}
      {...rest}>
      {children}
    </Base.Text>
  );
};

/**
 * Body text component, you con proceed to change the font famil to get the variant.
 * Font size 14px
 * line heaight 22px
 */
const Small: React.FC<CustomTextProps> = ({children, ...rest}) => {
  return (
    <Base.Text
      fontFamily="300"
      fontSize={'14px'}
      color={theme.colors.black}
      {...rest}>
      {children}
    </Base.Text>
  );
};

/**
 * Generic text component, you con proceed to change the font family to get the variant.
 * more like empty text components
 */
const General: React.FC<CustomTextProps> = ({children, ...rest}) => {
  return (
    <Base.Text
      style={{textTransform: rest?.isCapitalize ? 'capitalize' : 'none'}}
      color={theme.colors.black}
      fontFamily="regular"
      {...rest}>
      {children}
    </Base.Text>
  );
};

/**
 * Body text component, you con proceed to change the font famil to get the variant.
 * Font size 14px
 * line heaight 22px
 */
const Medium: React.FC<CustomTextProps> = ({children, ...rest}) => {
  return (
    <Base.Text
      fontFamily="500"
      fontSize={'16px'}
      lineHeight={'29.88px'}
      color={theme.colors.black}
      style={[
        {
          textTransform: rest?.isCapitalize ? 'capitalize' : 'none',
        },
        rest.style,
      ]}
      {...rest}>
      {children}
    </Base.Text>
  );
};

/**
 * Heading3 text component, you con proceed to change the font family to get the variant.
 * Font size 24px
 * line height 32px
 */

/**
 * Heading3 text component, you con proceed to change the font famil to get the variant.
 * Font size 24px
 * line height 32px
 */
const H2: React.FC<CustomTextProps> = ({children, ...rest}) => {
  return (
    <Base.Text
      fontFamily="600"
      fontSize={'24px'}
      lineHeight={'32px'}
      color={theme.colors.black}
      {...rest}>
      {children}
    </Base.Text>
  );
};

const H1: React.FC<CustomTextProps> = ({children, ...rest}) => {
  return (
    <Base.Text
      fontFamily="700"
      fontSize={'24px'}
      lineHeight={'29px'}
      color={theme.colors.black}
      {...rest}>
      {children}
    </Base.Text>
  );
};

/**
 * Medium text component, you con proceed to change the font famil to get the variant.
 * Font size 16px
 * line heaight 24px
 */
const Large: React.FC<CustomTextProps> = ({children, ...rest}) => {
  return (
    <Base.Text
      fontFamily="800"
      fontSize={'20px'}
      lineHeight={'23px'}
      color={theme.colors.black}
      {...rest}>
      {children}
    </Base.Text>
  );
};

export const Text = {
  Caption,
  Small,
  General,
  Medium,
  H2,
  H1,
  Large,
};
