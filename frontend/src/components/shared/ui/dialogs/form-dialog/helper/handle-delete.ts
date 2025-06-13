import { ConfirmationDialogState } from '@/lib/types/confirmation-dialog.type';
import { FormDialogState, FormDialogType } from '@/lib/types/form-dialog.types';
import { SetStateAction } from 'react';

export const handleDelete = ({
   mutateApi,
   payload,
   setConfirmationDialogState,
   setFormDialogState,
   confirmDialogData,
   openConfirmDialog,
}: {
   mutateApi: any;
   payload: any;
   setConfirmationDialogState?: (
      update: SetStateAction<ConfirmationDialogState>
   ) => void;
   setFormDialogState: (update: SetStateAction<FormDialogState>) => void;
   openConfirmDialog?: boolean;
   confirmDialogData: {
      entityName: string;
      additionalMessage?: string;
      type: 'delete' | 'unsaved-changes';
      dialogRequested: {
         mode: 'edit' | 'create';
         type: FormDialogType;
      };
   };
}) => {
   const handleDelete = () => {
      mutateApi.mutate(payload);
      if (mutateApi.isError) {
         if (setConfirmationDialogState) {
            setConfirmationDialogState((prev) => {
               return {
                  ...prev,
                  isOpen: false,
               };
            });
         }
         setFormDialogState((prev) => ({ ...prev, isOpen: true }));
      }

      if (setConfirmationDialogState) {
         setConfirmationDialogState((prev) => {
            return {
               ...prev,
               isOpen: false,
            };
         });
      }
   };

   if (openConfirmDialog && setConfirmationDialogState) {
      setFormDialogState((prev) => ({ ...prev, isOpen: false }));
      setConfirmationDialogState({
         isOpen: true,
         actions: {
            primary: () => handleDelete(),
         },
         entityName: confirmDialogData.entityName,
         additionalMessage: confirmDialogData.additionalMessage,
         type: 'delete',
         dialogRequested: {
            mode: 'edit',
            type: 'projectSettings',
         },
      });
   } else {
      handleDelete()
   }
};
