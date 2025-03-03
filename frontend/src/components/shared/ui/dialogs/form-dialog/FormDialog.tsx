import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from 'src/components/shared/ui/primitives/Dialog';
import { Button } from 'src/components/shared/ui/primitives/Button';
import {
   DialogTitleIcon,
   getDialogHeaderText,
} from '@/components/shared/ui/helpers/Helpers';
import * as Dialogs from 'src/components/shared/ui/dialogs/form-dialog';
import { cn } from '@/lib/helper/utils';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { useForm, UseFormReturn } from 'react-hook-form';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';
import { useCallback, useEffect } from 'react';
import { FormDialogType } from '@/lib/types/form-dialog.types';
import { defaultValues } from '@/components/shared/ui/helpers/constants/default-values';


const FormDialog = () => {
   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const setConfirmationDialogState = useConfirmationDialogStore(
      (state) => state.setConfirmationDialogState
   );

   const formMethods = useForm({
      defaultValues: formDialogState.data as any,
   });

   const {
      formState: { isDirty },
      reset
   } = formMethods;

   const handleDialogClose = useCallback(() => {
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
      setConfirmationDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
      reset(defaultValues[formDialogState.type]);
   }, [
      setFormDialogState,
      setConfirmationDialogState,
      reset,
      formDialogState.type,
   ]);

   const handleEscapeWithChange = useCallback(() => {
      if (isDirty) {
         setConfirmationDialogState({
            isOpen: true,
            actions: {
               primary: handleDialogClose,
            },
            message: () => 'Unsaved changes will be lost if you leave.',
            type: 'unsaved-changes',
            dialogRequested: {
               mode: formDialogState.mode,
               type: formDialogState.type as FormDialogType,
            },
         });
      } else {
         handleDialogClose();
      }
   }, [
      isDirty,
      formDialogState,
      setConfirmationDialogState,
      handleDialogClose,
   ]);

   useEffect(() => {
      const handleEscKey = (event: KeyboardEvent) => {
         if (event.key === 'Escape') {
            handleEscapeWithChange();
         }
      };

      document.addEventListener('keydown', handleEscKey);

      return () => {
         document.removeEventListener('keydown', handleEscKey);
      };
   }, [
      setConfirmationDialogState,
      handleEscapeWithChange,
   ]);

   useEffect(() => {
      reset(formDialogState.data)
   }, [formDialogState.data, reset])

   return (
      <Dialog
         open={formDialogState.isOpen}
         onOpenChange={handleEscapeWithChange}
      >
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Profile
            </Button>
         </DialogTrigger>
         <DialogContent
            onEscapeKeyDown={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
            className={cn(
               'sm:max-w-[425px] flex flex-col focus:outline-none bg-constant-primary text-white',
               formDialogState.data.themeColor &&
                  `text-constant-primary bg-theme-${formDialogState.data.themeColor}`
            )}
         >
            <DialogHeader className="py-1 bg-transparent">
               <FormDialogTitle dialogType={formDialogState.type} />
            </DialogHeader>
            <div className="bg-background rounded-2xl text-primary">
               <FormDialogContent
                  dialogType={formDialogState.type}
                  formMethods={formMethods}
                  handleEscapeWithChange={handleEscapeWithChange}
               />
            </div>
         </DialogContent>
      </Dialog>
   );
};

const FormDialogTitle = ({ dialogType }: { dialogType: string }) => {
   return (
      <DialogTitle className="flex text-base w-full text-center items-center gap-1">
         <DialogTitleIcon dialogType={dialogType} />
         <p>{getDialogHeaderText(dialogType)}</p>
      </DialogTitle>
   );
};

const FormDialogContent = ({
   dialogType,
   formMethods,
   handleEscapeWithChange
}: {
   dialogType: string;
   formMethods: UseFormReturn
   handleEscapeWithChange: () => void
}) => {

   const {
      TaskDialog,
      EventDialog,
      FileDialog,
      ClientContactDialog,
      UserProfileDialog,
      NewProjectDialog,
      NewClientDialog,
      ProjectDialog,
      ClientDialog,
      NewFileDialog
   } = Dialogs;

   const props = {formMethods: formMethods, handleEscapeWithChange: handleEscapeWithChange}

   switch (dialogType) {
      case 'task':
         return <TaskDialog {...props} />;
      case 'event':
         return <EventDialog {...props} />;
      case 'file':
         return <FileDialog {...props} />;
      case 'new-file':
         return <NewFileDialog {...props} />;
      case 'project-settings':
         return <ProjectDialog {...props} />;
      case 'client-contact':
         return <ClientContactDialog {...props} />;
      case 'partner-contact':
         return <ClientContactDialog {...props} />;
      case 'user-profile':
         return <UserProfileDialog {...props} />;
      case 'new-project':
         return <NewProjectDialog {...props} />;
      case 'new-client':
         return <NewClientDialog {...props} />;
      case 'client-settings':
         return <ClientDialog {...props} />;
      case 'base':
         return <></>;
      default:
         return <></>;      
   }
};

export default FormDialog;
