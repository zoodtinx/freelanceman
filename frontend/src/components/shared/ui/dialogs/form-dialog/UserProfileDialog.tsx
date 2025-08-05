import { SubmitHandler, FieldValues } from 'react-hook-form';
import { Button } from '../../primitives/Button';
import {
   AvatarInputForm,
   Label,
} from 'src/components/shared/ui/form-field-elements';
import { DialogFooter } from '@/components/shared/ui/primitives/Dialog';
import {
   TextAreaForm,
   TextInputForm,
} from 'src/components/shared/ui/form-field-elements';
import { SubmitButton } from '@/components/shared/ui/dialogs/form-dialog/FormButton';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { FormDialogProps } from '@/lib/types/form-dialog.types';
import { EditUserDto, UserFindOneResponse } from 'freelanceman-common';
import { toast } from 'sonner';
import { useGetPresignedUrl } from '@/lib/api/file-api';
import HeadlineTextInputForm from '@/components/shared/ui/form-field-elements/HeadlineTextInput';
import { TagsInputForm } from '@/components/shared/ui/form-field-elements/TagsInputForm';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { SelectForm } from '@/components/shared/ui/form-field-elements/SelectForm';
import { currencySelections } from '@/components/shared/ui/helpers/constants/selections';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';
import { useDeleteUser, useEditUser } from '@/lib/api/user-api';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const UserProfileDialog = ({
   formMethods,
}: FormDialogProps) => {
   
   // hooks
   const navigate = useNavigate();
   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const setConfirmationDialogState = useConfirmationDialogStore(
      (state) => state.setConfirmationDialogState
   );
   const editUser = useEditUser()
   const getPresignedUrl = useGetPresignedUrl();
   const deleteUser = useDeleteUser({
      enableOptimisticUpdate: true,
      errorCallbacks() {
          toast.dismiss()
          toast.error('Error quitting freelancing')
      },
      successCallbacks() {
          toast.dismiss()
          toast.success('"Account successfully deleted. Take care!')
      },
   })
   
   // form utilities
   const {
      handleSubmit,
      getValues,
   } = formMethods;

   const closeDialog = () => {
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
   };

   const onSubmit: SubmitHandler<UserFindOneResponse> = async (data) => {
      const avatarFile = getValues('avatarFile');
      console.log('avatarFile', avatarFile);

      let presignedUrl;

      toast.loading('Updating your profile...');

      // check if there is avatar, then uplaod it before proceeding
      if (avatarFile && avatarFile instanceof File) {
         presignedUrl = await getPresignedUrl.mutateAsync({
            fileName: `avatar_${crypto.randomUUID()}`,
            category: 'user',
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
            toast.error('Error saving avatar');
            return;
         }
         toast.dismiss();
      }

      const payload: EditUserDto = {
         id: data.id,
         email: data.email,
         phoneNumber: data.phoneNumber,
         address: data.address,
         bio: data.bio,
         taxId: data.taxId,
         displayName: data.displayName,
         currency: data.currency,
         quitting: data.quitting,
         pinnedProjects: data.pinnedProjects,
         specialization: data.specialization,
         avatar: presignedUrl?.key,
      };
      closeDialog()
      await editUser.mutateAsync(payload);
      toast.dismiss();
      toast.success('Profile updated');
   };

   const handleDelete = (e: React.MouseEvent) => {
      e.preventDefault()
      closeDialog()
      setConfirmationDialogState({
         isOpen: true,
         actions: {
            primary: async () => {
               toast.loading('Deleting account');
               await deleteUser.mutateAsync();
               navigate(`/welcome`);
            },
         },
         entityName: 'account',
         additionalMessage:
            'Deleting your account will permanently remove all your client and project data. This will also delete all tasks, event, files, contacts. This action can not be undone.',
         type: 'delete',
         dialogRequested: {
            mode: 'edit',
            type: 'clientSettings',
         },
      });
   }

   return (
      <form
         onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
         className="flex flex-col items-center pt-5"
      >
         <AvatarInputForm
            formMethods={formMethods}
            dialogState={formDialogState}
            fieldName="avatar"
         />
         <div className="w-2/3 mt-2">
            <HeadlineTextInputForm
               formMethods={formMethods}
               fieldName="displayName"
               required={true}
               errorMessage="Please enter your name."
               isWithIcon={false}
               className="pt-1 text-center"
            />
         </div>
         <div className="w-full justify-center">
            <TagsInputForm
               fieldName="specialization"
               formMethods={formMethods}
               className="mt-2 w-full justify-center px-5"
            />
         </div>
         <div className="flex flex-col px-4 pb-4 w-full mt-3 gap-3">
            <div className="flex flex-col gap-3 bg-foreground p-2 rounded-xl mt-3">
               <div className="flex gap-2">
                  <div className="w-1/2">
                     <Label>Tax ID</Label>
                     <TextInputForm
                        formMethods={formMethods}
                        fieldName="taxId"
                     />
                  </div>
                  <div className="w-1/2">
                     <Label>Phone Number</Label>
                     <TextInputForm
                        formMethods={formMethods}
                        fieldName="phoneNumber"
                     />
                  </div>
               </div>
               <div>
                  <Label>Email</Label>
                  <TextInputForm formMethods={formMethods} fieldName="email" />
               </div>
               <div className="">
                  <Label>Address</Label>
                  <TextAreaForm
                     formMethods={formMethods}
                     fieldName="address"
                     className="h-[70px] resize-none"
                  />
               </div>
            </div>
            <Separator />
            <div className="flex w-full justify-between">
               <Label>Currency</Label>
               <SelectForm
                  fieldName="currency"
                  formMethods={formMethods}
                  selection={currencySelections}
               />
            </div>
         </div>
         <DialogFooter className="w-full">
            <div className="flex justify-between p-4 pb-2">
               <Button
                  variant={'outline'}
                  className="px-0 text-secondary border-0 hover:text-button-red"
                  onClick={handleDelete}
               >
                  Quit being a freelancer
               </Button>
               <SubmitButton formMethods={formMethods} entity="User" />
            </div>
         </DialogFooter>
      </form>
   );
};
