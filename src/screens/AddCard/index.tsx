import React from 'react';
import KeyboardWrapper from '@components/KeyboardWrapper';
import {Base} from '@components/Base';
import {navigate} from '@stacks/helper';
import Input from '@components/Base/Input';
import ScreenHeader from '@components/ScreenHeader';

const AddCard = () => {
  return (
    <KeyboardWrapper>
      <ScreenHeader label="Add Card" />
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
            />
          </Base.View>
          <Base.Row mb={'24px'} mt={24}>
            <Input
              keyboardType="number-pad"
              label="Exp date"
              placeholder="MM/YY"
            />
            <Base.View width={7} />
            <Input keyboardType="number-pad" label="CVV" placeholder="123" />
          </Base.Row>
        </Base.View>
        <Base.Button
          onPress={() => navigate('Success', {type: 'card-added'})}
          title={'Add Card'}
        />
      </Base.View>
    </KeyboardWrapper>
  );
};

export default AddCard;
