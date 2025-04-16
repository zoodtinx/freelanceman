import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { DialogFooter } from '../../primitives/Dialog';
import {
   DateTimePickerForm,
   DynamicHeightTextInputForm,
   LinkInputForm,
   SelectWithSearchForm,
   StatusSelectForm,
   TextAreaForm,
} from 'src/components/shared/ui/form-field-elements';
import { useTaskApi } from '@/lib/api/task-api';
import { taskStatusSelections } from '@/components/shared/ui/helpers/constants/selections';
import { Label } from '@/components/shared/ui/form-field-elements/Label';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';
import {
   DiscardButton,
   SubmitButton,
} from '@/components/shared/ui/dialogs/form-dialog/FormButton';
import {
   FormDialogProps,
   FormDialogState,
} from '@/lib/types/form-dialog.types';
import { CreateTaskDto, TaskPayload, TaskStatus, UpdateTaskDto } from 'freelanceman-common/dist/types/src/schemas';

export const TaskDialog = ({
   formMethods,
   handleEscapeWithChange,
}: FormDialogProps) => {
   const { createTask, editTask, deleteTask } = useTaskApi();
   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const setConfirmationDialogState = useConfirmationDialogStore(
      (state) => state.setConfirmationDialogState
   );
   const taskData = formDialogState.data as TaskPayload;

   const {
      handleSubmit,
      formState: { isDirty },
   } = formMethods;

   const handleDialogClose = () => {
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
   };

   const onSubmit: SubmitHandler<CreateTaskDto> = (data) => {
      if (!isDirty) {
         return;
      }

      if (formDialogState.mode === 'create') {
         const payload: CreateTaskDto = {
            name: data.name,
            projectId: data.projectId,
            details: data.details,
            dueAt: data.dueAt,
            link: data.link,
            status: data.status,
            clientId: data.clientId,
         };
         createTask.mutate(payload);
      } else if (formDialogState.mode === 'edit') {
         const payload: UpdateTaskDto = {
            name: data.name,
            details: data.details,
            dueAt: data.dueAt,
            link: data.link,
            status: data.status as TaskStatus,
         };
         editTask.mutate({
            taskId: formDialogState.data.id,
            taskPayload: payload,
         });
      }

      handleDialogClose();
   };

   const handleLeftButtonClick = () => {
      if (formDialogState.mode === 'create') {
         handleEscapeWithChange();
      } else if (formDialogState.mode === 'edit') {
         deleteTask.mutate(taskData.id);
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
         <DialogFooter>
            <div className="flex justify-between p-4">
               <DiscardButton
                  formMethods={formMethods}
                  formDialogState={formDialogState}
                  action={handleLeftButtonClick}
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
         <div className="grow leading-snug">
            <Label>Project</Label>
            <SelectWithSearchForm
               formMethods={formMethods}
               fieldName="projectId"
               type="project"
               size="base"
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
            <p>{formMethods.getValues('project').title}</p>
         </div>
      );
   }
};
