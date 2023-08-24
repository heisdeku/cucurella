import React from 'react';
import theme from '@libs/theme';
import {Text} from '@components/Text';
import Container from '@components/Container';
import styled from 'styled-components/native';
import {Base} from '@components/Base';
import {Row} from '@components/Base/Row';
import {social} from '@libs/svgs';
import {SvgXml} from 'react-native-svg';
import KeyboardWrapper from '@components/KeyboardWrapper';

const Login: React.FC = (): JSX.Element => {
  return (
    <KeyboardWrapper>
      <Container pt={'29px'}>
        <Base.View>
          <Text.Medium mb={'7px'} fontSize={'24px'}>
            Hi {'Doris'},
          </Text.Medium>
          <Text.General
            fontSize={'16px'}
            fontWeight={'400'}
            lineHeight={'21px'}
            color={theme.colors.neutral07}>
            Please enter your pin to login
          </Text.General>
          <InputField keyboardType="phone-pad" />
          <Text.General mb="50px">Forget password? Reset</Text.General>
          <Row mb={'24px'} alignItems={'center'} mx={'auto'}>
            <Line />
            <Text.General
              lineHeight={'17.5px'}
              fontWeight={'400'}
              fontSize={'14px'}
              mt={'2px'}
              mx={'16px'}
              color={theme.colors.black}>
              Or login with
            </Text.General>
            <Line />
          </Row>
          <Row width={'250px'} mx={'auto'}>
            <SocialAuth activeOpacity={0.8}>
              <SvgXml xml={social.google} />
              <Text.General
                lineHeight={'17.5px'}
                fontWeight={'400'}
                fontSize={'14px'}
                mt={'2px'}
                color={theme.colors.black}>
                Google
              </Text.General>
            </SocialAuth>
            <SocialAuth activeOpacity={0.8}>
              <SvgXml xml={social.apple} />
              <Text.General
                lineHeight={'17.5px'}
                fontWeight={'400'}
                fontSize={'14px'}
                mt={'2px'}
                color={theme.colors.black}>
                Apple
              </Text.General>
            </SocialAuth>
            <SocialAuth activeOpacity={0.8}>
              <SvgXml xml={social.facebook} />
              <Text.General
                lineHeight={'17.5px'}
                fontWeight={'400'}
                fontSize={'14px'}
                mt={'4px'}
                color={theme.colors.black}>
                Facebook
              </Text.General>
            </SocialAuth>
          </Row>
        </Base.View>
      </Container>
    </KeyboardWrapper>
  );
};

const Line = styled.View`
  height: 1px;
  width: 80px;
  background-color: ${theme.colors.neutral03};
`;

const SocialAuth = styled.TouchableOpacity`
  border-radius: 4.529px;
  justify-content: center;
  align-items: center;
  border: 1.136px solid ${theme.colors.neutral03};
  padding: 15px 0px;
  width: 77px;
  height: 66px;
`;

const InputField = styled.TextInput`
  background-color: ${theme.colors.neutral01};
  padding: 29px 16px;
  border: 1px solid ${theme.colors.stroke};
  border-radius: 8px;
  width: 100%;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: 15px;
  color: ${theme.colors.neutral07};
  height: 88px;
  margin: 20px 0;
`;

export default Login;
