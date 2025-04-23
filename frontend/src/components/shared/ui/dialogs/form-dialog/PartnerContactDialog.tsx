import { SubmitHandler, FieldValues } from 'react-hook-form';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import {
   DynamicHeightTextInputForm,
   TextAreaForm,
   TextInputForm,
   AvatarInputForm,
   Label,
} from 'src/components/shared/ui/form-field-elements';
import { FormDialogProps } from '@/lib/types/form-dialog.types';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import {
   CreatePartnerContactDto,
   EditPartnerContactDto,
   PartnerContactPayload,
} from 'freelanceman-common';
import FormDialogFooter from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';
import { CrudApi } from '@/lib/api/api.type';

export const PartnerContactDialog = ({
   formMethods,
   buttonLoadingState,
   crudApi,
   handleLeftButtonClick,
}: FormDialogProps) => {
   // button loading state
   const { isApiLoading, setIsApiLoading } = buttonLoadingState;

   // form utilities
   const { handleSubmit } = formMethods;

   //dialog state
   const { formDialogState } = useFormDialogStore();

   // api setup
   const { createPartnerContact, editPartnerContact } =
      crudApi as CrudApi['partnerContact'];

   // submit handler
   const onSubmit = (data: PartnerContactPayload) => {
      if (formDialogState.mode === 'create') {
         setIsApiLoading({ isLoading: true, type: 'submit' });
         const payload: CreatePartnerContactDto = {
            name: data.name,
            companyId: data.companyId,
            role: data.role,
            phoneNumber: data.phoneNumber,
            email: data.email,
            detail: data.detail,
            avatar: data.avatar,
         };
         createPartnerContact.mutate(payload);
         setIsApiLoading({ isLoading: false, type: 'submit' });
      } else if (formDialogState.mode === 'edit') {
         setIsApiLoading({ isLoading: true, type: 'submit' });
         const payload: EditPartnerContactDto = {
            id: data.id,
            name: data.name,
            role: data.role,
            phoneNumber: data.phoneNumber,
            email: data.email,
            detail: data.detail,
            avatar: data.avatar,
         };
         editPartnerContact.mutate(payload);
         setIsApiLoading({ isLoading: false, type: 'submit' });
      }
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
               onDiscard={handleLeftButtonClick}
            />
         </div>
      </form>
   );
};
