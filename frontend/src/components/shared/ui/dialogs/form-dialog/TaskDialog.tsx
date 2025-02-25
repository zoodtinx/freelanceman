import React from 'react';
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
import useDialogStore from 'src/lib/zustand/dialog-store';
import type { Task, CreateTaskDto } from '@types';
import { FormDialogState } from 'src/lib/types/form-dialog.types';
import { Label } from '@/components/shared/ui/form-field-elements/Label';
import { CircleCheck, PencilLine, Trash2 } from 'lucide-react';


const TaskDialog = () => {
   const { formDialogState, setFormDialogState } = useDialogStore();
   const taskData = formDialogState.data as Task;
   const formMethods = useForm({
      defaultValues: taskData,
   });
   
   const {
      handleSubmit,
      formState: { isDirty, dirtyFields },
   } = formMethods;

   const { createTask, editTask, deleteTask, isLoading, data } =
      useTaskMutation();
   
   const onSubmit: SubmitHandler<CreateTaskDto> = (data) => {
      const payload: CreateTaskDto = {
         name: data.name,
         projectId: data.projectId,
         details: data.details,
         dueAt: data.dueAt,
         link: data.link,
         status: data.status,
      };

      console.log('payload', payload);

      // handleDialogClose();
   };

   const handleDialogClose = () => {
      console.log('close');
   };

   const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      console.log('delete');
   }

   // console.log('time string', formMethods.watch('dueAt'))

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
                     errorMessage='Please select deadline'
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
                  className='min-h-14 h-14 max-h-52'
               />
            </div>
            <div className="w-full">
               <Label>Link</Label>
               <LinkInputForm formMethods={formMethods} fieldName="link" />
            </div>
         </div>
         <DialogFooter>
            <div className="flex justify-between p-4">
               <Button
                  variant={'destructiveOutline'}
                  className="gap-1 pl-2 pr-3"
                  onClick={handleDelete}
               >
                  <Trash2 className="w-4 h-4" />
                  Delete
               </Button>
               <SubmitButton formDialogState={formDialogState} formMethods={formMethods} />
            </div>
         </DialogFooter>
      </form>
   );
};

const SubmitButton = ({
   formMethods,
   formDialogState,
}: {
   formMethods: UseFormReturn<Task>;
   formDialogState: FormDialogState;
}) => {
   const {
      formState: { isDirty  },
   } = formMethods;

   if (formDialogState.mode === 'edit' || formDialogState.mode === 'view') {
      return (
         <Button
            variant={isDirty ? 'submit' : 'ghost'}
            type="submit"
            className="gap-1 pl-2 pr-3 items-center"
         >
            <CircleCheck className="w-4 h-4" />
            Save Changes
         </Button>
      );
   } else if (formDialogState.mode === 'create') {
      return (
         <Button
            variant={'submit'}
            type="submit"
            className="gap-1 pl-2 pr-3 items-center"
         >
            <PencilLine className="w-4 h-4" />
            Add Task
         </Button>
      );
   }

   // const textContent = formDialogState.mode === 'create' ? 'Add Task' : 'Save Changes';
   // const icon = formDialogState.mode === 'create' ? <CircleCheck className="w-4 h-4" /> : <PencilLine className="w-4 h-4" />;

   // return (
   //    <Button
   //       variant={isDirty ? 'submit' : 'ghost'}
   //       type="submit"
   //       className="gap-1 pl-2 pr-3 items-center"
   //    >
   //       {icon}
   //       {textContent}
   //    </Button>
   // );
};

const ProjectField = ({
   formMethods,
   formDialogState,
}: {
   formMethods: UseFormReturn<Task>;
   formDialogState: FormDialogState;
}) => {
   
   const isOnProjectPage = formDialogState.openedOn === 'project-page'
   const isCreateMode = formDialogState.mode === 'create'

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
                  placeholder='Select a Project'   
                  required={true}
                  errorMessage='Please select a project'
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
            <Label className='pb-0'>Project</Label>
               <p>{formMethods.getValues('project')}</p>
            </div>
            <div className="w-1/2">
            <Label className='pb-0'>Client</Label>
               <p>{formMethods.getValues('client')}</p>
            </div>
         </div>
      );
   }

};

export default TaskDialog;
