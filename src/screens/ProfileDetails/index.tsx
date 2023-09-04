import React from 'react';
import theme from '@libs/theme';
import KeyboardWrapper from '@components/KeyboardWrapper';
import {Base} from '@components/Base';
import Container from '@components/Container';
import {Text} from '@components/Text';
import {styled} from 'styled-components/native';

const ProfileDetails = (): JSX.Element => {
  return (
    <KeyboardWrapper>
      <Container justifyContent={'space-between'} paddingX={'0'} pt={'20px'}>
        <Base.View>
          <Base.View>
            <Base.Row
              mb={'12px'}
              paddingX={'20px'}
              justifyContent={'flex-start'}
              alignItems={'center'}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                height={'24px'}
                width={'24px'}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              <AppTitle>
                <Text.Medium fontFamily={'700'} textAlign={'center'}>
                  Profile Details
                </Text.Medium>
              </AppTitle>
            </Base.Row>
            <Line />
          </Base.View>
          <Base.View
            justifyContent={'space-between'}
            alignItems={'center'}
            marginY={'20px'}
            marginX={'auto'}>
            <Avatar>
              <Text.Medium margin={'auto'} fontSize={'40px'}>
                JD
              </Text.Medium>
            </Avatar>
            <SubText>
              <Text.General
                margin={'auto'}
                fontSize={'12px'}
                paddingX={'4px'}
                color={theme.colors.neutral07}>
                Change profile picture
              </Text.General>
            </SubText>
          </Base.View>
          <Base.View mt={'32px'} paddingX={'20px'}>
            <Base.View mb={'24px'}>
              <Text.Small fontWeight={'500'} mb={'8px'}>
                First Name
              </Text.Small>
              <InputField placeholder="John Doe" keyboardType="default" />
            </Base.View>
            <Base.View mb={'24px'}>
              <Text.Small fontWeight={'500'} mb={'8px'}>
                Last Name
              </Text.Small>
              <InputField placeholder="John Doe" keyboardType="default" />
            </Base.View>
            <Base.View mb={'24px'}>
              <Text.Small fontWeight={'500'} mb={'8px'}>
                Email Address
              </Text.Small>
              <InputField placeholder="John Doe" keyboardType="default" />
            </Base.View>
            <Base.View mb={'24px'}>
              <Text.Small fontWeight={'500'} mb={'8px'}>
                Phone Number
              </Text.Small>
              <InputField placeholder="John Doe" keyboardType="numeric" />
            </Base.View>
          </Base.View>
        </Base.View>
        <Base.Button title={'Save changes'} />
      </Container>
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

const Avatar = styled.View`
  height: 100px;
  width: 100px;
  border-radius: 67px;
  background-color: ${theme.colors.neutral01};
`;

const SubText = styled.View`
  border-radius: 37px;
  padding: 8px;
  margin-top: 16px;
  background-color: ${theme.colors.neutral01};
`;

export default ProfileDetails;
