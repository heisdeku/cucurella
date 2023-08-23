import React from 'react';
import theme from '@libs/theme';
import {Text} from '@components/Text';
import Container from '@components/Container';
import styled from 'styled-components/native';
import {Base} from '@components/Base';
import {StyleSheet} from 'react-native';
import {navigate} from '@stacks/helper';
import KeyboardWrapper from '@components/KeyboardWrapper';

function MoreInformation(): JSX.Element {
  return (
    <KeyboardWrapper>
      <Container justifyContent={'space-between'} pt={'29px'}>
        <Base.View>
          <Text.Medium fontSize={'24px'}>
            Tell us more about yourself
          </Text.Medium>
          <Base.View mt={'32px'}>
            <Base.View mb={'24px'}>
              <Text.Small fontWeight={'500'} mb={'8px'}>
                First Name
              </Text.Small>
              <InputField
                placeholder="What's your first name?"
                keyboardType="default"
              />
            </Base.View>
            <Base.View mb={'24px'}>
              <Text.Small fontWeight={'500'} mb={'8px'}>
                Last Name
              </Text.Small>
              <InputField
                placeholder="What's your last name?"
                keyboardType="default"
              />
            </Base.View>
            <Base.View mb={'24px'}>
              <Text.Small fontWeight={'500'} mb={'8px'}>
                Email Address
              </Text.Small>
              <InputField
                placeholder="What's your email address?"
                keyboardType="email-address"
              />
            </Base.View>
          </Base.View>
        </Base.View>
        <Base.Button title="Continue" onPress={() => navigate('PinSetup')} />
      </Container>
    </KeyboardWrapper>
  );
}

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

const styles = StyleSheet.create({
  flagButton: {
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    borderRadius: 8,
    height: 50,
    backgroundColor: theme.colors.neutral01,
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.stroke,
    borderRadius: 8,
    height: 50,
    backgroundColor: theme.colors.neutral01,
  },
  textInput: {
    fontSize: 12,
    color: theme.colors.neutral07,
    fontWeight: '300',
    lineHeight: 15,
  },
  codeText: {
    fontSize: 12,
    display: 'none',
  },
});

export default MoreInformation;
