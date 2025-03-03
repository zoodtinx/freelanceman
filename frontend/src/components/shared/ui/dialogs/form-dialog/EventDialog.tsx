import React, { useState } from 'react';
import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form';
import {
   AutoClientField,
   DateTimePickerForm,
   DynamicHeightTextInputForm,
   LinkInputForm,
   SelectWithSearchForm,
   StatusSelectForm,
   TextAreaForm,
} from 'src/components/shared/ui/form-field-elements';
import { DialogFooter } from '../../primitives/Dialog';
import { Button } from '../../primitives/Button';
import { CircleCheck, ClipboardX, Pencil, Trash2 } from 'lucide-react';
import {
   useCreateEvent,
   useDeleteEvent,
   useEditEvent,
   useEventApi,
} from '@/lib/api/event-api';
import { FormDialogState } from 'src/lib/types/form-dialog.types';
import { eventStatusSelections } from '../../helpers/constants/selections';
import useDialogStore from '@/lib/zustand/dialog-store';
import { CreateEventDto } from '@types';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { useTaskApi } from '@/lib/api/task-api';
import { taskStatusSelections } from '@/components/shared/ui/helpers/constants/selections';
import type { Task, CreateTaskDto, EditTaskDto, TaskStatus, Event } from '@types';
import { Label } from '@/components/shared/ui/form-field-elements/Label';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';
import { ApiLoadingState } from 'src/components/shared/ui/dialogs/form-dialog/dialog-elements.type';
import {
   DiscardButton,
   SubmitButton,
} from '@/components/shared/ui/dialogs/form-dialog/FormButton';
import { ProjectField } from '@/components/shared/ui/dialogs/form-dialog/TaskDialog';


export const EventDialog = ({
   formMethods,
}: {
   formMethods: UseFormReturn;
}) => {
   const { createEvent, deleteEvent, editEvent } = useEventApi();
   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const setConfirmationDialogState = useConfirmationDialogStore(
      (state) => state.setConfirmationDialogState
   );

   const eventData = formDialogState.data as Event;

   const [isApiLoading, setIsApiLoading] = useState<ApiLoadingState>({
         isLoading: false,
         type: 'discard',
      });

      const {
         handleSubmit,
         formState: { isDirty },
      } = formMethods;

      const handleDialogClose = () => {
         setFormDialogState((prev) => {
            return {
               ...prev,
               isOpen: false,
            };
         });
         setConfirmationDialogState((prev) => {
            return {
               ...prev,
               isOpen: false,
            };
         });
      };

   const onSubmit: SubmitHandler<NewEventPayload> = (data) => {
      console.log('data', data)
   };

   const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      deleteEvent.mutate(eventData.id);
   };

   return (
        <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
              <div className="px-5 py-3 flex flex-col gap-3">
                 <DynamicHeightTextInputForm
                    formMethods={formMethods}
                    fieldName="name"
                    required={true}
                    errorMessage="Please name your task"
                    placeholder="What do you need to do?"
                 />
                 <TagField />
                 <div className="flex leading-tight">
                    <div className="w-1/2">
                       <Label>Status</Label>
                       <StatusSelectForm
                          formMethods={formMethods}
                          selection={eventStatusSelections}
                          fieldName="status"
                       />
                    </div>
                    <div className="w-1/2">
                       <Label className="pb-0">Due Date</Label>
                       <DateTimePickerForm
                          formMethods={formMethods}
                          fieldName="dueAt"
                          required={true}
                          errorMessage="Please select deadline"
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
                       className="min-h-14 h-14 max-h-52"
                    />
                 </div>
                 <div className="w-full">
                    <Label>Link</Label>
                    <LinkInputForm formMethods={formMethods} fieldName="link" />
                 </div>
              </div>
              <DialogFooter>
                 <div className="flex justify-between p-4">
                    <DiscardButton
                       isApiLoading={isApiLoading}
                       formDialogState={formDialogState}
                       action={handleDelete}
                       setIsApiLoading={setIsApiLoading}
                    />
                    <SubmitButton
                       formDialogState={formDialogState}
                       formMethods={formMethods}
                       isApiLoading={isApiLoading}
                       setIsApiLoading={setIsApiLoading}
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
