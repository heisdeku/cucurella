import React from 'react';
import theme from '@libs/theme';
import KeyboardWrapper from '@components/KeyboardWrapper';
import {Base} from '@components/Base';
import {styled} from 'styled-components/native';
import Input from '@components/Base/Input';
import ScreenHeader from '@components/ScreenHeader';
import withBottomDrawer from '@components/withBottomDrawer';
import {IDrawerChildProps} from '@components/withBottomDrawer/helper';
import {DRAWER_CONSTANTS} from '@components/withBottomDrawer/constants';

const Manual: React.FC<IDrawerChildProps> = ({handleOpen}) => {
  return (
    <KeyboardWrapper>
      <ScreenHeader label="Add Address" />
      <Base.View px={'24px'}>
        <Base.View mb={'80%'} mt={'32px'}>
          <Input
            keyboardType="default"
            label="Street Name"
            placeholder="Empire homes estate"
          />
          <Base.View mt={24}>
            <Input
              keyboardType="number-pad"
              label="House number"
              placeholder="30"
            />
          </Base.View>
          <Base.View mt={24}>
            <Input
              keyboardType="default"
              label="City"
              placeholder="Lekki, Lagos"
            />
          </Base.View>
        </Base.View>
        <Base.Button
          onPress={() =>
            handleOpen?.(DRAWER_CONSTANTS.warning, {
              type: 'no-address-support',
            })
          }
          title={'Confirm'}
        />
      </Base.View>
    </KeyboardWrapper>
  );
};

const InputField = styled.TextInput`
  background-color: ${theme.colors.neutral01};
  padding: 19px 16px;
  border: 1px solid ${theme.colors.stroke};
  border-radius: 8px;
  width: 100%;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: 15px;
  color: ${theme.colors.neutral07};
`;

const AppTitle = styled.View`
  margin: auto;
  flex: 1;
  text-align: center;
  margin: 0;
`;

const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${theme.colors.neutral03};
`;

const CardSuccess = styled.View`
  margin: auto;
  height: 240px;
  width: 240px;
  justifycontent: space-between;
  alignitems: center;
`;

export default withBottomDrawer(Manual);
