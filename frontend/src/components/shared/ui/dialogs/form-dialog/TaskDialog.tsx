import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { DialogFooter } from '../../primitives/Dialog';
import { Button } from '../../primitives/Button';
import {
   AutoClientField,
   DateTimePickerForm,
   DynamicHeightTextInputForm,
   LinkInputForm,
   SelectWithSearchForm,
   StatusSelectForm,
   TextAreaForm,
} from 'src/components/shared/ui/form-field-elements';
import { useTaskMutation } from '@/lib/api/task-api';
import { taskStatusSelections } from '@/components/shared/ui/helpers/constants/selections';
import type { Task, CreateTaskDto } from '@types';
import {
   FormDialogState,
   FormDialogType,
} from 'src/lib/types/form-dialog.types';
import { Label } from '@/components/shared/ui/form-field-elements/Label';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';
import { ApiLoadingState } from 'src/components/shared/ui/dialogs/form-dialog/dialog-elements.type';
import { DiscardButton, SubmitButton } from '@/components/shared/ui/dialogs/form-dialog/FormButton';

const TaskDialog = ({formMethods}:{formMethods: UseFormReturn}) => {
   const [isApiLoading, setIsApiLoading] = useState<ApiLoadingState>({
      isLoading: false,
      type: 'discard',
   });
   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const setConfirmationDialogState = useConfirmationDialogStore(
      (state) => state.setConfirmationDialogState
   );
   const taskData = formDialogState.data as Task;
   // const formMethods = useForm({
   //    defaultValues: taskData,
   // });

   const {
      handleSubmit,
      formState: { isDirty },
   } = formMethods;

   useEffect(() => {
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

      const handleEscapeWithChange = () => {
         if (isDirty) {
            setConfirmationDialogState({
               isOpen: true,
               actions: {
                  primary: handleDialogClose,
               },
               message: () => 'Changes that will be lost if you leave.',
               type: 'unsaved-changes',
               dialogRequested: {
                  mode: formDialogState.mode,
                  type: formDialogState.type as FormDialogType,
               },
            });
         } else {
            handleDialogClose();
         }
      };

      const handleEscKey = (event: KeyboardEvent) => {
         if (event.key === 'Escape') {
            handleEscapeWithChange();
         }
      };

      document.addEventListener('keydown', handleEscKey);

      return () => {
         document.removeEventListener('keydown', handleEscKey);
      };
   }, [
      setConfirmationDialogState,
      isDirty,
      setFormDialogState,
      formDialogState,
   ]);

   const { createTask, editTask, deleteTask, isLoading, data } =
      useTaskMutation();

   const onSubmit: SubmitHandler<CreateTaskDto> = (data) => {
      if (!isDirty) {
         return
      }

      setIsApiLoading({
         isLoading: true,
         type: 'submit',
      });
   
      const payload: CreateTaskDto = {
         name: data.name,
         projectId: data.projectId,
         details: data.details,
         dueAt: data.dueAt,
         link: data.link,
         status: data.status,
      };

      //onSucess setLoading false
      // handleDialogClose();
   };

   const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      deleteTask(taskData.id);
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  isApiLoading={isApiLoading}
                  formDialogState={formDialogState}
                  action={handleDelete}
                  setIsApiLoading={setIsApiLoading}
               />
               <SubmitButton
                  formDialogState={formDialogState}
                  formMethods={formMethods}
                  isApiLoading={isApiLoading}
                  setIsApiLoading={setIsApiLoading}
               />
            </div>
         </DialogFooter>
      </form>
   );
};

const ProjectField = ({
   formMethods,
   formDialogState,
}: {
   formMethods: UseFormReturn<Task>;
   formDialogState: FormDialogState;
}) => {
   const isOnProjectPage = formDialogState.openedOn === 'project-page';
   const isCreateMode = formDialogState.mode === 'create';

   if (isCreateMode && !isOnProjectPage) {
      return (
         <div className="flex leading-tight">
            <div className="w-1/2">
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
            <div className="w-1/2">
               <Label>Client</Label>
               <AutoClientField formMethods={formMethods} fieldName="client" />
            </div>
         </div>
      );
   } else {
      return (
         <div className="flex leading-tight">
            <div className="w-1/2">
               <Label className="pb-0">Project</Label>
               <p>{formMethods.getValues('project')}</p>
            </div>
            <div className="w-1/2">
               <Label className="pb-0">Client</Label>
               <p>{formMethods.getValues('client')}</p>
            </div>
         </div>
      );
   }
};

export default TaskDialog;
