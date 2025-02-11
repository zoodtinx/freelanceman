import React from 'react';

import { DialogFooter } from './primitives/Dialog';
import { Button } from './primitives/Button';

import { SubmitHandler, useForm } from 'react-hook-form';

import AutoClientField from '@/components/shared/ui/form-field-elements/AutoClientField';
import StatusSelect from './form-field-elements/StatusSelectForm';
import ProjectSelect from './form-field-elements/ProjectSelectForm';
import TaskAndEventNameInput from 'src/components/shared/ui/form-field-elements/DynamicInputForm';
import DateTimePicker from 'src/components/shared/ui/form-field-elements/DateTimePickerForm';
import LinkInput from 'src/components/shared/ui/form-field-elements/LinkInputForm';
import TextareaForm from '@/components/shared/ui/form-field-elements/TextareaForm';

import { useTaskMutation } from '@/lib/api/task-api';
import type { Task, CreateTaskDto } from '@types';
import { FormDialogProps, FormDialogState } from '@/lib/types/dialog.types';

import { taskStatusSelections } from './constants/constants';
import { CircleCheck, ClipboardX, Pencil, Trash2 } from 'lucide-react';
import useDialogStore from 'src/lib/zustand/dialog-store';

const TaskDialog = () => {
   const { formDialogState, setFormDialogState } = useDialogStore();
   const taskData = formDialogState.data as Task

   const { createTask, editTask, deleteTask, isLoading, data } =
      useTaskMutation();

   const formMethods = useForm<CreateTaskDto>({
      defaultValues: taskData,
   });

   const { handleSubmit, reset } = formMethods;

   const handleDialogClose = () => {
      console.log('close')
   };

   const onSubmit: SubmitHandler<CreateTaskDto> = (data) => {
      const payload: CreateTaskDto = {
         name: data.name,
         projectId: data.projectId,
         details: data.details,
         dueAt: data.dueAt,
         link: data.link,
         status: data.status,
      };

      if (formDialogState.mode === 'create') createTask(payload);
      else editTask(payload);

      handleDialogClose();
   };

   const handleEditMode = () => {
      console.log('edit')
   };

   const handleCancelEdit = () => {
      console.log('cancel')
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="px-5 py-3 flex flex-col gap-3">
            <TaskAndEventNameInput
               formMethods={formMethods}
               dialogState={formDialogState}
            />
            <div className="flex leading-tight">
               <div className="w-1/2">
                  <p className="text-secondary">Status</p>
                  <StatusSelect
                     formMethods={formMethods}
                     dialogState={formDialogState}
                     selection={taskStatusSelections}
                     fieldName="status"
                  />
               </div>
               <div className="w-1/2">
                  <p className="text-secondary">Due Date</p>
                  <DateTimePicker
                     formMethods={formMethods}
                     dialogState={formDialogState}
                     fieldName="dueDate"
                  />
               </div>
            </div>
            {formDialogState.openedOn !== 'project-page' && (
               <div className="flex leading-tight">
                  <div className="w-1/2">
                     <p className="text-secondary">Project</p>
                     <ProjectSelect
                        formMethods={formMethods}
                        dialogState={formDialogState}
                     />
                  </div>
                  <div className="w-1/2">
                     <p className="text-secondary">Client</p>
                     <AutoClientField
                        formMethods={formMethods}
                        dialogState={formDialogState}
                     />
                  </div>
               </div>
            )}
            <div className="w-full">
               <p className="text-secondary">Details</p>
               <TextareaForm
                  formMethods={formMethods}
                  dialogState={formDialogState}
                  fieldName="details"
               />
            </div>
            <div className="w-full">
               <p className="text-secondary">Link</p>
               <LinkInput formMethods={formMethods} />
            </div>
         </div>
         <DialogFooter>
            <div className="flex justify-between p-4">
               <LeftButton
                  dialogState={formDialogState}
                  handleCancelEdit={handleCancelEdit}
                  handleDialogClose={handleDialogClose}
                  handleDelete={() => deleteTask(formDialogState.id)}
               />
               <RightButton
                  dialogState={formDialogState}
                  handleEditMode={handleEditMode}
               />
            </div>
         </DialogFooter>
      </form>
   );
};

const LeftButton: React.FC<{
   dialogState: FormDialogState;
   handleCancelEdit: () => void;
   handleDialogClose: () => void;
   handleDelete: () => void;
}> = ({ dialogState, handleCancelEdit, handleDialogClose, handleDelete }) => {
   switch (dialogState.mode) {
      case 'view':
         return (
            <Button
               variant="destructive"
               onClick={handleDelete}
               className="flex gap-1"
            >
               Delete
               <Trash2 className="w-4 h-4" />
            </Button>
         );
      case 'edit':
         return (
            <Button
               variant="destructiveOutline"
               onClick={handleCancelEdit}
               className="flex gap-1"
            >
               Discard
               <ClipboardX className="w-4 h-4" />
            </Button>
         );
      case 'create':
         return (
            <Button
               variant="destructiveOutline"
               onClick={handleDialogClose}
               className="flex gap-1"
            >
               Discard
               <ClipboardX className="w-4 h-4" />
            </Button>
         );
      default:
         return null;
   }
};

const RightButton: React.FC<{
   dialogState: FormDialogState;
   handleEditMode: () => void;
}> = ({ dialogState, handleEditMode }) => {
   switch (dialogState.mode) {
      case 'view':
         return (
            <Button
               type="button"
               variant="default"
               onClick={handleEditMode}
               className="flex gap-1"
            >
               Edit
               <Pencil className="w-4 h-4" />
            </Button>
         );
      case 'edit':
         return (
            <Button type="submit" variant="submit" className="flex gap-1">
               Save
               <CircleCheck className="w-4 h-4" />
            </Button>
         );
      case 'create':
         return (
            <Button type="submit" variant="submit" className="flex gap-1">
               Create Task
               <CircleCheck className="w-4 h-4" />
            </Button>
         );
      default:
         return null;
   }
};

export default TaskDialog;
