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
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';
import { PartnerContactFindManyItem } from 'freelanceman-common';
import FormDialogFooter from '@/components/shared/ui/dialogs/form-dialog/FormDialogFooter';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useGetPresignedUrl } from '@/lib/api/file-api';
import {
   useCreatePartnerContact,
   useDeletePartnerContact,
   useEditPartnerContact,
} from '@/lib/api/partner-contact-api';

export const PartnerContactDialog = ({ formMethods }: FormDialogProps) => {
   const navigate = useNavigate();
   const { handleSubmit, getValues } = formMethods;

   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const setConfirmationDialogState = useConfirmationDialogStore(
      (s) => s.setConfirmationDialogState
   );

   const createPartnerContact = useCreatePartnerContact();
   const editPartnerContact = useEditPartnerContact();
   const deletePartnerContact = useDeletePartnerContact();

   const closeDialog = () =>
      setFormDialogState((prev) => ({ ...prev, isOpen: false }));

   const getPresignedUrl = useGetPresignedUrl();

   const onSubmit = async (data: PartnerContactFindManyItem) => {
      const avatarFile = getValues('avatarFile');
      const contactId = getValues('id');
      let presignedUrl;

      if (avatarFile instanceof File) {
         const randomId = crypto.randomUUID();
         presignedUrl = await getPresignedUrl.mutateAsync({
            fileName: `avatar_${contactId || randomId}`,
            category: 'partner-contact',
            contentType: avatarFile.type,
         });

         const uploadResponse = await fetch(presignedUrl.url, {
            method: 'PUT',
            body: avatarFile,
            headers: { 'Content-Type': 'image/jpeg' },
         });

         if (!uploadResponse.ok) {
            toast.error('Avatar upload failed');
            return;
         }
      }

      const commonPayload = {
         name: data.name,
         company: data.company,
         role: data.role,
         phoneNumber: data.phoneNumber,
         email: data.email,
         avatar: presignedUrl?.key,
         details: data.details,
      };

      if (formDialogState.mode === 'create') {
         closeDialog();

         await createPartnerContact.mutateAsync(commonPayload);
         navigate('/home/partners');
      } else {
         closeDialog();

         await editPartnerContact.mutateAsync({
            id: data.id,
            ...commonPayload,
         });
      }
   };

   const handleDestructiveButton = () => {
      if (formDialogState.mode === 'edit') {
         const deleteFn = async () => {
            await deletePartnerContact.mutateAsync(formDialogState.data.id);
         };

         setConfirmationDialogState({
            actions: { primary: deleteFn },
            entityName: formDialogState.data.name,
            isOpen: true,
            type: 'delete',
            dialogRequested: {
               mode: 'edit',
               type: 'partnerContact',
            },
         });
      }

      closeDialog();
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
                           required
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
                           errorMessage="Please specify their role"
                           required
                        />
                     </div>
                     <div className="flex flex-col leading-5">
                        <Label className="w-[80px] text-secondary">
                           Company
                        </Label>
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
                     className="h-[80px]"
                  />
               </div>
            </div>
            <FormDialogFooter
               formMethods={formMethods}
               onDiscard={handleDestructiveButton}
               customText={{
                  destructiveButton: {
                     editModeText: 'Delete Contact',
                  },
               }}
               entity="Contact"
            />
         </div>
      </form>
   );
};
