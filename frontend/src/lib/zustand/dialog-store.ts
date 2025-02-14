import { create } from 'zustand';
import { FormDialogState } from 'src/lib/types/form-dialog.types';
import { taskDefaultValues } from 'src/components/shared/ui/helpers/constants/default-values';
import { SetStateAction } from 'react';
import { SelectorDialogState } from '@/lib/types/selector-dialog.types';
import { ConfirmationDialogState } from '@/lib/types/confirmation-dialog.type';

type State = {
   formDialogState: FormDialogState;
   setFormDialogState: (update: SetStateAction<FormDialogState>) => void;
   selectorDialogState: SelectorDialogState;
   setSelectorDialogState: (
      update: SetStateAction<SelectorDialogState>
   ) => void;
   confirmationDialogState: ConfirmationDialogState;
   setConfirmationDialogState: (
      update: SetStateAction<ConfirmationDialogState>
   ) => void;
};

const useDialogStore = create<State>((set) => ({
   formDialogState: {
      isOpen: false,
      mode: 'view',
      type: 'task',
      openedOn: 'action-page',
      data: taskDefaultValues,
   },

   setFormDialogState: (update) =>
      set((state) => ({
         formDialogState:
            typeof update === 'function'
               ? update(state.formDialogState)
               : update,
      })),

   selectorDialogState: {
      isOpen: false,
      selected: [],
      type: 'file',
      setSelected: () => {},
      option: {},
   },

   setSelectorDialogState: (update) =>
      set((state) => ({
         selectorDialogState:
            typeof update === 'function'
               ? update(state.selectorDialogState)
               : update,
      })),

   confirmationDialogState: {
      isOpen: false,
      actions: {
         primary: () => {},
         secondary: () => {},
      },
      message: '',
      type: 'confirm',
   },

   setConfirmationDialogState: (update) =>
      set((state) => ({
         confirmationDialogState:
            typeof update === 'function'
               ? update(state.confirmationDialogState)
               : update,
      })),
}));

export default useDialogStore;
