import { Dispatch, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormDialogState } from '@/lib/types/form-dialog.types';
import { ApiLoadingState } from '@/lib/types/form-element.type';
import { DiscardButton, SubmitButton } from '@/components/shared/ui/dialogs/form-dialog/FormButton';
import { DialogFooter } from '@/components/shared/ui/primitives/Dialog';

interface FormDialogFooterProps {
   formMethods: UseFormReturn;
      formDialogState: FormDialogState;
      isApiLoading: ApiLoadingState;
      setIsApiLoading: Dispatch<SetStateAction<ApiLoadingState>>;
      destructiveButtonAction: () => void;
}

export const FormDialogFooter2 = ({
   isApiLoading,
   formMethods,
   formDialogState,
   destructiveButtonAction,
   setIsApiLoading,
}: FormDialogFooterProps) => {
   return (
      <DialogFooter>
         <div className="flex justify-between p-4">
            <DiscardButton
               isApiLoading={isApiLoading}
               formMethods={formMethods}
               formDialogState={formDialogState}
               action={destructiveButtonAction}
               setIsApiLoading={setIsApiLoading}
            />
            <SubmitButton
               formDialogState={formDialogState}
               formMethods={formMethods}
               isApiLoading={isApiLoading}
               setIsApiLoading={setIsApiLoading}
            />
         </div>
      </DialogFooter>
   );
};
