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
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DialogProps, FormDialogState } from '@/lib/types/dialog.types';
import { defaultProject } from 'src/components/shared/ui/constants';
import {
   FieldValues,
   UseFieldArrayReturn,
   UseFormReturn,
} from 'react-hook-form';
import { Input } from '@/components/shared/ui/primitives/Input';
import { SalesDocument } from '@types';

const DocumentItemDialog = ({
   dialogState,
   setDialogState,
   formMethods,
   fieldArrayMethods,
}: {
   dialogState: FormDialogState;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
   formMethods: UseFormReturn<SalesDocument>;
   fieldArrayMethods: UseFieldArrayReturn<SalesDocument, 'items', 'id'>;
}) => {
   const [name, setName] = useState('');
   const [rate, setRate] = useState('');
   const [quantity, setQuantity] = useState('');
   const [description, setDescription] = useState('')

   const { fields, append, remove, update } = fieldArrayMethods; // Extract the fieldArray methods

   const { setValue } = formMethods;

   useEffect(() => {
      if (dialogState.mode === 'create') {
         setName('');
         setRate('');
         setQuantity('');
         setDescription('')
      } else if (dialogState.mode === 'view') {
         setName(dialogState.data.name);
         setRate(dialogState.data.rate);
         setQuantity(dialogState.data.quantity);
         setDescription(dialogState.data.description)
      }
   }, [dialogState]);

   const handleDialogueClose = () => {
      setDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
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

   const amountValue =
      !isNaN(Number(rate)) && !isNaN(Number(quantity))
         ? Number(rate) * Number(quantity)
         : 0;

   const handleSubmit = () => {
      const index = dialogState.data.index
      const rateNumber = Number(rate)
      const quantityNumber = Number(quantity)
      update(index, {
         name,
         rate : rateNumber,
         quantity: quantityNumber,
         description: description
       });
   };

   return (
      <Dialog open={dialogState.isOpen} onOpenChange={handleDialogueClose}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Profile
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px] flex flex-col focus:outline-none bg-freelanceman-darkgrey text-white">
            <DialogHeader className="py-1 bg-transparent">
               <DialogTitle className="flex text-base w-full text-center items-center gap-1">
                  <CircleDollarSign className="w-[13px] h-[13px]" />
                  <p>{headerText()} Item</p>
               </DialogTitle>
            </DialogHeader>
            <div className="bg-background rounded-2xl text-primary">
               <div className="px-4 pt-3 flex flex-col">
                  <Input
                     onChange={(e) => setName(e.target.value)}
                     value={name}
                     type="text"
                     className="peer rounded-md order-2 w-full"
                  />
                  <label
                     htmlFor=""
                     className="text-secondary peer-focus:text-primary order-1 w-full text-sm"
                  >
                     Item
                  </label>
               </div>
               <div className="px-4 pt-2 flex flex-col">
                  <Input
                     onChange={(e) => setDescription(e.target.value)}
                     value={description}
                     type="text"
                     className="peer rounded-md order-2 w-full"
                  />
                  <label
                     htmlFor=""
                     className="text-secondary peer-focus:text-primary order-1 w-full text-sm"
                  >
                     Description (Optional)
                  </label>
               </div>
               <div className="px-4 pt-2 pb-4 flex w-full gap-2">
                  <div className="flex flex-col w-1/3">
                     <Input
                        onChange={(e) => setRate(e.target.value)}
                        value={Number(rate)}
                        type="text"
                        inputMode="numeric"
                        min={0}
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
                        onChange={(e) => setQuantity(e.target.value)}
                        value={Number(quantity)}
                        type="text"
                        inputMode="numeric"
                        min={1}
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
                     <Button
                        variant={'submit'}
                        className="text-freelanceman-darkgrey"
                        onClick={handleSubmit}
                     >
                        {dialogState.mode === 'create' && 'Add'}
                        {dialogState.mode !== 'create' && 'Save'}
                     </Button>
                  </div>
               </DialogFooter>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default DocumentItemDialog;
