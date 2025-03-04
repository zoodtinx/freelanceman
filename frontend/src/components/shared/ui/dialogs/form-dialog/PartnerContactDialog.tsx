import React, { useState } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { Contact, CreateClientContactDto, EditClientContactDto } from '@types';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import {
   DynamicHeightTextInputForm,
   SelectWithSearchForm,
   TextAreaForm,
   TextInputForm,
   AvatarInputForm,
   Label,
} from 'src/components/shared/ui/form-field-elements';
import { FormDialogProps } from '@/lib/types/form-dialog.types';
import { useClientContactApi } from '@/lib/api/contact-api';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { FormDialogFooter } from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';
import { ApiLoadingState } from '@/lib/types/form-element.type';

export const PartnerContactDialog = ({
   formMethods,
   handleEscapeWithChange,
}: FormDialogProps) => {
   const { createClientContact, deleteClientContact, editClientContact } =
      useClientContactApi();
   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const setConfirmationDialogState = useConfirmationDialogStore(
      (state) => state.setConfirmationDialogState
   );
   const contactData = formDialogState.data as Contact;

   const [color, setColor] = useState('');
   const [isApiLoading, setIsApiLoading] = useState<ApiLoadingState>({
      isLoading: false,
      type: 'discard',
   });

   const {
      handleSubmit,
      reset,
      register,
      getValues,
      formState: { isDirty },
   } = formMethods;

   const handleDialogClose = () => {
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

   const handleDelete = () => {
      setFormDialogState((prev) => ({ ...prev, isOpen: false }));
      setConfirmationDialogState({
         isOpen: true,
         actions: {
            primary: () => deleteClientContact.mutate(contactData.id),
         },
         message: contactData.name,
         type: 'delete',
         dialogRequested: {
            mode: 'edit',
            type: 'client-contact',
         },
      });
   };

   const handleLeftButtonClick = () => {
      if (formDialogState.mode === 'create') {
         handleEscapeWithChange();
      } else if (formDialogState.mode === 'edit') {
         handleDelete()
      }
   };

   const onSubmit: SubmitHandler<CreateClientContactDto> = (data) => {
      if (!isDirty) {
         return;
      }
   
      setIsApiLoading({ isLoading: true, type: 'submit' });
   
      if (formDialogState.mode === 'create') {
         const payload: CreateClientContactDto = {
            name: data.name,
            companyId: data.companyId,
            role: data.role,
            phoneNumber: data.phoneNumber,
            email: data.email,
            detail: data.detail,
            avatar: data.avatar,
         };
         createClientContact.mutate(payload);
      } else if (formDialogState.mode === 'edit') {
         const payload: EditClientContactDto = {
            name: data.name,
            role: data.role,
            phoneNumber: data.phoneNumber,
            email: data.email,
            details: data.detail,
            avatar: data.avatar,
         };
         editClientContact.mutate({
            clientContactId: formDialogState.data.id,
            clientContactPayload: payload
         });
      }
   
      setIsApiLoading({ isLoading: false, type: 'submit' });
      handleDialogClose();
   };
   

   return (
      <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
         <div className="bg-background rounded-2xl text-primary">
            <div className="flex flex-col p-5 pt-3 gap-2">
               <div className="flex w-full gap-3 justify-between">
                  <div className="flex flex-col w-3/5 gap-2">
                     <div className="flex flex-col leading-5">
                        <Label>Name</Label>
                        <DynamicHeightTextInputForm
                           formMethods={formMethods}
                           fieldName="name"
                           required={true}
                           errorMessage="Please enter a name"
                           placeholder="Contact Name"
                           isWithIcon={false}
                           className="text-lg"
                        />
                     </div>
                     <div className="flex flex-col leading-5">
                        <Label className="w-[80px] text-secondary">
                           Company
                        </Label>
                        {formDialogState.mode === 'edit' && (
                           <p className="text-md">
                              {formMethods.getValues('company')}
                           </p>
                        )}
                        {formDialogState.mode !== 'edit' && (
                           <SelectWithSearchForm
                              formMethods={formMethods}
                              fieldName="company"
                              type="client"
                              placeholder="Select Company"
                              className='text-md'
                           />
                        )}
                     </div>
                     <div className="flex flex-col leading-5">
                        <Label className="w-[80px] text-secondary">Role</Label>
                        <TextInputForm
                           formMethods={formMethods}
                           fieldName="role"
                           placeholder="Describe this contact."
                        />
                     </div>
                  </div>
                  <AvatarInputForm
                     fieldName="avatar"
                     formMethods={formMethods}
                     dialogState={formDialogState}
                  />
               </div>
               <Separator className="my-2" />
               <div className="flex w-full gap-2">
                  <div className="flex flex-col w-1/2">
                     <Label className="text-secondary w-full">
                        Phone Number
                     </Label>
                     <TextInputForm
                        formMethods={formMethods}
                        fieldName="phoneNumber"
                     />
                  </div>
                  <div className="flex flex-col w-1/2">
                     <Label className="text-secondary w-full">Email</Label>
                     <TextInputForm
                        formMethods={formMethods}
                        fieldName="email"
                     />
                  </div>
               </div>
               <Separator className="my-2" />
               <div>
                  <Label className="text-secondary w-full">Info</Label>
                  <TextAreaForm
                     formMethods={formMethods}
                     fieldName="details"
                     placeholder="Describe this contact."
                  />
               </div>
            </div>
            <FormDialogFooter
               formDialogState={formDialogState}
               formMethods={formMethods}
               isApiLoading={isApiLoading}
               destructiveButtonAction={handleLeftButtonClick}
               setIsApiLoading={setIsApiLoading}
            />
         </div>
      </form>
   );
};
