import { create } from 'zustand';
import { SetStateAction } from 'react';
import { ConfirmationDialogState } from '@/lib/types/confirmation-dialog.type';

type State = {
   confirmationDialogState: ConfirmationDialogState;
   setConfirmationDialogState: (
      update: SetStateAction<ConfirmationDialogState>
   ) => void;
};

const useConfirmationDialogStore = create<State>((set) => ({
   confirmationDialogState: {
      isOpen: false,
      actions: {
         primary: () => {},
         secondary: () => {},
      },
      message: () => 'Are you sure you want to delete?',
      type: 'delete',
      dialogRequested: {
         type: 'task',
         mode: 'create'
      },
   },

   setConfirmationDialogState: (update) =>
      set((state) => ({
         confirmationDialogState:
            typeof update === 'function'
               ? update(state.confirmationDialogState)
               : update,
      })),
}));

export default useConfirmationDialogStore;
