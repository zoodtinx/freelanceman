import React from 'react';
import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { AutoClientField, DateTimePickerForm, DynamicHeightTextInputForm, LinkInputForm, SelectWithSearchForm, StatusSelectForm, TextAreaForm } from 'src/components/shared/ui/form-field-elements';
import { DialogFooter } from '../../primitives/Dialog';
import { Button } from '../../primitives/Button';
import { CircleCheck, ClipboardX, Pencil, Trash2 } from 'lucide-react';
import { useCreateEvent, useDeleteEvent, useEditEvent } from '@/lib/api/event-api';
import { FormDialogState } from 'src/lib/types/form-dialog.types';
import { eventStatusSelections } from '../../helpers/constants/constants';
import useDialogStore from '@/lib/zustand/dialog-store';
import { CreateEventDto } from '@types';

export const EventDialog = ({formMethods}:{formMethods: UseFormReturn}) => {
   const { formDialogState, setFormDialogState } = useDialogStore();

   const { mutate: editEvent, isPending: editingEvent } = useEditEvent(
      formDialogState.data
   );
   const { mutate: createEvent, isPending: creatingEvent } = useCreateEvent();
   const { mutate: deleteEvent, isPending: deletingEvent } = useDeleteEvent();

   const { handleSubmit, reset } = formMethods;

   const handleDialogClose = () => {
      console.log('close');
   };

   const onSubmit: SubmitHandler<NewEventPayload> = (data) => {
      const payload: CreateEventDto = {
         name: data.name,
         projectId: data.projectId,
         details: data.details,
         dueAt: data.dueDate,
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
            <DynamicHeightTextInputForm
               formMethods={formMethods}
               fieldName="name"
               required={true}
               errorMessage="Please name your event"
               placeholder="What's the event?"
            />
            <div className="flex leading-tight">
               <div className="w-1/2">
                  <p className="text-secondary">Status</p>
                  <StatusSelectForm
                     formMethods={formMethods}
                     selection={eventStatusSelections}
                     fieldName="status"
                  />
               </div>
               <div className="w-1/2">
                  <p className="text-secondary">Due Date</p>
                  <DateTimePickerForm
                     formMethods={formMethods}
                     fieldName="dueAt"
                  />
               </div>
            </div>
            {formDialogState.openedOn !== 'project-page' && (
               <div className="flex leading-tight">
                  <div className="w-1/2">
                     <p className="text-secondary">Project</p>
                     <SelectWithSearchForm
                        formMethods={formMethods}
                        fieldName="projectId"
                        type="project"
                        size="base"
                     />
                  </div>
                  <div className="w-1/2">
                     <p className="text-secondary">Client</p>
                     <AutoClientField
                        formMethods={formMethods}
                        fieldName="client"
                     />
                  </div>
               </div>
            )}
            <div className="w-full">
               <p className="text-secondary">Tags</p>
               <TagField />
            </div>
            <div className="w-full">
               <p className="text-secondary">Details</p>
               <TextAreaForm
                  formMethods={formMethods}
                  fieldName="details"
                  placeholder="Describe the event"
               />
            </div>
            <div className="w-full">
               <p className="text-secondary">Link</p>
               <LinkInputForm formMethods={formMethods} fieldName="link" />
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
               <RightButton
                  dialogState={formDialogState}
                  handleEditMode={handleEditMode}
               />
            </div>
         </DialogFooter>
      </form>
   );
};

const TagField = ({ formMethods }) => {
   const tags = ['Meeting', 'Day', 'Impact Arena'];
   const color = '#FCEEE2';

   const tagsDisplay = tags.map((tag) => {
      return (
         <div
            key={tag}
            className="text-sm font-medium px-2 py-1 rounded-full"
            style={{ backgroundColor: color }}
         >
            {tag}
         </div>
      );
   });

   return <div className="flex gap-1 flex-wrap">{tagsDisplay}</div>;
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
