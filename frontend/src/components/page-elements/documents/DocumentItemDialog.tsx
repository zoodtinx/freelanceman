import {
   TextInput,
   TextAreaInput,
} from '@/components/shared/ui/form-field-elements/TextInput';
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from 'src/components/shared/ui/primitives/Dialog';
import { Button } from 'src/components/shared/ui/primitives/Button';
import { CircleDollarSign } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { DialogProps } from '@/lib/types/dialog.types';
import { defaultProject } from 'src/components/shared/ui/constants';
import { Path, SubmitHandler, useForm } from 'react-hook-form';
import type { NewTaskPayload, Project, SalesDocumentItem } from '@types';
import { Input } from '@/components/shared/ui/primitives/Input';

const DocumentItemDialog: React.FC<DialogProps> = ({
   dialogState,
   setDialogState,
}) => {

   const formMethods = useForm<SalesDocumentItem>({
      defaultValues: dialogState.data,
   });

   const { handleSubmit, reset, register, watch } = formMethods;

   useEffect(() => {
      if (dialogState.mode === 'create') {
         reset({})   
      } else if (dialogState.mode === 'view') {
         reset(dialogState.data)
      }
   },[dialogState, reset])

   const handleDialogueClose = () => {
      setDialogState({
         isOpen: false,
         id: '',
         mode: 'view',
         type: 'project',
         data: defaultProject,
      });
   };

   useEffect(() => {
      formMethods.reset(dialogState.data);
   }, [dialogState.data, formMethods]);

   const onError = (errors: any) => {
      console.error('Validation Errors:', errors);
   };

   const onSubmit: SubmitHandler<NewTaskPayload> = (data) => {
      console.log(data);
   };

   const headerText = () => {
      switch (dialogState.type) {
         case 'quotation':
            return 'Quotation';
         case 'invoice':
            return 'Invoice';
         case 'receipt':
            return 'Receipt';
         default:
            return '';
      }
   };

   console.log('dialogState.type', dialogState.data)

   const rate = watch('rate')
   const quantity = watch('quantity')

   const amountValue =
      !isNaN(Number(rate)) && !isNaN(Number(quantity))
         ? Number(rate) * Number(quantity)
         : 0; 


   return (
      <Dialog open={dialogState.isOpen} onOpenChange={handleDialogueClose}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Profile
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px] flex flex-col focus:outline-none bg-freelanceman-darkgrey text-white">
            <form onSubmit={handleSubmit(onSubmit, onError)}>
               <DialogHeader className="py-1 bg-transparent">
                  <DialogTitle className="flex text-base w-full text-center items-center gap-1">
                     <CircleDollarSign className="w-[13px] h-[13px]" />
                     <p>{headerText()} Item</p>
                  </DialogTitle>
               </DialogHeader>
               <div className="bg-background rounded-2xl text-primary">
                  <div className="px-4 pt-3">
                     <TextInput
                        fieldName="name"
                        formMethods={formMethods}
                        label="Item"
                     />
                  </div>
                  <div className="px-4 pt-2 pb-4 flex w-full gap-2">
                     <div className="flex flex-col w-1/3">
                        <Input
                           {...register('rate')}
                           type="number"
                           min="0"
                           className="peer rounded-md order-2 w-full"
                        />
                        <label
                           htmlFor=""
                           className="text-secondary peer-focus:text-primary order-1 w-full text-sm"
                        >
                           Rate
                        </label>
                     </div>
                     <div className="flex flex-col w-1/3">
                        <Input
                           {...register('quantity')}
                           type="number"
                           value={quantity}
                           min="0"
                           className="peer rounded-md order-2 w-full"
                        />
                        <label
                           htmlFor=""
                           className="text-secondary peer-focus:text-primary order-1 w-full text-sm"
                        >
                           Quantity
                        </label>
                     </div>
                     <div className="flex flex-col w-1/3">
                        <p className="flex px-2 peer rounded-md order-2 items-center h-8 bg-tertiary w-full">
                           {amountValue.toLocaleString()}
                        </p>
                        <label
                           htmlFor=""
                           className="text-secondary peer-focus:text-primary order-1 w-full text-sm"
                        >
                           Amount
                        </label>
                     </div>
                  </div>
                  <DialogFooter>
                     <div className="flex justify-between p-4">
                        <Button variant={'destructiveOutline'}>Delete</Button>
                        <Button variant={'submit'} className='text-freelanceman-darkgrey'>Add</Button>
                     </div>
                  </DialogFooter>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   );
};

export default DocumentItemDialog;
