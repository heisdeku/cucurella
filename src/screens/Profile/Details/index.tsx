import React from 'react';
import theme from '@libs/theme';
import KeyboardWrapper from '@components/KeyboardWrapper';
import {Base} from '@components/Base';
import Container from '@components/Container';
import {Text} from '@components/Text';
import {styled} from 'styled-components/native';
import Input from '@components/Base/Input';
import ScreenHeader from '@components/ScreenHeader';

const ProfileDetails = () => {
  return (
    <KeyboardWrapper>
      <ScreenHeader label="Profile Details" />
      <Container pt={'24px'}>
        <Base.View
          justifyContent={'space-between'}
          alignItems={'center'}
          marginX={'auto'}>
          <Avatar>
            <Text.Medium
              lineHeight={'52px'}
              color={theme.colors.dark}
              fontSize={'41.9px'}>
              JD
            </Text.Medium>
          </Avatar>
          <ChangePictureButton>
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
              placeholder="John Doe"
              keyboardType="default"
            />
          </Base.View>
          <Base.View mb={'22px'}>
            <Input
              label="Last Name"
              placeholder="Abdulazeez"
              keyboardType="default"
            />
          </Base.View>
          <Base.View mb={'22px'}>
            <Input
              label="Email Address"
              placeholder="default@ofayd.co"
              keyboardType="email-address"
            />
          </Base.View>
          <Base.View mb={'22px'}>
            <Input
              label="Phone Number"
              placeholder="08076756427"
              keyboardType="number-pad"
            />
          </Base.View>
        </Base.View>
        <Base.Button title={'Save changes'} />
      </Container>
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

const ChangePictureButton = styled.TouchableOpacity`
  border-radius: 37px;
  padding: 8px;
  margin-top: 12px;
  background-color: ${theme.colors.neutral02};
`;

export default ProfileDetails;
