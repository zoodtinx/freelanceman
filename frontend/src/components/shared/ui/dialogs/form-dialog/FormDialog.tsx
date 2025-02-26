import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from 'src/components/shared/ui/primitives/Dialog';
import { Button } from 'src/components/shared/ui/primitives/Button';
import { Plus } from 'lucide-react';
import {
   DialogTitleIcon,
   getDialogHeaderText,
} from '@/components/shared/ui/helpers/Helpers';
import TaskDialog from 'src/components/shared/ui/dialogs/form-dialog/TaskDialog';
import EventDialog from 'src/components/shared/ui/dialogs/form-dialog/EventDialog';
import FileDialog from 'src/components/shared/ui/dialogs/form-dialog/FileDialog';
import ContactDialog from 'src/components/shared/ui/dialogs/form-dialog/ContactDialog';
import UserProfileDialog from '@/components/shared/ui/dialogs/form-dialog/UserProfileDialog';
import NewProjectDialog from '@/components/shared/ui/dialogs/form-dialog/NewProjectDialog';
import NewClientDialog from '@/components/shared/ui/dialogs/form-dialog/NewClientDialog';
import { cn } from '@/lib/helper/utils';
import ProjectDialog from '@/components/shared/ui/dialogs/form-dialog/ProjectDialog';
import ClientDialog from '@/components/shared/ui/dialogs/form-dialog/ClientDialog';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { useForm } from 'react-hook-form';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';
import { useCallback, useEffect } from 'react';
import { FormDialogType } from '@/lib/types/form-dialog.types';

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
   }, [setFormDialogState, setConfirmationDialogState]);

   const handleEscapeWithChange = useCallback(() => {
      if (isDirty) {
         setConfirmationDialogState({
            isOpen: true,
            actions: {
               primary: handleDialogClose,
            },
            message: () => 'Changes will be lost if you leave.',
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
      isDirty,
      formDialogState,
      handleEscapeWithChange,
   ]);

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
}: {
   dialogType: string;
}) => {
   const mockType = 'task';
   switch (dialogType) {
      case 'task':
         return <TaskDialog formMethods={formMethods} />;
      case 'event':
         return <EventDialog formMethods={formMethods} />;
      case 'file':
         return <FileDialog formMethods={formMethods} />;
      case 'project-settings':
         return <ProjectDialog formMethods={formMethods} />;
      case 'client-contact':
         return <ContactDialog formMethods={formMethods} />;
      case 'partner-contact':
         return <ContactDialog formMethods={formMethods} />;
      case 'user-profile':
         return <UserProfileDialog formMethods={formMethods} />;
      case 'new-project':
         return <NewProjectDialog formMethods={formMethods} />;
      case 'new-client':
         return <NewClientDialog formMethods={formMethods} />;
      case 'client-settings':
         return <ClientDialog formMethods={formMethods} />;
      default:
         return <Plus />;
   }
};

export default FormDialog;
