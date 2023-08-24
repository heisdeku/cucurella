import React from 'react';
import {View} from 'react-native';
import {DRAWER_CONSTANTS} from './constants';
import {BiometricsDrawer} from './BiometricsDrawer';

export const getDrawerChild = (
  data: any,
  handleClose?: () => void,
  handleOpen?: (value: any, payload?: any) => void,
) => {
  switch (data?.id) {
    case DRAWER_CONSTANTS.biometrics:
      return (
        <BiometricsDrawer
          payload={data?.payload}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      );
    default:
      return <View />;
  }
};
