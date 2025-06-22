import { useState } from 'react';
import { TextAreaForm } from 'src/components/shared/ui/form-field-elements';
import { Plus } from 'lucide-react';
import { FormDialogProps } from 'src/lib/types/form-dialog.types';
import {
   paymentStatusSelections,
   projectStatusSelections,
} from '@/components/shared/ui/helpers/constants/selections';
import {
   SelectWithSearchForm,
   StatusSelectForm,
} from 'src/components/shared/ui/form-field-elements';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { Label } from '@/components/shared/ui/form-field-elements/Label';
import FormDialogFooter from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';
import { useNavigate } from 'react-router-dom';
import HeadlineTextInputForm from '@/components/shared/ui/form-field-elements/HeadlineTextInput';
import { NumberInputForm } from '@/components/shared/ui/form-field-elements/NumberInputForm';
import { cn } from '@/lib/helper/utils';
import { useCreateProject } from '@/lib/api/project-api';
import { CreateProjectDtoWithOptimisticUpdate } from 'freelanceman-common/src/schemas';
import { toast } from 'sonner';

export const NewProjectDialog = ({ formMethods }: FormDialogProps) => {
   const navigate = useNavigate();
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );
   const closeDialog = () => {
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
   };

   const createProject = useCreateProject({
      enableOptimisticUpdate: false
   });

   const [haveNote, setHaveNote] = useState(false);

   const { handleSubmit, setError } = formMethods;

   const onSubmit = async (data: any) => {
      const rawBudget = String(data.budget).replace(/,/g, '');
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

      const createProjectPayload: CreateProjectDtoWithOptimisticUpdate = {
         name: data.name,
         clientId: data.clientId,
         projectStatus: data.projectStatus,
         paymentStatus: data.paymentStatus,
         budget: budget,
         updatedAt: new Date().toISOString(),
      };
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
      toast.loading('Setting up new project...')
      const project = await createProject.mutateAsync(createProjectPayload);
      toast.dismiss()
      navigate(`/home/projects/${project.id}`);
   };

   const handleDestructiveButton = (e: React.MouseEvent) => {
      e.preventDefault();
      closeDialog();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="px-4 pb-4 pt-3 flex flex-col gap-3">
            <HeadlineTextInputForm
               formMethods={formMethods}
               required={true}
               errorMessage="Please enter a project name"
               className="pt-1"
               fieldName="name"
               placeholder="Enter a project name"
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
               <NumberInputForm
                  fieldName="budget"
                  required={true}
                  errorMessage="Please enter a budget"
                  formMethods={formMethods}
               />
            </div>
            {!haveNote ? (
               <div
                  onClick={() => setHaveNote(true)}
                  className={cn(
                     'border my-1 pl-1 pr-2 w-fit rounded-md flex items-center gap-1 cursor-pointer',
                     'text-secondary border-secondary',
                     'hover:border-primary hover:text-primary',
                     'transition-colors duration-75'
                  )}
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
            onDiscard={handleDestructiveButton}
            entity="Project"
         />
      </form>
   );
};
