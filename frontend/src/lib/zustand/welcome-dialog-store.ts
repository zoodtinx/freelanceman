import { create } from 'zustand';
import { SetStateAction } from 'react';
import { CardContentProps } from '@/components/shared/ui/dialogs/greeting-dialog/GreetingDialog';

interface WelcomeDialogState {
  isOpen: boolean;
  contents: CardContentProps[];
}

type State = {
  welcomeDialogState: WelcomeDialogState;
  setWelcomeDialogState: (update: SetStateAction<WelcomeDialogState>) => void;
};

const useWelcomeDialogStore = create<State>((set) => ({
  welcomeDialogState: {
    isOpen: true,
    contents: [],
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