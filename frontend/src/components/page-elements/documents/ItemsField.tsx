import { useEffect, useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { X, Plus } from 'lucide-react';
import SalesDocumentItemDialog from '@/components/page-elements/documents/SalesDocumentItemDialog';
import { FormDialogState } from 'src/lib/types/form-dialog.types';
import AdjustmentsField from '@/components/page-elements/documents/AdjustmentsField';
import { defaultSalesDocumentItemValue } from '@/components/shared/ui/helpers/constants/default-values';
import { cn } from '@/lib/helper/utils';
import { SalesDocumentFindOneResponse, SalesDocumentItemCore } from 'freelanceman-common';
import { ScrollArea } from '@/components/shared/ui/primitives/ScrollArea';

const ItemsField = ({
   formMethods,
}: {
   formMethods: UseFormReturn<SalesDocumentFindOneResponse>;
}) => {
   const [dialogState, setDialogState] = useState<FormDialogState>({
      type: 'salesDocumentItem',
      mode: 'create',
      isOpen: false,
      data: {},
      entity: 'salesDocumentItem',
      openedOn: 'documentPage',
   });
   const {
      control,
      watch,
      formState: { errors, isSubmitted },
      setError,
      clearErrors,
   } = formMethods;
   const items = watch('items');
   const fieldArrayMethods = useFieldArray<SalesDocumentFindOneResponse>({
      control,
      name: 'items',
   });

   useEffect(() => {
      if (!isSubmitted) return;

      if (!items || items.length === 0) {
         setError('items', {
            type: 'manual',
            message: 'At least one item is required',
         });
      } else {
         clearErrors('items');
      }
   }, [items, isSubmitted, setError, clearErrors]);

   const { remove, fields } = fieldArrayMethods;
   const adjustmentPercent = watch('discountPercent') ?? 0;
   const adjustmentFlat = watch('discountFlat') ?? 0;
   const tax = watch('tax') ?? 0;

   let subtotal = 0;
   if (items) {
      items.forEach((item) => {
         subtotal += item.rate * item.quantity;
      });
   }

   let adjustedSubtotal =
      subtotal * (1 - adjustmentPercent / 100) - adjustmentFlat;

   let total = adjustedSubtotal * (1 + tax / 100);

   const handleViewItem = (itemData: any, index: number) => {
      setDialogState((prev) => {
         return {
            ...prev,
            isOpen: true,
            mode: 'edit',
            type: 'salesDocumentItem',
            entity: 'salesDocumentItem',
            data: { ...itemData, index },
         };
      });
   };

   const handleNewItem = () => {
      setDialogState((prev) => {
         return {
            ...prev,
            mode: 'create',
            type: 'salesDocumentItem',
            entity: 'salesDocumentItem',
            isOpen: true,
            data: { ...defaultSalesDocumentItemValue },
         };
      });
   };

   const currency = watch('currency');

   const itemList = fields.map((field, index) => {
      return (
         <ItemBar
            key={field.id}
            item={field}
            index={index}
            handleEdit={() => handleViewItem(field, index)}
            handleDelete={remove}
            currency={currency!}
         />
      );
   });

   const fieldError = errors.items;

   return (
      <fieldset
         className={cn(
            'flex flex-col grow justify-between h-[200px] rounded-xl border border-tertiary p-3 relative gap-3 overflow-y-auto',
            'sm:h-fit',
            fieldError && 'border-general-red'
         )}
      >
         <ScrollArea>
            <div className="flex flex-col gap-2 grow overflow-auto">
               <div className="flex flex-col gap-2 order-2 grow overflow-auto items-center">
                  {itemList}
                  <div
                     className="cursor-pointer border p-[5px] rounded-xl hover:bg-tertiary transition-colors duration-75"
                     onClick={handleNewItem}
                  >
                     <Plus className="stroke-[3px]" />
                  </div>
               </div>
               <h2 className="text-lg text-secondary peer-focus-within:text-primary order-1 flex justify-between items-center ">
                  Items & Pricing
                  {errors.items && typeof errors.items.message === 'string' && (
                     <p className="text-general-red text-sm pl-2 animate-shake">
                        {errors.items?.message as string}
                     </p>
                  )}
               </h2>
            </div>
         </ScrollArea>
         <AdjustmentsField formMethods={formMethods} />
         <footer className="flex w-full px-3 text-secondary justify-end gap-4">
            <span>
               Subtotal:{' '}
               <span className="text-primary">{subtotal.toLocaleString()}</span>
            </span>
            <span>
               Total:{' '}
               <span className="text-primary">{total.toLocaleString()}</span>
            </span>
         </footer>
         <SalesDocumentItemDialog
            dialogState={dialogState}
            setDialogState={setDialogState}
            fieldArrayMethods={fieldArrayMethods}
         />
      </fieldset>
   );
};

const ItemBar = ({
   item,
   index,
   handleEdit,
   handleDelete,
   currency,
}: {
   item: SalesDocumentItemCore;
   index: number;
   handleEdit: (itemData: any) => void;
   handleDelete: (index: number) => void;
   currency: string;
}) => {
   const amount = item.rate * item.quantity;

   return (
      <div className="flex h-fit w-full rounded-[9px] border border-tertiary overflow-hidden shrink-0">
         <div
            className="flex h-fit justify-between items-start grow pl-2 py-2"
            onClick={() => handleEdit(item)}
         >
            <div className="leading-snug pr-4">
               <p className="line-clamp-2">{item.title}</p>
               <p className="text-sm text-secondary line-clamp-1">
                  {item.description}
               </p>
            </div>
            <div className="leading-snug flex w-[215px] shrink-0">
               <div className="text-center w-1/3">
                  <p className="text-sm text-secondary">Rate</p>
                  <p>{item.rate.toLocaleString()}</p>
                  <p className="text-sm">{currency}</p>
               </div>
               <div className="text-center w-1/3">
                  <p className="text-sm text-secondary">Quantity</p>
                  <p>{item.quantity}</p>
               </div>
               <div className="text-center w-1/3">
                  <p className="text-sm text-secondary">Amount</p>
                  <p>{amount.toLocaleString()}</p>
                  <p className="text-sm">{currency}</p>
               </div>
            </div>
         </div>
         <div
            className="flex items-center justify-center shrink-0 bg-button-red px-[1px] cursor-pointer opacity-25 hover:opacity-100 transition-opacity"
            onClick={(e) => {
               e.stopPropagation();
               handleDelete(index);
            }}
         >
            <X className="w-[12px] h-[12px] stroke-[3px] text-freelanceman-darkgrey cursor-pointer text-white" />
         </div>
      </div>
   );
};

export default ItemsField;
