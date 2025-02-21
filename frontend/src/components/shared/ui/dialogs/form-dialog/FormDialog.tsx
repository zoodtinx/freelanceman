import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from 'src/components/shared/ui/primitives/Dialog';
import { Button } from 'src/components/shared/ui/primitives/Button';
import { Plus } from 'lucide-react';
import { DialogTitleIcon, getDialogHeaderText } from '@/components/shared/ui/helpers/Helpers';
import TaskDialog from 'src/components/shared/ui/dialogs/form-dialog/TaskDialog';
import useDialogStore from '@/lib/zustand/dialog-store';
import EventDialog from 'src/components/shared/ui/dialogs/form-dialog/EventDialog';
import FileDialog from 'src/components/shared/ui/dialogs/form-dialog/FileDialog';
import ContactDialog from 'src/components/shared/ui/dialogs/form-dialog/ContactDialog';
import ProjectSettingsDialog from 'src/components/shared/ui/dialogs/form-dialog/ProjectSettingsDialog';
import UserProfileDialog from '@/components/shared/ui/dialogs/form-dialog/UserProfileDialog';
import NewProjectDialog from '@/components/shared/ui/dialogs/form-dialog/NewProjectDialog';
import NewClientDialog from '@/components/shared/ui/dialogs/form-dialog/NewClientDialog';
import { cn } from '@/lib/helper/utils';
import ProjectDialog from '@/components/shared/ui/dialogs/form-dialog/ProjectDialog';

const FormDialog = () => {
   const { formDialogState, setFormDialogState } = useDialogStore()

   console.log('current state', formDialogState)

   const handleOpenChange = () => {
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: false
         }
      })
   }

   return (
      <Dialog open={formDialogState.isOpen} onOpenChange={handleOpenChange}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Profile
            </Button>
         </DialogTrigger>
          <DialogContent
            className={cn(
               'sm:max-w-[425px] flex flex-col focus:outline-none bg-constant-primary text-white',
               formDialogState.mode !== 'create' && `text-constant-primary bg-theme-${formDialogState.data.themeColor}`
            )}
          >
            <DialogHeader className="py-1 bg-transparent">
               <FormDialogTitle dialogType={formDialogState.type} />
            </DialogHeader>
            <div className="bg-background rounded-2xl text-primary">
               <FormDialogContent dialogType={formDialogState.type} />
            </div>
          </DialogContent>
      </Dialog>
   );
};

const FormDialogTitle = ({ dialogType }: { dialogType: string }) =>  {
   return (
      <DialogTitle className="flex text-base w-full text-center items-center gap-1">
         <DialogTitleIcon dialogType={dialogType} />
         <p>{getDialogHeaderText(dialogType)}</p>
      </DialogTitle>
   );
};

const FormDialogContent = ({ dialogType }: { dialogType: string }) => {
   const mockType = 'task'
   switch (dialogType) {
      case 'task':
         return <TaskDialog />;
      case 'event':
         return <EventDialog />;
      case 'file':
         return <FileDialog />;
      case 'project-settings':
         return <ProjectDialog />;
      case 'client-contact':
         return <ContactDialog />;
      case 'partner-contact':
         return <ContactDialog />;
      case 'user-profile':
         return <UserProfileDialog />;
      case 'new-project':
         return <NewProjectDialog />;
      case 'new-client':
         return <NewClientDialog />;
      default:
         return <Plus />;
   }
};

export default FormDialog;
