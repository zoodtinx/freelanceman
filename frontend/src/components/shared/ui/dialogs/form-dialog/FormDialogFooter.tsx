import {
   DiscardButton,
   SubmitButton,
} from '@/components/shared/ui/dialogs/form-dialog/FormButton';
import { DialogFooter } from '@/components/shared/ui/primitives/Dialog';
import { UseFormReturn } from 'react-hook-form';

export interface FormDialogFooterProps {
   onDiscard: (e: React.MouseEvent<HTMLButtonElement>) => void;
   formMethods: UseFormReturn;
   entity: string;
   isUrlLoading?: boolean;
   customText?: {
      destructiveButton?: {
         editModeText?: string;
         createModeText?: string;
      };
      submitButton?: {
         editModeText?: string;
         createModeText?: string;
      };
   };
}

export default function FormDialogFooter({
   onDiscard,
   formMethods,
   entity,
   customText
}: FormDialogFooterProps) {
   return (
      <DialogFooter>
         <div className="flex justify-between p-4 pb-2">
            <DiscardButton
               onClick={onDiscard}
               deleteText={customText?.destructiveButton?.editModeText}
               discardText={customText?.destructiveButton?.createModeText}
            />
            <SubmitButton
               formMethods={formMethods}
               entity={entity}
               createModeText={customText?.submitButton?.createModeText}
               editModeText={customText?.submitButton?.editModeText}
            />
         </div>
      </DialogFooter>
   );
}
