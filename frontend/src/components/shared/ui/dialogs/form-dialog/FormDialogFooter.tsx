// components/FormDialogFooter.tsx
import {
   DiscardButton,
   SubmitButton,
} from '@/components/shared/ui/dialogs/form-dialog/FormButton';
import { DialogFooter } from '@/components/shared/ui/primitives/Dialog';
import { FormDialogState } from '@/lib/types/form-dialog.types';
import { ApiLoadingState } from '@/lib/types/form-element.type';
import { UseFormReturn } from 'react-hook-form';

type Props = {
   onDiscard: (e: React.MouseEvent<HTMLButtonElement>) => void;
   isApiLoading: ApiLoadingState;
   formDialogState: FormDialogState;
   formMethods: UseFormReturn;
};

export default function FormDialogFooter({
   onDiscard,
   isApiLoading,
   formDialogState,
   formMethods,
}: Props) {
   return (
      <DialogFooter>
         <div className="flex justify-between p-4 pb-2">
            <DiscardButton
               onClick={onDiscard}
               isApiLoading={isApiLoading}
               formDialogState={formDialogState}
            />
            <SubmitButton
               formDialogState={formDialogState}
               formMethods={formMethods}
               isApiLoading={isApiLoading}
            />
         </div>
      </DialogFooter>
   );
}
