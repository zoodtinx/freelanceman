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
import TaskDialog from '@/components/shared/ui/TaskDialog';
import useDialogStore from '@/lib/zustand/dialog-store';
import EventDialog from '@/components/shared/ui/EventDialog';
import FileDialog from '@/components/shared/ui/FileDialog';
import ContactDialog from '@/components/shared/ui/ContactDialog';
import ProjectSettingsDialog from '@/components/page-elements/all-projects/ProjectSettingsDialog';

const FormDialog = () => {
   const { formDialogState, setFormDialogState } = useDialogStore()

   const handleDialogClose = () => {
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: false
         }
      })
   };


   return (
      <Dialog open={formDialogState.isOpen} onOpenChange={handleDialogClose}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Profile
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px] flex flex-col focus:outline-none bg-freelanceman-darkgrey text-white">
            <DialogHeader className="py-1 bg-transparent">
               <FormDialogTitle dialogType={formDialogState.type} />
            </DialogHeader>
            <div className="bg-background rounded-2xl text-primary">
               <FormDialogContent
                  dialogType={formDialogState.type}
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
         return <ProjectSettingsDialog />;
      case 'client-contact':
         return <ContactDialog />;
      case 'partner-contact':
         return <ContactDialog />;
      default:
         return <Plus />;
   }
};

export default FormDialog;
