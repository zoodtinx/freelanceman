import { SubmitHandler, FieldValues } from 'react-hook-form';
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
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import FormDialogFooter from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';
import {
   ClientContactPayload,
   CreateClientContactDto,
   EditClientContactDto,
} from 'freelanceman-common';
import { useNavigate } from 'react-router-dom';
import { CrudApi } from '@/lib/api/api.type';
import { useGetPresignedUrl } from '@/lib/api/file-api';
import { toast } from 'sonner';

export const ClientContactDialog = ({
   formMethods,
   crudApi,
   handleLeftButtonClick,
}: FormDialogProps) => {
   // utility hooks
   const navigate = useNavigate()

   // form utilities
   const { handleSubmit, getValues } = formMethods;

   //dialog state
   const { formDialogState, setFormDialogState } = useFormDialogStore();

   // api setup
   const { createClientContact, editClientContact } =
      crudApi as CrudApi['clientContact'];
   const getPresignedUrl = useGetPresignedUrl({
      errorCallback() {
         toast.error('Unable to edit profile');
      },
   });

   // submit handler
   const onSubmit = async (data: ClientContactPayload) => {
      const avatarFile = getValues('avatarFile');
      const contactId = getValues('id')
      console.log('avatarFile', avatarFile);

      let presignedUrl;

      if (avatarFile instanceof File) {
         setFormDialogState((prev) => {
            return { ...prev, isOpen: false };
         });
         toast.loading('Creating a client contact');
         const randomId = crypto.randomUUID();
         presignedUrl = await getPresignedUrl.mutateAsync({
            fileName: `avatar_${contactId ? contactId : randomId}`,
            category: 'client-contact',
            contentType: avatarFile.type,
         });

         const uploadResponse = await fetch(presignedUrl.url, {
            method: 'PUT',
            body: avatarFile,
            headers: {
               'Content-Type': 'image/jpeg',
            },
         });

         if (!uploadResponse.ok) {
            toast.error('Error saving changes');
            return;
         }
      }

      if (formDialogState.mode === 'create') {
         const payload: CreateClientContactDto = {
            name: data.name,
            companyId: data.companyId,
            role: data.role,
            phoneNumber: data.phoneNumber,
            email: data.email,
            detail: data.details,
            avatar: presignedUrl?.key,
         } as CreateClientContactDto;
         await createClientContact.mutateAsync(payload);
         setFormDialogState((prev) => {
            return {
               ...prev,
               isOpen: false,
            };
         });
         navigate(`/home/clients`);
      } else if (formDialogState.mode === 'edit') {
         const payload: EditClientContactDto = {
            id: data.id,
            name: data.name,
            role: data.role,
            phoneNumber: data.phoneNumber,
            email: data.email,
            details: data.details,
            avatar: presignedUrl?.key,
         } as EditClientContactDto;
         await editClientContact.mutateAsync(payload);
         toast.dismiss();
      }
   };

   //handle going to client
   const handleClientClick = () => {
      const clinetId = formDialogState.data.clientId;
      navigate(`/home/clients/${clinetId}`);
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
   };

   return (
      <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
         <div className="bg-background rounded-2xl text-primary">
            <div className="flex flex-col p-5 gap-2">
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
                        <Label className="w-[80px] text-secondary">
                           Company
                        </Label>
                        {formDialogState.mode === 'edit' && (
                           <p
                              className="text-md cursor-pointer w-fit"
                              onClick={handleClientClick}
                           >
                              {formMethods.getValues('company').name}
                           </p>
                        )}
                        {formDialogState.mode !== 'edit' && (
                           <SelectWithSearchForm
                              formMethods={formMethods}
                              fieldName="companyId"
                              type="client"
                              size="lg"
                              placeholder="Select a Client"
                              required={true}
                              errorMessage="Please select a client"
                           />
                        )}
                     </div>
                     <div className="flex flex-col leading-5">
                        <Label className="w-[80px] text-secondary">Role</Label>
                        <TextInputForm
                           formMethods={formMethods}
                           fieldName="role"
                           placeholder="Describe this contact."
                           errorMessage='Please specify their role'
                           required
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
                     className='h-[80px]'
                  />
               </div>
            </div>
            <FormDialogFooter
               formMethods={formMethods}
               onDiscard={handleLeftButtonClick}
            />
         </div>
      </form>
   );
};
