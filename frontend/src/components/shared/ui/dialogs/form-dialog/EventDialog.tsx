import React, { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import {
   DateTimePickerForm,
   DynamicHeightTextInputForm,
   LinkInputForm,
   StatusSelectForm,
   TextAreaForm,
} from 'src/components/shared/ui/form-field-elements';
import { DialogFooter } from '../../primitives/Dialog';
import { useEventApi } from '@/lib/api/event-api';
import { FormDialogProps } from 'src/lib/types/form-dialog.types';
import { eventStatusSelections } from '../../helpers/constants/selections';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';
import { ApiLoadingState } from 'src/components/shared/ui/dialogs/form-dialog/dialog-elements.type';
import {
   DiscardButton,
   SubmitButton,
} from '@/components/shared/ui/dialogs/form-dialog/FormButton';
import { ProjectField } from '@/components/shared/ui/dialogs/form-dialog/TaskDialog';
import type { CreateEventDto, EditEventDto, Event, EventStatus } from '@types';
import { Label } from '@/components/shared/ui/form-field-elements/Label';

export const EventDialog = ({
   formMethods,
   handleEscapeWithChange,
}: FormDialogProps) => {
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

   const onSubmit: SubmitHandler<CreateEventDto> = (data) => {
      if (!isDirty) {
         return;
      }

      setIsApiLoading({ isLoading: true, type: 'submit' });

      if (formDialogState.mode === 'create') {
         const payload: CreateEventDto = {
            name: data.name,
            status: data.status,
            projectId: data.projectId,
            clientId: data.clientId,
            dueAt: data.dueAt,
            details: data.details,
            link: data.link,
            tags: data.tags,
         };
         createEvent.mutate(payload);
      } else if (formDialogState.mode === 'edit') {
         const payload: EditEventDto = {
            name: data.name,
            status: data.status as EventStatus,
            dueAt: data.dueAt,
            link: data.link,
            details: data.details,
            tags: data.tags,
         };
         editEvent.mutate({
            eventId: formDialogState.data.id,
            eventPayload: payload,
         });
      }

      setIsApiLoading({ isLoading: false, type: 'submit' });
      handleDialogClose();
   };

   const handleLeftButtonClick = async () => {
      if (formDialogState.mode === 'create') {
         handleEscapeWithChange();
      } else if (formDialogState.mode === 'edit') {
         deleteEvent.mutate(eventData.id);
      }
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
                  action={handleLeftButtonClick}
                  setIsApiLoading={setIsApiLoading}
                  formMethods={formMethods}
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
