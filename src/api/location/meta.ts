import {ErrorResponse} from '@api/types';
import {handleServerError} from '@libs/error';
import axios from 'axios';
import {IPlaceData, PlaceAddress, Predictions} from './types';

const apiClient = async <T>(
  url: string,
): Promise<[ErrorResponse | null, T | any | null]> => {
  try {
    const response = await axios.get(url);
    const responseData = await response?.data;
    if (response?.status >= 400 && response?.status <= 500) {
      return [responseData, null];
    }
    return [null, responseData?.data ?? responseData];
  } catch (e: any) {
    const message = handleServerError(e);
    return [{...e, errorMessage: message}, null];
  }
};

const BASE_GOOGLE_MAPS_URL = 'https://maps.googleapis.com/maps/api';

export const getPredictions = async (search: string) => {
  return apiClient<Predictions>(
    `${BASE_GOOGLE_MAPS_URL}/place/autocomplete/json?key=AIzaSyDj8vnLW0ss28PfWKT0Gy6huvKMK_ZpqBM&input=${search}&types=address&components=country:ng`,
  );
};

export const getPredictionsQuery = async (search: string) => {
  return apiClient<Predictions>(
    `${BASE_GOOGLE_MAPS_URL}/place/queryautocomplete/json?key=AIzaSyDj8vnLW0ss28PfWKT0Gy6huvKMK_ZpqBM&input=${search}&types=establishment&components=country:ng`,
  );
};

export const getPlacePredictions = async (search: string) => {
  return apiClient<Predictions>(
    `${BASE_GOOGLE_MAPS_URL}/place/findplacefromtext/json?key=AIzaSyDj8vnLW0ss28PfWKT0Gy6huvKMK_ZpqBM&input=${search}&inputype=textquery`,
  );
};

export const getPlaceFromText = async (search: string) => {
  return apiClient<IPlaceData>(
    `${BASE_GOOGLE_MAPS_URL}/place/textsearch/json?key=AIzaSyDj8vnLW0ss28PfWKT0Gy6huvKMK_ZpqBM&query=${search}`,
  );
};

export const getAddressMetaByPlaceID = async (placeId: string) => {
  return apiClient<PlaceAddress>(
    `${BASE_GOOGLE_MAPS_URL}/place/details/json?key=AIzaSyDj8vnLW0ss28PfWKT0Gy6huvKMK_ZpqBM&place_id=${placeId}`,
  );
};

export const getETA = async (origins: any, destinations: any) => {
  return apiClient(
    `${BASE_GOOGLE_MAPS_URL}/distancematrix/json?origins=${origins}&destinations=${destinations}&departure_time=now&key=AIzaSyDj8vnLW0ss28PfWKT0Gy6huvKMK_ZpqBM`,
  );
};

export const getDistanceMatrix = async (origins: any, destinations: any) => {
  return apiClient(
    `${BASE_GOOGLE_MAPS_URL}distancematrix/json?origins=${origins}&destinations=${destinations}&units=imperial&key=AIzaSyDj8vnLW0ss28PfWKT0Gy6huvKMK_ZpqBM`,
  );
};

export const getPostCodeAddressFromLatAndLong = async (
  latitude: string,
  longitude: string,
) => {
  return apiClient<PlaceAddress>(
    `${BASE_GOOGLE_MAPS_URL}/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDj8vnLW0ss28PfWKT0Gy6huvKMK_ZpqBM&sensor=true/false`,
  );
};
