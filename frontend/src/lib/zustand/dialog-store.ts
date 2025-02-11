import { create } from 'zustand';
import { shallow } from 'zustand/shallow';
import { FormDialogDataMap, FormDialogState } from '@/lib/types/dialog.types';
import { taskDefaultValues } from 'src/components/shared/ui/constants/default-values';
import { SetStateAction } from 'react';

type State = {
   formDialogState: FormDialogState;
   setFormDialogState: (update: SetStateAction<FormDialogState>) => void;
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
}));

export default useDialogStore;
