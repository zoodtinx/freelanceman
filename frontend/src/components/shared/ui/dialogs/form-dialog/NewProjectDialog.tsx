import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import TextareaForm from '@/components/shared/ui/form-field-elements/TextareaForm';
import StatusSelect from '../../form-field-elements/StatusSelectForm';
import TaskNameInput from 'src/components/shared/ui/form-field-elements/DynamicInputForm';
import { DialogFooter } from '../../primitives/Dialog';
import { Button } from '../../primitives/Button';
import { CircleCheck, ClipboardX, Package, Pencil, PencilRuler, Trash2, UserRound } from 'lucide-react';
import { FormDialogState } from 'src/lib/types/form-dialog.types';
import useDialogStore from '@/lib/zustand/dialog-store';
import { ClientSearchOption, CreateProjectDto } from '@types';
import { paymentStatusSelections, projectStatusSelections } from '@/components/shared/ui/helpers/constants/selections';
import SelectWithApiSearchForm from '@/components/shared/ui/form-field-elements/SelectWithApiSearchForm';
import { useClientSelectionQuery } from '@/lib/api/client-api';
import { debounce } from 'lodash';

const NewProjectDialog = () => {
   const { formDialogState, setFormDialogState } = useDialogStore();
   const eventData = formDialogState.data as CreateProjectDto
   const [searchTerm, setSearchTerm] = useState<ClientSearchOption>({})
   const {data: clientsData, isLoading} = useClientSelectionQuery(searchTerm)

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

   const searchClient = debounce((value: string) => {
      console.log('value', value);
      setSearchTerm({ name: value });
   }, 300);
   
   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="px-5 py-3 flex flex-col gap-3">
            <TaskNameInput
               formMethods={formMethods}
               dialogState={formDialogState}
            />
            <div className="w-full">
               <p className="text-secondary">Client</p>
               <SelectWithApiSearchForm
                  formMethods={formMethods}
                  isLoading={isLoading}
                  selection={clientsData}
                  fieldName='clientId'
                  placeholder='Select a client'
                  dialogState={formDialogState}
                  ApiSearchFn={searchClient}
                  className='border-0 p-0 text-md'
               />
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
            <AddButtonGroup />
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

const AddButtonGroup = () => {
   const handleAddAsset = () => {};
   const handleAddDraft = () => {};
   const handleAddContact = () => {};

   const buttonConfig = [
      { icon: Package, label: 'Add Asset', handleClick: handleAddAsset },
      { icon: PencilRuler, label: 'Add Draft', handleClick: handleAddDraft },
      { icon: UserRound, label: 'Add Contact', handleClick: handleAddContact }
   ];

   const buttons = buttonConfig.map((data, index) => (
      <div key={index} className="cursor-default select-none border border-transparent hover:border-primary transition-colors duration-75 flex w-1/3 h-[65px] rounded-xl bg-foreground p-2 gap-1" onClick={data.handleClick}>
         <data.icon className="w-5 h-5" />
         <p>{data.label}</p>
      </div>
   ));

   return <div className="w-full flex gap-[5px]">{buttons}</div>;
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

export default NewProjectDialog;
