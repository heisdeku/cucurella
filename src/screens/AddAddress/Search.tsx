import React, {useState} from 'react';
import theme from '@libs/theme';
import KeyboardWrapper from '@components/KeyboardWrapper';
import {Base} from '@components/Base';
import Container from '@components/Container';
import {Text} from '@components/Text';
import {styled} from 'styled-components/native';
import {SvgXml} from 'react-native-svg';
import {outlineAdd, outlineMap, search_icon} from '@libs/svgs';
import ScreenHeader from '@components/ScreenHeader';
import {ActivityIndicator, FlatList, TouchableOpacity} from 'react-native';
import {goBack, navigate} from '@stacks/helper';
import {PredictionType} from '@api/location/types';
import {getAddressMetaByPlaceID, getPredictions} from '@api/location';
import {useDebounce} from '@hooks/useDebounce';
import {truncate} from 'lodash';
import {windowHeight} from '@libs/constant';
import {useAddSavedPlace} from '@api/saved-places/useAddSavedPlace';

const Place: React.FC<PredictionType> = ({...place}) => {
  const {mutate, isLoading} = useAddSavedPlace();

  const handleSelection = async () => {
    if (place?.place_id) {
      const [error, response] = await getAddressMetaByPlaceID(place?.place_id);

      if (error) {
        return console.error('occrued error');
      }

      const formattedAddress = {
        formatted_address: response?.result.formatted_address,
        latitude: response?.result.geometry.location.lat,
        longitude: response?.result.geometry.location.lng,
      };

      await mutate(
        {
          description: formattedAddress?.formatted_address,
          location: formattedAddress,
        },
        {onSuccess: () => goBack()},
      );
    }
  };
  return (
    <TouchableOpacity activeOpacity={0.56} onPress={() => handleSelection()}>
      <Base.Row
        borderBottomWidth={'1px'}
        borderBottomColor={theme.colors.neutral03}
        alignItems={'center'}
        padding={'8px'}
        justifyContent={'flex-start'}>
        <SvgXml xml={outlineMap} />
        <Text.Medium ml={'6px'} fontSize={'14px'}>
          {truncate(place?.description, {length: 40})}
        </Text.Medium>
      </Base.Row>
    </TouchableOpacity>
  );
};

const Search = () => {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState<PredictionType[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);

  const onChangeText = async () => {
    if (search.trim() === '') {
      return;
    }
    setIsLoading(true);
    const [error, response] = await getPredictions(search);

    if (error) {
      setShowPredictions(true);
    }

    if (response?.predictions) {
      setPredictions(response.predictions);
      setShowPredictions(true);
    }

    setIsLoading(false);
  };

  useDebounce(onChangeText, 500, [search]);

  const _renderPredictions = (predictions: PredictionType[]) => {
    return (
      <FlatList
        data={predictions}
        style={{minHeight: windowHeight}}
        renderItem={({item, index}) => {
          return <Place key={index} {...item} />;
        }}
        keyExtractor={item => item.place_id}
        keyboardShouldPersistTaps="handled"
      />
    );
  };

  return (
    <KeyboardWrapper scrollEnabled={false}>
      <ScreenHeader label="Add Address" />
      <Container pt={'24px'}>
        <LocationFiled>
          <SvgXml xml={search_icon} />
          <InputField
            placeholder="Add New Location"
            placeholderTextColor={theme.colors.neutral07}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect={false}
            value={search}
            onChangeText={(value: string) => setSearch(value)}
          />
        </LocationFiled>
        <Base.View
          mt={'4px'}
          borderBottomWidth={'1px'}
          borderBottomColor={theme.colors.neutral03}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigate('AddAddressManual')}>
            <Base.Row
              padding={'8px'}
              justifyContent={'flex-start'}
              alignItems={'center'}>
              <SvgXml xml={outlineAdd} />
              <Text.Medium ml={'6px'} fontSize={'14px'}>
                Add your address manually
              </Text.Medium>
            </Base.Row>
          </TouchableOpacity>
        </Base.View>
        <Base.View>
          {isLoading && (
            <Base.View mt={'16px'}>
              <ActivityIndicator size={'large'} color={theme.colors.green08} />
            </Base.View>
          )}
          {showPredictions && _renderPredictions(predictions)}
        </Base.View>
      </Container>
    </KeyboardWrapper>
  );
};

const LocationFiled = styled.View`
  background-color: ${theme.colors.green01};
  border: 1px solid ${theme.colors.green08};
  padding: 16px 16px;
  height: 50px;
  border-radius: 8px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const InputField = styled.TextInput`
  background-color: transparent;
  flex: 1;
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
  line-height: 15px;
  color: ${theme.colors.black};
  margin-left: 8px;
`;

export default Search;
