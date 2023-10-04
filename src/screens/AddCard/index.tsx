import React, {useEffect, useState} from 'react';
import KeyboardWrapper from '@components/KeyboardWrapper';
import {Base} from '@components/Base';
import {navigate} from '@stacks/helper';
import Input from '@components/Base/Input';
import ScreenHeader from '@components/ScreenHeader';
import {useAddCard} from '@api/payment';
import {Formik} from 'formik';
import {SvgXml} from 'react-native-svg';
import {cardTypes} from '@libs/svgs';
import {getCardType} from '@libs/helper';

const AddCard = () => {
  const {mutate, isLoading} = useAddCard();
  const [cardType, setCardType] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState<string>('');

  const handleAddCard = (values: any) => {
    return mutate({
      cardNumber,
      cardType: String(cardType),
      cvv: values?.cvv,
      expirationDate: values?.expirationDate,
    });
  };

  useEffect(() => {
    if (cardNumber.length > 3) {
      setCardType(getCardType(cardNumber));
    }
  }, [cardNumber]);
  return (
    <KeyboardWrapper>
      <ScreenHeader label="Add Card" />
      <Formik
        onSubmit={values => {
          console.log(values);
          return handleAddCard(values);
        }}
        initialValues={{
          expirationDate: '',
          cvv: '',
        }}>
        {({handleChange, handleSubmit, values}) => (
          <Base.View px={'24px'}>
            <Base.View mb={'80%'} mt={'32px'}>
              <Input
                keyboardType="default"
                label="Name on card"
                placeholder="Jane Doe"
              />
              <Base.View mt={24}>
                <Input
                  keyboardType="number-pad"
                  label="Card number"
                  placeholder="5555 44444 3333 212"
                  value={cardNumber}
                  setValue={setCardNumber}
                  suffix={
                    <>
                      {cardType !== null && (
                        <SvgXml
                          style={{position: 'absolute', right: 10}}
                          height={'24px'}
                          width={'24px'}
                          //@ts-ignore
                          xml={cardTypes[cardType]}
                        />
                      )}
                    </>
                  }
                />
              </Base.View>
              <Base.Row mb={'24px'} mt={24}>
                <Input
                  keyboardType="number-pad"
                  label="Exp date"
                  placeholder="MM/YY"
                  value={values?.expirationDate}
                  setValue={handleChange('expirationDate')}
                />
                <Base.View width={7} />
                <Input
                  keyboardType="number-pad"
                  label="CVV"
                  placeholder="123"
                  value={values?.cvv}
                  setValue={handleChange('cvv')}
                />
              </Base.Row>
            </Base.View>
            <Base.Button
              disabled={!cardNumber || !values?.cvv || !values?.expirationDate}
              onPress={() => navigate('Success', {type: 'card-added'})}
              title={'Add Card'}
            />
          </Base.View>
        )}
      </Formik>
    </KeyboardWrapper>
  );
};

export default AddCard;
