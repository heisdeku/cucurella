import React, {Fragment, useCallback, useMemo, useRef, useState} from 'react';
import {getDrawerChild} from './helper';
import {
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import CustomBackdrop from '@components/CustomBackdrop';
import {SvgXml} from 'react-native-svg';
import {close_icon} from '@libs/svgs';
import {styled} from 'styled-components/native';
import theme from '@libs/theme';
import {Base} from '@components/Base';

const withBottomDrawer = (Component: any) => (props: any) => {
  const [data, setDrawer] = useState({
    id: '',
    payload: {},
  });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const initialSnapPoints = useMemo(() => ['25%', 'CONTENT_HEIGHT'], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleOpen = (id: string, payload?: any) => {
    setDrawer({
      id,
      payload,
    });
    return handlePresentModalPress();
  };
  const handleClose = () => {
    setDrawer({
      id: '',
      payload: {},
    });
    return bottomSheetModalRef.current?.close();
  };

  return (
    <Fragment>
      <Component {...props} handleOpen={handleOpen} handleClose={handleClose} />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        //@ts-ignore
        snapPoints={animatedSnapPoints}
        onChange={handleSheetChanges}
        handleStyle={{display: 'none'}}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        backdropComponent={({animatedIndex, style, animatedPosition}) => (
          <CustomBackdrop
            animatedPosition={animatedPosition}
            animatedIndex={animatedIndex}
            style={style}
          />
        )}>
        <BottomSheetView onLayout={handleContentLayout}>
          <Base.View px={'20px'} py="26px" mb={'45px'}>
            <Close onPress={() => handleClose()}>
              <SvgXml xml={close_icon} />
            </Close>
            {getDrawerChild(data, handleClose, handleOpen)}
          </Base.View>
        </BottomSheetView>
      </BottomSheetModal>
    </Fragment>
  );
};

const Close = styled.TouchableOpacity`
  background-color: ${theme.colors.offsetGray2};
  height: 35px;
  width: 35px;
  margin-left: auto;
  border-radius: 9999px;
  justify-content: center;
  align-items: center;
  margin-bottom: 7px;
`;

export default withBottomDrawer;
