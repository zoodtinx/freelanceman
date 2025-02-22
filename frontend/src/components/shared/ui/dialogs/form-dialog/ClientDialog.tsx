import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import type { Client, EditClientDto, EditProjectDto, Project } from '@types';
import StatusSelect from '../../form-field-elements/StatusSelectForm';
import TaskNameInput from 'src/components/shared/ui/form-field-elements/DynamicInputForm';
import { DialogFooter } from '../../primitives/Dialog';
import { Button } from '../../primitives/Button';
import { CircleCheck, ClipboardX, Pencil, Trash2 } from 'lucide-react';
import { useCreateEvent, useDeleteEvent, useEditEvent } from '@/lib/api/event-api';
import { FormDialogState } from 'src/lib/types/form-dialog.types';
import useDialogStore from '@/lib/zustand/dialog-store';
import { paymentStatusSelections, projectStatusSelections } from '@/components/shared/ui/helpers/constants/selections';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { formatDate, formatTime } from '@/lib/helper/formatDateTime';
import { Input } from '@/components/shared/ui/primitives/Input';
import { Textarea } from '@/components/shared/ui/primitives/Textarea';

const ClientDialog = () => {
   const { formDialogState, setFormDialogState, setConfirmationDialogState } = useDialogStore();
   const clientData = formDialogState.data as Client

   const formMethods = useForm<Client>({
      defaultValues: clientData,
   });

   const { handleSubmit, reset } = formMethods;

   const handleDialogClose = () => {
      console.log('close');
   };

   const onSubmit: SubmitHandler<EditClientDto> = (data) => {
      console.log('submitted data', data)
   };

   const handleEditMode = () => {
      console.log('edit');
   };

   const handleCancelEdit = () => {
      console.log('cancel');
   };

   console.log('watched name', formMethods.watch('name'))

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
                     <p className="font-semibold">{clientData.name} ?</p>
                  </>
               );
            },
            openedFrom: 'client-settings',
            type: 'delete',
         };
      })
   }

   const {getValues, register} = formMethods

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="px-5 py-3 flex flex-col gap-3">
            <TaskNameInput
               formMethods={formMethods}
               dialogState={formDialogState}
               placeholder="Enter client's name"
               fieldName="name"
            />
            <div className="flex flex-col gap-3">
               <div className="flex gap-2">
                  <div className="w-1/2">
                     <p className="text-secondary ">Tax ID</p>
                     {formDialogState.mode !== 'view' ? (
                        <Input variant='outline' {...register('taxId')} className='w-full p-1 px-2' />
                     ) : (
                        <p className=" font-medium">{getValues('taxId')}</p>
                     )}
                  </div>
                  <div className="w-1/2">
                     <p className="text-secondary ">Phone Number</p>
                     {formDialogState.mode !== 'view' ? (
                        <Input variant='outline' {...register('phoneNumber')} className='w-full py-1 px-2' />
                     ) : (
                        <p className=" font-medium">
                           {getValues('phoneNumber')}
                        </p>
                     )}
                  </div>
               </div>
               <div>
                  <p className="text-secondary">Email</p>
                  {formDialogState.mode !== 'view' ? (
                     <Input variant='outline' {...register('email')} className='w-full py-1 px-2' />
                  ) : (
                     <p className=" font-medium">{getValues('email')}</p>
                  )}
               </div>
               <div className="">
                  <p className="text-secondary ">Address</p>
                  {formDialogState.mode !== 'view' ? (
                     <Textarea
                        {...register('address')}
                        variant='outline'
                        className="resize-none mt-1 w-full py-1 px-2"
                        placeholder="Enter details"
                     />
                  ) : (
                     <p className=" font-medium">{getValues('address')}</p>
                  )}
               </div>
            </div>
         </div>
         <DialogFooter>
            <div className="flex justify-between p-4">
               <Button
                  variant={'destructiveOutline'}
                  size={'default'}
                  onClick={handleDeleteProject}
               >
                  Delete Client
               </Button>
               <Button
                  variant={'submit'}
                  size={'default'}
                  onClick={handleDeleteProject}
               >
                  Save Changes
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

export default ClientDialog;
