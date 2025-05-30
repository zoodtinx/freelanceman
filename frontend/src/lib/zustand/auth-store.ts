import { UserPayload } from 'freelanceman-common';
import { create } from 'zustand';

type State = {
   accessToken: string;
   setAccessToken: (update: string | ((prev: string) => string)) => void;
   userData: UserPayload | undefined;
   setUserData: (update: string | ((prev: UserPayload | undefined) => string)) => void;
};

const useAuthStore = create<State>((set) => ({
   accessToken: '',
   // accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwYzlmZjExYS02ZGNhLTQ4M2UtYmIwNi0xMTI5MDIwYzM5MzYiLCJyb2xlIjoidXNlciIsImlhdCI6MTc0NDI4ODQ0NywiZXhwIjoxNzQ5NDcyNDQ3fQ.shQAOme77Y2TVlpM5L_ALNWyN7uUXyheEUA73i7VGi8',

   setAccessToken: (update) =>
      set((state) => ({
         accessToken:
            typeof update === 'function' ? update(state.accessToken) : update,
      })),

   userData: undefined,
   
   setUserData: (update) =>
      set((state) => ({
         accessToken:
            typeof update === 'function' ? update(state.userData) : update,
      })),

   
}));

export default useAuthStore;
