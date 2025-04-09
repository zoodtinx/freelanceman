import { create } from 'zustand';

type State = {
   accessToken: string;
   setAccessToken: (update: string | ((prev: string) => string)) => void;
};

const useAuthStore = create<State>((set) => ({
   accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhNjRjMmU0Zi02YWZkLTRhMjgtOTYzZi1jZTliNWRjZGQ4ZTkiLCJyb2xlIjoidXNlciIsImlhdCI6MTc0NDAwMjMwMiwiZXhwIjoxNzQ5MTg2MzAyfQ.xy_PnQjq5t2LY4PaC62i2I4H-13oM3YEDovuk69_Aw8',
   // accessToken:
   //    'eyA8',

   setAccessToken: (update) =>
      set((state) => ({
         accessToken:
            typeof update === 'function' ? update(state.accessToken) : update,
      })),
}));

export default useAuthStore;
