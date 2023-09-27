import {Base} from '@components/Base';
import CartViewWrapper from '@components/CartContainer';
import {OfaydProduct} from '@components/OfaydProduct';
import {Text} from '@components/Text';
import withBottomDrawer from '@components/withBottomDrawer';
import {IDrawerChildProps} from '@components/withBottomDrawer/helper';
import {arrowRight} from '@libs/svgs';
import theme from '@libs/theme';
import {goBack, navigate} from '@stacks/helper';
import {Fragment} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SvgXml} from 'react-native-svg';

interface IListing {
  name: string;
  description: string;
}

const DealsScreen: React.FC<IDrawerChildProps> = ({
  handleOpen,
  handleClose,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <CartViewWrapper>
      <Fragment>
        <Base.View
          pt={insets.top + 10 + 8}
          px={'20px'}
          backgroundColor={theme.colors.white}>
          <TouchableOpacity onPress={() => goBack()}>
            <SvgXml xml={arrowRight} />
          </TouchableOpacity>
          <Base.Row mt={'17px'} alignItems={'flex-end'} pb={'16px'}>
            <Base.View>
              <Text.Medium
                fontWeight={'700'}
                fontSize={'20px'}
                color={theme.colors.black}
                mb={'8px'}>
                Special Offer discount
              </Text.Medium>
              <Text.General
                fontWeight={'500'}
                fontSize={'16px'}
                color={theme.colors.amber07}>
                Get 50% off on all orders
              </Text.General>
            </Base.View>
            <Base.View>
              <Text.Medium fontSize={'16px'} textAlign={'right'}>
                Time left
              </Text.Medium>
              <Text.General
                fontSize={'14px'}
                textAlign={'right'}
                color={theme.colors.amber07}>
                12h : 49min : 2s
              </Text.General>
            </Base.View>
          </Base.Row>
        </Base.View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Base.View
            px={'20px'}
            py={'16px'}
            mt={'16px'}
            backgroundColor={theme.colors.white}>
            <Base.Row flexWrap={'wrap'}>
              {new Array(10)
                .fill({name: 'Chicken', price: '1150.00'})
                .map((order, i) => {
                  return <OfaydProduct />;
                })}
            </Base.Row>
          </Base.View>
        </ScrollView>
      </Fragment>
    </CartViewWrapper>
  );
};

export default withBottomDrawer(DealsScreen);
