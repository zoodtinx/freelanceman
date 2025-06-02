import { create } from 'zustand';
import { SetStateAction } from 'react';
import { welcomeDialogContent } from '@/components/shared/ui/dialogs/welcome-dialog/DialogContents';

interface WelcomeDialogState {
   isOpen: boolean;
   page: keyof typeof welcomeDialogContent;
}

type State = {
   welcomeDialogState: WelcomeDialogState;
   setWelcomeDialogState: (update: SetStateAction<WelcomeDialogState>) => void;
};

const useWelcomeDialogStore = create<State>((set) => ({
   welcomeDialogState: {
      isOpen: false,
      page: 'homePage',
   },
   setWelcomeDialogState: (update) =>
      set((state) => ({
         welcomeDialogState:
            typeof update === 'function'
               ? update(state.welcomeDialogState)
               : update,
      })),
}));

export default useWelcomeDialogStore;