import { useState } from 'react';
import {
   TextAreaForm,
   TextInputForm,
} from 'src/components/shared/ui/form-field-elements';
import { Plus } from 'lucide-react';
import {
   FormDialogProps
} from 'src/lib/types/form-dialog.types';
import {
   paymentStatusSelections,
   projectStatusSelections,
} from '@/components/shared/ui/helpers/constants/selections';
import {
   SelectWithSearchForm,
   DynamicHeightTextInputForm,
   StatusSelectForm,
} from 'src/components/shared/ui/form-field-elements';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { Label } from '@/components/shared/ui/form-field-elements/Label';
import { CreateProjectDto } from 'freelanceman-common';
import FormDialogFooter from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';
import { CrudApi } from '@/lib/api/api.type';
import { useNavigate } from 'react-router-dom';

export const NewProjectDialog = ({
   crudApi,
   formMethods,
   handleLeftButtonClick,
}: FormDialogProps) => {
   const navigate = useNavigate();
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );
   const { createProject } = crudApi as CrudApi['project'];

   const [haveNote, setHaveNote] = useState(false);

   const { handleSubmit, setError } = formMethods;

   const onSubmit = async (data: any) => {
      const rawBudget = data.budget.replace(/,/g, '');
      const budget = Number(rawBudget);

      if (
         isNaN(budget) ||
         !Number.isInteger(budget) ||
         /^0\d+/.test(rawBudget)
      ) {
         setError('budget', {
            type: 'manual',
            message: 'Please enter a number (no leading 0)',
         });
      }

      const createProjectPayload: CreateProjectDto = {
         title: data.title,
         clientId: data.clientId,
         projectStatus: data.projectStatus,
         paymentStatus: data.paymentStatus,
         budget: Number(data.budget.replace(/,/g, '')),
      };
      const project = await createProject.mutateAsync(createProjectPayload);
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
      navigate(`/home/projects/${project.id}`);
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="px-5 py-3 flex flex-col gap-3">
            <DynamicHeightTextInputForm
               formMethods={formMethods}
               required={true}
               errorMessage="Please enter project name"
               className="pt-1"
               fieldName="title"
               placeholder="Enter project name"
            />
            <div className="w-full leading-tight">
               <Label>Client</Label>
               <SelectWithSearchForm
                  formMethods={formMethods}
                  fieldName="clientId"
                  placeholder="Select a client"
                  type="client"
                  size="base"
                  errorMessage="Please select a client"
                  className="border-0 p-0 text-md"
                  enableCancel
                  isWithIcon
               />
            </div>
            <div className="flex leading-tight">
               <div className="w-1/2">
                  <Label>Project Status</Label>
                  <StatusSelectForm
                     formMethods={formMethods}
                     fieldName="projectStatus"
                     selection={projectStatusSelections}
                  />
               </div>
               <div className="w-1/2">
                  <Label>Payment Status</Label>
                  <StatusSelectForm
                     formMethods={formMethods}
                     fieldName="paymentStatus"
                     selection={paymentStatusSelections}
                  />
               </div>
            </div>
            <div className="w-full">
               <Label>Budget</Label>
               <TextInputForm fieldName="budget" formMethods={formMethods} />
            </div>
            {!haveNote ? (
               <div
                  onClick={() => setHaveNote(true)}
                  className={`border my-1 pl-1 pr-2 w-fit rounded-md flex items-center gap-1 text-secondary border-secondary
                     hover:border-primary hover:text-primary transition-colors duration-75
                     `}
               >
                  <Plus className="w-4 h-4 stroke-[2.5px]" />
                  <p>Add Notes</p>
               </div>
            ) : (
               <div className="w-full mb-1">
                  <p className="text-secondary">Notes</p>
                  <TextAreaForm
                     formMethods={formMethods}
                     fieldName="details"
                     className="h-[100px] bg-transparent pt-1 border-secondary mt-1"
                  />
               </div>
            )}
         </div>
         <FormDialogFooter
            formMethods={formMethods}
            onDiscard={handleLeftButtonClick}
         />
      </form>
   );
};
