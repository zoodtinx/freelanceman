import { create } from 'zustand';
import { SetStateAction } from 'react';
import { FormDialogState } from 'src/lib/types/form-dialog.types';
import { defaultTaskValue } from '@/components/shared/ui/helpers/constants/default-values';

type State = {
   formDialogState: FormDialogState;
   setFormDialogState: (update: SetStateAction<FormDialogState>) => void;
};

const useFormDialogStore = create<State>((set) => ({
   formDialogState: {
      isOpen: false,
      mode: 'create',
      type: 'task',
      openedOn: 'global-add-button',
      data: defaultTaskValue,
   },

   setFormDialogState: (update) =>
      set((state) => ({
         formDialogState:
            typeof update === 'function'
               ? update(state.formDialogState)
               : update,
      })),
}));

export default useFormDialogStore;
