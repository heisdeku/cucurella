import {Base} from '@components/Base';
import {Text} from '@components/Text';
import {
  add_icon,
  arrowLeft,
  boldHeart,
  minus_icon,
  sendTwo,
  shoppingBag,
} from '@libs/svgs';
import theme from '@libs/theme';
import {goBack} from '@stacks/helper';
import {Dimensions, ScrollView} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {styled} from 'styled-components/native';

const ProductScreen = () => {
  return (
    <Base.View
      height={Dimensions.get('screen').height}
      backgroundColor={theme.colors.white}>
      <ProductImage
        source={{
          uri: 'https://res.cloudinary.com/heisdeku/image/upload/v1692866177/ofayd-mocks/hyupbv5ffqrs6qsjampy.png',
        }}>
        <Base.Row px={'20px'} pt={'53px'}>
          <Button onPress={() => goBack()}>
            <SvgXml xml={arrowLeft} />
          </Button>
          <Button>
            <Base.View
              position={'absolute'}
              zIndex={2}
              borderRadius={'999px'}
              top={'-5px'}
              right={'-5px'}
              width={'17.5px'}
              height={'17.5px'}
              justifyContent={'center'}
              alignItems={'center'}
              backgroundColor={theme.colors.goldenYellow}>
              <Text.General fontFamily="700" fontSize={'8.75px'}>
                10
              </Text.General>
            </Base.View>
            <SvgXml xml={shoppingBag} />
          </Button>
        </Base.Row>
      </ProductImage>
      <ScrollView bounces={false} style={{backgroundColor: theme.colors.white}}>
        <Base.View p={'20px'}>
          <Base.Row alignItems={'flex-start'}>
            <Base.View>
              <Text.Medium fontSize={'24px'} lineHeight={'30px'}>
                Green bell Pepper
              </Text.Medium>
              <Text.Medium
                fontSize={'14px'}
                lineHeight={'17.5px'}
                my={'7px'}
                color={theme.colors.neutral07}>
                Over 200 pieces sold
              </Text.Medium>
              <Text.Medium
                mb={'16px'}
                lineHeight={'17.5px'}
                fontSize={'14px'}
                color={theme.colors.neutral07}>
                1 gram = 1 peice
              </Text.Medium>
              <UnderlinedButton>
                <Text.Medium
                  lineHeight={'20px'}
                  fontSize={'16px'}
                  style={{textDecorationLine: 'underline'}}
                  color={theme.colors.neutral07}>
                  Get more details
                </Text.Medium>
              </UnderlinedButton>
            </Base.View>
            <LikeProductButton>
              <SvgXml xml={boldHeart} />
            </LikeProductButton>
          </Base.Row>
          <Base.View mt={'24px'}>
            <Text.Medium fontSize={'18px'} lineHeight={'22.5px'}>
              Description
            </Text.Medium>
            <Text.Small fontSize={'16px'} lineHeight={'20px'} mt={'8px'}>
              Tags: vegetables, fruits, household items,{' '}
            </Text.Small>
          </Base.View>
          <Base.View mt={'24px'}>
            <Text.Medium fontSize={'18px'} lineHeight={'22.5px'}>
              Delivery details
            </Text.Medium>
            <Text.Small
              mb={'8px'}
              fontSize={'16px'}
              lineHeight={'20px'}
              mt={'8px'}>
              Address: 28b empire homes estate chevron alternative lekki.
            </Text.Small>
            <UnderlinedButton>
              <Text.Medium
                lineHeight={'20px'}
                fontSize={'16px'}
                style={{textDecorationLine: 'underline'}}
                color={theme.colors.neutral07}>
                Change Delivery Address
              </Text.Medium>
            </UnderlinedButton>
          </Base.View>
          <ShareProductButton>
            <Base.Row mx={'auto'}>
              <SvgXml xml={sendTwo} />
              <Text.General ml={'8px'} color={theme.colors.neutral08}>
                Share Product
              </Text.General>
            </Base.Row>
          </ShareProductButton>
        </Base.View>
      </ScrollView>
      <Base.View
        borderTopWidth={'1px'}
        borderTopColor={theme.colors.neutral03}
        pt={'16px'}
        pb={'50px'}
        px={'20px'}>
        <Base.Row>
          <Base.Row>
            <RangeButton>
              <SvgXml xml={minus_icon} />
            </RangeButton>
            <Text.Medium fontSize={'16px'} mx={'11px'}>
              2
            </Text.Medium>
            <RangeButton>
              <SvgXml xml={add_icon} />
            </RangeButton>
          </Base.Row>
          <AddToCartButton activeOpacity={0.95}>
            <Text.Medium letterSpacing={'0.24px'} color={theme.colors.white}>
              Add ₦200,000.00
            </Text.Medium>
          </AddToCartButton>
        </Base.Row>
      </Base.View>
    </Base.View>
  );
};

const AddToCartButton = styled.TouchableOpacity`
  flex-shrink: 0;
  flex-grow: 1;
  margin-left: 8px;
  background-color: ${theme.colors.green07};
  border-radius: 8px;
  padding: 8px;
  align-items: center;
`;

const RangeButton = styled.TouchableOpacity`
  border: 1px solid ${theme.colors.green08};
  padding: 8px;
  border-radius: 6px;
`;

const ShareProductButton = styled.TouchableOpacity`
  border-radius: 35px;
  background-color: ${theme.colors.neutral02};
  padding: 8px 12px;
  width: 155px;
  margin-top: 20px;
`;

const LikeProductButton = styled.TouchableOpacity`
  border-radius: 74px;
  background-color: ${theme.colors.neutral02};
  padding: 8px;
`;

const UnderlinedButton = styled.TouchableOpacity``;

const Button = styled.TouchableOpacity`
  background-color: ${theme.colors.black};
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 37.143px;
  position: relative;
`;

const ProductImage = styled.ImageBackground`
  width: 100%;
  height: 248px;
`;

export default ProductScreen;
