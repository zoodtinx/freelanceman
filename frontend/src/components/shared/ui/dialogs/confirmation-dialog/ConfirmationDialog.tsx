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
import { FormDialogType } from '@/lib/types/form-dialog.types';

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

   const handleCancel = () => {
      if (confirmationDialogState.dialogRequested) {
         setFormDialogState((prev) => {
            return {
               ...prev,
               isOpen: true,
            };
         });
      }
      setConfirmationDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
   };

   const handleAction = () => {
      confirmationDialogState.actions.primary()
      setConfirmationDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
   }

   return (
      <Dialog open={confirmationDialogState.isOpen} onOpenChange={handleCancel}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Confirmation Dialog
            </Button>
         </DialogTrigger>
         <DialogContent
            overlay={confirmationDialogState.appearance?.overlay}
            onEscapeKeyDown={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
            className={cn(
               'sm:max-w-[425px] flex flex-col focus:outline-none rounded-2xl text-white',
               confirmationDialogState.type === 'delete' && 'bg-button-red',
               confirmationDialogState.type === 'unsaved-changes' &&
                  'bg-constant-primary'
            )}
         >
            <DialogHeader className="py-1 bg-transparent text-md">
               <ConfirmationDialogTitle dialogState={confirmationDialogState} />
            </DialogHeader>
            <div className="bg-background rounded-2xl text-primary">
               <DeleteMessage dialogState={confirmationDialogState} />
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
                        variant={confirmationDialogState.type === 'delete' ? 'destructive' : 'default'}
                        onClick={handleAction}
                     >
                        Proceed
                     </Button>
                  </div>
               </DialogFooter>
            </div>
         </DialogContent>
      </Dialog>
   );
};

const DeleteMessage = ({
   dialogState,
}: {
   dialogState: ConfirmationDialogState;
}) => {
   const { entityName, additionalMessage } = dialogState;

   if (dialogState.type === 'unsaved-changes') {
      return <p className="text-wrap p-4 text-base leading-snug">Unsaved changes will be lost</p>;
   } else if (dialogState.type === 'delete') {
      return (
         <div className=" p-4">
            <p className="text-wrap text-base leading-snug pb-2">
               Are you sure you want to delete <strong>{entityName}</strong>?
            </p>
            <p className="text-general-red">{additionalMessage}</p>
         </div>
      );
   }
};

const ConfirmationDialogTitle = ({
   dialogState,
}: {
   dialogState: ConfirmationDialogState;
}) => {
   const { type, dialogRequested } = dialogState;
   const title = getDialogTitle(
      type,
      dialogRequested?.mode,
      dialogRequested?.type
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
   requestType?: FormDialogType
) => {
   if (confirmationType === 'delete') return 'Confirm Delete';
   if (confirmationType === 'unsaved-changes')
      return `Leave ${
         mode === 'edit' ? 'Editing' : 'Creating'
      } ${getFormattedType(requestType)}`;
   return '';
};

function getFormattedType(type: FormDialogType | undefined): string {
   switch (type) {
      case 'task':
         return 'Task';
      case 'event':
         return 'Event';
      case 'file':
         return 'File';
      case 'newFile':
         return 'New File';
      case 'projectSettings':
         return 'Project Settings';
      case 'clientContact':
         return 'Client Contact';
      case 'clientSettings':
         return 'Client Settings';
      case 'partnerContact':
         return 'Partner Contact';
      case 'salesDocumentItem':
         return 'Sales Document Item';
      case 'salesDocument':
         return 'Sales Document';
      case 'userProfile':
         return 'User Profile';
      case 'newProject':
         return 'New Project';
      case 'newClient':
         return 'New Client';
      default:
         return 'Unknown';
   }
}

export default ConfirmationDialog;
