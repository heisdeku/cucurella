import React, {ReactNode} from 'react';
import {ContainerProps} from '@components/Container';
import {View} from './View';

interface RowProps extends ContainerProps {
  children: ReactNode;
}

export const Row = ({children, ...rest}: RowProps) => {
  return (
    <View
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      {...rest}>
      {children}
    </View>
  );
};
