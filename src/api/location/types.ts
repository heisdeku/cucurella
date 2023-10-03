export interface PredictionType {
  description: string;
  place_id: string;
  reference: string;
  matched_substrings: any[];
  structured_formatting: Object;
  terms: Object[];
  types: string[];
}

export interface Predictions {
  predictions: PredictionType[];
}

export interface PlaceAddress {
  result: {
    address_components: {
      long_name: string;
      short_name: string;
    }[];
    formatted_address: string;
    geometry: {
      location: {
        lat: string;
        lng: string;
      };
    };
  };
}
