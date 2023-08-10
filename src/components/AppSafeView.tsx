import React, {ReactNode} from 'react';
import {Base} from '@components/Base';
import updateStatusBar from '@hooks/updateStatusBar';
import theme from '@libs/theme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {windowHeight} from '@libs/constant';

const MainAppBaseView = ({children}: {children: ReactNode}) => {
  updateStatusBar('dark-content', 'transparent', true);
  return (
    <SafeAreaProvider>
      <Base.SafeView height={windowHeight} backgroundColor={theme.colors.white}>
        {children}
      </Base.SafeView>
    </SafeAreaProvider>
  );
};

export default MainAppBaseView;
