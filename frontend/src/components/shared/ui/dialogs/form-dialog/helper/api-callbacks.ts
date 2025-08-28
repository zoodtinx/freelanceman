
import {
   camelToLowerCase,
   camelToSentenceCase,
} from '@/components/page-elements/documents-page/helper';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

interface Option {
   formMethods: UseFormReturn;
   entity: string;
   setFormDialogState: () => void;
   setConfirmationDialogState: () => void;
   optimisticUpdate?: {
      enable: boolean;
      key: string[];
   };
}

export const getApiCallBacks = ({
   entity,
   formMethods,
   setFormDialogState,
   setConfirmationDialogState,
   optimisticUpdate,
}: Option) => {
   const entitySentenceCase = camelToSentenceCase(entity);
   const entityLowerCase = camelToLowerCase(entity);

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
         optimisticUpdate : optimisticUpdate && {
            ...optimisticUpdate,
            type: 'create' as const
         }
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
         optimisticUpdate : optimisticUpdate && {
            ...optimisticUpdate,
            type: 'edit' as const
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
         optimisticUpdate : optimisticUpdate && {
            ...optimisticUpdate,
            type: 'delete' as const
         },
      },
   };
};
