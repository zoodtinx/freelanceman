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
import { useDeleteTask, useEditTask, useCreateTask } from '@/lib/api/task-api';
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
import {
   CreateTaskDto,
   TaskPayload,
   TaskStatus,
   EditTaskDto,
} from 'freelanceman-common';
import { handleDelete } from '@/components/shared/ui/dialogs/form-dialog/helper/handle-delete';
import { useState } from 'react';
import { ApiLoadingState } from '@/lib/types/form-element.type';

export const TaskDialog = ({
   formMethods,
   handleEscapeWithChange,
}: FormDialogProps) => {
   const [isApiLoading, setIsApiLoading] = useState<ApiLoadingState>({
      isLoading: false,
      type: 'submit',
   });
   const { handleSubmit, setValue } = formMethods;
   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const setConfirmationDialogState = useConfirmationDialogStore(
      (state) => state.setConfirmationDialogState
   );

   const errorCallback = (err: Error) => setValue('mutationError', err.message);
   const successCallback = () => {
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

   const createTask = useCreateTask({ errorCallback, successCallback });
   const editTask = useEditTask({ errorCallback, successCallback });
   const deleteTask = useDeleteTask({ errorCallback, successCallback });

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

   const handleLeftButtonClick = () => {
      if (formDialogState.mode === 'create') {
         handleEscapeWithChange();
      } else if (formDialogState.mode === 'edit') {
         handleDelete({
            mutateApi: deleteTask,
            payload: formDialogState.data.id,
            setFormDialogState: setFormDialogState,
            openConfirmDialog: true,
            setConfirmationDialogState: setConfirmationDialogState,
            confirmDialogData: {
               type: 'delete',
               entityName: formDialogState.data.name,
               dialogRequested: {
                  mode: 'edit',
                  type: 'task',
               },
            },
         });
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
            <div className="flex justify-between p-4 pb-2">
               <DiscardButton
                  formMethods={formMethods}
                  isApiLoading={isApiLoading}
                  formDialogState={formDialogState}
                  action={handleLeftButtonClick}
               />
               <SubmitButton
                  formDialogState={formDialogState}
                  formMethods={formMethods}
                  isApiLoading={isApiLoading}
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
