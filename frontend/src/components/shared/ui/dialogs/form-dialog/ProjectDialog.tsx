import { FormDialogProps } from 'src/lib/types/form-dialog.types';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { formatDate, formatTime } from '@/lib/helper/formatDateTime';
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
   TextInputForm,
} from 'src/components/shared/ui/form-field-elements';
import { CrudApi } from '@/lib/api/api.type';
import FormDialogFooter from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';

export const ProjectDialog = ({
   formMethods,
   buttonLoadingState,
   crudApi,
   handleLeftButtonClick,
}: FormDialogProps) => {
   const navigate = useNavigate();
   // button loading state
   const { isApiLoading, setIsApiLoading } = buttonLoadingState;

   // form utilities
   const { handleSubmit } = formMethods;

   //dialog state
   const { formDialogState, setFormDialogState } = useFormDialogStore();

   // api setup
   const { editProject } = crudApi as CrudApi['project'];

   const onSubmit = (data: ProjectPayload) => {
      setIsApiLoading({ isLoading: true, type: 'submit' });
      const editProjectPayload: EditProjectDto = {
         id: formDialogState.data.id,
         title: data.title,
         projectStatus: data.projectStatus as ProjectStatus,
         paymentStatus: data.paymentStatus as PaymentStatus,
         budget: Number(data.budget)
      };
      editProject.mutate(editProjectPayload);
      setIsApiLoading({ isLoading: false, type: 'submit' });
   };

   const handleClientClick = () => {
      const clientId = formDialogState.data.clientId;
      if (clientId) {
         navigate(`/home/clients/${clientId}`);
         setFormDialogState((prev) => {
            return {
               ...prev,
               isOpen: false,
            };
         });
      }
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
            <div className="flex flex-col w-1/2 grow-0">
               <Label>Budget</Label>
               <TextInputForm number fieldName="budget" formMethods={formMethods} />
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
                        'Freelancing'}
                  </p>
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
            formDialogState={formDialogState}
            formMethods={formMethods}
            isApiLoading={isApiLoading}
            onDiscard={handleLeftButtonClick}
         />
      </form>
   );
};
