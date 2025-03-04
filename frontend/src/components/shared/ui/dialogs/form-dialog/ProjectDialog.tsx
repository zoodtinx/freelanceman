import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { DialogFooter } from '../../primitives/Dialog';
import { FormDialogProps } from 'src/lib/types/form-dialog.types';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import {
   paymentStatusSelections,
   projectStatusSelections,
} from '@/components/shared/ui/helpers/constants/selections';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { formatDate, formatTime } from '@/lib/helper/formatDateTime';
import {
   DynamicHeightTextInputForm,
   Label,
   StatusSelectForm,
} from 'src/components/shared/ui/form-field-elements';
import { useProjectApi } from '@/lib/api/project-api';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';
import { EditProjectDto } from '@types';
import {
   DiscardButton,
   SubmitButton,
} from '@/components/shared/ui/dialogs/form-dialog/FormButton';

export const ProjectDialog = ({
   formMethods,
}: FormDialogProps) => {
   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const { setConfirmationDialogState } = useConfirmationDialogStore();
   const { editProject } = useProjectApi();

   const { handleSubmit } = formMethods;

   const onSubmit: SubmitHandler<EditProjectDto> = (data) => {
      const editProjectPayload: EditProjectDto = {
         title: data.title,
         projectStatus: data.projectStatus,
         paymentStatus: data.paymentStatus,
      };
      editProject.mutate({
         projectId: formDialogState.data.id,
         projectPayload: editProjectPayload,
      });
   };

   const projectTitle = formMethods.getValues('title');

   const handleDeleteButtonClick = () => {
      setFormDialogState((prev) => ({ ...prev, isOpen: false }));
      setConfirmationDialogState({
         isOpen: true,
         actions: {
            primary: () => {},
         },
         message: projectTitle,
         type: 'delete',
         dialogRequested: {
            mode: 'edit',
            type: 'project-settings',
         },
      });
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="px-5 py-3 flex flex-col gap-3">
            <DynamicHeightTextInputForm
               formMethods={formMethods}
               fieldName="title"
               required={true}
               errorMessage="Please name your project"
               placeholder="Project Title"
            />
            <div className="flex leading-tight">
               <div className="w-1/2">
                  <Label>Project Status</Label>
                  <StatusSelectForm
                     formMethods={formMethods}
                     selection={projectStatusSelections}
                     fieldName="projectStatus"
                  />
               </div>
               <div className="w-1/2">
                  <Label>Payment Status</Label>
                  <StatusSelectForm
                     formMethods={formMethods}
                     selection={paymentStatusSelections}
                     fieldName="paymentStatus"
                  />
               </div>
            </div>
            <div className="">
               <Separator />
            </div>
            <div className="flex flex-col gap-2">
               <div className="w-full">
                  <Label className="pb-0">Client</Label>
                  <p className="text-md leading-tight">
                     {formMethods.getValues('client')}
                  </p>
               </div>
               <div className="flex leading-tight">
                  <div className="w-1/2">
                     <Label className="pb-0">Date Created</Label>
                     <p>
                        {formatDate(formMethods.getValues('createdAt'), 'LONG')}
                     </p>
                     <p className="text-sm">
                        {formatTime(formMethods.getValues('createdAt'))}
                     </p>
                  </div>
                  <div className="w-1/2">
                     <Label className="pb-0">Last Update</Label>
                     <p>
                        {formatDate(
                           formMethods.getValues('modifiedAt'),
                           'LONG'
                        )}
                     </p>
                     <p className="text-sm">
                        {formatTime(formMethods.getValues('modifiedAt'))}
                     </p>
                  </div>
               </div>
            </div>
         </div>
         <DialogFooter>
            <div className="flex justify-between p-4">
               <DiscardButton
                  formDialogState={formDialogState}
                  action={handleDeleteButtonClick}
                  formMethods={formMethods}
                  deleteText="Delete Project"
               />
               <SubmitButton
                  formDialogState={formDialogState}
                  formMethods={formMethods}
               />
            </div>
         </DialogFooter>
      </form>
   );
};
