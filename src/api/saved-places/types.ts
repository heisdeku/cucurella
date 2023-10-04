export interface ISavedLocation {
  latitude: number;
  longitude: number;
  formatted_address: string;
}
export interface ISavedPlace {
  id: string;
  userId: string;
  description: string;
  location: ISavedLocation;
  created_at: Date | string;
  updated_at: Date | string;
}

export interface IAddSavedPlaceVariable {
  description: string;
  location: ISavedLocation;
}
