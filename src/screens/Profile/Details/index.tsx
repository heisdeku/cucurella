import React, {useState} from 'react';
import theme from '@libs/theme';
import KeyboardWrapper from '@components/KeyboardWrapper';
import {Base} from '@components/Base';
import Container from '@components/Container';
import {Text} from '@components/Text';
import {styled} from 'styled-components/native';
import Input from '@components/Base/Input';
import ScreenHeader from '@components/ScreenHeader';
import {useUserStore} from '@store/UserStore';
import {Formik} from 'formik';
import {ScrollView} from 'react-native';
import updateStatusBar from '@hooks/updateStatusBar';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {useAddImage} from '@api/profile';

const ProfileDetails = () => {
  updateStatusBar('dark-content');
  const [
    userFirstName,
    userLastName,
    userEmail,
    userPhoneNumber,
    profileImage,
  ] = useUserStore(state => [
    state.user.firstName,
    state.user.lastName,
    state.user.email,
    state.user.phoneNumber,
    state.user.image,
  ]);
  const [userImage, setUserImage] = useState(profileImage);
  const {mutate, isLoading} = useAddImage();

  const handleProfileImageChange = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 100,
      maxWidth: 100,
      quality: 1,
    });
    if (result?.assets) {
      const {fileName, fileSize, uri} = result?.assets[0];
      //@ts-ignore
      setUserImage(uri);
      const formData = new FormData();
      const file = {
        uri: uri,
        name: fileName,
        type: `image/jpg`,
      };
      formData.append('image', file);
      return mutate(
        {formData},
        {
          onSuccess: () => {
            return showMessage({
              message: 'profile Image updated',
              type: 'success',
            });
          },
        },
      );
    }
    if (result?.didCancel) {
    }
  };
  return (
    <KeyboardWrapper>
      <ScreenHeader label="Profile Details" />
      <ScrollView>
        <Formik
          onSubmit={values => {
            return console.log(values);
          }}
          initialValues={{
            firstName: userFirstName,
            lastName: userLastName,
            phoneNumber: userPhoneNumber,
            email: userEmail,
          }}>
          {({handleChange, handleSubmit, values}) => (
            <Container pt={'24px'}>
              <Base.View
                justifyContent={'space-between'}
                alignItems={'center'}
                marginX={'auto'}>
                {userImage && <UserImage source={{uri: userImage}} />}
                {!userImage && (
                  <Avatar>
                    <Text.Medium
                      isCapitalize
                      lineHeight={'52px'}
                      color={theme.colors.dark}
                      fontSize={'41.9px'}>
                      {userFirstName.split('')[0]}
                      {userLastName.split('')[0]}
                    </Text.Medium>
                  </Avatar>
                )}
                <ChangePictureButton onPress={() => handleProfileImageChange()}>
                  <Text.General
                    fontSize={'12px'}
                    paddingX={'4px'}
                    color={theme.colors.neutral07}>
                    Change profile picture
                  </Text.General>
                </ChangePictureButton>
              </Base.View>
              <Base.View mt={'32px'} mb={'10px'}>
                <Base.View mb={'22px'}>
                  <Input
                    label="First Name"
                    placeholder="John"
                    keyboardType="default"
                    value={values?.firstName}
                    setValue={handleChange('firstName')}
                  />
                </Base.View>
                <Base.View mb={'22px'}>
                  <Input
                    label="Last Name"
                    placeholder="Abdulazeez"
                    keyboardType="default"
                    value={values?.lastName}
                    setValue={handleChange('lastNae')}
                  />
                </Base.View>
                <Base.View mb={'22px'}>
                  <Input
                    label="Email Address"
                    placeholder="default@ofayd.com"
                    keyboardType="email-address"
                    value={values?.email}
                    setValue={handleChange('email')}
                  />
                </Base.View>
                <Base.View mb={'22px'}>
                  <Input
                    label="Phone Number"
                    placeholder="+234xxxxxxxxxx"
                    keyboardType="number-pad"
                    value={values?.phoneNumber}
                    setValue={handleChange('phoneNumber')}
                  />
                </Base.View>
              </Base.View>
              <Base.Button
                title={'Save changes'}
                // onPress={() => handleSubmit()}
                disabled={true}
              />
            </Container>
          )}
        </Formik>
      </ScrollView>
    </KeyboardWrapper>
  );
};

const Avatar = styled.View`
  height: 100px;
  width: 100px;
  border-radius: 67px;
  background-color: ${theme.colors.neutral01};
  justify-content: center;
  align-items: center;
`;

const UserImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 8px;
  border-radius: 67px;
  background-color: ${theme.colors.neutral01};
  justify-content: center;
  align-items: center;
`;

const ChangePictureButton = styled.TouchableOpacity`
  border-radius: 37px;
  padding: 8px;
  margin-top: 12px;
  background-color: ${theme.colors.neutral02};
`;

export default ProfileDetails;
