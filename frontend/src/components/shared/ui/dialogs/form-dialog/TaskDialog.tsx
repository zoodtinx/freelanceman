import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import {
   DateTimePickerForm,
   LinkInputForm,
   SelectWithSearchForm,
   StatusSelectForm,
   TextAreaForm,
} from 'src/components/shared/ui/form-field-elements';
import { taskStatusSelections } from '@/components/shared/ui/helpers/constants/selections';
import { Label } from '@/components/shared/ui/form-field-elements/Label';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import {
   FormDialogProps,
   FormDialogState,
} from '@/lib/types/form-dialog.types';
import {
   CreateTaskDto,
   TaskStatus,
   EditTaskDto,
   TaskFindManyItem,
} from 'freelanceman-common';
import FormDialogFooter from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';
import { CrudApi } from '@/lib/api/api.type';
import { useNavigate } from 'react-router-dom';
import HeadlineTextInputForm from '@/components/shared/ui/form-field-elements/HeadlineTextInput';

export const TaskDialog = ({
   formMethods,
   crudApi,
   handleLeftButtonClick,
}: FormDialogProps) => {
   //utility hooks
   const navigate = useNavigate();

   // form utilities
   const { handleSubmit } = formMethods;

   //dialog state
   const { formDialogState, setFormDialogState } = useFormDialogStore();

   // api setup
   const { createTask, editTask } = crudApi as CrudApi['task'];

   // submit handler
   const onSubmit = async (data: TaskFindManyItem) => {
      if (data.dueAt) {
         const isISO = /^\d{4}-\d{2}-\d{2}T/.test(data.dueAt);
         data.dueAt = isISO ? data.dueAt : `${data.dueAt}T00:00:00Z`;
      }

      setFormDialogState((prev) => {
            return {
               ...prev,
               isOpen: false,
            };
         });

      if (formDialogState.mode === 'create') {
         const payload: CreateTaskDto = {
            name: data.name,
            projectId: data.projectId,
            details: data.details,
            dueAt: data.dueAt,
            link: data.link,
            status: data.status,
         } as CreateTaskDto;
         await createTask.mutateAsync(payload);
         if (formDialogState.openedOn === 'globalAddButton') {
            navigate('/home/actions');
         }
      } else if (formDialogState.mode === 'edit') {
         const payload: EditTaskDto = {
            id: data.id,
            name: data.name,
            details: data.details,
            dueAt: data.dueAt,
            link: data.link,
            status: data.status as TaskStatus,
         } as EditTaskDto;
         await editTask.mutateAsync(payload);
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
         <div className="px-4 pt-3 pb-4 flex flex-col gap-3">
            <HeadlineTextInputForm
               formMethods={formMethods}
               fieldName="name"
               required={true}
               errorMessage="Please name your task"
               placeholder="What do you need to do?"
            />
            <div className="flex leading-tight">
               <input hidden {...formMethods.register('isWithTime')} />
               <div className="w-1/2">
                  <Label>Status</Label>
                  <StatusSelectForm
                     formMethods={formMethods}
                     selection={taskStatusSelections}
                     fieldName="status"
                  />
               </div>
               <div className="w-1/2">
                  <Label className="pb-1">Due Date</Label>
                  <DateTimePickerForm
                     formMethods={formMethods}
                     fieldName="dueAt"
                     required={true}
                     errorMessage="Please select deadline"
                  />
               </div>
            </div>
            {formDialogState.openedOn !== 'projectPage' && (
               <ProjectField
                  formMethods={formMethods}
                  formDialogState={formDialogState}
               />
            )}
            <div className="w-full">
               <Label>Details</Label>
               <TextAreaForm
                  formMethods={formMethods}
                  fieldName="details"
                  placeholder="Describe the task"
                  className="min-h-[90px] h-[90px] max-h-52"
               />
            </div>
            <div className="w-full">
               <Label>Link</Label>
               <LinkInputForm formMethods={formMethods} fieldName="link" />
            </div>
         </div>
         <FormDialogFooter
            formMethods={formMethods}
            onDiscard={handleLeftButtonClick}
         />
      </form>
   );
};

export const ProjectField = ({
   formMethods,
   formDialogState,
}: {
   formMethods: UseFormReturn;
   formDialogState: FormDialogState;
}) => {
   const isOnProjectPage = formDialogState.openedOn === 'projectPage';
   const isCreateMode = formDialogState.mode === 'create';

   if (isCreateMode && !isOnProjectPage) {
      return (
         <div className="w-full leading-tight">
            <Label>Project</Label>
            <SelectWithSearchForm
               formMethods={formMethods}
               fieldName="projectId"
               type="project"
               size="lg"
               placeholder="Select a Project"
               enableCancel
            />
         </div>
      );
   } else {
      return (
         <div className="grow leading-snug">
            <Label className="pb-0">Project</Label>
            <p className="text-md">{formMethods.getValues('project')?.title}</p>
         </div>
      );
   }
};
