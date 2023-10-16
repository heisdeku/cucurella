import React, {ReactNode} from 'react';
import {Base} from '@components/Base';
import {
  ColorProps,
  FlexboxProps,
  SpaceProps,
  LayoutProps,
  BorderProps,
  PositionProps,
  BackgroundProps,
} from 'styled-system';
import {Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export interface ContainerProps
  extends ColorProps,
    SpaceProps,
    LayoutProps,
    FlexboxProps,
    BorderProps,
    PositionProps,
    BackgroundProps {
  children: ReactNode;
  insertTop?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  insertTop,
  ...rest
}) => {
  const inserts = useSafeAreaInsets();
  let top = Platform.select({android: `${inserts.top}px`, ios: '0px'});
  return (
    <Base.View
      // flex={1}
      minHeight={'100%'}
      paddingX={'20px'}
      marginTop={insertTop ? top : 0}
      {...rest}>
      {children}
    </Base.View>
  );
};

export default Container;
