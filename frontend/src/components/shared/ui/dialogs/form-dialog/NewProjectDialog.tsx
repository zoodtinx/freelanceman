import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { TextAreaForm } from 'src/components/shared/ui/form-field-elements';
import { DialogFooter } from '../../primitives/Dialog';
import { Button } from '../../primitives/Button';
import { CircleCheck, ClipboardX, Package, Pencil, PencilRuler, Plus, Trash2, UserRound } from 'lucide-react';
import { FormDialogState } from 'src/lib/types/form-dialog.types';
import useDialogStore from '@/lib/zustand/dialog-store';
import { ClientSearchOption, CreateProjectDto } from '@types';
import { paymentStatusSelections, projectStatusSelections } from '@/components/shared/ui/helpers/constants/selections';
import { useClientSelectionQuery } from '@/lib/api/client-api';
import { debounce } from 'lodash';
import { SelectObject } from '@/lib/types/selector-dialog.types';

import {SelectWithSearchForm, DynamicHeightTextInputForm, StatusSelectForm } from 'src/components/shared/ui/form-field-elements';

const NewProjectDialog = ({formMethods}:{formMethods: UseFormReturn}) => {
   const { formDialogState, setFormDialogState, setSelectorDialogState } = useDialogStore();
   const [searchTerm, setSearchTerm] = useState<ClientSearchOption>({})
   const {data: clientsData, isLoading} = useClientSelectionQuery(searchTerm)
   const [isHaveNote, setIsHaveNote] = useState(false)

   const [addedAsset, setAddedAsset] = useState<string[]>([])
   const [addedContact, setAddedContact] = useState<string[]>([])

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
      console.log('triggered')
      setSearchTerm({ name: value });
   }, 300);

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="px-5 py-3 flex flex-col gap-2">
            <DynamicHeightTextInputForm
               formMethods={formMethods}
               dialogState={formDialogState}
               className="pt-1"
               fieldName='title'
               placeholder="Enter project name"
            />
            <div className="w-full">
               <p className="text-secondary">Client</p>
               <SelectWithSearchForm<CreateProjectDto>
                  formMethods={formMethods}
                  isLoading={isLoading}
                  fieldName="clientId"
                  placeholder="Select a client"
                  type='client' 
                  size='base'
                  errorMessage='Please select a client'
                  className="border-0 p-0 text-md"
                  isWithIcon
                  required
               />
            </div>
            <div className="flex leading-tight">
               <div className="w-1/2">
                  <p className="text-secondary mb-1">Project Status</p>
                  <StatusSelectForm
                     formMethods={formMethods}
                     fieldName="projectStatus"
                     selection={projectStatusSelections}
                     dialogState={formDialogState}
                  />
               </div>
               <div className="w-1/2">
                  <p className="text-secondary mb-1">Payment Status</p>
                  <StatusSelectForm
                     formMethods={formMethods}
                     fieldName="paymentStatus"
                     selection={paymentStatusSelections}
                     dialogState={formDialogState}
                  />
               </div>
            </div>
            {!isHaveNote ? (
               <div
                  onClick={() => setIsHaveNote(true)}
                  className={`border my-1 pl-1 pr-2 w-fit rounded-md flex items-center gap-1 text-secondary border-secondary
                     hover:border-primary hover:text-primary transition-colors duration-75
                     `}
               >
                  <Plus className="w-4 h-4 stroke-[2.5px]" />
                  <p>Add Notes</p>
               </div>
            ) : (
               <div className="w-full mb-1">
                  <p className="text-secondary">Notes</p>
                  <TextAreaForm
                     formMethods={formMethods}
                     dialogState={formDialogState}
                     fieldName="details"
                     className="h-[100px] bg-transparent pt-1 border-secondary mt-1"
                  />
               </div>
            )}
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

const AddButtonGroup = ({

}) => {
   const { formDialogState, setFormDialogState, setSelectorDialogState } = useDialogStore();
   const [addedAsset, setAddedAsset] = useState<SelectObject[]>([])
   const handleAddAsset = () => {
      setSelectorDialogState({
         isOpen: true,
         type: 'file',
         selected: addedAsset,
         setSelected: (items: SelectObject[]) => {
            console.log('triggered');
            setAddedAsset(items);
         },
      });
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen:false
         }
      })
   };
   const handleAddContact = () => {};

   const buttonConfig = [
      { icon: Package, label: 'Add Asset', handleClick: handleAddAsset },
      { icon: UserRound, label: 'Add Contact', handleClick: handleAddContact }
   ];

   const buttons = buttonConfig.map((data, index) => (
      <div key={index} className="cursor-default select-none border border-transparent hover:border-primary transition-colors duration-75 flex flex-1 h-[60px] rounded-xl bg-foreground p-2 gap-1" onClick={data.handleClick}>
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
