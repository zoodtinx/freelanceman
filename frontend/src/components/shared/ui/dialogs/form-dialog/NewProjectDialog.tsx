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
import { useProjectApi } from '@/lib/api/project-api';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { DiscardButton, SubmitButton } from '@/components/shared/ui/dialogs/form-dialog/FormButton';
import { FormDialogFooter } from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';

export const NewProjectDialog = ({formMethods}:{formMethods: UseFormReturn}) => {
   const { createProject } = useProjectApi()
   const { formDialogState, setFormDialogState } = useFormDialogStore();

   const [searchTerm, setSearchTerm] = useState<ClientSearchOption>({})
   const {data: clientsData, isLoading} = useClientSelectionQuery(searchTerm)
   const setConfirmationDialogState = useConfirmationDialogStore(
      (state) => state.setConfirmationDialogState
   );
   
   const [haveNote, setHaveNote] = useState(false)
   const [isApiLoading, setIsApiLoading] = useState<ApiLoadingState>({
         isLoading: false,
         type: 'discard',
      });

   const [addedAsset, setAddedAsset] = useState<string[]>([])
   const [addedContact, setAddedContact] = useState<string[]>([])

   const { handleSubmit, reset } = formMethods;

   const searchClient = debounce((value: string) => {
      console.log('triggered')
      setSearchTerm({ name: value });
   }, 300);

   const handleDiscard = async () => {
      console.log('discard')
   }

   const onSubmit = () => {
      console.log('submitting')
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="px-5 py-3 flex flex-col gap-2">
            <DynamicHeightTextInputForm
               formMethods={formMethods}
               required={true}
               errorMessage="Please enter project name"
               className="pt-1"
               fieldName="title"
               placeholder="Enter project name"
            />
            <div className="w-full">
               <p className="text-secondary">Client</p>
               <SelectWithSearchForm
                  formMethods={formMethods}
                  fieldName="clientId"
                  placeholder="Select a client"
                  type="client"
                  size="base"
                  errorMessage="Please select a client"
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
                  />
               </div>
               <div className="w-1/2">
                  <p className="text-secondary mb-1">Payment Status</p>
                  <StatusSelectForm
                     formMethods={formMethods}
                     fieldName="paymentStatus"
                     selection={paymentStatusSelections}
                  />
               </div>
            </div>
            {!haveNote ? (
               <div
                  onClick={() => setHaveNote(true)}
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
                     fieldName="details"
                     className="h-[100px] bg-transparent pt-1 border-secondary mt-1"
                  />
               </div>
            )}
            <AddButtonGroup />
         </div>
         <FormDialogFooter
            formDialogState={formDialogState}
            formMethods={formMethods}
            isApiLoading={isApiLoading}
            destructiveButtonAction={handleDiscard}
            setIsApiLoading={setIsApiLoading}
         />
      </form>
   );
};

const AddButtonGroup = () => {
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

