import { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import {
   DateTimePickerForm,
   DynamicHeightTextInputForm,
   LinkInputForm,
   StatusSelectForm,
   TextAreaForm,
} from 'src/components/shared/ui/form-field-elements';
import {
   useCreateEvent,
   useDeleteEvent,
   useEditEvent,
} from '@/lib/api/event-api';
import { FormDialogProps } from 'src/lib/types/form-dialog.types';
import { eventStatusSelections } from '../../helpers/constants/selections';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';
import { ProjectField } from '@/components/shared/ui/dialogs/form-dialog/TaskDialog';
import { Label } from '@/components/shared/ui/form-field-elements/Label';
import { EventPayload } from 'freelanceman-common/src/schemas';
import { ApiLoadingState } from '@/lib/types/form-element.type';
import { CreateEventDto, EditEventDto, EventStatus } from 'freelanceman-common';
import { handleDelete } from '@/components/shared/ui/dialogs/form-dialog/helper/handle-delete';
import FormDialogFooter from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';

export const EventDialog = ({
   formMethods,
   handleEscapeWithChange,
}: FormDialogProps) => {
   // button loading state
   const [isApiLoading, setIsApiLoading] = useState<ApiLoadingState>({
      isLoading: false,
      type: 'submit',
   });

   // form utilities
   const { handleSubmit, setValue } = formMethods;

   // dialogs setup
   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const setConfirmationDialogState = useConfirmationDialogStore(
      (state) => state.setConfirmationDialogState
   );

   // api setup
   const errorCallback = (err: Error) => setValue('mutationError', err.message);
   const successCallback = () => {
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
   const editEvent = useEditEvent({ errorCallback, successCallback });
   const deleteEvent = useDeleteEvent({ errorCallback, successCallback });
   const createEvent = useCreateEvent({ errorCallback, successCallback });

   // submit handler
   const onSubmit = (data: EventPayload) => {
      if (formDialogState.mode === 'create') {
         setIsApiLoading({ isLoading: true, type: 'submit' });
         const payload: CreateEventDto = {
            name: data.name,
            projectId: data.projectId,
            details: data.details,
            dueAt: data.dueAt,
            link: data.link,
            status: data.status,
         } as CreateEventDto;
         createEvent.mutate(payload);
         setIsApiLoading({ isLoading: false, type: 'submit' });
      } else if (formDialogState.mode === 'edit') {
         setIsApiLoading({ isLoading: true, type: 'submit' });
         const payload: EditEventDto = {
            id: data.id,
            name: data.name,
            details: data.details,
            dueAt: data.dueAt,
            link: data.link,
            status: data.status as EventStatus,
         } as EditEventDto;
         editEvent.mutate(payload);
         setIsApiLoading({ isLoading: false, type: 'submit' });
      }
   };

   // discard/delete handler
   const handleLeftButtonClick = async () => {
      if (formDialogState.mode === 'create') {
         handleEscapeWithChange();
      } else if (formDialogState.mode === 'edit') {
         setIsApiLoading({ isLoading: true, type: 'destructive' });
         handleDelete({
            mutateApi: deleteEvent,
            payload: formDialogState.data.id,
            setFormDialogState: setFormDialogState,
            openConfirmDialog: true,
            setConfirmationDialogState: setConfirmationDialogState,
            confirmDialogData: {
               type: 'delete',
               entityName: formDialogState.data.name,
               dialogRequested: {
                  mode: 'edit',
                  type: 'event',
               },
            },
         });
         setIsApiLoading({ isLoading: false, type: 'destructive' });
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
            {/* <TagField /> */}
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
         <FormDialogFooter
            formDialogState={formDialogState}
            formMethods={formMethods}
            isApiLoading={isApiLoading}
            onDiscard={handleLeftButtonClick}
         />
      </form>
   );
};

// const TagField = ({ formMethods }) => {
//    const tags = ['Meeting', 'Day', 'Impact Arena'];
//    const color = '#FCEEE2';

//    const tagsDisplay = tags.map((tag) => {
//       return (
//          <div
//             key={tag}
//             className="text-sm font-medium px-2 py-1 rounded-full"
//             style={{ backgroundColor: color }}
//          >
//             {tag}
//          </div>
//       );
//    });

//    return <div className="flex gap-1 flex-wrap">{tagsDisplay}</div>;
// };
