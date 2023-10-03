import React from 'react';
import {View} from 'react-native';
import {DRAWER_CONSTANTS} from './constants';
import {BiometricsDrawer} from './BiometricsDrawer';
import {LocationDrawer} from './LocationDrawer';
import {WarningDrawer} from './WarningDrawer';
import {BankDetailsDrawer} from './BankDetailsDrawer';
import {LocationSetDrawer} from './LocationSetDrawer';
import {AddPaymentMethod} from './AddPaymentMethod';

export interface IDrawerChildProps {
  handleClose?: () => void;
  handleOpen?: (value: any, payload?: any) => void;
  payload?: any;
}

export const getDrawerChild = (
  data: any,
  handleClose?: () => void,
  handleOpen?: (value: any, payload?: any) => void,
) => {
  switch (data?.id) {
    case DRAWER_CONSTANTS.addPaymentMethod:
      return (
        <AddPaymentMethod handleClose={handleClose} handleOpen={handleOpen} />
      );
    case DRAWER_CONSTANTS.bankDetails:
      return (
        <BankDetailsDrawer handleClose={handleClose} handleOpen={handleOpen} />
      );
    case DRAWER_CONSTANTS.biometrics:
      return <BiometricsDrawer handleClose={handleClose} />;
    case DRAWER_CONSTANTS.location:
      return (
        <LocationDrawer handleOpen={handleOpen} handleClose={handleClose} />
      );
    case DRAWER_CONSTANTS.locationSet:
      return (
        <LocationSetDrawer handleOpen={handleOpen} handleClose={handleClose} />
      );
    case DRAWER_CONSTANTS.warning:
      return (
        <WarningDrawer payload={data?.payload} handleClose={handleClose} />
      );
    default:
      return <View />;
  }
};
