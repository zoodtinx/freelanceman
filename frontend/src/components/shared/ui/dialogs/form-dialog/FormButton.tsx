import { Button } from '../../primitives/Button';
import { CircleCheck, Plus, Trash2 } from 'lucide-react';
import {
   DestructiveButtonProps,
   SubmissionButtonProps,
   SubmitButtonProps,
} from '@/lib/types/form-element.type';
import { cn } from '@/lib/helper/utils';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';

export const DiscardButton = ({
   onClick,
   deleteText = 'Delete',
   discardText = 'Discard',
}: DestructiveButtonProps) => {
   const { formDialogState } = useFormDialogStore();
   const isEditMode = formDialogState.mode === 'edit';

   return (
      <Button variant={'destructiveOutline'} className="gap-1" onClick={onClick}>
         <Trash2 className="w-4 h-4" />
         {isEditMode ? deleteText : discardText}
      </Button>
   );
};

export const SubmitButton = ({
   formMethods,
}: SubmitButtonProps) => {
   const {
      formState: { isDirty },
   } = formMethods;

   const { formDialogState } = useFormDialogStore();

   const isNoInput = !isDirty;

   const isEditMode = formDialogState.mode === 'edit';

   const getVariant = () => {
      if (!isDirty) {
         return 'ghost';
      } else {
         return 'submit'
      }
   };

   const variant = getVariant();

   return (
      <Button
         variant={variant}
         type="submit"
         className={cn('gap-1 items-center', isNoInput && 'cursor-not-allowed')}
         disabled={!isDirty}
      >
         {isEditMode ? (
            <CircleCheck className="w-4 h-4" />
         ) : (
            <Plus className="w-5 h-5" />
         )}
         {isEditMode ? 'Save Changes' : 'Add'}
      </Button>
   );
};

export const SubmissionButton = ({
   formMethods,
   createModeText = 'Add',
   editModeText = 'Save Changes'
}: SubmissionButtonProps) => {
   const {
      formState: { isDirty },
   } = formMethods;

   const { formDialogState } = useFormDialogStore();

   const isNoInput = !isDirty;

   const isEditMode = formDialogState.mode === 'edit';

   const getVariant = () => {
      if (!isDirty) {
         return 'ghost';
      } else {
         return 'submit'
      }
   };

   const variant = getVariant();

   return (
      <Button
         variant={variant}
         type="submit"
         className={cn('gap-1 items-center', isNoInput && 'cursor-not-allowed')}
         disabled={!isDirty}
      >
         {isEditMode ? (
            <CircleCheck className="w-4 h-4" />
         ) : (
            <Plus className="w-5 h-5" />
         )}
         {isEditMode ? editModeText : createModeText}
      </Button>
   );
};
