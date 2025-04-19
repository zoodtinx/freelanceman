import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useEffect } from 'react';
import { Button } from '../../primitives/Button';
import { defaultContact } from 'src/components/shared/ui/helpers/constants/default-values';
import { UserIcon } from 'lucide-react';
import {
   AvatarInputForm,
   Label,
} from 'src/components/shared/ui/form-field-elements';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { DialogFooter } from '@/components/shared/ui/primitives/Dialog';
import { cn } from '@/lib/helper/utils';
import {
   DynamicHeightTextInputForm,
   TextAreaForm,
   TextInputForm,
} from 'src/components/shared/ui/form-field-elements';
import { SubmitButton } from '@/components/shared/ui/dialogs/form-dialog/FormButton';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { FormDialogProps } from '@/lib/types/form-dialog.types';
import { useEditUser, useUserApi } from '@/lib/api/user-api';

export const UserProfileDialog = ({
   formMethods,
   handleEscapeWithChange,
}: FormDialogProps) => {
   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const editUser = useEditUser()

   const {
      handleSubmit,
      reset,
      formState: { errors },
   } = formMethods;

   useEffect(() => {
      const { mode, data } = formDialogState;

      if (mode === 'view') {
         reset(data);
      } else if (mode === 'create' || mode === 'edit') {
         reset(mode === 'create' ? defaultContact : data);
      }
   }, [formDialogState, reset]);

   const onError = (errors: any) => {
      console.error('Validation Errors:', errors);
   };

   const onSubmit: SubmitHandler<Contact> = (data) => {
      const payload: EditUserDto = {
         name: data.name,
         email: data.email,
         phoneNumber: data.phoneNumber,
         address: data.address,
         avatarUrl: data.avatarUrl,
         bio: data.bio,
         taxId: data.taxId,
      };
      editUser.mutate({
         userId: formDialogState.data.id,
         userPayload: payload,
      });
   };

   let avatar;
   if (!formDialogState.data.avatar) {
      avatar = <UserIcon className="w-16 h-16" />;
   } else {
      avatar = (
         <img
            src={formDialogState.data.avatar}
            alt="Contact Avatar"
            className="w-full h-full object-cover"
         />
      );
   }

   return (
      <form
         onSubmit={handleSubmit(onSubmit, onError)}
         className="flex flex-col items-center pt-5"
      >
         <AvatarInputForm
            formMethods={formMethods}
            dialogState={formDialogState}
            fieldName="avatar"
         />
         <DynamicHeightTextInputForm
            formMethods={formMethods}
            fieldName="name"
            required={true}
            errorMessage="Please enter your name."
            placeholder="What's youe name?"
            isWithIcon={false}
            className="pt-1 text-center"
         />
         <SpecializationBubble
            data={formMethods.getValues('specialization')}
            className="mt-2 mb-4"
         />

         <div className="flex flex-col px-5 pb-5 w-full">
            <div className="">
               <Label className="text-secondary">Bio</Label>
               <TextAreaForm
                  formMethods={formMethods}
                  fieldName="bio"
                  placeholder="Introduce yourself."
                  className="h-20"
               />
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col gap-3">
               <div className="flex gap-2">
                  <div className="w-1/2">
                     <Label>Tax ID</Label>
                     <TextInputForm
                        formMethods={formMethods}
                        fieldName="taxId"
                        placeholder="Introduce yourself."
                     />
                  </div>
                  <div className="w-1/2">
                     <Label>Phone Number</Label>
                     <TextInputForm
                        formMethods={formMethods}
                        fieldName="phoneNumber"
                        placeholder="Introduce yourself."
                     />
                  </div>
               </div>
               <div>
                  <Label>Email</Label>
                  <TextInputForm
                     formMethods={formMethods}
                     fieldName="email"
                     placeholder="Enter Email"
                  />
               </div>
               <div className="">
                  <Label>Address</Label>
                  <TextAreaForm
                     formMethods={formMethods}
                     fieldName="address"
                     placeholder="Introduce yourself."
                     className="h-14"
                  />
               </div>
            </div>
         </div>

         <DialogFooter className="w-full">
            <div className="flex justify-between p-4">
               <Button variant={'outline'}>Feeling tired ?</Button>
               <SubmitButton
                  formDialogState={formDialogState}
                  formMethods={formMethods}
               />
            </div>
         </DialogFooter>
      </form>
   );
};

const SpecializationBubble = ({
   data,
   className,
}: {
   data: string[];
   className?: string;
}) => {
   const bubbles = data.map((text) => {
      return (
         <div
            key={text}
            className={cn(
               'flex items-center px-3 text-base rounded-full border border-primary',
               className
            )}
         >
            {text}
         </div>
      );
   });

   return <div className="flex gap-1">{bubbles}</div>;
};
