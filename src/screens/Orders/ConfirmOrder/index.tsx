import {Base} from '@components/Base';
import ScreenHeader from '@components/ScreenHeader';
import {Text} from '@components/Text';
import withBottomDrawer from '@components/withBottomDrawer';
import {DRAWER_CONSTANTS} from '@components/withBottomDrawer/constants';
import {linear_call, mdiLocation, select_checkbox} from '@libs/svgs';
import theme from '@libs/theme';
import {navigate} from '@stacks/helper';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {styled} from 'styled-components/native';

//@ts-ignore
const ConfirmOrderDetails = ({handleOpen}) => {
  const [method, setMethod] = useState<'wallet' | 'debit-card' | null>(null);
  return (
    <Base.View>
      <ScreenHeader label="Confirm Order Details" />
      <ScrollArea>
        <Base.View
          mt={'16px'}
          py={'16px'}
          px={'24px'}
          backgroundColor={theme.colors.white}>
          <Text.General
            fontSize={'14px'}
            color={theme.colors.neutral07}
            mb={'4px'}>
            Order ID
          </Text.General>
          <Text.H1 lineHeight={'32.64px'} fontSize={'24px'}>
            #Order346HYT
          </Text.H1>
        </Base.View>
        <Base.View mt={'16px'} px={'24px'} backgroundColor={theme.colors.white}>
          <Base.Row
            py={'16px'}
            borderBottomWidth={'1px'}
            borderBottomColor={theme.colors.neutral03}
            mb={'6px'}
            alignItems={'flex-end'}
            justifyContent={'space-between'}>
            <Base.Row width={'50%'} alignItems={'flex-start'}>
              <Base.View
                backgroundColor={theme.colors.greenRandom}
                width={'32px'}
                height={'32px'}
                justifyContent={'center'}
                alignItems={'center'}
                borderRadius={'40px'}
                mr={'8px'}>
                <SvgXml xml={mdiLocation} width={16} height={16} />
              </Base.View>
              <Base.View>
                <Text.Medium fontSize={'16px'} color={theme.colors.dark}>
                  Address
                </Text.Medium>
                <Text.General
                  fontFamily="300"
                  fontSize={'14px'}
                  color={theme.colors.neutral06}>
                  28b empire homes estate chevron alternative lekki
                </Text.General>
              </Base.View>
            </Base.Row>
            <TouchableOpacity>
              <Text.General
                color={theme.colors.orange07}
                fontSize={'14px'}
                style={{textDecorationLine: 'underline'}}>
                Edit Number
              </Text.General>
            </TouchableOpacity>
          </Base.Row>
          <Base.Row py={'16px'} alignItems={'flex-end'}>
            <Base.Row alignItems={'flex-start'}>
              <Base.View
                backgroundColor={theme.colors.greenRandom}
                width={'32px'}
                height={'32px'}
                justifyContent={'center'}
                alignItems={'center'}
                borderRadius={'40px'}
                mr={'8px'}>
                <SvgXml xml={linear_call} width={16} height={16} />
              </Base.View>
              <Base.View>
                <Text.Medium fontSize={'16px'} color={theme.colors.dark}>
                  Phone Number
                </Text.Medium>
                <Text.General
                  fontFamily="300"
                  fontSize={'14px'}
                  color={theme.colors.neutral06}>
                  0705678990
                </Text.General>
              </Base.View>
            </Base.Row>
            <TouchableOpacity>
              <Text.General
                color={theme.colors.orange07}
                fontSize={'14px'}
                style={{textDecorationLine: 'underline'}}>
                Edit Number
              </Text.General>
            </TouchableOpacity>
          </Base.Row>
        </Base.View>
        <Base.View
          mt={'16px'}
          py={'16px'}
          px={'24px'}
          backgroundColor={theme.colors.white}>
          <Text.Medium color={theme.colors.dark} fontSize={'16px'}>
            Select payment method
          </Text.Medium>
          <Base.View mt={'15px'}>
            <PaymentMethod
              onPress={() => {
                setMethod('debit-card');
                handleOpen(DRAWER_CONSTANTS.warning, {
                  type: 'no-card-detected',
                });
              }}
              //@ts-ignore
              selected={method === 'debit-card'}>
              <Base.Row>
                <Base.View width={'60%'}>
                  <Text.Medium fontSize={'16px'} lineHeight={'24px'}>
                    Debit Card
                  </Text.Medium>
                  <Text.General
                    fontSize={'14px'}
                    mt={'3px'}
                    color={theme.colors.neutral07}
                    fontFamily="400"
                    lineHeight={'20px'}>
                    <Text.Medium
                      fontSize={'14px'}
                      fontWeight={'500'}
                      lineHeight={'20px'}
                      color={theme.colors.neutral09}>
                      NGN 50,000
                    </Text.Medium>{' '}
                    will be deducted from your visa card ****890
                  </Text.General>
                </Base.View>
                <TouchableOpacity>
                  <SvgXml
                    xml={
                      method === 'debit-card'
                        ? select_checkbox.active
                        : select_checkbox.inactive
                    }
                  />
                </TouchableOpacity>
              </Base.Row>
            </PaymentMethod>
            <PaymentMethod
              onPress={() => {
                setMethod('wallet');
                handleOpen(DRAWER_CONSTANTS.warning, {
                  type: 'insufficient-balance',
                });
              }}
              //@ts-ignore
              selected={method === 'wallet'}>
              <Base.Row>
                <Base.View width={'60%'}>
                  <Text.Medium fontSize={'16px'} lineHeight={'24px'}>
                    Wallet
                  </Text.Medium>
                  <Text.General
                    fontSize={'14px'}
                    mt={'3px'}
                    color={theme.colors.neutral07}
                    fontFamily="400"
                    lineHeight={'20px'}>
                    <Text.Medium
                      fontSize={'14px'}
                      fontFamily="500"
                      lineHeight={'20px'}
                      color={theme.colors.neutral09}>
                      NGN 50,000
                    </Text.Medium>{' '}
                    will be deducted from your wallet balance
                  </Text.General>
                </Base.View>
                <TouchableOpacity>
                  <SvgXml
                    xml={
                      method === 'wallet'
                        ? select_checkbox.active
                        : select_checkbox.inactive
                    }
                  />
                </TouchableOpacity>
              </Base.Row>
            </PaymentMethod>
          </Base.View>
        </Base.View>
        <Base.View
          mt={'16px'}
          py={'16px'}
          px={'24px'}
          backgroundColor={theme.colors.white}>
          <Text.Medium color={theme.colors.dark} fontSize={'16px'}>
            Add Delivery note
          </Text.Medium>
          <DeliveryNoteField
            multiline
            placeholder="add a note"
            placeholderTextColor={theme.colors.neutral07}
          />
        </Base.View>
        <Base.View
          mt={'16px'}
          px="18px"
          pt={'22px'}
          backgroundColor={theme.colors.white}>
          <Base.Row mb={'11px'}>
            <Text.General
              color={theme.colors.neutral06}
              fontSize={'14px'}
              fontFamily="500">
              Subtotal
            </Text.General>
            <Text.Medium color={theme.colors.neutral08} fontSize={'14px'}>
              ₦200,000,000,000
            </Text.Medium>
          </Base.Row>
          <Base.Row mb={'11px'}>
            <Text.General
              color={theme.colors.neutral06}
              fontSize={'14px'}
              fontFamily="500">
              Discount
            </Text.General>
            <Text.Medium color={theme.colors.neutral08} fontSize={'14px'}>
              ₦200
            </Text.Medium>
          </Base.Row>
          <Base.Row mb={'11px'}>
            <Text.General
              color={theme.colors.neutral06}
              fontSize={'14px'}
              fontFamily="500">
              Delivery Fee
            </Text.General>
            <Text.Medium color={theme.colors.neutral08} fontSize={'14px'}>
              ₦200
            </Text.Medium>
          </Base.Row>
          <Base.Row mb={'11px'}>
            <Text.General
              color={theme.colors.neutral06}
              fontSize={'14px'}
              fontFamily="500">
              Total
            </Text.General>
            <Text.Medium color={theme.colors.neutral08} fontSize={'14px'}>
              ₦200,000,000,000
            </Text.Medium>
          </Base.Row>
        </Base.View>
      </ScrollArea>
      <Base.View
        mt={'auto'}
        pt="20px"
        pb={'30px'}
        borderTopWidth={'1px'}
        borderTopColor={theme.colors.neutral03}
        backgroundColor={theme.colors.white}
        px={'20px'}>
        <Base.Button
          title="Pay now"
          onPress={() => navigate('Success', {type: 'order'})}
        />
      </Base.View>
    </Base.View>
  );
};

const DeliveryNoteField = styled.TextInput`
  padding: 19px 16px;
  font-size: 12px;
  color: ${theme.colors.black};
  background-color: ${theme.colors.neutral01};
  border-radius: 8px;
  margin-top: 8px;
  min-height: 84px;
  border: 1px solid ${theme.colors.neutral03};
`;
const PaymentMethod = styled.TouchableOpacity`
  border-radius: 8px;
  border: 1px solid
    ${(props: any) =>
      !props.selected ? theme.colors.neutral03 : theme.colors.green07};
  background-color: ${theme.colors.white};
  padding: 8px 16px;
  margin-bottom: 12px;
`;

const ScrollArea = styled.ScrollView``;

export default withBottomDrawer(ConfirmOrderDetails);
