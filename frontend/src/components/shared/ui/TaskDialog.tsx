import React, { useEffect } from 'react';
import {
   DialogContent,
   DialogHeader,
   Dialog,
   DialogFooter,
   DialogTitle,
   DialogTrigger,
} from './primitives/Dialog';
import { Button } from './primitives/Button';
import { Textarea } from './primitives/Textarea';
import { FieldValues, Path, SubmitHandler, useForm } from 'react-hook-form';
import LinkInput from './primitives/LinkInput';
import StatusSelect from './form-field-elements/StatusSelect';
import ProjectSelect from './form-field-elements/ProjectSelect';
import TaskAndEventNameInput from 'src/components/shared/ui/form-field-elements/DynamicInput';
import type { NewTaskPayload, TaskFormData } from '@types';
import { Link } from 'react-router-dom';
import { InputProps } from '@/lib/types/form-input-props.types';
import DateTimePicker from '@/components/shared/ui/form-field-elements/DateTimePicker';
import { useCreateTask, useDeleteTask, useEditTask } from '@/lib/api/task-api';
import { taskStatusSelections, taskDefaultValues } from './primitives/utils';
import { CircleCheck, ClipboardX, Pencil, Trash2 } from 'lucide-react';

const TaskDialog: React.FC<DialogProps> = ({ dialogState, setDialogState }) => {
   const { mutate: editTask } = useEditTask(dialogState.id);
   const { mutate: createTask } = useCreateTask();
   const { mutate: deleteTask } = useDeleteTask();

   const formMethods = useForm<TaskFormData>({
      defaultValues: taskDefaultValues,
   });

   const { handleSubmit, reset, watch } = formMethods;

   useEffect(() => {
      reset(
         dialogState.mode === 'view' || dialogState.mode === 'edit'
            ? dialogState.data
            : taskDefaultValues
      );
   }, [dialogState, reset]);

   const handleDialogClose = () => {
      setDialogState({ ...dialogState, isOpen: false });
   };

   const onSubmit: SubmitHandler<NewTaskPayload> = (data) => {
      const payload: NewTaskPayload = {
         name: data.name,
         projectId: data.projectId,
         details: data.details,
         dueDate: data.dueDate,
         link: data.link,
         status: data.status,
      };
      dialogState.mode === 'create' ? createTask(payload) : editTask(payload);
      handleDialogClose();
   };

   const handleDelete = () => {
      deleteTask(dialogState.id);
      handleDialogClose();
   };

   const RightButton = () => {
      switch (dialogState.mode) {
         case 'view':
            return (
               <Button
                  type="button"
                  variant="default"
                  onClick={() => setDialogState({ ...dialogState, mode: 'edit' })}
                  className="flex gap-1"
               >
                  Edit
                  <Pencil className="w-4 h-4" />
               </Button>
            );
         case 'edit':
         case 'create':
            return (
               <Button type="submit" variant="submit" className="flex gap-1">
                  {dialogState.mode === 'edit' ? 'Save' : 'Create Task'}
                  <CircleCheck className="w-4 h-4" />
               </Button>
            );
         default:
            return null;
      }
   };

   const LeftButton = () => {
      switch (dialogState.mode) {
         case 'view':
            return (
               <Button variant="destructive" onClick={handleDelete} className="flex gap-1">
                  Delete
                  <Trash2 className="w-4 h-4" />
               </Button>
            );
         case 'edit':
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

   return (
      <Dialog open={dialogState.isOpen} onOpenChange={handleDialogClose}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Task
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px] flex flex-col">
            <form onSubmit={handleSubmit(onSubmit)}>
               <DialogHeader className="py-2">
                  <DialogTitle className="text-base w-full">Task</DialogTitle>
               </DialogHeader>
               <div className="px-5 py-3 flex flex-col gap-3">
                  <TaskAndEventNameInput<TaskFormData>
                     formMethods={formMethods}
                     dialogState={dialogState}
                  />
                  <div className="flex leading-tight">
                     <div className="w-1/2">
                        <p className="text-secondary">Status</p>
                        <StatusSelect<TaskFormData>
                           formMethods={formMethods}
                           dialogState={dialogState}
                           selection={taskStatusSelections}
                           fieldName="status"
                        />
                     </div>
                     <div className="w-1/2">
                        <p className="text-secondary">Due Date</p>
                        <DateTimePicker<TaskFormData>
                           formMethods={formMethods}
                           dialogState={dialogState}
                           fieldName="dueDate"
                        />
                     </div>
                  </div>
                  <div className="flex leading-tight">
                     <div className="w-1/2">
                        <p className="text-secondary">Project</p>
                        <ProjectSelect<TaskFormData>
                           formMethods={formMethods}
                           dialogState={dialogState}
                        />
                     </div>
                     <div className="w-1/2">
                        <p className="text-secondary">Client</p>
                        <ClientField<TaskFormData>
                           formMethods={formMethods}
                           dialogState={dialogState}
                        />
                     </div>
                  </div>
                  <div className="w-full">
                     <p className="text-secondary">Details</p>
                     <DetailsInputField<TaskFormData>
                        formMethods={formMethods}
                        dialogState={dialogState}
                        fieldName="details"
                     />
                  </div>
                  <div className="w-full">
                     <p className="text-secondary">Link</p>
                     <LinkInput<TaskFormData> formMethods={formMethods} />
                  </div>
               </div>
               <DialogFooter>
                  <div className="flex justify-between p-4">
                     <LeftButton />
                     <RightButton />
                  </div>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
};

const DetailsInputField = <TFieldValues extends FieldValues>({
   formMethods,
   dialogState,
   fieldName,
}: InputProps<TFieldValues>): JSX.Element => {
   const { register, getValues } = formMethods;
   const details = getValues(fieldName as Path<TFieldValues>);

   if (dialogState?.mode === 'view') {
      return <p className="whitespace-pre-wrap">{details || 'No details provided.'}</p>;
   }

   return (
      <Textarea
         className="resize-none border-secondary placeholder:text-secondary w-full p-2 rounded-md"
         placeholder="Describe this task like you're briefing your future self."
         defaultValue={dialogState?.mode === 'edit' ? details : ''}
         {...register(fieldName as Path<TFieldValues>)}
      />
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
         return (
            <Link
               to={`../client/${clientId}`}
               className="text-primary cursor-pointer hover:text-primary-dark"
            >
               {clientName}
            </Link>
         );
      }
      return <p className="cursor-default select-none text-secondary">{clientName}</p>;
   }

   return <span className="text-gray-500">Select a project</span>;
};

export default TaskDialog;
