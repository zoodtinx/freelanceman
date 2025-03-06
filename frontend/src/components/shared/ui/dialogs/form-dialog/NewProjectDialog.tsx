import React, { useState } from 'react';
import { TextAreaForm } from 'src/components/shared/ui/form-field-elements';
import { CircleCheck, Package, Plus, UserRound } from 'lucide-react';
import { FormDialogProps } from 'src/lib/types/form-dialog.types';
import useDialogStore from '@/lib/zustand/dialog-store';
import { CreateProjectDto } from '@types';
import {
   paymentStatusSelections,
   projectStatusSelections,
} from '@/components/shared/ui/helpers/constants/selections';
import { SelectObject } from '@/lib/types/selector-dialog.types';
import {
   SelectWithSearchForm,
   DynamicHeightTextInputForm,
   StatusSelectForm,
} from 'src/components/shared/ui/form-field-elements';
import { useProjectApi } from '@/lib/api/project-api';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { FormDialogFooter } from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';
import { ApiLoadingState } from '@/lib/types/form-element.type';
import { Label } from '@/components/shared/ui/form-field-elements/Label';

export const NewProjectDialog = ({
   formMethods,
   handleEscapeWithChange,
}: FormDialogProps) => {
   const { createProject } = useProjectApi();
   const { formDialogState } = useFormDialogStore();

   const [haveNote, setHaveNote] = useState(false);
   const [isApiLoading, setIsApiLoading] = useState<ApiLoadingState>({
      isLoading: false,
      type: 'discard',
   });

   const { handleSubmit } = formMethods;

   const handleDiscard = async () => {
      handleEscapeWithChange();
   };

   const onSubmit = (data: any) => {
      const createProjectPayload: CreateProjectDto = {
         title: data.title,
         clientId: data.clientId,
         projectStatus: data.projectStatus,
         paymentStatus: data.paymentStatus,
         contacts: data.contacts ?? [],
         workingFiles: data.workingFiles ?? [],
         assetFiles: data.assetFiles ?? [],
      };
      createProject.mutate(createProjectPayload);
   };

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
               <Label>Client</Label>
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
                  <Label>Project Status</Label>
                  <StatusSelectForm
                     formMethods={formMethods}
                     fieldName="projectStatus"
                     selection={projectStatusSelections}
                  />
               </div>
               <div className="w-1/2">
                  <Label>Payment Status</Label>
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
   const { formDialogState, setFormDialogState, setSelectorDialogState } =
      useDialogStore();
   const [addedAsset, setAddedAsset] = useState<SelectObject[]>([]);
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
            isOpen: false,
         };
      });
   };
   const handleAddContact = () => {};

   const buttonConfig = [
      { icon: Package, label: 'Add Asset', handleClick: handleAddAsset },
      { icon: UserRound, label: 'Add Contact', handleClick: handleAddContact },
   ];

   const buttons = buttonConfig.map((data, index) => (
      <div
         key={index}
         className="cursor-default select-none border border-transparent hover:border-primary transition-colors duration-75 flex flex-1 h-[60px] rounded-xl bg-foreground p-2 gap-1"
         onClick={data.handleClick}
      >
         <data.icon className="w-5 h-5" />
         <p>{data.label}</p>
      </div>
   ));

   return <div className="w-full flex gap-[5px]">{buttons}</div>;
};
