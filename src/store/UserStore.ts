import {appStorage} from '@libs/storage';
import {navigate} from '@stacks/helper';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';

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
  type: 'guest' | 'user' | string;
}

export interface IUserStore {
  user: IUser;
  continueAsGuest: () => void;
}

export const useUserStore = create(
  immer(
    persist<IUserStore>(
      (set, _) => ({
        user: {
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
          type: '',
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
