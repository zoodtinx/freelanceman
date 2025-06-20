import { FieldValues, SubmitHandler } from 'react-hook-form';
import {
   DateTimePickerForm,
   LinkInputForm,
   TextAreaForm,
} from 'src/components/shared/ui/form-field-elements';
import { FormDialogProps } from 'src/lib/types/form-dialog.types';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { ProjectField } from '@/components/shared/ui/dialogs/form-dialog/TaskDialog';
import { Label } from '@/components/shared/ui/form-field-elements/Label';
import {
   CreateEventDto,
   EditEventDto,
   EventFindManyItem,
} from 'freelanceman-common';
import FormDialogFooter from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';
import { CrudApi } from '@/lib/api/api.type';
import { formatDueAt } from '@/components/shared/ui/helpers/Helpers';
import HeadlineTextInputForm from '@/components/shared/ui/form-field-elements/HeadlineTextInput';
import { TagsInputForm } from '@/components/shared/ui/form-field-elements/TagsInputForm';
import { useCreateEvent } from '@/lib/api/event-api';

export const EventDialog = ({
   formMethods,
   crudApi,
   handleLeftButtonClick,
}: FormDialogProps) => {
   // form utilities
   const { handleSubmit } = formMethods;

   //dialog state
   const { formDialogState, setFormDialogState } = useFormDialogStore();

   // api setup
   const { editEvent } = crudApi as CrudApi['event'];

   const createEvent = useCreateEvent({
      enableOptimisticUpdate: true,
   });

   // submit handler
   const onSubmit = (data: EventFindManyItem) => {
      const formattedDueAt = formatDueAt(data.dueAt! ?? '');

      if (formDialogState.mode === 'create') {
         const payload: CreateEventDto = {
            name: data.name,
            projectId: data.projectId,
            details: data.details,
            dueAt: formattedDueAt!,
            link: data.link,
            isWithTime: data.isWithTime,
            tags: data.tags,
         };
         createEvent.mutate(payload);
         setFormDialogState((prev) => {
            return {
               ...prev,
               isOpen: false,
            };
         });
      } else if (formDialogState.mode === 'edit') {
         const payload: EditEventDto = {
            id: data.id,
            name: data.name,
            details: data.details,
            dueAt: formattedDueAt,
            link: data.link,
            isWithTime: data.isWithTime,
         };
         editEvent.mutate(payload);
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
         <div className="px-4 pt-3 pb-4 flex flex-col gap-3">
            <HeadlineTextInputForm
               formMethods={formMethods}
               fieldName="name"
               required={true}
               errorMessage="Please name your task"
               placeholder="What do you need to do?"
            />
            {/* <TagField /> */}
            <div className="flex leading-tight">
               {/* <div className="w-1/2">
                  <Label>Status</Label>
                  <StatusSelectForm
                     formMethods={formMethods}
                     selection={eventStatusSelections}
                     fieldName="status"
                  />
               </div> */}
               <div className="w-1/2">
                  <Label className="pb-1">Due Date</Label>
                  <DateTimePickerForm
                     formMethods={formMethods}
                     fieldName="dueAt"
                     required={true}
                     errorMessage="Please select deadline"
                  />
               </div>
            </div>
            {formDialogState.openedOn !== 'projectPage' && (
               <ProjectField
                  formMethods={formMethods}
                  formDialogState={formDialogState}
               />
            )}
            <div className="w-full">
               <Label>Tags</Label>
               <TagsInputForm fieldName="tags" formMethods={formMethods} />
            </div>
            <div className="w-full">
               <Label>Details</Label>
               <TextAreaForm
                  formMethods={formMethods}
                  fieldName="details"
                  placeholder="Describe the task"
                  className="min-h-[90px] h-[90px] max-h-52"
               />
            </div>
            <div className="w-full">
               <Label>Link</Label>
               <LinkInputForm formMethods={formMethods} fieldName="link" />
            </div>
         </div>
         <FormDialogFooter
            formMethods={formMethods}
            onDiscard={handleLeftButtonClick}
         />
      </form>
   );
};
