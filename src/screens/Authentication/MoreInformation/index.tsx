import React from 'react';
import theme from '@libs/theme';
import {Text} from '@components/Text';
import Container from '@components/Container';
import styled from 'styled-components/native';
import {Base} from '@components/Base';
import {StyleSheet} from 'react-native';
import {navigate} from '@stacks/helper';
import KeyboardWrapper from '@components/KeyboardWrapper';
import {useOnboardingStore} from '@store/OnboardingStore';
import {Formik} from 'formik';
import Input from '@components/Base/Input';

function MoreInformation(): JSX.Element {
  const [updateStateItem, source, userEmail, userPhoneNumber] =
    useOnboardingStore(state => [
      state.updateStateItem,
      state.source,
      state.email,
      state.phoneNumber,
    ]);

  const handleContinue = (values: any) => {
    updateStateItem('firstName', values?.firstName);
    updateStateItem('lastName', values?.lastName);
    updateStateItem('phoneNumber', values?.phoneNumber || userPhoneNumber);
    updateStateItem('email', values?.email || userEmail);
    return navigate('PinSetup');
  };

  return (
    <KeyboardWrapper hasPaddingTop>
      <Formik
        onSubmit={values => {
          return handleContinue(values);
        }}
        initialValues={{
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
        }}>
        {({handleChange, handleSubmit, values}) => (
          <Container justifyContent={'space-between'} pt={'29px'}>
            <Base.View>
              <Text.Medium fontSize={'24px'}>
                Tell us more about yourself
              </Text.Medium>
              <Base.View mt={'32px'}>
                <Base.View mb={'24px'}>
                  <Input
                    label="First Name"
                    placeholder={`What's your first name?`}
                    value={values?.firstName}
                    setValue={handleChange('firstName')}
                  />
                </Base.View>
                <Base.View mb={'24px'}>
                  <Input
                    label="Last Name"
                    placeholder={`What's your last name?`}
                    value={values?.lastName}
                    setValue={handleChange('lastName')}
                  />
                </Base.View>
                {source === 'email' && (
                  <Base.View mb={'24px'}>
                    <Input
                      label="Phone Number"
                      placeholder={`+2348076756427`}
                      keyboardType="number-pad"
                      value={values?.phoneNumber}
                      setValue={handleChange('phoneNumber')}
                    />
                  </Base.View>
                )}
                {source === 'phone' && (
                  <Base.View mb={'24px'}>
                    <Input
                      label="Email Address"
                      placeholder={`sample@gmail.com`}
                      keyboardType="email-address"
                      value={values?.email}
                      setValue={handleChange('email')}
                    />
                  </Base.View>
                )}
              </Base.View>
            </Base.View>
            <Base.Button
              title="Continue"
              disabled={!values.firstName || !values.lastName}
              onPress={() => handleSubmit()}
            />
          </Container>
        )}
      </Formik>
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
