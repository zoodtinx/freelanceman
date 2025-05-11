// components/FormDialogFooter.tsx
import {
   DiscardButton,
   SubmitButton,
} from '@/components/shared/ui/dialogs/form-dialog/FormButton';
import { DialogFooter } from '@/components/shared/ui/primitives/Dialog';
import { ApiLoadingState } from '@/lib/types/form-dialog.types';
import { UseFormReturn } from 'react-hook-form';

export interface FormDialogFooterProps {
   onDiscard: (e: React.MouseEvent<HTMLButtonElement>) => void;
   isApiLoading: ApiLoadingState;
   formMethods: UseFormReturn;
   isUrlLoading?: boolean
};

export default function FormDialogFooter({
   onDiscard,
   isApiLoading,
   formMethods,
}: FormDialogFooterProps) {
   return (
      <DialogFooter>
         <div className="flex justify-between p-4 pb-2">
            <DiscardButton
               onClick={onDiscard}
               isApiLoading={isApiLoading}
            />
            <SubmitButton
               formMethods={formMethods}
               isApiLoading={isApiLoading}
            />
         </div>
      </DialogFooter>
   );
}
