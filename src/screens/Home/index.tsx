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
import {useGlobalStore} from '@store/GlobalStore';
import {useUserStore} from '@store/UserStore';
import {Fragment, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';
import {styled} from 'styled-components/native';
import * as _ from 'lodash';
import {requestLocationPermissions} from '@libs/geolocation';
import type {IPermissionResTrue} from '@libs/geolocation';
import {useCategories} from '@api/category';
import {usePromotions} from '@api/promotions';
import {useProducts} from '@api/products';
import {truncate} from 'lodash';
import Listing from '@components/ProductsListing';

const HomeScreen: React.FC<IDrawerChildProps> = ({handleOpen, handleClose}) => {
  const insets = useSafeAreaInsets();

  const {data: categoriesData, isLoading: categoriesLoading} = useCategories();
  const {data: promotionsData, isLoading: promotionsLoading} = usePromotions();
  const {data: productsData, isLoading: productsLoading} = useProducts();

  const [isFirstTime, isLocationGranted] = useGlobalStore(state => [
    state.firstTimeLogin,
    state.locationGranted,
  ]);

  const [currentLocation, updateCurrentLocation] = useUserStore(state => [
    state.user.currentLocation,
    state.updateCurrentLocation,
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefreshing = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  updateStatusBar('dark-content');

  useEffect(() => {
    isFirstTime && handleOpen?.(DRAWER_CONSTANTS.location);
  }, []);

  const getLocationAndUpdate = async () => {
    if (!isFirstTime && isLocationGranted) {
      const {address, coordinates} =
        (await requestLocationPermissions()) as unknown as IPermissionResTrue;
      if (currentLocation) {
        return;
      }
      if (address || coordinates) {
        return updateCurrentLocation(
          JSON.stringify({
            ...coordinates,
            formatted_address: address,
          }),
        );
      }
    }
  };

  useEffect(() => {
    getLocationAndUpdate();
  }, [isFirstTime, isLocationGranted, currentLocation]);

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
              isLocationGranted
                ? handleOpen?.(DRAWER_CONSTANTS.locationSet)
                : handleOpen?.(DRAWER_CONSTANTS.location);
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
                {(currentLocation &&
                  _.truncate(JSON.parse(currentLocation)?.formatted_address, {
                    length: 25,
                  })) ||
                  'Enter your location'}
              </Text.General>
              <SvgXml xml={outlineArrowDown} />
            </Base.Row>
          </TouchableOpacity>
          <Base.Row>
            <ActionButton>
              <SvgXml xml={search_icon} />
            </ActionButton>
            <ActionButton onPress={() => navigate('Notifications')}>
              <SvgXml xml={notification_icon} />
            </ActionButton>
          </Base.Row>
        </Base.Row>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefreshing}
              tintColor={theme.colors.green08}
            />
          }
          showsVerticalScrollIndicator={false}>
          {categoriesData?.category && (
            <Base.View backgroundColor={theme.colors.white} px={'20px'}>
              <Text.Medium fontSize={'16px'}>Categories</Text.Medium>
              <CategoriesView
                horizontal
                showsHorizontalScrollIndicator={false}
                bouncesZoom={false}>
                {categoriesData?.category?.map((category, i) => {
                  return (
                    <Base.View mr={'8px'} key={i}>
                      <TouchableOpacity
                        onPress={() =>
                          navigate('Category', {
                            ...category,
                          })
                        }
                        activeOpacity={0.76}>
                        <CategoryImage
                          source={{
                            uri: category?.thumbnails,
                          }}
                        />
                        <Text.General
                          style={{textTransform: 'capitalize'}}
                          mt={'8px'}
                          fontSize={'14px'}>
                          {truncate(category?.name, {length: 15})}
                        </Text.General>
                      </TouchableOpacity>
                    </Base.View>
                  );
                })}
              </CategoriesView>
            </Base.View>
          )}
          <Base.View
            px={'20px'}
            py={'16px'}
            mt={'16px'}
            backgroundColor={theme.colors.white}>
            {promotionsData?.promotions?.map((promotion, i) => {
              return <Listing key={i} {...promotion} />;
            })}
            {productsData?.product && (
              <Base.View mb={'-24px'}>
                <Base.Row alignItems={'center'}>
                  <Base.View>
                    <Text.Medium isCapitalize fontSize={'18px'}>
                      All Products
                    </Text.Medium>
                  </Base.View>
                </Base.Row>
                <Base.View py={'16px'}>
                  <Base.Row flexWrap={'wrap'}>
                    {productsData?.product?.map((product, i) => {
                      return <OfaydProduct key={i} {...product} />;
                    })}
                  </Base.Row>
                </Base.View>
              </Base.View>
            )}
          </Base.View>
        </ScrollView>
      </Fragment>
    </CartViewWrapper>
  );
};

const CategoryImage = styled.Image`
  height: 71px;
  width: 106px;
  border-radius: 6px;
  padding-bottom: 20px;
  background-color: ${theme.colors.green08};
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
