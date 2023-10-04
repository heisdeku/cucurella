import React, {useState} from 'react';
import theme from '@libs/theme';
import KeyboardWrapper from '@components/KeyboardWrapper';
import {Base} from '@components/Base';
import {styled} from 'styled-components/native';
import Input from '@components/Base/Input';
import ScreenHeader from '@components/ScreenHeader';
import withBottomDrawer from '@components/withBottomDrawer';
import {IDrawerChildProps} from '@components/withBottomDrawer/helper';
import {DRAWER_CONSTANTS} from '@components/withBottomDrawer/constants';
import {Formik} from 'formik';
import {getPlaceFromText} from '@api/location';
import {useAddSavedPlace} from '@api/saved-places';
import {goBack} from '@stacks/helper';

const Manual: React.FC<IDrawerChildProps> = ({handleOpen}) => {
  const {mutate, isLoading} = useAddSavedPlace();

  const [loading, setLoading] = useState(false);

  const handleSearchAdress = async (values: any) => {
    setLoading(true);
    const placeToSearch = `${values?.houseNumber}, ${values?.streetName}, ${values?.city}`;
    const response = await getPlaceFromText(placeToSearch);

    if (response[0] === null) {
      setLoading(false);
      const {geometry} = response[1]?.results[1];
      const formattedAddress = {
        formatted_address: placeToSearch,
        latitude: geometry?.location.lat,
        longitude: geometry?.location.lng,
      };
      return mutate(
        {
          description: formattedAddress?.formatted_address,
          location: formattedAddress,
        },
        {onSuccess: () => goBack()},
      );
    }
    return setLoading(false);
  };
  return (
    <KeyboardWrapper>
      <ScreenHeader label="Add Address" />
      <Formik
        onSubmit={values => {
          return handleSearchAdress(values);
        }}
        initialValues={{
          streetName: '',
          houseNumber: '',
          city: '',
        }}>
        {({handleChange, handleSubmit, values}) => (
          <Base.View px={'24px'}>
            <Base.View mb={'80%'} mt={'32px'}>
              <Input
                keyboardType="default"
                label="Street Name"
                placeholder="Empire homes estate"
                value={values?.streetName}
                setValue={handleChange('streetName')}
              />
              <Base.View mt={24}>
                <Input
                  keyboardType="number-pad"
                  label="House number"
                  placeholder="30"
                  value={values?.houseNumber}
                  setValue={handleChange('houseNumber')}
                />
              </Base.View>
              <Base.View mt={24}>
                <Input
                  keyboardType="default"
                  label="City"
                  placeholder="Lekki, Lagos"
                  value={values?.city}
                  setValue={handleChange('city')}
                />
              </Base.View>
            </Base.View>
            <Base.Button
              // onPress={() =>
              //   handleOpen?.(DRAWER_CONSTANTS.warning, {
              //     type: 'no-address-support',
              //   })
              // }
              onPress={() => handleSubmit()}
              disabled={
                !values?.city || !values?.houseNumber || !values?.streetName
              }
              isLoading={loading || isLoading}
              title={'Confirm'}
            />
          </Base.View>
        )}
      </Formik>
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
