import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { Button } from '../../primitives/Button';
import { defaultContact } from 'src/components/shared/ui/helpers/constants/default-values';
import { Contact } from '@types';
import { Input } from '../../primitives/Input';
import {
   Pencil,
   Trash2,
   ClipboardX,
   CircleCheck,
   UserIcon,
} from 'lucide-react';
import { Textarea } from '../../primitives/Textarea';
import AvatarInput from '@/components/shared/ui/form-field-elements/AvatarInput';
import useDialogStore from '@/lib/zustand/dialog-store';
import { mockUser } from '@mocks';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { DialogFooter } from '@/components/shared/ui/primitives/Dialog';
import { cn } from '@/lib/helper/utils';

const UserProfileDialogLayout = () => {
   return <div></div>;
};

const UserProfileDialog = (): JSX.Element => {
   const [color, setColor] = useState('');

   const { formDialogState, setFormDialogState } = useDialogStore();
   const contactData = formDialogState.data as Contact;

   const formMethods = useForm<User>({
      defaultValues: mockUser,
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
      } else if (
         formDialogState.mode === 'edit' ||
         formDialogState.mode === 'create'
      ) {
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

   return (
      <form onSubmit={handleSubmit(onSubmit, onError)} className='flex flex-col items-center pt-5'>
            <AvatarInputElement />
            <h2 className="text-xl font-semibold mt-2">
               {getValues('name') || 'Full Name'}
            </h2>
            <SpecializationBubble
               data={formMethods.getValues('specialization')}
               className='mt-2 mb-4'
            />

         <div className="flex flex-col px-5 pb-5 w-full">
            <div className="">
               <p className="text-secondary ">Bio</p>
               {formDialogState.mode !== 'view' ? (
                  <Textarea
                     {...register('bio')}
                     className="resize-none w-full"
                     placeholder="Enter details"
                  />
               ) : (
                  <p className=" font-medium">{getValues('bio')}</p>
               )}
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col gap-3">
               <div className="flex gap-2">
                  <div className="w-1/2">
                     <p className="text-secondary ">Tax ID</p>
                     {formDialogState.mode !== 'view' ? (
                        <Input {...register('taxId')} className='w-full' />
                     ) : (
                        <p className=" font-medium">{getValues('taxId')}</p>
                     )}
                  </div>
                  <div className="w-1/2">
                     <p className="text-secondary ">Phone Number</p>
                     {formDialogState.mode !== 'view' ? (
                        <Input {...register('phoneNumber')} className='w-full' />
                     ) : (
                        <p className=" font-medium">
                           {getValues('phoneNumber')}
                        </p>
                     )}
                  </div>
               </div>
               <div>
                  <p className="text-secondary">Email</p>
                  {formDialogState.mode !== 'view' ? (
                     <Input {...register('email')} className='w-full' />
                  ) : (
                     <p className=" font-medium">{getValues('email')}</p>
                  )}
               </div>
               <div className="">
                  <p className="text-secondary ">Address</p>
                  {formDialogState.mode !== 'view' ? (
                     <Textarea
                        {...register('address')}
                        className="resize-none mt-1 w-full"
                        placeholder="Enter details"
                     />
                  ) : (
                     <p className=" font-medium">{getValues('address')}</p>
                  )}
               </div>
            </div>
         </div>

         <DialogFooter className='w-full'>
            <div className="flex justify-between p-4">
               <LeftButton />
               <RightButton />
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

   return <div className="flex gap-2">{bubbles}</div>;
};

export default UserProfileDialog;
