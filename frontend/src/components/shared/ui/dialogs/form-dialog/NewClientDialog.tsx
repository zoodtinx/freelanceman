import { useState } from 'react';
import {
   TextAreaForm,
   TextInputForm,
   DynamicHeightTextInputForm,
} from 'src/components/shared/ui/form-field-elements';
import { ApiLoadingState, FormDialogProps } from 'src/lib/types/form-dialog.types';
import FormDialogFooter from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';
import { Label } from '@/components/shared/ui/form-field-elements/Label';
import { CreateClientDto } from 'freelanceman-common';
import {
   ColorSelectorForm,
} from '@/components/shared/ui/form-field-elements/ColorSelector';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { CrudApi } from '@/lib/api/api.type';

export const NewClientDialog = ({
   crudApi,
   formMethods,
   handleLeftButtonClick
}: FormDialogProps) => {
   // api setup
   const { createClient } = crudApi as CrudApi['client'];
   
   // button loading state
   const [isApiLoading, setIsApiLoading] = useState<ApiLoadingState>({
      isLoading: false,
      type: 'submit',
   });

   // form utilities
   const { handleSubmit } = formMethods;

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

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="px-5 pt-3 pb-5 flex flex-col gap-2">
            <DynamicHeightTextInputForm
               formMethods={formMethods}
               fieldName="name"
               className="pt-1"
               placeholder="Enter client's name"
               required={true}
               errorMessage="Please enter client name"
            />
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
            <Separator className='mt-2 mb-1' />
            <p className='text-md'>
               Client Details{' '}
               <span className="text-base text-secondary">Don't worry, you can add it later.</span>
            </p>
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
         </div>
         <FormDialogFooter
            formMethods={formMethods}
            isApiLoading={isApiLoading}
            onDiscard={handleLeftButtonClick}
         />
      </form>
   );
};
