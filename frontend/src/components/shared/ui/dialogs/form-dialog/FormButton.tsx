import React from 'react';
import { Button } from '../../primitives/Button';
import { CircleCheck, LoaderCircle, PencilLine, Plus, Trash2 } from 'lucide-react';
import { DestructiveButtonProps, FormButtonProps, SubmitButtonProps } from 'src/components/shared/ui/dialogs/form-dialog/dialog-elements.type';
import { cn } from '@/lib/helper/utils';

export const DiscardButton = ({
   formDialogState,
   isApiLoading,
   setIsApiLoading,
   action,
}: DestructiveButtonProps) => {
   
   const isEditMode = formDialogState.mode === 'edit'
   const isLoading = isApiLoading.isLoading;
   const isDiscarding =
      isApiLoading.isLoading && isApiLoading.type === 'discard';

   const getVariant = () => {
      if (!isLoading) {
         return 'destructiveOutline';
      } else if (isDiscarding) {
         return 'destructiveOutline';
      } else if (!isDiscarding) {
         return 'destructiveOutlineGhost';
      }
   };

   const variant = getVariant();

   const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsApiLoading({
         isLoading: true,
         type: 'discard',
      });
      await action();
      setIsApiLoading({
         isLoading: false,
         type: 'discard',
      });
   };

   return (
      <Button variant={variant} className="gap-1" onClick={handleClick}>
         {isDiscarding ? (
            <LoaderCircle className="w-4 h-4 animate-spin" />
         ) : (
            <Trash2 className="w-4 h-4" />
         )}
         {isEditMode ? 'Delete' : 'Discard'}
      </Button>
   );
};

export const SubmitButton = ({
   formMethods,
   formDialogState,
   isApiLoading,
}: SubmitButtonProps) => {
   const {
      formState: { isDirty },
   } = formMethods;

   const isNoInput = !isDirty

   const isEditMode = formDialogState.mode === "edit";
   const isLoading = isApiLoading.isLoading;
   const isSubmitting =
      isApiLoading.isLoading && isApiLoading.type === 'submit';

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

   const handleClick = () => {
   };

   return (
      <Button
         variant={variant}
         type="submit"
         className={cn("gap-1 items-center", isNoInput && 'cursor-not-allowed')}
         onClick={handleClick}
      >
         {isSubmitting ? (
            <LoaderCircle className="w-4 h-4 animate-spin" />
         ) : isEditMode ? (
            <CircleCheck className="w-4 h-4" />
         ) : (
            <Plus className="w-5 h-5" />
         )}
         {isEditMode ? "Save Changes" : "Add"}
      </Button>
   );
};