import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

interface IOnboardingStore {
  firstName: string;
  lastName: string;
  otp: string;
  pin: string;
  phoneNumber?: string;
  email?: string;
  source: 'phone' | 'email' | string;
  setState: (value: IOnboardingStore) => void;
  updateStateItem: (key: keyof IOnboardingStore, value: any) => void;
}

const DEFAULT_ONBOARDING_STATE = {
  firstName: '',
  lastName: '',
  otp: '',
  pin: '',
  phoneNumber: '',
  email: '',
  source: 'phone',
};

export const useOnboardingStore = create(
  immer<IOnboardingStore>((set, get) => ({
    ...DEFAULT_ONBOARDING_STATE,
    setState: (state: IOnboardingStore) => {
      set({
        firstName: state.firstName,
        lastName: state.lastName,
        phoneNumber: state.phoneNumber,
      });
    },
    updateStateItem: (key: keyof IOnboardingStore, value: string) => {
      set(state => {
        //@ts-expect-error
        state[key] = value;
      });
    },
  })),
);
