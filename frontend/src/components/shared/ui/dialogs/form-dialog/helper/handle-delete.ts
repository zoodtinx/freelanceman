import { ConfirmationDialogState } from '@/lib/types/confirmation-dialog.type';
import { FormDialogState, FormDialogType } from '@/lib/types/form-dialog.types';
import { UseMutationResult } from '@tanstack/react-query';
import { SetStateAction } from 'react';
import { UseFormSetValue } from 'react-hook-form';

// export const handleDelete = ({
//    mutateApi,
//    payload,
//    setValue,
//    setConfirmationDialogState,
//    setFormDialogState,
// }: {
//    mutateApi: UseMutationResult<any, any, any>;
//    payload: any;
//    setValue: UseFormSetValue<any>;
//    setConfirmationDialogState: (
//       update: SetStateAction<ConfirmationDialogState>
//    ) => void;
//    setFormDialogState: (update: SetStateAction<FormDialogState>) => void;
// }) => {
//    mutateApi.mutate(payload, {
//       onSuccess: () => {
//          setConfirmationDialogState((prev) => ({ ...prev, isOpen: false }));
//          setFormDialogState((prev) => ({ ...prev, isOpen: false }));
//       },
//       onError: (error) => {
//          setValue('mutationError', error.message);
//          setConfirmationDialogState((prev) => ({ ...prev, isOpen: false }));
//          setFormDialogState((prev) => ({ ...prev, isOpen: true }));
//       },
//    });
// };

export const handleDelete = ({
   mutateApi,
   payload,
   setValue,
   setConfirmationDialogState,
   setFormDialogState,
   confirmDialogData,
   openConfirmDialog,
}: {
   mutateApi: UseMutationResult<any, any, any>;
   payload: any;
   setValue: UseFormSetValue<any>;
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
         const { error } = mutateApi;
         setValue('mutationError', error.message);
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
            type: 'project-settings',
         },
      });
   } else {
      handleDelete()
   }
};
