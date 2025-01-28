import { Separator } from './primitives/Separator';
import DialogHeaderNameInput from './primitives/DialogHeaderNameInput';
import { cn } from '@/lib/helper/utils';
import clsx from 'clsx';
import { useForm, SubmitHandler, Path, useWatch } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import {
   DialogContent,
   DialogHeader,
   Dialog,
   DialogFooter,
   DialogTitle,
   DialogTrigger,
} from './primitives/Dialog';
import { Button } from './primitives/Button';
import type { DialogProps } from '@/lib/types/dialog.types';
import { defaultContact } from './constants';
import { Client, Contact, NewContactPayload } from '@types';
import { Input } from './primitives/Input';
import {
   CircleUserRound,
   User,
   Plus,
   X,
   Pencil,
   Trash2,
   ClipboardX,
   Check,
   CircleCheck,
   Upload,
} from 'lucide-react';
import { Textarea } from './primitives/Textarea';
import { InputProps } from '@/lib/types/form-input-props.types';

const ContactDialog = ({
   dialogState,
   setDialogState,
}: DialogProps): JSX.Element => {
   const [color, setColor] = useState('');

   const formMethods = useForm<Contact>({
      defaultValues: defaultContact,
   });

   const {
      handleSubmit,
      reset,
      register,
      getValues,
      formState: { errors },
   } = formMethods;

   const handleDialogueClose = () => {
      setDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
   };

   useEffect(() => {
      const { mode, data } = dialogState;

      if (mode === 'view') {
         reset(data);
      } else if (mode === 'create' || mode === 'edit') {
         reset(mode === 'create' ? defaultContact : data);
      }

      setColor(mode === 'create' ? '' : data.color);
   }, [dialogState, reset]);

   const onError = (errors: any) => {
      console.error('Validation Errors:', errors);
   };

   const onSubmit: SubmitHandler<Contact> = (data) => {
      const payload: NewContactPayload = {
         name: data.name,
         avatar: data.avatar,
         clientId: data.clientId,
         role: data.role,
         details: data.details,
         email: data.email,
         phoneNumber: data.phoneNumber,
         type: dialogState.type,
      };
      console.log(data);
   };

   let avatar;
   if (!dialogState.data.avatar) {
      avatar = <User className="w-16 h-16" />;
   } else {
      avatar = (
         <img
            src={dialogState.data.avatar}
            alt="Contact Avatar"
            className="w-full h-full object-cover"
         />
      );
   }

   const RightButton = () => {
      if (dialogState.mode === 'view') {
         return (
            <Button
               type="button"
               variant="default"
               onClick={() =>
                  setDialogState((prev) => ({ ...prev, mode: 'edit' }))
               }
               className="flex gap-1"
            >
               Edit
               <Pencil className="w-4 h-4" />
            </Button>
         );
      } else if (dialogState.mode === 'edit') {
         return (
            <Button type="submit" variant="submit" className="flex gap-1">
               Save
               <CircleCheck className="w-4 h-4" />
            </Button>
         );
      } else if (dialogState.mode === 'create') {
         return (
            <Button type="submit" variant="submit" className="flex gap-1">
               Create new contact
               <CircleCheck className="w-4 h-4" />
            </Button>
         );
      }
   };

   const LeftButton = () => {
      if (dialogState.mode === 'view') {
         return (
            <Button variant="destructive" className="flex gap-1">
               Delete
               <Trash2 className="w-4 h-4" />
            </Button>
         );
      } else if (dialogState.mode === 'edit' || dialogState.mode === 'create') {
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
      dialogState.mode === 'edit' || dialogState.mode === 'create' ? (
         <AvatarInput
            formMethods={formMethods}
            dialogState={dialogState}
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
      dialogState.mode === 'create' ? 'Create New Contact' : 'Contact';
   const headerTextStyle =
      dialogState.mode === 'view' ? 'text-primary' : 'text-foreground';

   return (
      <Dialog open={dialogState.isOpen} onOpenChange={handleDialogueClose}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Contact
            </Button>
         </DialogTrigger>
         <DialogContent
            className={`sm:max-w-[425px] flex flex-col focus:outline-none bg-primary text-foreground ${headerTextStyle}`}
            style={{
               backgroundColor: color,
            }}
            onInteractOutside={(e) => e.preventDefault()}
         >
            <DialogHeader className="py-1 bg-transparent">
               <DialogTitle className="flex text-base w-full text-center items-center gap-1">
                  <User className="w-[14px] h-[14px]" />
                  <p>{headerText}</p>
               </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
               <div className="bg-background rounded-2xl text-primary">
                  <div className="flex flex-col p-5 pt-3 gap-2">
                     <div className="flex w-full gap-3 justify-between">
                        <div className="flex flex-col w-3/5 gap-2">
                           <div className="flex flex-col leading-5">
                              <p className="w-[80px] text-secondary">Name</p>
                              {dialogState.mode !== 'view' ? (
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
                              {dialogState.mode !== 'view' ? (
                                 <Input {...register('company')} />
                              ) : (
                                 <p className="text-md font-medium">
                                    {getValues('company')}
                                 </p>
                              )}
                           </div>
                           <div className="flex flex-col leading-5">
                              <p className="w-[80px] text-secondary">Role</p>
                              {dialogState.mode !== 'view' ? (
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
                        <div className="flex flex-col w-1/3">
                           <p className="text-secondary w-full">Phone Number</p>
                           {dialogState.mode !== 'view' ? (
                              <ArrayInput
                                 formMethods={formMethods}
                                 fieldName="phoneNumber"
                              />
                           ) : (
                              phoneNumbers.map((number) => (
                                 <p className="text-base">{number}</p>
                              ))
                           )}
                        </div>
                        <div className="flex flex-col grow">
                           <p className="text-secondary w-full">Email</p>
                           {dialogState.mode !== 'view' ? (
                              <ArrayInput
                                 formMethods={formMethods}
                                 dialogState={dialogState}
                                 fieldName="email"
                              />
                           ) : (
                              emails.map((email) => (
                                 <p className="text-base">{email}</p>
                              ))
                           )}
                        </div>
                     </div>
                     <Separator className="my-2" />
                     <div>
                        <p className="text-secondary w-full">Info</p>
                        {dialogState.mode !== 'view' ? (
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
         </DialogContent>
      </Dialog>
   );
};


const AvatarInput = ({ formMethods }: InputProps) => {
   const {
      setValue,
      watch,
      formState: { errors },
   } = formMethods;

   const avatarFile = watch('avatar');

   const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onload = () => {
            setValue('avatar', reader.result, { shouldValidate: true });
         };
         reader.readAsDataURL(file);
      }
   };

   return (
      <div className="flex flex-col items-center gap-2">
         <div
            className={`relative w-[125px] h-[125px] ${
               avatarFile ? '' : 'mr-3 mt-2 bg-tertiary text-secondary'
            } rounded-full overflow-hidden flex items-center justify-center cursor-pointer`}
            onClick={() => document.getElementById('avatar-upload')?.click()}
         >
            {avatarFile ? (
               <>
                  <img
                     src={avatarFile}
                     alt="Avatar Preview"
                     className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center">
                     <span className="text-white text-sm font-medium mb-2">
                        Edit
                     </span>
                  </div>
               </>
            ) : (
               <Upload className="w-10 h-10" />
            )}
         </div>
         <input
            type="file"
            accept="image/*"
            className="hidden"
            id="avatar-upload"
            onChange={handleFileChange}
         />
         {errors.avatar && (
            <p className="mt-1 text-sm text-red-500 font-normal animate-shake">
               {errors.avatar.message as string}
            </p>
         )}
      </div>
   );
};

const ArrayInput = ({
   formMethods,
   fieldName,
}: InputProps<Contact>): JSX.Element => {
   const { getValues, setValue, register, watch } = formMethods;
   const arrayValue =
      useWatch({
         control: formMethods.control,
         name: fieldName,
      }) || [];

   console.log('arrayValue', arrayValue);

   const handleRemoveField = (index: number) => {
      const updatedArray = [...arrayValue];
      updatedArray.splice(index, 1);
      setValue(fieldName as string, updatedArray);
   };

   const handleAddField = () => {
      setValue(fieldName as string, [...arrayValue, '']);
   };

   const ArrayElement = () => {
      if (arrayValue.length > 1) {
         return (
            <>
               {arrayValue.map((value: string, index: number) => {
                  const inputFieldName = `${fieldName}.${index}` as const;
                  return (
                     <div key={index} className="flex items-center gap-1">
                        <Input
                           {...register(inputFieldName)}
                           defaultValue={value}
                           className="input w-full"
                           placeholder="Enter value"
                        />
                        <button
                           type="button"
                           onClick={() => handleRemoveField(index)}
                           className="rounded-full p-[0.7px] bg-red-600 text-white cursor-default aspect-square h-4 w-4 flex items-center justify-center"
                        >
                           <X className="w-3 h-3 stroke-2" />
                        </button>
                     </div>
                  );
               })}
            </>
         );
      } else {
         return (
            <div className="flex items-center gap-1">
               <Input
                  {...register(`${fieldName}.0` as const)}
                  defaultValue=""
                  className="input w-full"
                  placeholder="Enter value"
               />
            </div>
         );
      }
   };

   return (
      <div className="flex flex-col gap-2">
         <ArrayElement />
         <button
            type="button"
            onClick={handleAddField}
            className="flex rounded-md w-fit text-sm items-center gap-1 px-1 bg-primary text-foreground"
         >
            <Plus className="w-3 h-3" />
            Add more
         </button>
      </div>
   );
};

export default ContactDialog;
