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

interface Location {
  lat: number;
  lng: number;
}

interface Viewport {
  // Define properties for the Viewport if needed.
  // Example: northeast: Location, southwest: Location
}

interface Geometry {
  location: Location;
  viewport?: Viewport;
}

interface OpeningHours {
  open_now?: boolean;
}

interface Photo {
  // Define properties for the Photo if needed.
  // Example: photo_reference: string;
}

interface PlusCode {
  compound_code: string;
  global_code: string;
}

interface Result {
  business_status: string;
  formatted_address: string;
  geometry: Geometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours: OpeningHours;
  photos: Photo[];
  place_id: string;
  plus_code: PlusCode;
  rating: number;
  reference: string;
  types: string[];
  user_ratings_total: number;
}

export interface IPlaceData {
  html_attributions: any[]; // You can define a more specific type if needed.
  results: Result[];
  status: string;
}
