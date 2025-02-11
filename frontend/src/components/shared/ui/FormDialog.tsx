import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from 'src/components/shared/ui/primitives/Dialog';
import { Button } from 'src/components/shared/ui/primitives/Button';
import { Calendar, CircleCheck, Plus } from 'lucide-react';
import { DialogTitleIcon, getDialogHeaderText } from '@/components/shared/ui/helpers/Helpers';
import { FormDialogProps } from '@/lib/types/dialog.types';
import TaskDialog from '@/components/shared/ui/TaskDialog';
import useFormDialogState from '@/lib/zustand/dialog-store';
import useDialogStore from '@/lib/zustand/dialog-store';
import EventDialog from '@/components/shared/ui/EventDialog';

const FormDialog = () => {

   const { formDialogState, setFormDialogState } = useDialogStore()

   console.log('formDialogState', formDialogState)

   const handleDialogueClose = () => {
      console.log('clicked')
   };

   return (
      <Dialog open={true} onOpenChange={handleDialogueClose}>
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

const FormDialogContent = ({ dialogType }:{ dialogType : string }) => {
   switch (dialogType) {
      case 'task':
         return <TaskDialog />;
      case 'event':
         return <EventDialog />;
      case 'file':
         return <FileIcon />;
      case 'project-settings':
         return <ProjectIcon />;
      case 'client-contact':
         return <UsersRound />;
      case 'partner-contact':
         return <ContactB />;
      case 'sales-document-item':
         return <Coins />;
      default:
         return <Plus />;
   }
};

export default FormDialog;
