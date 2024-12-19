import React, { useEffect } from 'react';
import {
   DialogContent,
   DialogHeader,
   Dialog,
   DialogFooter,
   DialogTitle,
   DialogTrigger,
} from './Dialog';
import { Button } from './button';
import { Textarea } from './textarea';
import { DialogProps } from '@/lib/types/dialog.types';
import { FieldValues, Path, SubmitHandler, useForm } from 'react-hook-form';
import LinkInput from './form/LinkInput';
import StatusSelect from './form/StatusSelect';
import ProjectSelect from './form/ProjectSelect';
import TaskAndEventNameInput from '@/components/pages/all-project/TaskAndEventNameInput';
import type { NewTaskPayload, TaskFormData, TaskStatus } from '@types';
import { Link } from 'react-router-dom';
import { InputProps } from '@/lib/types/form-input-props.types';
import DateTimePicker from './form/DateTimePicker';
import { useCreateTask, useDeleteTask, useEditTask } from '@/lib/api/task-api';
import { taskStatusSelections } from './form/utils';
import { taskDefaultValues } from './form/utils';

const TaskDialog: React.FC<DialogProps> = ({ dialogState, setDialogState }) => {
   const { mutate: editTask, isPending: editingTask } = useEditTask(
      dialogState.id
   );
   const { mutate: createTask, isPending: creatingTask } = useCreateTask();
   const { mutate: deleteTask, isPending: deletingTask } = useDeleteTask();

   const formMethods = useForm<TaskFormData>({
      defaultValues: taskDefaultValues,
   });

   const { handleSubmit, reset } = formMethods;

   useEffect(() => {
      if (dialogState.mode === 'view') {
         reset(dialogState.data);
      } else if (dialogState.mode === 'create') {
         reset(taskDefaultValues);
      }
   }, [dialogState, reset]);

   const onError = (errors: any) => {
      console.error('Validation Errors:', errors);
   };

   const handleDialogClose = () => {
      setDialogState({
         ...dialogState,
         isOpen: false,
      });
   };

   const onSubmit: SubmitHandler<NewTaskPayload> = (data) => {
      const taskPayload: NewTaskPayload = {
         name: data.name,
         projectId: data.projectId,
         details: data.details,
         dueDate: data.dueDate,
         link: data.link,
         status: data.status,
      };

      if (dialogState.mode === 'create') {
         createTask(taskPayload);
         handleDialogClose();
      } else {
         editTask(taskPayload);
         if (!editingTask) {
            handleDialogClose();
         }
      }
   };

   const handleDelete = () => {
      deleteTask(dialogState.id);
      handleDialogClose();
   };


   const buttonText = dialogState.mode === 'create' ? 'Create Task' : 'Save';

   return (
      <Dialog open={dialogState.isOpen} onOpenChange={handleDialogClose}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Profile
            </Button>
         </DialogTrigger>
         <DialogContent
            className="sm:max-w-[425px] flex flex-col"
            onInteractOutside={(e) => {
               e.preventDefault();
            }}
         >
            <form onSubmit={handleSubmit(onSubmit, onError)}>
               <DialogHeader>
                  <DialogTitle>
                     <TaskAndEventNameInput<TaskFormData>
                        formMethods={formMethods}
                        dialogState={dialogState}
                     />
                  </DialogTitle>
               </DialogHeader>
               <div className="px-5 py-3 flex flex-col gap-3">
                  <div className="flex leading-tight">
                     <div className="w-1/2 font-semibold relative">
                        <p className="text-secondary">Status</p>
                        <StatusSelect<TaskFormData>
                           formMethods={formMethods}
                           dialogState={dialogState}
                           selection={taskStatusSelections}
                           fieldName="status"
                        />
                     </div>
                     <div className="w-1/2 font-semibold relative">
                        <p className="text-secondary">Due Date</p>
                        <DateTimePicker<TaskFormData>
                           formMethods={formMethods}
                           dialogState={dialogState}
                           fieldName="dueDate"
                        />
                     </div>
                  </div>
                  <div className="flex leading-tight">
                     <div className="w-1/2 font-semibold relative">
                        <p className="text-secondary">Project</p>
                        <ProjectSelect<TaskFormData>
                           formMethods={formMethods}
                           dialogState={dialogState}
                        />
                     </div>
                     <div className="w-1/2 font-semibold">
                        <p className="text-secondary">Client</p>
                        <ClientField<TaskFormData>
                           formMethods={formMethods}
                           dialogState={dialogState}
                        />
                     </div>
                  </div>
                  <div className="w-full font-semibold relative">
                     <p className="text-secondary">Details</p>
                     <Textarea
                        className="resize-none border-secondary placeholder:text-secondary"
                        placeholder="Explain this task like you're telling your future self who's half asleep."
                        {...formMethods.register('details')}
                     />
                  </div>
                  <div className="w-full font-semibold relative">
                     <p className="text-secondary">Link</p>
                     <LinkInput<TaskFormData> formMethods={formMethods} />
                  </div>
               </div>
               <DialogFooter>
                  <div className="flex justify-between p-4">
                     <div className="flex gap-1">
                        {dialogState.mode === 'view' && (
                           <Button
                              variant={'destructive'}
                              onClick={(e: React.MouseEvent) => {
                                 e.preventDefault();
                                 handleDelete();
                              }}
                           >
                              Delete
                           </Button>
                        )}
                        <Button
                           variant={'destructiveOutline'}
                           onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              handleDialogClose();
                           }}
                        >
                           Discard
                        </Button>
                     </div>
                     <Button variant={'default'} type="submit">
                        {buttonText}
                     </Button>
                  </div>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
};

const ClientField = <TFieldValues extends FieldValues>({
   formMethods,
   dialogState,
}: InputProps<TFieldValues>): JSX.Element => {
   const { watch } = formMethods;

   const clientName = watch('client' as Path<TFieldValues>);
   const clientId = watch('clientId' as Path<TFieldValues>);

   if (clientName && clientId) {
      if (dialogState?.mode === 'view') {
         return <Link to={`../client/${clientId}`}>{clientName}</Link>;
      } else if (dialogState?.mode === 'create') {
         return <p className="cursor-default select-none">{clientName}</p>;
      }
   }
   return <span>Select a project</span>;
};

export default TaskDialog;
