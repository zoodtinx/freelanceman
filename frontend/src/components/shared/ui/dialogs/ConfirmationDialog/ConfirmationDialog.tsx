import React from 'react';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogFooter,
   DialogTrigger,
} from '../../primitives/Dialog';
import { Button } from '../../primitives/Button';
import { CircleAlert, Trash2 } from 'lucide-react';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { ConfirmationDialogState } from '@/lib/types/confirmation-dialog.type';
import { cn } from '@/lib/helper/utils';

const ConfirmationDialog = () => {
   const confirmationDialogState = useConfirmationDialogStore(
      (state) => state.confirmationDialogState
   );

   const setConfirmationDialogState = useConfirmationDialogStore(
      (state) => state.setConfirmationDialogState
   );

   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const handleAction = () => {
      console.log('submit');
   };

   const handleCancel = () => {
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: true,
         };
      });
      setConfirmationDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
      console.log('cancelled');
   };

   const message = confirmationDialogState.message();

   return (
      <Dialog open={confirmationDialogState.isOpen} onOpenChange={handleCancel}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Confirmation Dialog
            </Button>
         </DialogTrigger>
         <DialogContent
            onEscapeKeyDown={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
            className={cn(
               'sm:max-w-[425px] w-[400px] flex flex-col focus:outline-none rounded-2xl text-white',
               confirmationDialogState.type === 'delete' && 'bg-black',
               confirmationDialogState.type === 'unsaved-changes' &&
                  'bg-constant-primary'
            )}
         >
            <DialogHeader className="py-1 bg-transparent text-md">
               <ConfirmationDialogTitle dialogState={confirmationDialogState} />
            </DialogHeader>
            <div className="bg-background rounded-2xl text-primary">
               <div className="text-wrap p-4 text-base leading-snug">
                  {message}
               </div>
               <DialogFooter>
                  <div className="flex justify-between p-4">
                     <Button
                        variant="destructiveOutline"
                        className="flex gap-1"
                        onClick={handleCancel}
                     >
                        Cancel
                     </Button>
                     <Button
                        type="submit"
                        variant="default"
                        className="flex gap-1 bg-primary text-foreground"
                        onClick={confirmationDialogState.actions.primary}
                     >
                        Leave
                     </Button>
                  </div>
               </DialogFooter>
            </div>
         </DialogContent>
      </Dialog>
   );
};

const ConfirmationDialogFooter = () => {};

const ConfirmationDialogTitle = ({
   dialogState,
}: {
   dialogState: ConfirmationDialogState;
}) => {
   console.log('dialogState', dialogState);
   const { type, dialogRequested } = dialogState;
   const title = getDialogTitle(
      type,
      dialogRequested.mode,
      dialogRequested.type
   );

   return (
      <DialogTitle className="flex text-base w-full text-center items-center gap-1">
         <DialogTitleIcon type={type} />
         {title}
      </DialogTitle>
   );
};

const DialogTitleIcon = ({ type }: { type: string }) => {
   if (type === 'delete') {
      return <Trash2 className="w-[14px] h-[14px]" />;
   } else {
      return <CircleAlert className="w-[14px] h-[14px]" />;
   }
};

const getDialogTitle = (
   confirmationType: string,
   mode?: string,
   requestType?: string
) => {
   if (confirmationType === 'delete') return 'Confirm Delete';
   if (confirmationType === 'unsaved-changes')
      return `Leave ${
         mode === 'edit' ? 'Editing' : 'Creating'
      } ${getFormattedType(requestType)}`;
   return '';
};

function getFormattedType(type: FormDialogType): string {
   switch (type) {
      case 'task':
         return 'Task';
      case 'event':
         return 'Event';
      case 'file':
         return 'File';
      case 'project-settings':
         return 'Project Settings';
      case 'client-contact':
         return 'Client Contact';
      case 'partner-contact':
         return 'Partner Contact';
      case 'sales-document-item':
         return 'Sales Document Item';
      case 'user-profile':
         return 'User Profile';
      case 'new-project':
         return 'New Project';
      case 'new-client':
         return 'New Client';
      default:
         return 'Unknown';
   }
}

export default ConfirmationDialog;
