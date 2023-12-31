import React, {useEffect, useState} from 'react';
import theme from '@libs/theme';
import {Base} from '@components/Base';
import {Text} from '@components/Text';
import {styled} from 'styled-components/native';
import {Path, Svg, SvgXml} from 'react-native-svg';
import {trash_icon} from '@libs/svgs';
import ScreenHeader from '@components/ScreenHeader';
import {useSavedPlaces} from '@api/saved-places/useSavedPlaces';
import {ISavedPlace, useDeleteSavedPlaces} from '@api/saved-places';
import {navigate} from '@stacks/helper';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {useUpdateUserLocation} from '@api/location/useUpdateLocation';
import {useUserStore} from '@store/UserStore';
import updateStatusBar from '@hooks/updateStatusBar';

const SavedPlace: React.FC<ISavedPlace> = ({...place}) => {
  const {mutate, isLoading} = useUpdateUserLocation();
  const {mutate: deleteMutate, isLoading: deleteLoading} =
    useDeleteSavedPlaces();
  const [userId] = useUserStore(state => [state.user.id]);

  const handleUpdateLocation = async () => {
    return mutate({location: place.location, userId});
  };

  const handleDeletePlace = async () => {
    return deleteMutate({placeId: place.id});
  };
  return (
    <Base.Row
      borderBottomWidth={'1px'}
      borderBottomColor={theme.colors.neutral03}
      alignItems={'center'}
      px={'8px'}
      py={'16px'}>
      <TouchableOpacity
        onPress={() => handleUpdateLocation()}
        activeOpacity={0.45}>
        <Text.Medium maxWidth={'98%'} fontSize={'14px'}>
          {place?.description}
        </Text.Medium>
      </TouchableOpacity>
      <DeleteButton onPress={() => handleDeletePlace()}>
        <SvgXml xml={trash_icon} />
      </DeleteButton>
    </Base.Row>
  );
};

const SavedPlaces = () => {
  updateStatusBar('dark-content');
  const {data, isLoading, isError} = useSavedPlaces();
  const [savedPlaces, setSavedPlaces] = useState<ISavedPlace[]>([]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      return setSavedPlaces(data);
    }
  });

  return (
    <Base.View backgroundColor={theme.colors.white}>
      <ScreenHeader label="Saved Places" />
      <ScrollArea>
        <Base.View>
          <LocationFiled
            onPress={() => navigate('AddAddressSearch')}
            activeOpacity={0.8}>
            <Svg
              width="16"
              style={{marginRight: 8}}
              height="16"
              viewBox="0 0 16 16"
              fill="none">
              <Path
                d="M12 8.5H4C3.72667 8.5 3.5 8.27333 3.5 8C3.5 7.72667 3.72667 7.5 4 7.5H12C12.2733 7.5 12.5 7.72667 12.5 8C12.5 8.27333 12.2733 8.5 12 8.5Z"
                fill="#64748B"
              />
              <Path
                d="M8 12.5C7.72667 12.5 7.5 12.2733 7.5 12V4C7.5 3.72667 7.72667 3.5 8 3.5C8.27333 3.5 8.5 3.72667 8.5 4V12C8.5 12.2733 8.27333 12.5 8 12.5Z"
                fill="#64748B"
              />
            </Svg>
            <Text.General
              fontSize={'12px'}
              // lineHeight="15px"
              color={theme.colors.neutral07}>
              Add New Location
            </Text.General>
          </LocationFiled>
        </Base.View>
        <Base.View my={'14px'}>
          {isLoading && (
            <ActivityIndicator size={'large'} color={theme.colors.green08} />
          )}
          {Array.isArray(data) &&
            savedPlaces?.map((place, i) => {
              return <SavedPlace {...place} key={i} />;
            })}
          {!Array.isArray(data) && (
            <Text.General mt={'20px'} fontSize={'14px'} textAlign={'center'}>
              {data}
            </Text.General>
          )}
        </Base.View>
      </ScrollArea>
    </Base.View>
  );
};

const ScrollArea = styled.ScrollView`
  padding: 24px 24px 0;
  min-height: 100%;
`;

const DeleteButton = styled.TouchableOpacity`
  border-radius: 41px;
  background-color: ${theme.colors.red01};
  width: 27px;
  height: 27px;
  justify-content: center;
  align-items: center;
`;

const LocationFiled = styled.TouchableOpacity`
  background-color: ${theme.colors.neutral01};
  border: 1px solid ${theme.colors.stroke};
  padding-left: 16px;
  height: 50px;
  border-radius: 8px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export default SavedPlaces;
