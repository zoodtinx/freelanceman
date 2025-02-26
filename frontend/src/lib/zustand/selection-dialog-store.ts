import { create } from 'zustand';
import { SetStateAction } from 'react';
import {
   SelectObject,
   SelectorDialogState,
} from '@/lib/types/selector-dialog.types';

type State = {
   selectorDialogState: SelectorDialogState;
   setSelectorDialogState: (
      update: SetStateAction<SelectorDialogState>
   ) => void;
   selectedTask: SelectObject[];
   selectedFile: SelectObject[];
   selectedContact: SelectObject[];
   selectedDraft: SelectObject[];
};

const useSelectionDialogStore = create<State>((set) => ({
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

   selectedTask: [],
   selectedFile: [],
   selectedContact: [],
   selectedDraft: [],
}));

export default useSelectionDialogStore;
