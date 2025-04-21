import React, { useState } from 'react';
import {
   TextAreaForm,
   TextInputForm,
   DynamicHeightTextInputForm,
} from 'src/components/shared/ui/form-field-elements';
import { FormDialogProps } from 'src/lib/types/form-dialog.types';
import { useCreateClient } from '@/lib/api/client-api';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import FormDialogFooter from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';
import { Label } from '@/components/shared/ui/form-field-elements/Label';
import { ApiLoadingState } from '@/lib/types/form-element.type';
import { CreateClientDto } from 'freelanceman-common';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';
import {
   ColorSelectorForm,
   ColorSelectorPopover,
} from '@/components/shared/ui/form-field-elements/ColorSelector';

export const NewClientDialog = ({
   formMethods,
   handleEscapeWithChange,
}: FormDialogProps) => {
   // button loading state
   const [isApiLoading, setIsApiLoading] = useState<ApiLoadingState>({
      isLoading: false,
      type: 'submit',
   });

   // form utilities
   const { handleSubmit, setValue } = formMethods;

   // dialogs setup
   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const setConfirmationDialogState = useConfirmationDialogStore(
      (state) => state.setConfirmationDialogState
   );

   // api setup
   const errorCallback = (err: Error) => setValue('mutationError', err.message);
   const successCallback = () => {
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
      setConfirmationDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
   };
   const createClient = useCreateClient({ errorCallback, successCallback });

   // submit handler
   const onSubmit = (data: any) => {
      setIsApiLoading({ isLoading: true, type: 'submit' });
      const createClientPayload: CreateClientDto = {
         name: data.name,
         themeColor: data.themeColor,
         taxId: data.taxId,
         email: data.email,
         phoneNumber: data.phoneNumber,
         address: data.address,
         detail: data.detail,
      };
      console.log('createClientPayload', createClientPayload);
      createClient.mutate(createClientPayload);
      setIsApiLoading({ isLoading: false, type: 'submit' });
   };

   // discard/delete handler
   const handleLeftButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      handleEscapeWithChange();
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="px-5 py-3 flex flex-col gap-2">
            <DynamicHeightTextInputForm
               formMethods={formMethods}
               fieldName="name"
               className="pt-1"
               placeholder="Enter client's name"
               required={true}
               errorMessage="Please enter client name"
            />
            <div className="flex leading-tight gap-2">
               <div className="flex flex-col grow">
                  <Label>Email</Label>
                  <TextInputForm
                     fieldName="email"
                     className="bg-transparent"
                     formMethods={formMethods}
                  />
               </div>
               <div className="flex flex-col w-2/5">
                  <Label>Phone Number</Label>
                  <TextInputForm
                     fieldName="phoneNumber"
                     className="bg-transparent"
                     formMethods={formMethods}
                  />
               </div>
            </div>
            <div className="flex flex-col grow">
               <Label>Tax ID</Label>
               <TextInputForm
                  fieldName="taxId"
                  className="bg-transparent"
                  formMethods={formMethods}
               />
            </div>
            <div className="flex flex-col grow">
               <Label>Address</Label>
               <TextAreaForm
                  fieldName="address"
                  className="bg-transparent "
                  formMethods={formMethods}
                  placeholder="Don't worry, you can add it later."
               />
            </div>
            <div className="flex flex-col grow relative">
               <Label>Theme Color</Label>
               <div className="relative">
                  <ColorSelectorForm
                     fieldName="themeColor"
                     formMethods={formMethods}
                     required={true}
                     errorMessage="Please select a color"
                  />
               </div>
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
