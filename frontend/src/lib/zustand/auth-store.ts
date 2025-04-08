import { create } from 'zustand';

type State = {
   accessToken: string;
   setAccessToken: (update: string | ((prev: string) => string)) => void;
};

const useAuthStore = create<State>((set) => ({
   accessToken: '1234',

   setAccessToken: (update) =>
      set((state) => ({
         accessToken:
            typeof update === 'function' ? update(state.accessToken) : update,
      })),
}));

export default useAuthStore;
