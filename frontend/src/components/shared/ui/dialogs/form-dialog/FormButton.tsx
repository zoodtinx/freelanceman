import { Button } from '../../primitives/Button';
import { CircleCheck, LoaderCircle, Plus, Trash2 } from 'lucide-react';
import {
   DestructiveButtonProps,
   SubmitButtonProps,
} from '@/lib/types/form-element.type';
import { cn } from '@/lib/helper/utils';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';

export const DiscardButton = ({
   onClick,
   isApiLoading,
   deleteText = 'Delete',
   discardText = 'Discard',
}: DestructiveButtonProps) => {
   const { formDialogState } = useFormDialogStore();
   const isEditMode = formDialogState.mode === 'edit';
   const isLoading = isApiLoading?.isLoading;
   const isDiscarding = isLoading && isApiLoading?.type === 'destructive';
   

   const getVariant = () => {
      if (!isLoading || isDiscarding) return 'destructiveOutline';
      return 'destructiveOutlineGhost';
   };

   return (
      <Button variant={getVariant()} className="gap-1" onClick={onClick}>
         {isDiscarding ? (
            <LoaderCircle className="w-4 h-4 animate-spin" />
         ) : (
            <Trash2 className="w-4 h-4" />
         )}
         {isEditMode ? deleteText : discardText}
      </Button>
   );
};

export const SubmitButton = ({
   formMethods,
   isApiLoading,
}: SubmitButtonProps) => {
   const {
      formState: { isDirty, dirtyFields },
   } = formMethods;

   const { formDialogState } = useFormDialogStore();

   const isNoInput = !isDirty;

   const isEditMode = formDialogState.mode === 'edit';
   const isLoading = isApiLoading?.isLoading;
   const isSubmitting =
      isApiLoading?.isLoading && isApiLoading?.type === 'submit';

   const getVariant = () => {
      if (!isDirty) {
         return 'ghost';
      }
      if (!isLoading) {
         return 'submit';
      } else if (isSubmitting) {
         return 'submit';
      } else if (!isSubmitting) {
         return 'ghost';
      }
   };

   const variant = getVariant();

   const handleClick = () => {};

   return (
      <Button
         variant={variant}
         type="submit"
         className={cn('gap-1 items-center', isNoInput && 'cursor-not-allowed')}
         disabled={!isDirty || isSubmitting}
         onClick={handleClick}
      >
         {isSubmitting ? (
            <LoaderCircle className="w-4 h-4 animate-spin" />
         ) : isEditMode ? (
            <CircleCheck className="w-4 h-4" />
         ) : (
            <Plus className="w-5 h-5" />
         )}
         {isEditMode ? 'Save Changes' : 'Add'}
      </Button>
   );
};
