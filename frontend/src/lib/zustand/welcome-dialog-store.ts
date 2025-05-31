import { create } from 'zustand';
import { SetStateAction } from 'react';
import { CardContentProps } from '@/components/shared/ui/dialogs/welcome-dialog/WelcomeDialog';

interface WelcomeDialogState {
   isOpen: boolean;
   page: string;
}

type State = {
   welcomeDialogState: WelcomeDialogState;
   setWelcomeDialogState: (update: SetStateAction<WelcomeDialogState>) => void;
};

const useWelcomeDialogStore = create<State>((set) => ({
   welcomeDialogState: {
      isOpen: true,
      page: 'home',
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