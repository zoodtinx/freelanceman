import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';
import {
   DateTimePickerForm,
   DynamicHeightTextInputForm,
   LinkInputForm,
   StatusSelectForm,
   TextAreaForm,
} from 'src/components/shared/ui/form-field-elements';
import { FormDialogProps } from 'src/lib/types/form-dialog.types';
import { eventStatusSelections } from '../../helpers/constants/selections';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { ProjectField } from '@/components/shared/ui/dialogs/form-dialog/TaskDialog';
import { Label } from '@/components/shared/ui/form-field-elements/Label';
import { EventPayload } from 'freelanceman-common/src/schemas';
import { CreateEventDto, EditEventDto, EventStatus } from 'freelanceman-common';
import FormDialogFooter from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';
import { CrudApi } from '@/lib/api/api.type';
import { formatDueAt } from '@/components/shared/ui/helpers/Helpers';

export const EventDialog = ({
   formMethods,
   buttonLoadingState,
   crudApi,
   handleLeftButtonClick,
}: FormDialogProps) => {
   // button loading state
   const { isApiLoading, setIsApiLoading } = buttonLoadingState;

   // form utilities
   const { handleSubmit } = formMethods;

   //dialog state
   const { formDialogState } = useFormDialogStore();

   // api setup
   const { createEvent, editEvent } = crudApi as CrudApi['event'];

   // submit handler
   const onSubmit = (data: EventPayload) => {
      const formattedDueAt = formatDueAt(data.dueAt)

      if (formDialogState.mode === 'create') {
         setIsApiLoading({ isLoading: true, type: 'submit' });
         const payload: CreateEventDto = {
            name: data.name,
            projectId: data.projectId,
            details: data.details,
            dueAt: formattedDueAt,
            link: data.link,
            status: data.status,
            isWithTime: data.isWithTime
         } as CreateEventDto;
         createEvent.mutate(payload);
         setIsApiLoading({ isLoading: false, type: 'submit' });
      } else if (formDialogState.mode === 'edit') {
         setIsApiLoading({ isLoading: true, type: 'submit' });
         const payload: EditEventDto = {
            id: data.id,
            name: data.name,
            details: data.details,
            dueAt: formattedDueAt,
            link: data.link,
            status: data.status as EventStatus,
            isWithTime: data.isWithTime
         } as EditEventDto;
         editEvent.mutate(payload);
         setIsApiLoading({ isLoading: false, type: 'submit' });
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
            {formDialogState.openedOn !== 'project-page' && (
               <ProjectField
                  formMethods={formMethods}
                  formDialogState={formDialogState}
               />
            )}
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
               <LinkInputForm
                  formMethods={formMethods}
                  fieldName="link"
               />
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
