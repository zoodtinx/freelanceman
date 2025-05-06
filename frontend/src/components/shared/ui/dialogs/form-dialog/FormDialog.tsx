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
import { useWatch, useForm, UseFormReturn } from 'react-hook-form';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';
import { useCallback, useEffect, useState } from 'react';
import {
   ApiLoadingState,
   FormDialogProps,
   FormDialogType,
} from '@/lib/types/form-dialog.types';
import useCrudApi from '@/lib/api/services/all-api';
import { CrudApi } from '@/lib/api/api.type';
import { handleDelete } from '@/components/shared/ui/dialogs/form-dialog/helper/handle-delete';
import { toast } from 'sonner';
import { kebabToSentenceCase } from '@/components/page-elements/documents/helper';
import { getApiCallBacks } from '@/components/shared/ui/dialogs/form-dialog/helper/api-callbacks';

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
      setValue,
      reset,
   } = formMethods;

   //api hook setup
   const handleFormDialogCloseCallback = () => {
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: false
         }
      })
   }
   const handleConfirmDialogCloseCallback = () => {
      setConfirmationDialogState((prev) => {
         return {
            ...prev,
            isOpen: false
         }
      })
   }
   const callbacks = getApiCallBacks({
      entity: formDialogState.entity,
      formMethods: formMethods,
      setFormDialogState: handleFormDialogCloseCallback,
      setConfirmationDialogState: handleConfirmDialogCloseCallback
   })
   const crudApi = useCrudApi(callbacks);

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
   const handleEscapeWithChange = useCallback(() => {
      if (isDirty) {
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

   //handle data change when open/close dialogs
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

   //dialog color access
   const color =
      formDialogState.type === 'client-contact' ||
      formDialogState.type === 'partner-contact'
         ? (formDialogState.data as any).company?.themeColor
         : formDialogState.data.client?.themeColor;

   //button api laoding state
   const [isApiLoading, setIsApiLoading] = useState<ApiLoadingState>({
      isLoading: false,
      type: 'submit',
   });
   const buttonLoadingState = { isApiLoading, setIsApiLoading };

   //handle discard/delete
   const handleLeftButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (formDialogState.mode === 'create') {
         handleEscapeWithChange();
      } else if (formDialogState.mode === 'edit') {
         setIsApiLoading({ isLoading: true, type: 'destructive' });
         handleDelete({
            mutateApi: getDeleteFn(formDialogState.entity, crudApi),
            payload: formDialogState.data.id,
            setFormDialogState: setFormDialogState,
            openConfirmDialog: true,
            setConfirmationDialogState: setConfirmationDialogState,
            confirmDialogData: {
               type: 'delete',
               entityName: formDialogState.data.name,
               dialogRequested: {
                  mode: 'edit',
                  type: formDialogState.type,
               },
            },
         });
         setIsApiLoading({ isLoading: false, type: 'destructive' });
      }
   };

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
                  buttonLoadingState={buttonLoadingState}
                  crudApi={crudApi[formDialogState.entity]}
                  handleLeftButtonClick={handleLeftButtonClick}
               />
               <MutationErrorField formMethods={formMethods} />
            </div>
         </DialogContent>
      </Dialog>
   );
};

const MutationErrorField = ({
   formMethods,
}: {
   formMethods: UseFormReturn;
}) => {
   const { control } = formMethods;
   const mutationError = useWatch({
      control,
      name: 'mutationError',
      defaultValue: '',
   });

   if (!mutationError) {
      return <div className="pb-2"></div>;
   }

   return (
      <div className="w-full text-center text-sm pb-3 text-general-red animate-shake">
         {mutationError}
      </div>
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
      ClientDialog,
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
      case 'new-file':
         return <NewFileDialog {...props} />;
      case 'project-settings':
         return <ProjectDialog {...props} />;
      case 'client-contact':
         return <ClientContactDialog {...props} />;
      case 'partner-contact':
         return <PartnerContactDialog {...props} />;
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

const getDeleteFn = (entity: keyof CrudApi, crudApi: CrudApi) => {
   switch (entity) {
      case 'task':
         return crudApi.task.deleteTask;
      case 'event':
         return crudApi.event.deleteEvent;
      case 'file':
         return crudApi.file.deleteFile;
      case 'client':
         return crudApi.client.deleteClient;
      case 'clientContact':
         return crudApi.clientContact.deleteClientContact;
      case 'partnerCompany':
         return crudApi.partnerCompany.deletePartnerCompany;
      case 'partnerContact':
         return crudApi.partnerContact.deletePartnerContact;
      case 'project':
         return crudApi.project.deleteProject;
      case 'salesDocument':
         return crudApi.salesDocument.deleteSalesDocument;
      case 'salesDocumentItem':
         return crudApi.salesDocumentItem.deleteSalesDocumentItem;
      case 'user':
         return;
   }
};

export default FormDialog;
