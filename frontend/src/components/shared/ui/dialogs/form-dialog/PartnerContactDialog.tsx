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
import { useNavigate } from 'react-router-dom';

export const PartnerContactDialog = ({
   formMethods,
   buttonLoadingState,
   crudApi,
   handleLeftButtonClick,
}: FormDialogProps) => {
   //utility hooks
   const navigate = useNavigate();
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

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
   const onSubmit = async (data: PartnerContactPayload) => {
      if (formDialogState.mode === 'create') {
         const payload: CreatePartnerContactDto = {
            name: data.name,
            companyId: data.companyId,
            role: data.role,
            phoneNumber: data.phoneNumber,
            email: data.email,
            detail: data.detail,
            avatar: data.avatar,
         };
         await createPartnerContact.mutateAsync(payload);
         setFormDialogState((prev) => {
            return {
               ...prev,
               isOpen: false,
            };
         });
         navigate(`/home/clients/${client.id}`);
      } else if (formDialogState.mode === 'edit') {
         const payload: EditPartnerContactDto = {
            id: data.id,
            name: data.name,
            role: data.role,
            phoneNumber: data.phoneNumber,
            email: data.email,
            detail: data.detail,
            avatar: data.avatar,
         };
         await editPartnerContact.mutateAsync(payload);
         setFormDialogState((prev) => {
            return {
               ...prev,
               isOpen: false,
            };
         });
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
         <div className="bg-background rounded-2xl text-primary">
            <div className="flex flex-col p-5 pt-5 gap-2">
               <div className="flex w-full gap-3 justify-between bg-foreground p-2 pl-3 pr-5 pb-3 rounded-xl items-center">
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
                           placeholder="Describe this contact"
                        />
                     </div>
                     <div className="flex flex-col leading-5">
                        <Label className="w-[80px] text-secondary">Company</Label>
                        <TextInputForm
                           formMethods={formMethods}
                           fieldName="company"
                           placeholder="Freelancer"
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
