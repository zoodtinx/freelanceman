import React, { useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import type { EventFormData, NewEventPayload } from '@types';
import TextareaForm from '@/components/shared/ui/form-field-elements/TextareaForm';
import AutoClientField from '@/components/shared/ui/form-field-elements/AutoClientField';
import DateTimePicker from '@/components/shared/ui/form-field-elements/DateTimePicker';
import LinkInput from './form-field-elements/LinkInput';
import StatusSelect from './form-field-elements/StatusSelect';
import ProjectSelect from './form-field-elements/ProjectSelect';
import TaskNameInput from 'src/components/shared/ui/form-field-elements/DynamicInput';

import {
   DialogContent,
   DialogHeader,
   Dialog,
   DialogFooter,
   DialogTitle,
   DialogTrigger,
} from './primitives/Dialog';
import { Button } from './primitives/Button';

import {
   Calendar,
   CircleCheck,
   ClipboardX,
   Pencil,
   Trash2,
} from 'lucide-react';

import {
   useCreateEvent,
   useDeleteEvent,
   useEditEvent,
} from '@/lib/api/event-api';

import { DialogProps, FormDialogState } from '@/lib/types/dialog.types';
import { eventDefaultValues, eventStatusSelections } from './primitives/utils';

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

   const [color, setColor] = useState('');

   useEffect(() => {
      reset(
         dialogState.mode === 'view' || dialogState.mode === 'edit'
            ? dialogState.data
            : eventDefaultValues
      );
      if (dialogState.mode == 'create') {
         setColor('');
      } else {
         setColor(dialogState.data.color);
      }
   }, [dialogState, reset]);

   const handleDialogClose = () => {
      setDialogState({ ...dialogState, isOpen: false });
   };

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

   const handleEditMode = () => {
      setDialogState({ ...dialogState, mode: 'edit' });
   };

   const handleCancelEdit = () => {
      setDialogState({ ...dialogState, mode: 'view' });
   };

   const headerText = dialogState.mode === 'create' ? 'Create New Event' : 'Event'
   const headerTextStyle = dialogState.mode === 'view' ? 'text-primary' : 'text-foreground'

   return (
      <Dialog open={dialogState.isOpen} onOpenChange={handleDialogClose}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Event
            </Button>
         </DialogTrigger>
         <DialogContent
            className={`sm:max-w-[425px] flex flex-col focus:outline-none bg-primary text-foreground ${headerTextStyle}`}
            style={{
               backgroundColor: color,
            }}
            onInteractOutside={(e) => e.preventDefault()}
         >
            <form onSubmit={handleSubmit(onSubmit)}>
               <DialogHeader className="py-1 bg-transparent">
                  <DialogTitle className={`flex text-base w-full text-center items-center gap-1`}>
                     <Calendar className="w-[13px] h-[13px]" />
                     <p>{headerText}</p>
                  </DialogTitle>
               </DialogHeader>
               <div className="bg-background rounded-2xl text-primary">
                  <div className="px-5 py-3 flex flex-col gap-3">
                     <TaskNameInput
                        formMethods={formMethods}
                        dialogState={dialogState}
                     />
                     <div className="flex leading-tight">
                        <div className="w-1/2">
                           <p className="text-secondary">Status</p>
                           <StatusSelect
                              formMethods={formMethods}
                              dialogState={dialogState}
                              selection={eventStatusSelections}
                              fieldName="status"
                           />
                        </div>
                        <div className="w-1/2">
                           <p className="text-secondary">Date</p>
                           <DateTimePicker
                              formMethods={formMethods}
                              dialogState={dialogState}
                              fieldName="dueDate"
                           />
                        </div>
                     </div>
                     <div className="flex leading-tight">
                        <div className="w-1/2">
                           <p className="text-secondary">Project</p>
                           <ProjectSelect
                              formMethods={formMethods}
                              dialogState={dialogState}
                           />
                        </div>
                        <div className="w-1/2">
                           <p className="text-secondary">Client</p>
                           <AutoClientField
                              formMethods={formMethods}
                              dialogState={dialogState}
                           />
                        </div>
                     </div>
                     <div className="w-full">
                        <p className="text-secondary">Details</p>
                        <TextareaForm
                           formMethods={formMethods}
                           dialogState={dialogState}
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
                           dialogState={dialogState}
                           handleCancelEdit={handleCancelEdit}
                           handleDialogClose={handleDialogClose}
                        />
                        <RightButton
                           dialogState={dialogState}
                           handleEditMode={handleEditMode}
                        />
                     </div>
                  </DialogFooter>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   );
};

const LeftButton: React.FC<{
   dialogState: FormDialogState;
   handleCancelEdit: () => void;
   handleDialogClose: () => void;
}> = ({ dialogState, handleCancelEdit, handleDialogClose }) => {
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

const RightButton: React.FC<{
   dialogState: FormDialogState;
   handleEditMode: () => void;
}> = ({ dialogState, handleEditMode }) => {
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

export default EventDialog;
