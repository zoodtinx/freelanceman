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
import { useForm } from 'react-hook-form';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';
import { useCallback, useEffect } from 'react';
import { FormDialogProps, FormDialogType } from '@/lib/types/form-dialog.types';

/**
 * This compoennt serves as the container for all form dialogs (Task, Events, Files, Project, etc.)
 * used throughout the application. 
 * 
 * It handles general layout and also initialize form hooks then passed on to dialog content component. 
 */


const FormDialog = () => {
   //dialog hooks setup
   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const setConfirmationDialogState = useConfirmationDialogStore(
      (state) => state.setConfirmationDialogState
   );

   //react hook form setup
   const formMethods = useForm({
      defaultValues: formDialogState.data as any,
   });
   const {
      formState: { isDirty, dirtyFields },
      clearErrors,
      getValues,
      reset,
   } = formMethods;

   //handle dialog close with unsaved changes
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
   }, [setFormDialogState, setConfirmationDialogState]);
   const handleEscapeWithChange = useCallback(() => {       // show prompt if user exit with changes
      if (isDirty && formDialogState.isOpen) {
         setConfirmationDialogState({
            isOpen: true,
            actions: {
               primary: handleDialogClose,
            },
            entityName: 'Unsaved changes will be lost if you leave.',
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
   
   // add event listener for esc key
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
   }, [setConfirmationDialogState, handleEscapeWithChange]);

   // clear data when open/close dialogs
   useEffect(() => {
      clearErrors();
      reset(formDialogState.data);
   }, [formDialogState.data, reset, clearErrors]);

   //handle false dirty fields
   useEffect(() => {
      if (isDirty && Object.keys(dirtyFields).length === 0) {
         reset(getValues());
      }
   }, [isDirty, dirtyFields, reset, getValues]);

   //dialog color value
   const color = (() => {
      const { type, data } = formDialogState;
      if (type === 'clientContact' || type === 'partnerContact') {
         return (data as any).company?.themeColor;
      }
      if (type === 'clientSettings') {
         return (data as any)?.themeColor;
      }
      return (data as any).client?.themeColor;
   })();

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
            overlay
            onEscapeKeyDown={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
            className={cn(
               'sm:max-w-[425px] flex flex-col focus:outline-none bg-constant-primary text-white',
               color && `text-constant-primary bg-theme-${color}`
            )}
         >
            <DialogHeader className="py-1 bg-transparent">
               <FormDialogTitle dialogType={formDialogState.type} />
            </DialogHeader>
            <div className="bg-background rounded-2xl text-primary">
               <FormDialogContent
                  dialogType={formDialogState.type}
                  formMethods={formMethods}
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

const FormDialogContent = (props: FormDialogProps) => {
   const {
      TaskDialog,
      EventDialog,
      FileDialog,
      ClientContactDialog,
      UserProfileDialog,
      NewProjectDialog,
      NewClientDialog,
      ProjectDialog,
      NewFileDialog,
      PartnerContactDialog,
   } = Dialogs;

   switch (props.dialogType) {
      case 'task':
         return <TaskDialog {...props} />;
      case 'event':
         return <EventDialog {...props} />;
      case 'file':
         return <FileDialog {...props} />;
      case 'newFile':
         return <NewFileDialog {...props} />;
      case 'projectSettings':
         return <ProjectDialog {...props} />;
      case 'clientContact':
         return <ClientContactDialog {...props} />;
      case 'partnerContact':
         return <PartnerContactDialog {...props} />;
      case 'userProfile':
         return <UserProfileDialog {...props} />;
      case 'newProject':
         return <NewProjectDialog {...props} />;
      case 'newClient':
         return <NewClientDialog {...props} />;
      case 'clientSettings':
         return <NewClientDialog {...props} />;
      case 'base':
         return <></>;
      default:
         return <></>;
   }
};

export default FormDialog;
