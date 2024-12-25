import DialogHeaderNameInput from './form/DialogHeaderNameInput';
import { cn } from '@/lib/helper/utils';
import clsx from 'clsx';
import { useForm, SubmitHandler, Path } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import {
   DialogContent,
   DialogHeader,
   Dialog,
   DialogFooter,
   DialogTitle,
   DialogTrigger,
} from './Dialog';
import { Button } from './button';
import type { DialogProps } from '@/lib/types/dialog.types';
import { defaultContact } from './form/utils';
import { Client, Contact } from '@types';
import { Input } from './input';
import { CircleUserRound, User, Plus, X, Pencil } from 'lucide-react';
import { Textarea } from './textarea';
import { InputProps } from '@/lib/types/form-input-props.types';

const ContactDialog = ({
   dialogState,
   setDialogState,
}: DialogProps): JSX.Element => {
   const [isEditing, setIsEditing] = useState(false)
   const formMethods = useForm<Contact>({
      defaultValues: defaultContact,
   });

   const { handleSubmit, reset, register, getValues } = formMethods;

   const handleDialogueClose = () => {
      setIsEditing(false)
      setDialogState({
         isOpen: false,
         id: '',
         mode: 'view',
         type: 'clientContact',
         data: defaultContact,
      });
   };

   useEffect(() => {
      if (dialogState.mode === 'view') {
         reset(dialogState.data);
      } else if (dialogState.mode === 'create') {
         reset(defaultContact);
      }
   }, [dialogState, reset]);

   const onError = (errors: any) => {
      console.error('Validation Errors:', errors);
   };

   const onSubmit: SubmitHandler<Contact> = (data) => {
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

   console.log('isEditing', isEditing)

   const RightButton = () => {
      if (dialogState.mode === 'view') {
         if (!isEditing) {
            return (
               <Button
                  type="submit"
                  variant={'default'}
                  onClick={() => setIsEditing(true)}
               >
                  Edit
               </Button>
            );
         }
         return (
            <Button
               type="submit"
               variant={'default'}
            >
               Save
            </Button>
         );
      } else if (dialogState.mode === 'create') {
         return (
            <Button
               type="submit"
               variant={'default'}
            >
               Create new contact
            </Button>
         )
      }
   };

   const LeftButton = () => {
      if (dialogState.mode === 'view') {
         if (!isEditing) {
            return (
               <Button
               variant={'destructive'}
            >
               Delete
            </Button>
            // <p className='flex items-center pl-1 text-base font-semibold text-red-500 cursor-pointer'>Delete Contact</p>
            );
         }
         return (
            <Button
               variant={'link'}
            >
               Delete client
            </Button>
         );
      } else if (dialogState.mode === 'create') {
         return (
            <Button
                  variant={'destructiveOutline'}
                  onClick={() => setIsEditing(false)}
               >
                  Discard
               </Button>
         )
      }
   };

   return (
      <Dialog open={dialogState.isOpen} onOpenChange={handleDialogueClose}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Contact
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit(onSubmit, onError)}>
               <DialogHeader>
                  <DialogTitle className="flex items-center gap-1">
                     <User className="w-5 h-5" />
                     <p>
                        {dialogState.type === 'clientContact'
                           ? 'Client'
                           : 'Partner'}{' '}
                        Contact
                     </p>
                  </DialogTitle>
               </DialogHeader>
               <div className="flex flex-col p-5 pt-3 gap-2">
                  <div className="flex w-full gap-3 justify-between">
                     <div className="flex flex-col w-1/2 gap-2">
                        <div className="flex flex-col leading-5">
                           <p className="w-[80px] text-secondary">Name</p>
                           <ClickEditInput
                              formMethods={formMethods}
                              fieldName="name"
                              className="text-lg font-medium"
                           />
                        </div>
                        <div className="flex flex-col leading-5">
                           <p className="w-[80px] text-secondary">Company</p>
                           {isEditing ? (
                              <Input
                                 {...register('company', {
                                    required:
                                       'At least one phone number is required',
                                 })}
                              />
                           ) : (
                              <p className="text-md font-medium">
                                 {getValues('company')}
                              </p>
                           )}
                        </div>
                        <div className="flex flex-col leading-5">
                           <p className="w-[80px] text-secondary">Role</p>
                           <ClickEditInput
                              formMethods={formMethods}
                              fieldName="role"
                              className="font-medium"
                           />
                        </div>
                     </div>
                     <div className="flex w-[140px] h-[140px] mr-3 mt-2 bg-tertiary rounded-full items-center justify-center text-secondary overflow-hidden">
                        {avatar}
                     </div>
                  </div>
                  <div className="flex w-full gap-2">
                     <div className="flex flex-col w-1/3">
                        <p className="text-secondary w-full">Phone Number</p>
                        <ArrayInput
                           formMethods={formMethods}
                           fieldName="phoneNumber"
                        />
                     </div>
                     <div className="flex flex-col w-1/2">
                        <p className="text-secondary w-full">Email</p>
                        <ArrayInput
                           formMethods={formMethods}
                           dialogState={dialogState}
                           fieldName="email"
                        />
                     </div>
                  </div>
                  <div>
                     <p className="text-secondary w-full">Details</p>
                     <Textarea
                        {...register('details', {
                           required: 'At least one phone number is required',
                        })}
                        className="resize-none"
                        placeholder="Enter phone number"
                     />
                  </div>
               </div>
               <DialogFooter>
                  <div className="flex justify-between p-4">
                     <LeftButton />
                     <RightButton />
                  </div>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
};

const ArrayInput = ({
   formMethods,
   dialogState,
   fieldName,
}: InputProps<Contact>): JSX.Element => {
   const { watch, setValue, register } = formMethods;
   const arrayValue = watch(fieldName as string) || [];
   const [editingIndex, setEditingIndex] = useState<number | null>(null);

   const handleAddField = () => {
      setEditingIndex(arrayValue.length);
      setValue(fieldName as string, [...arrayValue, '']);
   };

   const handleRemoveField = (index: number) => {
      const updatedArray = [...arrayValue];
      updatedArray.splice(index, 1);
      setValue(fieldName as string, updatedArray);
   };

   const handleInputChange = (index: number, newValue: string) => {
      const updatedArray = [...arrayValue];
      updatedArray[index] = newValue;
      setValue(fieldName as string, updatedArray);
   };

   return (
      <div className="flex flex-col gap-2">
         {arrayValue.map((value: string, index: number) => {
            const inputFieldName = `${fieldName}.${index}` as const;
            return (
               <div key={index} className="flex items-center gap-2 relative">
                  {editingIndex === index ? (
                     <Input
                        {...register(inputFieldName)}
                        defaultValue={value}
                        onBlur={(e) => {
                           handleInputChange(index, e.target.value);
                           setEditingIndex(null);
                        }}
                        className="input w-full"
                        placeholder="Enter value"
                        autoFocus
                     />
                  ) : (
                     <p
                        className="cursor-pointer text-md"
                        onClick={() => setEditingIndex(index)}
                     >
                        {value || 'Enter value'}
                     </p>
                  )}
                  <button
                     type="button"
                     onClick={() => handleRemoveField(index)}
                     className="text-red-500 hover:text-red-700"
                  >
                     <X className="w-4 h-4" />
                  </button>
               </div>
            );
         })}
         {!arrayValue.length || editingIndex === arrayValue.length ? (
            <div className="flex items-center gap-2">
               <Input
                  {...register(`${fieldName}.${arrayValue.length}` as const)}
                  onBlur={(e) => {
                     if (e.target.value.trim()) {
                        handleInputChange(arrayValue.length, e.target.value);
                     } else {
                        const updatedArray = [...arrayValue];
                        updatedArray.splice(arrayValue.length, 1);
                        setValue(fieldName as string, updatedArray);
                     }
                     setEditingIndex(null);
                  }}
                  className="input w-full"
                  placeholder="Enter value"
                  autoFocus
               />
            </div>
         ) : (
            <button
               type="button"
               onClick={handleAddField}
               className="flex border rounded-md w-fit text-sm items-center gap-1 px-1"
            >
               <Plus className="w-3 h-3" />
               Add more
            </button>
         )}
      </div>
   );
};

const ClickEditInput: React.FC<InputProps<Contact>> = ({
   fieldName,
   formMethods,
   className,
}) => {
   const [isEditing, setIsEditing] = useState(false);
   const { register, setValue, watch } = formMethods;

   const handleEditToggle = () => {
      setIsEditing((prev) => !prev);
   };

   const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setValue(fieldName as Path<Project>, event.target.value);
      setIsEditing(false);
   };

   const value = watch(fieldName);

   console.log('className', className);

   return (
      <div className="flex items-start w-full group">
         {isEditing ? (
            <Input
               {...register(fieldName as Path<Project>)}
               className="resize-none w-full border border-secondary rounded-md placeholder:text-secondary"
               placeholder={'Enter a name'}
               onBlur={handleBlur}
               autoFocus
            />
         ) : (
            <>
               <div
                  className={cn(
                     'flex-1 border border-transparent rounded-md cursor-default font-semibold text-md',
                     className
                  )}
               >
                  {value || <span>{'Enter a name'}</span>}
               </div>
               <button
                  type="button"
                  className="p-1 bg-transparent border-none opacity-0 transition-opacity hover:bg-gray-100 group-hover:opacity-100 rounded-md"
                  onClick={handleEditToggle}
                  aria-label="Edit name"
               >
                  <Pencil className="w-4 h-4 " />
               </button>
            </>
         )}
      </div>
   );
};

export default ContactDialog;
