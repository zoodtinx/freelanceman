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
import { useCreateEvent, useEditEvent } from '@/lib/api/eventApi';
import type { DialogProps } from './props.type';
import { SubmitHandler, useForm } from 'react-hook-form';
import LinkInput from './form/LinkInput';
import StatusSelect from './form/StatusSelect';
import ProjectSelect from './form/ProjectSelect';
import TimePicker from './form/TimePicker';
import TaskNameInput from '@/components/pages/all-project/TaskAndEventNameInput';
import DatePicker from './form/DatePicker';
import { NewActionPayload } from '@types';
import type { ActionFormData } from '@types';
import { Link } from 'react-router-dom';
import { InputProps } from './form/props.type';
import { useActionsViewContext } from '@/lib/context/ActionsViewContext';

const EventDialog: React.FC<DialogProps<Event>> = ({
}) => {
      const {
         dialogState,
         setDialogState
      } = useActionsViewContext();
   
   const { mutate: editEvent, isPending: editingEvent } = useEditEvent(
      dialogState.id
   );
   const { mutate: createEvent, isPending: creatingEvent } = useCreateEvent();

   const formMethods = useForm<ActionFormData>({
      defaultValues: {
         name: '',
         details: '',
         status: 'scheduled',
         dueDate: '',
         project: '',
         projectId: '',
         client: '',
         clientId: '',
         link: '',
      },
   });

   const { handleSubmit, reset } = formMethods;

   useEffect(() => {
      if (dialogState.mode === 'view') {
         reset(dialogState.data); // Reset to dialog data
      } else if (dialogState.mode === 'create') {
         reset(); // Reset to default values
      }
   }, [dialogState, reset]);
   const onError = (errors: any) => {
      console.error('Validation Errors:', errors);
   };

   const onSubmit: SubmitHandler<NewActionPayload> = (data) => {
      if (dialogState.mode === 'create') {
         createEvent(data);
      } else {
         editEvent(data);
      }
   };

   const handleDiscard = () => {
      reset();
      setDialogState({
         ...dialogState,
         isOpen: false,
      });
   };

   return (
      <Dialog open={dialogState.isOpen} onOpenChange={handleDiscard}>
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
                     <TaskNameInput formMethods={formMethods} />
                  </DialogTitle>
               </DialogHeader>
               <div className="px-5 py-3 flex flex-col gap-3">
                  <div className="flex leading-tight">
                     <div className="w-1/2 flex flex-col box-border gap-1">
                        <p className="text-secondary">Status</p>
                        <StatusSelect formMethods={formMethods} />
                     </div>
                     <div className="w-1/2">
                        <p className="text-secondary">Due Date</p>
                        <DatePicker formMethods={formMethods} />
                        <TimePicker formMethods={formMethods} />
                     </div>
                  </div>
                  <div className="flex leading-tight">
                     <div className="w-1/2 font-semibold">
                        <p className="text-secondary">Project</p>
                        <ProjectSelect formMethods={formMethods} />
                     </div>
                     <div className="w-1/2 font-semibold">
                        <p className="text-secondary">Client</p>
                        <ClientArea formMethods={formMethods} />
                     </div>
                  </div>
                  <div className="w-full">
                     <p className="text-secondary">Details</p>
                     <Textarea
                        className="resize-none border-secondary placeholder:text-secondary"
                        placeholder="Explain this task like you're telling your future self who's half asleep."
                        {...formMethods.register('details')}
                     />
                  </div>
                  <div>
                     <p className="text-secondary">Link</p>
                     <LinkInput formMethods={formMethods} />
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
                                 handleDiscard();
                              }}
                           >
                              Delete
                           </Button>
                        )}
                        <Button
                           variant={'destructiveOutline'}
                           onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              handleDiscard();
                           }}
                        >
                           Discard
                        </Button>
                     </div>
                     <Button variant={'default'} type="submit">
                        {dialogState.mode === 'create' ? 'Create Task' : 'Save'}
                     </Button>
                  </div>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
};

const ClientArea = ({ formMethods }: InputProps<ActionFormData>) => {
   const { watch } = formMethods;

   // These are now valid because T is constrained
   const clientName = watch('client');
   const clientId = watch('clientId');

   if (clientName && clientId) {
      return <Link to={`../client/${clientId}`}>{clientName}</Link>;
   }

   return 'Select a project';
};

export default EventDialog;
