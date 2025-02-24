import React, { useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import type { Event, CreateEventDto } from '@types';
import TextareaForm from '@/components/shared/ui/form-field-elements/TextareaForm';
import AutoClientField from '@/components/shared/ui/form-field-elements/AutoClientField';
import DateTimePicker from 'src/components/shared/ui/form-field-elements/DateTimePickerForm';
import LinkInput from '../../form-field-elements/LinkInputForm';
import StatusSelect from '../../form-field-elements/StatusSelectForm';
import ProjectSelect from '../../form-field-elements/ProjectSelectForm';
import TaskNameInput from 'src/components/shared/ui/form-field-elements/TaskNameInput';

import {
   DialogContent,
   DialogHeader,
   Dialog,
   DialogFooter,
   DialogTitle,
   DialogTrigger,
} from '../../primitives/Dialog';
import { Button } from '../../primitives/Button';

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

import { DialogProps, FormDialogState } from 'src/lib/types/form-dialog.types';
import { eventStatusSelections } from '../../helpers/constants/constants';
import { eventDefaultValues } from 'src/components/shared/ui/helpers/constants/default-values';
import useDialogStore from '@/lib/zustand/dialog-store';

const EventDialog = () => {
   const { formDialogState, setFormDialogState } = useDialogStore();
   const eventData = formDialogState.data as Event

   const { mutate: editEvent, isPending: editingEvent } = useEditEvent(
      formDialogState.data
   );
   const { mutate: createEvent, isPending: creatingEvent } = useCreateEvent();
   const { mutate: deleteEvent, isPending: deletingEvent } = useDeleteEvent();

   const formMethods = useForm<NewEventPayload>({
      defaultValues: eventData,
   });

   const { handleSubmit, reset } = formMethods;

   const handleDialogClose = () => {
      console.log('close');
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

      if (formDialogState.mode === 'create') createEvent(payload);
      else editEvent(payload);

      handleDialogClose();
   };

   const handleEditMode = () => {
      console.log('edit');
   };

   const handleCancelEdit = () => {
      console.log('cancel');
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="px-5 py-3 flex flex-col gap-3">
            <TaskNameInput formMethods={formMethods} dialogState={formDialogState} fieldName='name' />
            <div className="flex leading-tight">
               <div className="w-1/2">
                  <p className="text-secondary">Status</p>
                  <StatusSelect
                     formMethods={formMethods}
                     dialogState={formDialogState}
                     selection={eventStatusSelections}
                     fieldName="status"
                  />
               </div>
               <div className="w-1/2">
                  <p className="text-secondary">Date</p>
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
                     <ProjectSelect formMethods={formMethods} dialogState={formDialogState} />
                  </div>
                  <div className="w-1/2">
                     <p className="text-secondary">Client</p>
                     <AutoClientField formMethods={formMethods} dialogState={formDialogState} />
                  </div>
               </div>
            )}
            <div className="w-full">
               <p className="text-secondary">Tags</p>
               <TagField />
            </div>
            <div className="w-full">
               <p className="text-secondary">Details</p>
               <TextareaForm formMethods={formMethods} dialogState={formDialogState} fieldName="details" />
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
                  handleDelete={() => deleteEvent(formDialogState.id)}
               />
               <RightButton dialogState={formDialogState} handleEditMode={handleEditMode} />
            </div>
         </DialogFooter>
      </form>
   );
};

const TagField = ({formMethods}) => {
   const tags = ['Meeting', 'Day', 'Impact Arena',]
   const color = '#FCEEE2'
   
   const tagsDisplay = tags.map((tag) => {
      return (
         <div key={tag} className='text-sm font-medium px-2 py-1 rounded-full' style={{ backgroundColor: color}}>
            {tag}
         </div>
      )
   })

   return (
      <div className='flex gap-1 flex-wrap'>
         {tagsDisplay}
      </div>
   )
}

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
