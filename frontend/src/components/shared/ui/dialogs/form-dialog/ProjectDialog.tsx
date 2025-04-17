import { DialogFooter } from '../../primitives/Dialog';
import { FormDialogProps } from 'src/lib/types/form-dialog.types';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { formatDate, formatTime } from '@/lib/helper/formatDateTime';
import { useProjectApi } from '@/lib/api/project-api';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';
import {
   EditProjectDto,
   PaymentStatus,
   ProjectPayload,
   ProjectStatus,
} from 'freelanceman-common';
import { useNavigate } from 'react-router-dom';
import {
   paymentStatusSelections,
   projectStatusSelections,
} from '@/components/shared/ui/helpers/constants/selections';
import {
   DynamicHeightTextInputForm,
   Label,
   StatusSelectForm,
} from 'src/components/shared/ui/form-field-elements';
import {
   DiscardButton,
   SubmitButton,
} from '@/components/shared/ui/dialogs/form-dialog/FormButton';

export const ProjectDialog = ({ formMethods }: FormDialogProps) => {
   const navigate = useNavigate();
   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const { setConfirmationDialogState } = useConfirmationDialogStore();
   const { editProject, deleteProject } = useProjectApi();

   const { handleSubmit, setValue } = formMethods;

   const onSubmit = (data: ProjectPayload) => {
      const editProjectPayload: EditProjectDto = {
         id: data.id,
         title: data.title,
         projectStatus: data.projectStatus as ProjectStatus,
         paymentStatus: data.paymentStatus as PaymentStatus,
      };

      editProject.mutate(editProjectPayload);

      if (editProject.isError) {
         const { error } = editProject;
         setValue('mutationError', error.message);
      } else {
         setFormDialogState((prev) => {
            return {
               ...prev,
               isOpen: false,
            };
         });
      }
   };

   const handleDeleteButtonClick = () => {
      const projectTitle = formMethods.getValues('title');
      const projectId = formMethods.getValues('id');

      const handleDeleteProject = () => {
         deleteProject.mutate(projectId);
         if (deleteProject.isError) {
            const { error } = deleteProject;
            setValue('mutationError', error.message);
            setConfirmationDialogState((prev) => {
               return {
                  ...prev,
                  isOpen: false,
               };
            });
            setFormDialogState((prev) => ({ ...prev, isOpen: true }));
         }
         
         setConfirmationDialogState((prev) => {
            return {
               ...prev,
               isOpen: false,
            };
         });
      };

      setFormDialogState((prev) => ({ ...prev, isOpen: false }));
      setConfirmationDialogState({
         isOpen: true,
         actions: {
            primary: () => handleDeleteProject(),
         },
         message: projectTitle,
         additionalMessage:
            'This action will also delete related tasks, events and files.',
         type: 'delete',
         dialogRequested: {
            mode: 'edit',
            type: 'project-settings',
         },
      });
   };

   const handleClientClick = () => {
      const clinetId = formDialogState.data.clientId;
      navigate(`/home/clients/${clinetId}`);
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
   };

   return (
      <form onSubmit={handleSubmit(onSubmit as any)}>
         <div className="px-5 py-3 flex flex-col gap-3">
            <DynamicHeightTextInputForm
               formMethods={formMethods}
               fieldName="title"
               required={true}
               errorMessage="Please name your project"
               placeholder="Project Title"
            />
            <div className="flex leading-tight">
               <div className="w-1/2">
                  <Label>Project Status</Label>
                  <StatusSelectForm
                     formMethods={formMethods}
                     selection={projectStatusSelections}
                     fieldName="projectStatus"
                  />
               </div>
               <div className="w-1/2">
                  <Label>Payment Status</Label>
                  <StatusSelectForm
                     formMethods={formMethods}
                     selection={paymentStatusSelections}
                     fieldName="paymentStatus"
                  />
               </div>
            </div>
            <div className="">
               <Separator />
            </div>
            <div className="flex flex-col gap-2">
               <div className="w-full">
                  <Label className="pb-0">Client</Label>
                  <p
                     className="text-md font-semibold leading-tight cursor-pointer"
                     onClick={handleClientClick}
                  >
                     {formMethods.getValues('client')?.name ||
                        'A certain client'}
                  </p>
               </div>
               <div className="flex leading-tight">
                  <div className="w-1/2">
                     <Label className="pb-0">Date Created</Label>
                     <p>
                        {formatDate(formMethods.getValues('createdAt'), 'LONG')}
                     </p>
                     <p className="text-sm">
                        {formatTime(formMethods.getValues('createdAt'))}
                     </p>
                  </div>
                  <div className="w-1/2">
                     <Label className="pb-0">Last Update</Label>
                     <p>
                        {formatDate(formMethods.getValues('updatedAt'), 'LONG')}
                     </p>
                     <p className="text-sm">
                        {formatTime(formMethods.getValues('updatedAt'))}
                     </p>
                  </div>
               </div>
            </div>
         </div>
         <DialogFooter>
            <div className="flex justify-between p-4 pb-2">
               <DiscardButton
                  formDialogState={formDialogState}
                  action={handleDeleteButtonClick}
                  formMethods={formMethods}
                  deleteText="Delete Project"
               />
               <SubmitButton
                  formDialogState={formDialogState}
                  formMethods={formMethods}
               />
            </div>
         </DialogFooter>
      </form>
   );
};
