import { Calendar } from 'lucide-react';
import { Separator } from './primitives/Separator';
import { Path, useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import type { EventFormData, NewEventPayload, TaskFormData } from '@types';
import { eventDefaultValues, eventStatusSelections } from './primitives/utils';
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
import {
   useCreateEvent,
   useDeleteEvent,
   useEditEvent,
} from '@/lib/api/event-api';
import type { DialogProps } from '../types/props.type';
import LinkInput from './form-field-elements/LinkInput';
import StatusSelect from './form-field-elements/StatusSelect';
import ProjectSelect from './form-field-elements/ProjectSelect';
import TaskNameInput from 'src/components/shared/ui/form-field-elements/DynamicInput';
import { Link } from 'react-router-dom';
import { InputProps } from '../../../lib/types/form-input-props.types';
import { formDefaultValue } from './primitives/utils';
import DateTimePicker from '@/components/shared/ui/form-field-elements/DateTimePicker';
import { CircleCheck, ClipboardX, Pencil, Trash2 } from 'lucide-react';

const EventDialog: React.FC<DialogProps> = ({
   dialogState,
   setDialogState,
}) => {
   const { mutate: editEvent, isPending: editingEvent } = useEditEvent(
      dialogState.id
   );
   const { mutate: createEvent, isPending: creatingEvent } = useCreateEvent();
   const { mutate: deleteEvent, isPending: deletingEvent } = useDeleteEvent();

   const formMethods = useForm<EventFormData>({
      defaultValues: eventDefaultValues,
   });

   const { handleSubmit, reset, watch } = formMethods;

   useEffect(() => {
      reset(
         dialogState.mode === 'view' || dialogState.mode === 'edit'
            ? dialogState.data
            : formDefaultValue(dialogState.actionType)
      );
   }, [dialogState, reset]);

   const handleDialogClose = () => {
      setDialogState({ ...dialogState, isOpen: false });
   };

   const isWithTime = watch('withTime')
   console.log('withTime', isWithTime)

   const onSubmit: SubmitHandler<NewEventPayload> = (data) => {
      const payload: NewEventPayload = {
         name: data.name,
         projectId: data.projectId,
         details: data.details,
         dueDate: data.dueDate,
         link: data.link,
         status: data.status,
      };

      if (dialogState.mode === 'create') createEvent(payload);
      else editEvent(payload);

      handleDialogClose();
   };

   const handleDelete = () => {
      deleteEvent(dialogState.id);
      handleDialogClose();
   };

   const RightButton = () => {
      switch (dialogState.mode) {
         case 'view':
            return (
               <Button
                  type="submit"
                  variant={'default'}
                  onClick={() => handleEditMode()}
                  className="flex gap-1"
               >
                  Edit
                  <Pencil className="w-4 h-4" />
               </Button>
            );

         case 'edit':
            return (
               <Button type="submit" variant={'submit'} className="flex gap-1">
                  Save
                  <CircleCheck className="w-4 h-4" />
               </Button>
            );

         case 'create':
            return (
               <Button type="submit" variant={'submit'} className="flex gap-1">
                  Create new contact
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
               <Button variant={'destructive'} className="flex gap-1">
                  Delete
                  <Trash2 className="w-4 h-4" />
               </Button>
            );

         case 'edit':
            return (
               <Button
                  variant={'destructiveOutline'}
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
                  variant={'destructiveOutline'}
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

   const handleEditMode = () => {
      setDialogState({ ...dialogState, mode: 'edit' });
   };

   const handleCancelEdit = () => {
      setDialogState({ ...dialogState, mode: 'view' });
   };

   return (
      <Dialog open={dialogState.isOpen} onOpenChange={handleDialogClose}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Event
            </Button>
         </DialogTrigger>
         <DialogContent
            className="sm:max-w-[425px] flex flex-col"
            onInteractOutside={(e) => e.preventDefault()}
         >
            <form onSubmit={handleSubmit(onSubmit)}>
               <DialogHeader className="py-1 bg-transparent">
                  <DialogTitle className="flex text-base w-full text-center items-center gap-1">
                     <Calendar className='w-[13px] h-[13px]' />
                     <p>Event</p>
                  </DialogTitle>
               </DialogHeader>
               <div className="bg-background rounded-2xl">
                  <div className="px-5 py-3 flex flex-col gap-3">
                     <TaskNameInput<EventFormData>
                        formMethods={formMethods}
                        dialogState={dialogState}
                     />
                     <div className="flex leading-tight">
                        <div className="w-1/2">
                           <p className="text-secondary">Status</p>
                           <StatusSelect<EventFormData>
                              formMethods={formMethods}
                              dialogState={dialogState}
                              selection={eventStatusSelections}
                              fieldName="status"
                           />
                        </div>
                        <div className="w-1/2">
                           <p className="text-secondary">Date</p>
                           <DateTimePicker<EventFormData>
                              formMethods={formMethods}
                              dialogState={dialogState}
                              fieldName="dueDate"
                           />
                        </div>
                     </div>
                     <div className="flex leading-tight">
                        <div className="w-1/2">
                           <p className="text-secondary">Project</p>
                           <ProjectSelect<EventFormData>
                              formMethods={formMethods}
                              dialogState={dialogState}
                           />
                        </div>
                        <div className="w-1/2">
                           <p className="text-secondary">Client</p>
                           <ClientField<EventFormData>
                              formMethods={formMethods}
                              dialogState={dialogState}
                           />
                        </div>
                     </div>
                     <div className="w-full">
                        <p className="text-secondary">Details</p>
                        <DetailsInputField
                           formMethods={formMethods}
                           dialogState={dialogState}
                           fieldName="details"
                        />
                     </div>
                     <div className="w-full">
                        <p className="text-secondary">Link</p>
                        <LinkInput<EventFormData> formMethods={formMethods} />
                     </div>
                  </div>
                  <DialogFooter>
                     <div className="flex justify-between p-4">
                        <LeftButton />
                        <RightButton />
                     </div>
                  </DialogFooter>
               </div>
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
      return (
            <p className="whitespace-pre-wrap">{details || 'No details provided.'}</p>
      );
   }

   return (
      <Textarea
         className="resize-none border-secondary placeholder:text-secondary w-full p-2 rounded-md"
         placeholder="Describe this event like you're briefing your future self."
         defaultValue={dialogState?.mode === 'edit' ? details : ''} // Show current value in edit, empty in create
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
      } else if (dialogState?.mode === 'edit') {
         return (
            <p className="text-secondary cursor-not-allowed select-none">
               {clientName}
            </p>
         );
      } else if (dialogState?.mode === 'create') {
         return (
            <p className="cursor-default select-none">
               {clientName}
            </p>
         );
      }
   }

   return <span className="text-gray-500">Select a project</span>;
};
export default EventDialog;
