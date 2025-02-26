import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { EditProjectDto, Project } from '@types';
import TaskNameInput from 'src/components/shared/ui/form-field-elements/TaskNameInput';
import { DialogFooter } from '../../primitives/Dialog';
import { Button } from '../../primitives/Button';
import { CircleCheck, ClipboardX, Pencil, Trash2 } from 'lucide-react';
import { useCreateEvent, useDeleteEvent, useEditEvent } from '@/lib/api/event-api';
import { FormDialogState } from 'src/lib/types/form-dialog.types';
import useDialogStore from '@/lib/zustand/dialog-store';
import { paymentStatusSelections, projectStatusSelections } from '@/components/shared/ui/helpers/constants/selections';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { formatDate, formatTime } from '@/lib/helper/formatDateTime';

import { AutoClientField, DateTimePickerForm, DynamicHeightTextInputForm, LinkInputForm, SelectWithSearchForm, StatusSelectForm, TextAreaForm, } from 'src/components/shared/ui/form-field-elements';

const ProjectDialog = ({formMethods}:{formMethods: UseFormReturn}) => {
   const { formDialogState, setFormDialogState, setConfirmationDialogState } = useDialogStore();
   const projectData = formDialogState.data as Project

   const { mutate: editEvent, isPending: editingEvent } = useEditEvent(
      formDialogState.data
   );
   const { mutate: createEvent, isPending: creatingEvent } = useCreateEvent();
   const { mutate: deleteEvent, isPending: deletingEvent } = useDeleteEvent();

   const formMethods = useForm<Project>({
      defaultValues: projectData,
   });

   const { handleSubmit, reset } = formMethods;

   const handleDialogClose = () => {
      console.log('close');
   };

   const onSubmit: SubmitHandler<EditProjectDto> = (data) => {
      const payload: EditProjectDto = {
         title: 'check'
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

   console.log('watched title', formMethods.watch('title'))

   const handleDeleteProject = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: false
         }
      })
      setConfirmationDialogState((prev) => {
         return {
            ...prev,
            isOpen: true,
            message: () => {
               return (
                  <>
                     <p>Are you sure you want to delete</p>
                     <p className="font-semibold">{projectData.title} ?</p>
                  </>
               );
            },
            openedFrom: 'project-settings',
            type: 'delete',
         };
      })
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="px-5 py-3 flex flex-col gap-3">
            <DynamicHeightTextInputForm
               formMethods={formMethods}
               fieldName='title'
               required={true}
               errorMessage='Please name your project'
               placeholder='Project Title'
            />
            <div className="flex leading-tight">
               <div className="w-1/2">
                  <p className="text-secondary pb-1">Project Status</p>
                  <StatusSelectForm
                     formMethods={formMethods}
                     selection={projectStatusSelections}
                     fieldName="projectStatus"
                  />
               </div>
               <div className="w-1/2">
                  <p className="text-secondary  pb-1">Payment Status</p>
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
                  <p className="text-secondary">Client</p>
                  <p className="text-md leading-tight">
                     {formMethods.getValues('client')}
                  </p>
               </div>
               <div className="flex leading-tight">
                  <div className="w-1/2">
                     <p className="text-secondary">Date Created</p>
                     <p>
                        {formatDate(formMethods.getValues('createdAt'), 'LONG')}
                     </p>
                     <p className="text-sm">
                        {formatTime(formMethods.getValues('createdAt'))}
                     </p>
                  </div>
                  <div className="w-1/2">
                     <p className="text-secondary">Last Update</p>
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
               <Button
                  variant={'destructiveOutline'}
                  size={'sm'}
                  onClick={handleDeleteProject}
               >
                  Delete Project
               </Button>
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

export default ProjectDialog;
