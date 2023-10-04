import {IPromotion} from '@api/promotions';
import theme from '@libs/theme';
import {navigate} from '@stacks/helper';
import styled from 'styled-components/native';
import {Base} from './Base';
import {OfaydProduct} from './OfaydProduct';
import {Text} from './Text';

const Listing = ({name, ...promotion}: IPromotion) => {
  return (
    <Base.View mb={'-24px'}>
      <Base.Row alignItems={'center'}>
        <Base.View maxWidth={'70%'}>
          <Text.Medium isCapitalize fontSize={'18px'}>
            {name}
          </Text.Medium>
          <Text.Medium
            isCapitalize
            fontSize={'14px'}
            color={theme.colors.amber07}
            lineHeight={'20px'}>
            {promotion?.condition}
          </Text.Medium>
        </Base.View>
        <ViewAllSpeicalOffers
          onPress={() =>
            navigate('Deals', {
              name,
              condition: promotion?.condition,
              id: promotion?.id,
              startDate: promotion?.startDate,
              endDate: promotion?.endDate,
            })
          }>
          <Text.General fontSize={'12px'}>View all</Text.General>
        </ViewAllSpeicalOffers>
      </Base.Row>
      <Base.View py={'16px'}>
        <Base.Row>
          {promotion?.products?.map((product, i) => {
            const productDetails = product?.product;
            return <OfaydProduct key={i} {...productDetails} />;
          })}
        </Base.Row>
      </Base.View>
    </Base.View>
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

export default Listing;
