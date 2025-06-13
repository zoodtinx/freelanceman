// components/FormDialogFooter.tsx
import {
   DiscardButton,
   SubmitButton,
} from '@/components/shared/ui/dialogs/form-dialog/FormButton';
import { DialogFooter } from '@/components/shared/ui/primitives/Dialog';
import { UseFormReturn } from 'react-hook-form';

export interface FormDialogFooterProps {
   onDiscard: (e: React.MouseEvent<HTMLButtonElement>) => void;
   formMethods: UseFormReturn;
   isUrlLoading?: boolean
};

export default function FormDialogFooter({
   onDiscard,
   formMethods,
}: FormDialogFooterProps) {
   return (
      <DialogFooter>
         <div className="flex justify-between p-4 pb-2">
            <DiscardButton
               onClick={onDiscard}
            />
            <SubmitButton
               formMethods={formMethods}
            />
         </div>
      </DialogFooter>
   );
}
