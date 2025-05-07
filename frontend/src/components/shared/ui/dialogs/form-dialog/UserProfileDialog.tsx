import { SubmitHandler, FieldValues } from 'react-hook-form';
import { Button } from '../../primitives/Button';
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
import { EditUserDto, UserPayload } from 'freelanceman-common';
import { CrudApi } from '@/lib/api/api.type';
import { toast } from 'sonner';
import { useGetPresignedUrl } from '@/lib/api/file-api';

export const UserProfileDialog = ({
   formMethods,
   buttonLoadingState,
   crudApi,
}: FormDialogProps) => {
   // button loading state
   const { isApiLoading, setIsApiLoading } = buttonLoadingState;

   // form utilities
   const { handleSubmit, getValues } = formMethods;
   // setValue('avatarFile', '')

   //dialog state
   const { formDialogState } = useFormDialogStore();

   // api setup
   const { editUser } = crudApi as CrudApi['user'];
   const getPresignedUrl = useGetPresignedUrl({
      errorCallback() {
          toast.error('Unable to edit profile')
      },
   })

   const onSubmit: SubmitHandler<UserPayload> = async (data) => {
      setIsApiLoading({ isLoading: true, type: 'submit' });

      const avatarFile = getValues('avatarFile')
      console.log('avatarFile', avatarFile)

      let presignedUrl

      if (avatarFile instanceof File) {
         presignedUrl = await getPresignedUrl.mutateAsync({
            fileName: 'avatar',
            category: 'user',
            contentType: avatarFile.type,
         })
   
         const uploadResponse = await fetch(presignedUrl.url, {
            method: 'PUT',
            body: avatarFile,
            headers: {
               'Content-Type': 'image/jpeg',
            }
         });
   
          if (!uploadResponse.ok) {
            toast.error('Error saving changes')
            return
          }
      }

      const payload: EditUserDto = {
         name: data.name,
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
         avatar: presignedUrl?.key
      };
      await editUser.mutateAsync(payload);
      toast.success('Profile updated')
      setIsApiLoading({ isLoading: false, type: 'submit' });
   };

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
         <DynamicHeightTextInputForm
            formMethods={formMethods}
            fieldName="displayName"
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
            <div className="flex justify-between p-4 pb-2">
               <Button variant={'outline'}>Feeling tired ?</Button>
               <SubmitButton
                  formDialogState={formDialogState}
                  formMethods={formMethods}
                  isApiLoading={isApiLoading}
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
