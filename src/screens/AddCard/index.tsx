import MainAppBaseView from '@components/AppSafeView';
import {Base} from '@components/Base';
import Container from '@components/Container';
import {Text} from '@components/Text';
import theme from '@libs/theme';
import React from 'react';
import {styled} from 'styled-components/native';

function AddCard(): JSX.Element {
  return (
    <MainAppBaseView>
      <Container
        justifyContent={'space-between'}
        paddingX={'0'}
        pb={'70px'}
        pt={'20px'}>
        <Base.View>
          <Base.Row
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
              <Text.Medium>Add Card</Text.Medium>
            </AppTitle>
          </Base.Row>
          <Line />
        </Base.View>
        <Base.View paddingX={'20px'}>
          <Base.View mt={'32px'}>
            <Base.View mb={'24px'}>
              <Text.Small fontWeight={'500'} mb={'8px'}>
                Name on card
              </Text.Small>
              <InputField placeholder="John Doe" keyboardType="default" />
            </Base.View>
            <Base.View mb={'24px'}>
              <Text.Small fontWeight={'500'} mb={'8px'}>
                Card Number
              </Text.Small>
              <InputField
                placeholder="0000-0000-0000-0000"
                keyboardType="numeric"
              />
            </Base.View>
            <Base.Row mb={'24px'} flex={'1'}>
              <Base.View width={'49%'}>
                <Text.Small fontWeight={'500'} mb={'8px'}>
                  Exp date
                </Text.Small>
                <InputField placeholder="MM/YY" keyboardType="numeric" />
              </Base.View>
              <Base.View width={'49%'}>
                <Text.Small fontWeight={'500'} mb={'8px'}>
                  CVV
                </Text.Small>
                <InputField placeholder="123" keyboardType="numeric" />
              </Base.View>
            </Base.Row>
          </Base.View>
          <Base.Button title="Add Card" />
        </Base.View>
      </Container>
    </MainAppBaseView>
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

const AppTitle = styled.View`
  flex: 1;
  text-align: center;
  margin: 0;
`;

const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${theme.colors.neutral03};
`;

export default AddCard;
