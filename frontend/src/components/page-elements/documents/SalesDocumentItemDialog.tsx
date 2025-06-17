import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from 'src/components/shared/ui/primitives/Dialog';
import { Button } from 'src/components/shared/ui/primitives/Button';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormDialogState } from 'src/lib/types/form-dialog.types';
import { UseFieldArrayReturn, useForm } from 'react-hook-form';
import { Input } from '@/components/shared/ui/primitives/Input';
import { SalesDocumentItemDto } from 'freelanceman-common';
import {
   Label,
   TextInputForm,
} from '@/components/shared/ui/form-field-elements';
import { cn } from '@/lib/helper/utils';
import { Plus } from 'lucide-react';
import { NumberInputForm } from '@/components/shared/ui/form-field-elements/NumberInputForm';

const SalesDocumentItemDialog = ({
   dialogState,
   setDialogState,
   fieldArrayMethods,
}: {
   dialogState: FormDialogState;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
   fieldArrayMethods: UseFieldArrayReturn<any>;
}) => {
   const { fields, append, remove, update } = fieldArrayMethods;

   const formMethods = useForm<SalesDocumentItemDto>();
   const { reset, setError, clearErrors, handleSubmit, getValues } = formMethods;

   useEffect(() => {
      reset(dialogState.data)
   }, [dialogState]);

   const handleDialogueClose = () => {
      setDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
   };

   const handleDeleteItem = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (
         dialogState.mode === 'edit' &&
         dialogState.data?.index !== undefined
      ) {
         remove(dialogState.data.index);
         handleDialogueClose();
      } else if (dialogState.mode === 'create') {
         handleDialogueClose();
      }
   };

   const onSubmit = () => {
      const data = getValues()
      const rate = Number(data.rate);
      const quantity = Number(data.quantity);
      const itemName = data.title
   
      clearErrors(['rate', 'quantity']);
   
      let hasError = false;
   
      if (isNaN(rate) || rate < 1) {
         setError('rate', { type: 'manual', message: 'Must be a number and at least 1' });
         hasError = true;
      }
   
      if (isNaN(quantity) || quantity < 1) {
         setError('quantity', { type: 'manual', message: 'Must be a number and at least 1' });
         hasError = true;
      }
   
      if (!itemName) {
         setError('title', { type: 'manual', message: 'Please specify the item.' });
         hasError = true;
      }

      if (hasError) return;
   
      if (dialogState.mode === 'create') {
         append({ ...data, rate, quantity });
      } else if (dialogState.mode === 'edit' && dialogState.data?.index !== undefined) {
         update(dialogState.data.index, { ...data, rate, quantity });
      }
      handleDialogueClose();
   };

   return (
      <Dialog open={dialogState.isOpen} onOpenChange={handleDialogueClose}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Profile
            </Button>
         </DialogTrigger>
         <DialogContent 
          className={cn(
                        'sm:max-w-[425px] flex flex-col focus:outline-none bg-constant-primary text-white',
                     )}
         >
            <DialogHeader className="py-1 bg-transparent">
               <DialogTitle className="flex text-base w-full text-center items-center gap-1">
                     <Plus className='w-[14px] h-[15px]'/> Add an Item
                     </DialogTitle>
            </DialogHeader>
            <form
               className="bg-background rounded-2xl text-primary"
            >
               <div className="px-4 pt-3 flex flex-col">
                  <Label className="text-secondary peer-focus:text-primary w-full text-sm">
                     Item
                  </Label>
                  <TextInputForm
                     formMethods={formMethods}
                     fieldName="title"
                     errorMessage="Please name the item"
                     required
                  />
               </div>
               <div className="px-4 pt-3 flex flex-col">
                  <Label className="text-secondary peer-focus:text-primary w-full text-sm">
                     Description (optional)
                  </Label>
                  <TextInputForm
                     formMethods={formMethods}
                     fieldName="description"
                  />
               </div>
               <div className="px-4 pt-2 pb-4 flex w-full gap-2">
                  <div className="flex flex-col w-1/2">
                     <Label className="text-secondary peer-focus:text-primary w-full text-sm">
                        Rate
                     </Label>
                     <NumberInputForm
                        formMethods={formMethods}
                        fieldName="rate"
                        mode='plain'
                        errorMessage="Please add rate"
                        required
                     />
                  </div>
                  <div className="flex flex-col w-1/2">
                     <Label className="text-secondary peer-focus:text-primary w-full text-sm">
                        Quantity
                     </Label>
                     <NumberInputForm
                        formMethods={formMethods}
                        fieldName="quantity"
                        mode='plain'
                        errorMessage="Please add quantity"
                        required
                     />
                  </div>
               </div>
               <DialogFooter>
                  <div className="flex justify-between p-4">
                     <Button
                        variant={'destructiveOutline'}
                        onClick={handleDeleteItem}
                     >
                        Delete
                     </Button>
                     <Button
                        variant={'submit'}
                        onClick={(e) => {
                           e.preventDefault()
                           onSubmit()
                        }}
                        className="text-freelanceman-darkgrey"
                     >
                        {dialogState.mode === 'create' && 'Add'}
                        {dialogState.mode !== 'create' && 'Save'}
                     </Button>
                  </div>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
};

export default SalesDocumentItemDialog;
