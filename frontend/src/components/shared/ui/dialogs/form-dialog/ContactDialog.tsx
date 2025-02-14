import { Separator } from '../../primitives/Separator';
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import {
   DialogContent,
   DialogHeader,
   Dialog,
   DialogFooter,
   DialogTitle,
   DialogTrigger,
} from '../../primitives/Dialog';
import { Button } from '../../primitives/Button';
import type { DialogProps } from 'src/lib/types/form-dialog.types';
import { defaultContact } from 'src/components/shared/ui/helpers/constants/default-values';
import { Contact, NewContactPayload } from '@types';
import { Input } from '../../primitives/Input';
import {
   User,
   Pencil,
   Trash2,
   ClipboardX,
   CircleCheck,
} from 'lucide-react';
import { Textarea } from '../../primitives/Textarea';
import AvatarInput from '@/components/shared/ui/form-field-elements/AvatarInput';
import TextArrayInput from '@/components/shared/ui/form-field-elements/TextArrayInput';
import useDialogStore from '@/lib/zustand/dialog-store';

const ContactDialog = (): JSX.Element => {
   const [color, setColor] = useState('');

   const { formDialogState, setFormDialogState } = useDialogStore()
   const contactData = formDialogState.data as Contact

   const formMethods = useForm<Contact>({
      defaultValues: contactData,
   });

   const {
      handleSubmit,
      reset,
      register,
      getValues,
      formState: { errors },
   } = formMethods;

   const handleDialogueClose = () => {
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
   };

   useEffect(() => {
      const { mode, data } = formDialogState;

      if (mode === 'view') {
         reset(data);
      } else if (mode === 'create' || mode === 'edit') {
         reset(mode === 'create' ? defaultContact : data);
      }

      setColor(mode === 'create' ? '' : data.color);
   }, [formDialogState, reset]);

   const onError = (errors: any) => {
      console.error('Validation Errors:', errors);
   };

   const onSubmit: SubmitHandler<Contact> = (data) => {
      const payload: NewContactPayload = {
         name: data.name,
         avatar: data.avatar,
         clientId: data.companyId,
         role: data.role,
         details: data.details,
         email: data.email,
         phoneNumber: data.phoneNumber,
         type: formDialogState.type,
      };
      console.log(data);
   };

   let avatar;
   if (!formDialogState.data.avatar) {
      avatar = <User className="w-16 h-16" />;
   } else {
      avatar = (
         <img
            src={formDialogState.data.avatar}
            alt="Contact Avatar"
            className="w-full h-full object-cover"
         />
      );
   }

   const RightButton = () => {
      if (formDialogState.mode === 'view') {
         return (
            <Button
               type="button"
               variant="default"
               onClick={() =>
                  setFormDialogState((prev) => ({ ...prev, mode: 'edit' }))
               }
               className="flex gap-1"
            >
               Edit
               <Pencil className="w-4 h-4" />
            </Button>
         );
      } else if (formDialogState.mode === 'edit') {
         return (
            <Button type="submit" variant="submit" className="flex gap-1">
               Save
               <CircleCheck className="w-4 h-4" />
            </Button>
         );
      } else if (formDialogState.mode === 'create') {
         return (
            <Button type="submit" variant="submit" className="flex gap-1">
               Create new contact
               <CircleCheck className="w-4 h-4" />
            </Button>
         );
      }
   };

   const LeftButton = () => {
      if (formDialogState.mode === 'view') {
         return (
            <Button variant="destructive" className="flex gap-1">
               Delete
               <Trash2 className="w-4 h-4" />
            </Button>
         );
      } else if (formDialogState.mode === 'edit' || formDialogState.mode === 'create') {
         return (
            <Button
               variant="destructiveOutline"
               onClick={handleDialogueClose}
               className="flex gap-1"
            >
               Discard
               <ClipboardX className="w-4 h-4" />
            </Button>
         );
      }
   };

   const AvatarInputElement = () =>
      formDialogState.mode === 'edit' || formDialogState.mode === 'create' ? (
         <AvatarInput
            formMethods={formMethods}
            formDialogState={formDialogState}
            fieldName="avatar"
         />
      ) : (
         <div className="flex w-[125px] h-[125px] mr-3 mt-2 bg-tertiary rounded-full items-center justify-center text-secondary overflow-hidden">
            {avatar}
         </div>
      );

   const phoneNumbers = getValues('phoneNumber');
   const emails = getValues('email');

   const headerText =
      formDialogState.mode === 'create' ? 'Create New Contact' : 'Contact';
   const headerTextStyle =
      formDialogState.mode === 'view' ? 'text-primary' : 'text-foreground';

   return (
      <form onSubmit={handleSubmit(onSubmit, onError)}>
         <div className="bg-background rounded-2xl text-primary">
            <div className="flex flex-col p-5 pt-3 gap-2">
               <div className="flex w-full gap-3 justify-between">
                  <div className="flex flex-col w-3/5 gap-2">
                     <div className="flex flex-col leading-5">
                        <p className="w-[80px] text-secondary">Name</p>
                        {formDialogState.mode !== 'view' ? (
                           <div className="flex flex-col">
                              <Input
                                 {...register('name', {
                                    required: 'At least a name is required',
                                 })}
                                 className="w-full"
                              />
                              {errors.name && (
                                 <p className="mt-1 text-sm text-red-500 font-normal animate-shake">
                                    {typeof errors.name?.message === 'string'
                                       ? errors.name.message
                                       : ''}
                                 </p>
                              )}
                           </div>
                        ) : (
                           <p className="text-lg font-medium">
                              {getValues('name')}
                           </p>
                        )}
                     </div>
                     <div className="flex flex-col leading-5">
                        <p className="w-[80px] text-secondary">Company</p>
                        {formDialogState.mode !== 'view' ? (
                           <Input {...register('company')} />
                        ) : (
                           <p className="text-md font-medium">
                              {getValues('company')}
                           </p>
                        )}
                     </div>
                     <div className="flex flex-col leading-5">
                        <p className="w-[80px] text-secondary">Role</p>
                        {formDialogState.mode !== 'view' ? (
                           <Input {...register('role')} />
                        ) : (
                           <p className="text-md font-medium">
                              {getValues('role')}
                           </p>
                        )}
                     </div>
                  </div>
                  <AvatarInputElement />
               </div>
               <Separator className="my-2" />
               <div className="flex w-full gap-2">
                  <div className="flex flex-col w-1/2">
                     <p className="text-secondary w-full">Phone Number</p>
                     {formDialogState.mode !== 'view' ? (
                        <TextArrayInput
                           formMethods={formMethods}
                           fieldName="phoneNumber"
                        />
                     ) : (
                        phoneNumbers?.map((number) => (
                           <p className="text-base">{number}</p>
                        ))
                     )}
                  </div>
                  <div className="flex flex-col w-1/2">
                     <p className="text-secondary w-full">Email</p>
                     {formDialogState.mode !== 'view' ? (
                        <Input {...register('email')} />
                     ) : (
                        <p className="text-base">{getValues('email')}</p>
                     )}
                  </div>
               </div>
               <Separator className="my-2" />
               <div>
                  <p className="text-secondary w-full">Info</p>
                  {formDialogState.mode !== 'view' ? (
                     <Textarea
                        {...register('details')}
                        className="resize-none"
                        placeholder="Enter phone number"
                     />
                  ) : (
                     <p className="text-base font-medium">
                        {getValues('details')}
                     </p>
                  )}
               </div>
            </div>
            <DialogFooter>
               <div className="flex justify-between p-4">
                  <LeftButton />
                  <RightButton />
               </div>
            </DialogFooter>
         </div>
      </form>
   );
};

export default ContactDialog;
