import {Base} from '@components/Base';
import CartViewWrapper from '@components/CartContainer';
import {OfaydProduct} from '@components/OfaydProduct';
import {Text} from '@components/Text';
import withBottomDrawer from '@components/withBottomDrawer';
import {DRAWER_CONSTANTS} from '@components/withBottomDrawer/constants';
import {IDrawerChildProps} from '@components/withBottomDrawer/helper';
import updateStatusBar from '@hooks/updateStatusBar';
import {
  mdiLocation,
  notification_icon,
  outlineArrowDown,
  search_icon,
} from '@libs/svgs';
import theme from '@libs/theme';
import {navigate} from '@stacks/helper';
import {Fragment} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {styled} from 'styled-components/native';

interface IListing {
  name: string;
  description: string;
}

const Listing = ({name, description}: IListing) => {
  return (
    <Base.View mb={'-24px'}>
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
        <ViewAllSpeicalOffers onPress={() => navigate('Deals')}>
          <Text.General fontSize={'12px'}>View all</Text.General>
        </ViewAllSpeicalOffers>
      </Base.Row>
      <Base.View py={'16px'}>
        <Base.Row>
          {new Array(2)
            .fill({name: 'Chicken', price: '1150.00'})
            .map((order, i) => {
              return <OfaydProduct key={i} />;
            })}
        </Base.Row>
      </Base.View>
    </Base.View>
  );
};

const HomeScreen: React.FC<IDrawerChildProps> = ({handleOpen, handleClose}) => {
  updateStatusBar('dark-content');
  const insets = useSafeAreaInsets();

  return (
    <CartViewWrapper>
      <Fragment>
        <Base.Row
          pt={insets.top + 10 + 8}
          px={'20px'}
          backgroundColor={theme.colors.white}
          alignItems={'center'}
          pb={'16px'}>
          <TouchableOpacity
            onPress={() => {
              // handleOpen?.(DRAWER_CONSTANTS.location); - NOTE: this would be moved to an useeffect and would run on first instance
              handleOpen?.(DRAWER_CONSTANTS.locationSet);
            }}>
            <Base.Row alignItems={'center'}>
              <LocationPointer>
                <SvgXml xml={mdiLocation} />
              </LocationPointer>
              <Text.General
                fontSize={'14px'}
                lineHeight={'20px'}
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <Base.View backgroundColor={theme.colors.white} px={'20px'}>
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
                    <Text.General mt={'8px'} fontSize={'14px'}>
                      {category}
                    </Text.General>
                  </Base.View>
                );
              })}
            </CategoriesView>
          </Base.View>
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
            <Listing name="Ofayd offer" description="Buy two get one free" />
          </Base.View>
        </ScrollView>
      </Fragment>
    </CartViewWrapper>
  );
};

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
  padding-bottom: 20px;
`;
const CategoriesView = styled.ScrollView`
  margin-top: 12px;
  padding-bottom: 20px;
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

export default withBottomDrawer(HomeScreen);
