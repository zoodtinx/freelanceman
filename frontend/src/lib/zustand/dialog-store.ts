import { create } from 'zustand';
import { FormDialogState } from 'src/lib/types/form-dialog.types';
import { SetStateAction } from 'react';
import {
   SelectObject,
   SelectorDialogState,
} from '@/lib/types/selector-dialog.types';
import { ConfirmationDialogState } from '@/lib/types/confirmation-dialog.type';
import { defaultClientValue } from '@/components/shared/ui/helpers/constants/default-values';

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
   selectedTask: SelectObject[];
   selectedFile: SelectObject[];
   selectedContact: SelectObject[];
   selectedDraft: SelectObject[];
};

const useDialogStore = create<State>((set) => ({
   formDialogState: {
      isOpen: false,
      mode: 'create',
      type: 'newClient',
      openedOn: 'globalAddButton',
      data: defaultClientValue,
      entity: 'client',
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
      option: {},
      mode: 'select',
      projectId: '',
      tab: 'client',
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
      entityName: '',
      type: 'delete' as const,
      additionalMessage: '',
      appearance: {
         overlay: false,
         size: 'sm',
      },
      dialogRequested: { mode: 'create', type: 'task' },
   },

   setConfirmationDialogState: (update) =>
      set((state) => ({
         confirmationDialogState:
            typeof update === 'function'
               ? update(state.confirmationDialogState)
               : update,
      })),

   selectedTask: [],
   selectedFile: [],
   selectedContact: [],
   selectedDraft: [],
}));

export default useDialogStore;
