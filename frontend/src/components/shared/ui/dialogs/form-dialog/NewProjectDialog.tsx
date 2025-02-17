import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { Event } from '@types';
import TextareaForm from '@/components/shared/ui/form-field-elements/TextareaForm';
import AutoClientField from '@/components/shared/ui/form-field-elements/AutoClientField';
import DateTimePicker from 'src/components/shared/ui/form-field-elements/DateTimePickerForm';
import LinkInput from '../../form-field-elements/LinkInputForm';
import StatusSelect from '../../form-field-elements/StatusSelectForm';
import ProjectSelect from '../../form-field-elements/ProjectSelectForm';
import TaskNameInput from 'src/components/shared/ui/form-field-elements/DynamicInputForm';
import { DialogFooter } from '../../primitives/Dialog';
import { Button } from '../../primitives/Button';
import { CircleCheck, ClipboardX, File, FilePlus, Package, PackagePlus, Pencil, PencilRuler, Trash2, User2, UserPlus, UserPlus2, UserRound } from 'lucide-react';
import { useCreateEvent, useDeleteEvent, useEditEvent } from '@/lib/api/event-api';
import { FormDialogState } from 'src/lib/types/form-dialog.types';
import { eventStatusSelections } from '../../helpers/constants/constants';
import useDialogStore from '@/lib/zustand/dialog-store';
import { CreateProjectDto } from '@types';
import { Input } from '@/components/shared/ui/primitives/Input';
import { paymentStatusSelections, projectStatusSelections } from '@/components/shared/ui/helpers/constants/selections';

const NewProjectDialog = () => {
   const { formDialogState, setFormDialogState } = useDialogStore();
   const eventData = formDialogState.data as CreateProjectDto

   const formMethods = useForm<CreateProjectDto>({
      defaultValues: eventData,
   });

   const { handleSubmit, reset } = formMethods;

   const handleDialogClose = () => {
      console.log('close');
   };

   const onSubmit: SubmitHandler<CreateProjectDto> = (data) => {
      console.log('submitted')
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
            <TaskNameInput
               formMethods={formMethods}
               dialogState={formDialogState}
            />
            <div className="w-full">
               <p className="text-secondary">Client</p>
               <p className='text-md'>Sansiri PLC</p>
            </div>
            <div className="flex leading-tight">
               <div className="w-1/2">
                  <p className="text-secondary">Project Status</p>
                  <StatusSelect
                     formMethods={formMethods}
                     fieldName="projectStatus"
                     selection={projectStatusSelections}
                  />
               </div>
               <div className="w-1/2">
                  <p className="text-secondary">Payment Status</p>
                  <StatusSelect
                     formMethods={formMethods}
                     fieldName="paymentStatus"
                     selection={paymentStatusSelections}
                  />
               </div>
            </div>
            <div className="w-full mb-1">
               <p className="text-secondary">Notes</p>
               <TextareaForm
                  formMethods={formMethods}
                  dialogState={formDialogState}
                  fieldName="details"
                  className="h-[100px] bg-transparent pt-1"
               />
            </div>
            <div className='w-full flex gap-1'>
               <div className='flex w-1/3 h-[65px] rounded-xl bg-foreground p-2 gap-1'>
                  <Package className='w-5 h-5' />
                  <p>Add Asset</p>
               </div>
               <div className='flex w-1/3 h-[65px] rounded-xl bg-foreground p-2 gap-1'>
                  <PencilRuler className='w-5 h-5' />
                  <p>Add Draft</p>
               </div>
               <div className='flex w-1/3 h-[65px] rounded-xl bg-foreground p-2 gap-1'>
                  <UserRound className='w-5 h-5' />
                  <p>Add Contact</p>
               </div>
            </div>
         </div>
         <DialogFooter>
            <div className="flex justify-between p-4">
               <Button>Left</Button>
               <Button>Right</Button>
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

export default NewProjectDialog;
