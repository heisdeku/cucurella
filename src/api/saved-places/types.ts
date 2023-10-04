export interface ISavedPlace {
  id: string;
  userId: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    formatted_address: string;
  };
  created_at: Date | string;
  updated_at: Date | string;
}
