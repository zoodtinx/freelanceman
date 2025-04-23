import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import {
   DateTimePickerForm,
   DynamicHeightTextInputForm,
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
   TaskPayload,
   TaskStatus,
   EditTaskDto,
} from 'freelanceman-common';
import FormDialogFooter from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';
import { CrudApi } from '@/lib/api/api.type';

export const TaskDialog = ({
   formMethods,
   buttonLoadingState,
   crudApi,
   handleLeftButtonClick,
}: FormDialogProps) => {
   // button loading state
   const { isApiLoading, setIsApiLoading } = buttonLoadingState;

   // form utilities
   const { handleSubmit } = formMethods;

   //dialog state
   const { formDialogState } = useFormDialogStore();

   // api setup
   const { createTask, editTask } = crudApi as CrudApi['task'];

   // submit handler
   const onSubmit = (data: TaskPayload) => {
      if (formDialogState.mode === 'create') {
         setIsApiLoading({ isLoading: true, type: 'submit' });
         const payload: CreateTaskDto = {
            name: data.name,
            projectId: data.projectId,
            details: data.details,
            dueAt: data.dueAt,
            link: data.link,
            status: data.status,
         } as CreateTaskDto;
         createTask.mutate(payload);
         setIsApiLoading({ isLoading: false, type: 'submit' });
      } else if (formDialogState.mode === 'edit') {
         setIsApiLoading({ isLoading: true, type: 'submit' });
         const payload: EditTaskDto = {
            id: data.id,
            name: data.name,
            details: data.details,
            dueAt: data.dueAt,
            link: data.link,
            status: data.status as TaskStatus,
         } as EditTaskDto;
         editTask.mutate(payload);
         setIsApiLoading({ isLoading: false, type: 'submit' });
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
         <div className="px-5 py-3 flex flex-col gap-3">
            <DynamicHeightTextInputForm
               formMethods={formMethods}
               fieldName="name"
               required={true}
               errorMessage="Please name your task"
               placeholder="What do you need to do?"
            />
            <div className="flex leading-tight">
               <div className="w-1/2">
                  <Label>Status</Label>
                  <StatusSelectForm
                     formMethods={formMethods}
                     selection={taskStatusSelections}
                     fieldName="status"
                  />
               </div>
               <div className="w-1/2">
                  <Label className="pb-0">Due Date</Label>
                  <DateTimePickerForm
                     formMethods={formMethods}
                     fieldName="dueAt"
                     required={true}
                     errorMessage="Please select deadline"
                  />
               </div>
            </div>
            <ProjectField
               formMethods={formMethods}
               formDialogState={formDialogState}
            />
            <div className="w-full">
               <Label>Details</Label>
               <TextAreaForm
                  formMethods={formMethods}
                  fieldName="details"
                  placeholder="Describe the task"
                  className="min-h-14 h-14 max-h-52"
               />
            </div>
            <div className="w-full">
               <Label>Link</Label>
               <LinkInputForm formMethods={formMethods} fieldName="link" />
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

export const ProjectField = ({
   formMethods,
   formDialogState,
}: {
   formMethods: UseFormReturn;
   formDialogState: FormDialogState;
}) => {
   const isOnProjectPage = formDialogState.openedOn === 'project-page';
   const isCreateMode = formDialogState.mode === 'create';

   if (isCreateMode && !isOnProjectPage) {
      return (
         <div className="grow leading-tight">
            <Label>Project</Label>
            <SelectWithSearchForm
               formMethods={formMethods}
               fieldName="projectId"
               type="project"
               size="lg"
               placeholder="Select a Project"
               required={true}
               errorMessage="Please select a project"
            />
         </div>
      );
   } else {
      return (
         <div className="grow leading-snug">
            <Label className="pb-0">Project</Label>
            <p className="text-md">{formMethods.getValues('project').title}</p>
         </div>
      );
   }
};
