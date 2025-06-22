import { FormDialogProps } from 'src/lib/types/form-dialog.types';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { formatDate, formatTime } from '@/lib/helper/formatDateTime';
import {
   EditProjectDto,
   PaymentStatus,
   ProjectFindManyItem,
   ProjectStatus,
} from 'freelanceman-common';
import {
   paymentStatusSelections,
   projectStatusSelections,
} from '@/components/shared/ui/helpers/constants/selections';
import {
   Label,
   StatusSelectForm,
} from 'src/components/shared/ui/form-field-elements';
import FormDialogFooter from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';
import HeadlineTextInputForm from '@/components/shared/ui/form-field-elements/HeadlineTextInput';
import { NumberInputForm } from '@/components/shared/ui/form-field-elements/NumberInputForm';
import {
   useDeleteProject,
   useEditProject
} from '@/lib/api/project-api';
import { toast } from 'sonner';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';
import { useNavigate } from 'react-router-dom';

export const ProjectDialog = ({
   formMethods,
}: FormDialogProps) => {
   // form utilities
   const { handleSubmit } = formMethods;

   //dialog state
   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const setConfirmationDialogState = useConfirmationDialogStore((state) => state.setConfirmationDialogState);
   const closeDialog = () => {
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
   };

   const navigate = useNavigate()
   const editProject = useEditProject();
   const deleteProject = useDeleteProject();

   const onSubmit = async (data: ProjectFindManyItem) => {
      const editProjectPayload: EditProjectDto = {
         id: formDialogState.data.id,
         name: data.name,
         projectStatus: data.projectStatus as ProjectStatus,
         paymentStatus: data.paymentStatus as PaymentStatus,
         budget: Number(data.budget),
      };
      closeDialog();
      toast.loading('Updating project...')
      await editProject.mutateAsync(editProjectPayload);
      toast.dismiss()
   };

   const handleDestructiveButton = () => {
      if (formDialogState.mode === 'edit') {
         const deleteProjectFn = async () => {
            toast.loading('Deleting project...')
            await deleteProject.mutateAsync(formDialogState.data.id);
            if (formDialogState.openedOn === 'projectPage') {
               navigate(`/home/projects`);
            }
         };
         setConfirmationDialogState({
            actions: {
               primary() {
                   deleteProjectFn()
               },
            },
            entityName: formDialogState.data.name,
            isOpen: true,
            type: 'delete',
            additionalMessage:
               'This action will also delete every files, tasks, events and notes created under this project.',
            dialogRequested: {
               mode: 'edit',
               type: 'projectSettings',
            },
         });
      }
      closeDialog();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit as any)}>
         <div className="px-4 pb-4 pt-3 flex flex-col gap-3">
            <HeadlineTextInputForm
               formMethods={formMethods}
               fieldName="name"
               required={true}
               errorMessage="Please name your project"
               placeholder="Project title"
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
               <div className="flex">
                  <div className="flex flex-col w-1/2 grow-0 leading-tight">
                     <Label>Budget</Label>
                     <NumberInputForm
                        fieldName="budget"
                        formMethods={formMethods}
                        className="mr-4"
                     />
                  </div>
                  <div className="w-1/2">
                     <Label className="pb-0">Client</Label>
                     <p className="text-md font-semibold leading-tight">
                        {formMethods.getValues('client')?.name || 'Freelancing'}
                     </p>
                  </div>
               </div>
               <div className="flex leading-tight">
                  <div className="w-1/2">
                     <Label className="pb-0">Date Created</Label>
                     <p>
                        {formatDate(
                           formMethods.getValues('createdAt'),
                           'SEMIFULL'
                        )}
                     </p>
                     <p className="text-sm">
                        {formatTime(formMethods.getValues('createdAt'))}
                     </p>
                  </div>
                  <div className="w-1/2">
                     <Label className="pb-0">Last Update</Label>
                     <p>
                        {formatDate(
                           formMethods.getValues('updatedAt'),
                           'SEMIFULL'
                        )}
                     </p>
                     <p className="text-sm">
                        {formatTime(formMethods.getValues('updatedAt'))}
                     </p>
                  </div>
               </div>
            </div>
         </div>
         <FormDialogFooter
            formMethods={formMethods}
            onDiscard={handleDestructiveButton}
            entity="Project"
         />
      </form>
   );
};
