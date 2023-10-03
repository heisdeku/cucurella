import {appStorage} from '@libs/storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

export interface IGlobalStore {
  locationGranted: boolean;
  firstTimeLogin: boolean;
  setLocationGranted: (status: boolean) => void;
  setFirstTimeLogin: (status: boolean) => void;
}
export const useGlobalStore = create(
  persist<IGlobalStore>(
    (set, get) => ({
      firstTimeLogin: get()?.firstTimeLogin || true,
      locationGranted: get()?.locationGranted || false,
      setLocationGranted: (status: boolean) => set({locationGranted: status}),
      setFirstTimeLogin: (status: boolean) => set({firstTimeLogin: status}),
    }),
    {name: 'ofayd-global-store', storage: createJSONStorage(() => appStorage)},
  ),
);
