import { kebabToSentenceCase } from '@/components/page-elements/documents/helper';
import { ConfirmationDialogState } from '@/lib/types/confirmation-dialog.type';
import { FormDialogState } from '@/lib/types/form-dialog.types';
import { Dispatch, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

// export const errorCallback = (
//    err: Error,
//    setValue: (name: string, value: any) => void
// ) => {
//    setValue('mutationError', err.message);
// };

// export const successCallback = (
//    setFormDialogState: Dispatch<SetStateAction<FormDialogState>>,
//    setConfirmationDialogState: Dispatch<SetStateAction<ConfirmationDialogState>>
// ) => {
//    setFormDialogState((prev) => {
//       return {
//          ...prev,
//          isOpen: false,
//       };
//    });
//    setConfirmationDialogState((prev) => {
//       return {
//          ...prev,
//          isOpen: false,
//       };
//    });
// };


interface Option {
   formMethods: UseFormReturn,
   entity: string,
   setFormDialogState: () => void
   setConfirmationDialogState: () => void
}

export const getApiCallBacks = ({
   entity,
   formMethods,
   setFormDialogState,
   setConfirmationDialogState,
}: Option) => {
   const entitySentenceCase = kebabToSentenceCase(entity);
   const entityLowerCase = kebabToSentenceCase(entity);

   const { setValue } = formMethods;

   return {
      createCallbacks: {
         errorCallback: (err: Error) => {
            toast.dismiss();
            setFormDialogState();
            setValue('mutationError', err.message);
            setConfirmationDialogState();
            toast.error(`Error creating ${entityLowerCase}`);
         },
         successCallback: () => {
            toast.dismiss();
            setFormDialogState();
            setConfirmationDialogState();
            toast.success(`${entitySentenceCase} created`);
         },
      },
      editCallbacks: {
         errorCallback: (err: Error) => {
            toast.dismiss();
            setFormDialogState();
            setValue('mutationError', err.message);
            setConfirmationDialogState();
            toast.error(`Error editing ${entityLowerCase}`);
         },
         successCallback: () => {
            toast.dismiss();
            setFormDialogState();
            setConfirmationDialogState();
            toast.success(`${entitySentenceCase} updated`);
         },
      },
      deleteCallbacks: {
         errorCallback: (err: Error) => {
            toast.dismiss();
            setFormDialogState();
            setValue('mutationError', err.message);
            setConfirmationDialogState();
            toast.error(`Error deleting ${entityLowerCase}`);
         },
         successCallback: () => {
            toast.dismiss();
            setFormDialogState();
            setConfirmationDialogState();
            toast.success(`${entitySentenceCase} deleted`);
         },
      },
   };
};