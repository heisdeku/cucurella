import {Base} from '@components/Base';
import {Text} from '@components/Text';
import withBottomDrawer from '@components/withBottomDrawer';
import {DRAWER_CONSTANTS} from '@components/withBottomDrawer/constants';
import {
  mdiLocation,
  notification_icon,
  outlineArrowDown,
  search_icon,
} from '@libs/svgs';
import theme from '@libs/theme';
import {navigate} from '@stacks/helper';
import {ScrollView, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {styled} from 'styled-components/native';

interface IListing {
  name: string;
  description: string;
}

const Listing = ({name, description}: IListing) => {
  const goToProduct = () => {
    return navigate('Product');
  };
  return (
    <Base.View>
      <Base.Row alignItems={'center'}>
        <Base.View>
          <Text.Medium fontSize={'18px'}>{name}</Text.Medium>
          <Text.Medium
            fontSize={'14px'}
            color={theme.colors.amber07}
            style={{fontStyle: 'italic'}}
            lineHeight={'20px'}>
            {description}
          </Text.Medium>
        </Base.View>
        <ViewAllSpeicalOffers>
          <Text.General fontSize={'12px'}>View all</Text.General>
        </ViewAllSpeicalOffers>
      </Base.Row>
      <Base.View py={'16px'}>
        <Base.Row>
          {new Array(2)
            .fill({name: 'Chicken', price: '1150.00'})
            .map((order, i) => {
              return (
                <Base.View
                  key={i}
                  borderRadius={'10px'}
                  borderWidth={'1px'}
                  py={'8px'}
                  width={'49%'}
                  px="6px"
                  borderColor={theme.colors.neutral02}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => goToProduct()}>
                    <ProductImage
                      source={{
                        uri: 'https://res.cloudinary.com/heisdeku/image/upload/v1692820452/ofayd-mocks/ymjrrmeofornej3m6u1s.png',
                      }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                  <Base.View mt={'8px'}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => goToProduct()}>
                      <Text.Medium fontSize={'16px'}>Chicken</Text.Medium>
                      <Text.General
                        fontSize={'14px'}
                        color={theme.colors.neutral06}>
                        ₦1150.00/kg
                      </Text.General>
                    </TouchableOpacity>
                    <AddToCartButton>
                      <Text.Medium
                        color={theme.colors.black12}
                        fontSize={'12px'}>
                        Add to Cart
                      </Text.Medium>
                    </AddToCartButton>
                  </Base.View>
                </Base.View>
              );
            })}
        </Base.Row>
      </Base.View>
    </Base.View>
  );
};

const HomeScreen = ({handleOpen, handleClose}) => {
  return (
    <Base.SafeView backgroundColor={theme.colors.white}>
      <Base.View px={'20px'} pt={'18px'} pb={'20px'}>
        <Base.Row alignItems={'center'} mb={'16px'}>
          <TouchableOpacity
            onPress={() => handleOpen(DRAWER_CONSTANTS.location)}>
            <Base.Row alignItems={'center'}>
              <LocationPointer>
                <SvgXml xml={mdiLocation} />
              </LocationPointer>
              <Text.General
                fontSize={'14px'}
                color={theme.colors.dark}
                ml={'4px'}
                mr={'6px'}>
                Enter your location
              </Text.General>
              <SvgXml xml={outlineArrowDown} />
            </Base.Row>
          </TouchableOpacity>
          <Base.Row>
            <ActionButton>
              <SvgXml xml={search_icon} />
            </ActionButton>
            <ActionButton>
              <SvgXml xml={notification_icon} />
            </ActionButton>
          </Base.Row>
        </Base.Row>
        <Text.Medium fontSize={'16px'}>Categories</Text.Medium>
        <CategoriesView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}>
          {new Array(6).fill('Vegetables')?.map((category, i) => {
            return (
              <Base.View mr={'8px'} key={i}>
                <CategoryImage
                  source={{
                    uri: 'https://res.cloudinary.com/heisdeku/image/upload/v1692817235/ofayd-mocks/lellfldd6wtrua9pr3zc.png',
                  }}
                />
                <Text.General fontSize={'14px'}>{category}</Text.General>
              </Base.View>
            );
          })}
        </CategoriesView>
      </Base.View>
      <ScrollView
        // bounces={false}
        contentContainerStyle={{
          paddingBottom: 200,
        }}
        showsVerticalScrollIndicator={false}>
        <Base.View
          px={'20px'}
          py={'16px'}
          mt={'16px'}
          backgroundColor={theme.colors.white}>
          <Listing
            name="Special Offer"
            description="Get 50% off on all orders"
          />
          <Listing name="Ofayd offer" description="Buy two get one free" />
          {/* <Listing /> */}
        </Base.View>
      </ScrollView>
    </Base.SafeView>
  );
};

const AddToCartButton = styled.TouchableOpacity`
  align-items: center;
  margin-top: 11px;
  padding: 8px 13px;
  background-color: ${theme.colors.green02};
  border-radius: 7px;
`;

const ProductImage = styled.Image`
  width: 149px;
  height: 97px;
  border-radius: 9px;
`;

const ViewAllSpeicalOffers = styled.TouchableOpacity`
  border-radius: 11px;
  width: 64px;
  height: 31px;
  background-color: ${theme.colors.offsetGray};
  justify-content: center;
  align-items: center;
`;

const CategoryImage = styled.Image`
  height: 71px;
  width: 106px;
  border-radius: 6px;
  margin-bottom: 8px;
`;
const CategoriesView = styled.ScrollView`
  margin-top: 12px;
`;

const LocationPointer = styled.View`
  width: 31px;
  height: 31px;
  border-radius: 46px;
  background-color: ${theme.colors.greenRandom};
  justify-content: center;
  align-items: center;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: ${theme.colors.neutral02};
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  margin: 0px 4px;
`;

const MainScrollArea = styled.ScrollView`
  margint-top: 16px;
  flex: 1;
  background-color: ${theme.colors.green01};
`;
export default withBottomDrawer(HomeScreen);
