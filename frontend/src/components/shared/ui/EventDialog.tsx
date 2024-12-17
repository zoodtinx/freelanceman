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
import { useCreateEvent, useDeleteEvent, useEditEvent } from '@/lib/api/eventApi';
import type { DialogProps } from './props.type';
import { SubmitHandler, useForm } from 'react-hook-form';
import LinkInput from './form/LinkInput';
import StatusSelect from './form/StatusSelect';
import ProjectSelect from './form/ProjectSelect';
import TaskNameInput from '@/components/pages/all-project/TaskAndEventNameInput';
import { NewActionPayload } from '@types';
import type { ActionFormData } from '@types';
import { Link } from 'react-router-dom';
import { InputProps } from './form/props.type';
import { formDefaultValue } from './form/utils';
import DateTimePicker from './form/DateTimePicker';

interface EventDialogProps extends DialogProps {
   dialogState: any;
   setDialogState: React.Dispatch<React.SetStateAction<any>>;
}

const EventDialog: React.FC<EventDialogProps> = ({ dialogState, setDialogState }) => {
   const { mutate: editEvent, isPending: editingEvent } = useEditEvent(dialogState.id);
   const { mutate: createEvent, isPending: creatingEvent } = useCreateEvent();
   const { mutate: deleteEvent, isPending: deletingEvent } = useDeleteEvent();

   const formMethods = useForm<ActionFormData>({
      defaultValues: formDefaultValue(dialogState.actionType),
   });

   const { handleSubmit, reset } = formMethods;

   useEffect(() => {
      reset(dialogState.mode === 'view' ? dialogState.data : formDefaultValue(dialogState.actionType));
   }, [dialogState, reset]);

   const handleDialogClose = () => {
      setDialogState({ ...dialogState, isOpen: false });
   };

   const onSubmit: SubmitHandler<NewActionPayload> = (data) => {
      const payload: NewActionPayload = {
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

   const buttonText = dialogState.mode === 'create' ? 'Create Event' : 'Save';

   return (
      <Dialog open={dialogState.isOpen} onOpenChange={handleDialogClose}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">Edit Event</Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px] flex flex-col" onInteractOutside={(e) => e.preventDefault()}>
            <form onSubmit={handleSubmit(onSubmit)}>
               <DialogHeader>
                  <DialogTitle>
                     <TaskNameInput formMethods={formMethods} dialogState={dialogState} />
                  </DialogTitle>
               </DialogHeader>
               <div className="px-5 py-3 flex flex-col gap-3">
                  <div className="flex leading-tight">
                     <div className="w-1/2 font-semibold">
                        <p className="text-secondary">Status</p>
                        <StatusSelect formMethods={formMethods} dialogState={dialogState} />
                     </div>
                     <div className="w-1/2 font-semibold">
                        <p className="text-secondary">Date</p>
                        <DateTimePicker formMethods={formMethods} dialogState={dialogState} />
                     </div>
                  </div>
                  <div className="flex leading-tight">
                     <div className="w-1/2 font-semibold">
                        <p className="text-secondary">Project</p>
                        <ProjectSelect formMethods={formMethods} dialogState={dialogState} />
                     </div>
                     <div className="w-1/2 font-semibold">
                        <p className="text-secondary">Client</p>
                        <ClientField formMethods={formMethods} dialogState={dialogState} />
                     </div>
                  </div>
                  <div className="w-full font-semibold">
                     <p className="text-secondary">Details</p>
                     <Textarea
                        className="resize-none border-secondary placeholder:text-secondary"
                        placeholder="Describe this event like you're briefing your future self."
                        {...formMethods.register('details')}
                     />
                  </div>
                  <div className="w-full font-semibold">
                     <p className="text-secondary">Link</p>
                     <LinkInput formMethods={formMethods} />
                  </div>
               </div>
               <DialogFooter>
                  <div className="flex justify-between p-4">
                     <div className='flex gap-1'>
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
                        <Button variant={'destructiveOutline'} onClick={handleDialogClose}>
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

const ClientField = ({
   formMethods,
   dialogState,
}: InputProps<ActionFormData>) => {
   const { watch } = formMethods;

   const clientName = watch('client');
   const clientId = watch('clientId');

   if (clientName && clientId) {
      if (dialogState?.mode === 'view') return <Link to={`../client/${clientId}`}>{clientName}</Link>;
      return <p className="cursor-default select-none">{clientName}</p>;
   }
   return 'Select a project';
};

export default EventDialog;
