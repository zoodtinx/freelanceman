import React, { ButtonHTMLAttributes, useEffect, useRef, useState } from 'react';
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
import type { EventStatus } from '@types';
import { SubmitHandler, useForm } from 'react-hook-form';
import LinkInput from './form/LinkInput';
import StatusSelect from './form/StatusSelect';
import ProjectSelect from './form/ProjectSelect';
import TimePicker from './form/TimePicker';
import TaskNameInput from '@/components/pages/all-project/TaskAndEventNameInput';
import DatePicker from './form/DatePicker';
import { NewEventPayload } from '@types';
import type { Event } from '@types';

const EventDialog: React.FC<DialogProps<Event>> = ({
   dialogState,
   setDialogState,
   dialogData
}) => {

   const {
      mutate: editEvent,
      isPending: editingEvent,
      data: editedEvent,
   } = useEditEvent(dialogState.id); 
   const { mutate: createEvent, isPending: creatingEvent } = useCreateEvent(); 

   const {
      register,
      handleSubmit,
      setValue,
      getValues,
      formState: { errors },
      watch,
      reset,
      control,
      field
   } = useForm<NewEventPayload>({
      defaultValues: {},
   });

   // State variables for event data
   const [eventName, setEventName] = useState(dialogData.name);
   const [eventProject, setEventProject] = useState(dialogData.project);
   const [eventClient, setEventClient] = useState(dialogData.client);

   useEffect(() => {
      if (dialogState.mode === 'view') {
         reset(dialogData);
         setEventName(dialogData.name);
         setEventProject(dialogData.project);
         setEventClient(dialogData.client);
      } else if (dialogState.mode === 'create') {
         const initialState = {
            name: '',
            details: '',
            status: 'scheduled',
            dueDate: '',
            projectId: '',
            link: '',
         };
         reset(initialState);
         setEventName('');
         setEventProject('');
         setEventClient('');
      }
   }, [reset, dialogState.mode, dialogData]);

   const onError = (errors: any) => {
      console.error('Validation Errors:', errors);
   };

   const onSubmit: SubmitHandler<FormData> = (data) => {
      console.log(data);
      createEvent(data);
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
               <DialogHeader className="">
                  <DialogTitle className="flex flex-col items-start">
                     <TaskNameInput
                        setValue={setValue}
                        register={register}
                        value={eventName}
                     />
                  </DialogTitle>
               </DialogHeader>
               <div className="px-5 py-3 flex flex-col gap-3">
                  <div className="flex leading-tight">
                     <div className="w-1/2 flex flex-col box-border gap-1">
                        <p className="text-secondary">Status</p>
                        <StatusSelect control={control} />
                     </div>
                     <div className="w-1/2">
                        <p className="text-secondary">Due Date</p>
                        <DatePicker control={control} />
                        <TimePicker setValue={setValue} watch={watch} />
                     </div>
                  </div>
                  <div className="flex leading-tight">
                     <div className="w-1/2 font-semibold">
                        <p className="text-secondary">Project</p>
                        {dialogState.mode === 'create' ? (
                           <ProjectSelect
                              setValue={setValue}
                              register={register}
                              control={control}
                              value={eventProject}
                           />
                        ) : (
                           <p>{eventProject}</p>
                        )}
                     </div>
                     <div className="w-1/2 font-semibold">
                        <p className="text-secondary">Client</p>
                        {eventClient || 'Select a project'}
                     </div>
                  </div>
                  <div className="w-full">
                     <p className="text-secondary">Details</p>
                     <Textarea
                        className="resize-none border-secondary placeholder:text-secondary"
                        placeholder="Explain this task like you're telling your future self who's half asleep."
                        {...register!('details')}
                     />
                  </div>
                  <div>
                     <p className="text-secondary">Link</p>
                     <LinkInput register={register} getValues={getValues} />
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

export default EventDialog;
