import { DialogTitle } from 'src/components/shared/ui/primitives/Dialog';
import {
   DialogTitleIcon,
   getDialogHeaderText,
} from '@/components/shared/ui/helpers/Helpers';
import * as Dialogs from 'src/components/shared/ui/dialogs/form-dialog';
import { UseFormReturn } from 'react-hook-form';
import { FormDialogType } from '@/lib/types/form-dialog.types';

export const FormDialogTitle = ({ dialogType }: { dialogType: string }) => {
   return (
      <DialogTitle className="flex text-base w-full text-center items-center gap-1">
         <DialogTitleIcon dialogType={dialogType} />
         <p>{getDialogHeaderText(dialogType)}</p>
      </DialogTitle>
   );
};

export const FormDialogContent = ({
   dialogType,
   formMethods,
   handleEscapeWithChange,
}: {
   dialogType: string;
   formMethods: UseFormReturn;
   handleEscapeWithChange: () => void;
}) => {
   const {
      TaskDialog,
      EventDialog,
      FileDialog,
      ContactDialog,
      UserProfileDialog,
      NewProjectDialog,
      NewClientDialog,
      ProjectDialog,
      ClientDialog,
      NewFileDialog,
   } = Dialogs;

   const props = {
      formMethods: formMethods,
      handleEscapeWithChange: handleEscapeWithChange,
   };

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
         return <ContactDialog {...props} />;
      case 'partner-contact':
         return <ContactDialog {...props} />;
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