import {appStorage} from '@libs/storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import * as RNSensitiveInfo from 'react-native-sensitive-info';

export interface IAuthTokens {
  accessToken: string;
}
export interface IAuthState {
  isLoggedIn: () => Promise<boolean>;
  status: 'idle' | 'signOut' | 'signIn';
  accessToken: string | null;
}

export interface IAuthActions {
  authenticate: (tokens: IAuthTokens) => void;
  logOut: (cb?: TAuthLogoutParams) => Promise<void>;
  hydrate: () => void;
}

export const getAccessToken = async () => {
  try {
    return await appStorage.getItem('ofayd-user-access-token');
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const setAccessToken = async (token: string) => {
  return await appStorage.setItem('ofayd-user-access-token', token);
};

export const useAuthStore = create(
  persist<IAuthState & IAuthActions>(
    (set, get) => ({
      accessToken: null,
      status: 'idle',
      isLoggedIn: async () => {
        const accessToken = await getAccessToken();
        return !!get().accessToken && !!accessToken;
      },
      authenticate: (tokens: IAuthTokens) => {
        set({
          accessToken: tokens.accessToken,
          status: 'signIn',
        });
        setAccessToken(tokens.accessToken);
      },
      logOut: async (cb?: TAuthLogoutParams) => {
        try {
          cb?.(get()?.accessToken as string)
            .then()
            .catch(console.error);
          set({accessToken: null, status: 'signOut'});
          async () =>
            await RNSensitiveInfo.deleteItem('ofayd-user-access-token', {
              sharedPreferencesName: 'ofaydSharedPreferences',
              keychainService: 'ofaydSharedKeychain',
            });
        } catch (e) {
          console.error(e);
        }
      },
      hydrate: async () => {
        const accessToken = await getAccessToken();
        if (accessToken !== null) {
          get().authenticate({accessToken});
        } else {
          get().logOut();
        }
        try {
        } catch (e) {
          console.error(e);
        }
      },
    }),
    {name: 'ofayd-user-auth', storage: createJSONStorage(() => appStorage)},
  ),
);

export const hydrateAuth = () => useAuthStore.getState().hydrate();

export type TAuthLogoutParams = (accessToken: string) => Promise<void>;
