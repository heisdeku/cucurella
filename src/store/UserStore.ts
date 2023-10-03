import {appStorage} from '@libs/storage';
import {navigate} from '@stacks/helper';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

type UserLocationT = {
  latitude: string;
  longitude: string;
  formatted_address: string;
};
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pin: string;
  googleId: string;
  facebookId: string;
  nationality: string;
  phoneNumber: string;
  isEmailVerified: boolean;
  role: string;
  isPhoneNumberVerified: boolean;
  verificationCode: string;
  created_at: Date | string;
  updated_at: Date | string;
  currentLocation: string | null;
  image: string;
  type: 'guest' | 'user' | string;
}

export interface IUserStore {
  user: IUser;
  setUser: (user: IUser) => void;
  updateCurrentLocation: (location: string) => void;
  continueAsGuest: () => void;
}

const INITIAL_USER = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  pin: '',
  googleId: '',
  facebookId: '',
  nationality: '',
  phoneNumber: '',
  isEmailVerified: false,
  role: 'User',
  isPhoneNumberVerified: false,
  verificationCode: '',
  created_at: new Date(),
  updated_at: new Date(),
  currentLocation: null,
  image: '',
  type: '',
};

export const useUserStore = create(
  immer(
    persist<IUserStore>(
      (set, get) => ({
        user: get()?.user || INITIAL_USER,
        setUser: (user: IUser) => {
          //@ts-expect-error
          set(state => {
            state.user = {...user};
            state.user.type = 'user';
          });
        },
        updateCurrentLocation: (location: string) => {
          //@ts-expect-error
          set(state => {
            state.user.currentLocation = location;
          });
        },
        continueAsGuest: () => {
          //@ts-expect-error
          set(state => {
            state.user.type = 'guest';
          });
        },
      }),
      {name: 'ofayd-user-store', storage: createJSONStorage(() => appStorage)},
    ),
  ),
);

export const handleContinueAsGuest = () => {
  const {continueAsGuest} = useUserStore.getState();
  continueAsGuest();
  return navigate('App');
};
