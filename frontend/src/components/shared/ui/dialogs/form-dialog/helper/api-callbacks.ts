import { ConfirmationDialogState } from '@/lib/types/confirmation-dialog.type';
import { FormDialogState } from '@/lib/types/form-dialog.types';
import { Dispatch, SetStateAction } from 'react';

export const errorCallback = (
   err: Error,
   setValue: (name: string, value: any) => void
) => {
   setValue('mutationError', err.message);
};

export const successCallback = (
   setFormDialogState: Dispatch<SetStateAction<FormDialogState>>,
   setConfirmationDialogState: Dispatch<SetStateAction<ConfirmationDialogState>>
) => {
   setFormDialogState((prev) => {
      return {
         ...prev,
         isOpen: false,
      };
   });
   setConfirmationDialogState((prev) => {
      return {
         ...prev,
         isOpen: false,
      };
   });
};
