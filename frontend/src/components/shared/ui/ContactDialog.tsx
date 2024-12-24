import { useForm, SubmitHandler, Path } from 'react-hook-form';
import React, { useEffect } from 'react';
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
import { CircleUserRound, User, Plus } from 'lucide-react';
import { Textarea } from './textarea';
import { InputProps } from '@/lib/types/form-input-props.types';

const ContactDialog = ({
   dialogState,
   setDialogState,
}: DialogProps): JSX.Element => {
   const formMethods = useForm<Contact>({
      defaultValues: defaultContact,
   });

   const { handleSubmit, reset, register } = formMethods;

   console.log('dialogState', dialogState)

   const handleDialogueClose = () => {
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
               <div className='flex flex-col p-5 pt-2 gap-1'>
                  <div className="flex w-full gap-3 justify-between">
                     <div className="flex flex-col w-1/2 gap-1">
                        <p className="w-[80px] font-semibold text-secondary">
                           Name
                        </p>
                        <Input
                           {...register('name', {
                              required: 'Name is required',
                           })}
                           className="input grow"
                           placeholder="Enter name"
                        />
                        <div className="flex flex-col">
                           <p className="w-[80px] font-semibold text-secondary">
                              Company
                           </p>
                           <Input
                              {...register('company')}
                              className="input grow"
                              placeholder="Enter company"
                           />
                        </div>
                        <div className="flex flex-col">
                           <p className="w-[80px] font-semibold text-secondary">
                              Role
                           </p>
                           <Input
                              {...register('role')}
                              className="input grow"
                              placeholder="Enter role"
                           />
                        </div>
                     </div>
                     <div className='flex justify-end mr-2 mt-2'>
                        <div className="w-[150px] h-[150px] bg-black rounded-full "></div>
                     </div>
                  </div>
                  <div className="flex w-full gap-2">
                     <div className="flex flex-col w-1/2">
                        <p className="font-semibold text-secondary w-full">
                           Phone Number
                        </p>
                        <ArrayInput formMethods={formMethods} fieldName='phoneNumber' />
                        {/* <Input
                           {...register('phoneNumber.0', {
                              required: 'At least one phone number is required',
                           })}
                           className="input"
                           placeholder="Enter phone number"
                        /> */}
                     </div>
                     <div className="flex flex-col w-1/2">
                        <p className="font-semibold text-secondary w-full">
                           Email
                        </p>
                        <Input
                           {...register('email.0', {
                              required: 'At least one phone number is required',
                           })}
                           className="input"
                           placeholder="Enter phone number"
                        />
                     </div>
                  </div>
                  <div>
                     <p className="font-semibold text-secondary w-full">Details</p>
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
                     <div className="flex gap-1">
                        <Button
                           variant={'destructive'}
                           onClick={handleDialogueClose}
                        >
                           Delete
                        </Button>
                        <Button
                           variant={'destructiveOutline'}
                           onClick={handleDialogueClose}
                        >
                           Discard
                        </Button>
                     </div>
                     <div className="flex gap-2">
                        <Button type="submit" variant={'default'}>
                           Save
                        </Button>
                     </div>
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
   const { watch, getValues, setValue, register } = formMethods;
   const arrayValue = watch(fieldName as string) || [];

   // Add a new empty field to the array
   const handleAddField = () => {
      setValue(fieldName as string, [...arrayValue, '']);
   };

   // Remove a specific field by index
   const handleRemoveField = (index: number) => {
      const updatedArray = [...arrayValue];
      updatedArray.splice(index, 1);
      setValue(fieldName as string, updatedArray);
   };

   // Update the value of a specific field
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
               <div key={index} className="flex items-center gap-2">
                  <Input
                     {...register(inputFieldName)}
                     defaultValue={value}
                     onChange={(e) =>
                        handleInputChange(index, e.target.value)
                     }
                     className="input w-full"
                     placeholder="Enter value"
                  />
                  <button
                     type="button"
                     onClick={() => handleRemoveField(index)}
                     className="text-red-500 hover:text-red-700"
                  >
                     Remove
                  </button>
               </div>
            );
         })}
         <button
            type="button"
            onClick={handleAddField}
            className="flex border rounded-md w-fit text-sm items-center gap-1 px-1 text-blue-500 hover:text-blue-700"
         >
            <Plus className="w-3 h-3" />
            Add more
         </button>
      </div>
   );
};

export default ContactDialog;
