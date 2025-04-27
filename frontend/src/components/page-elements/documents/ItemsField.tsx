import { useEffect, useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { X, Plus } from 'lucide-react';
import SalesDocumentItemDialog from '@/components/page-elements/documents/SalesDocumentItemDialog';
import { FormDialogState } from 'src/lib/types/form-dialog.types';
import AdjustmentsField from '@/components/page-elements/documents/AdjustmentsField';
import {
   EditSalesDocumentItemDto,
   SalesDocumentItemDto,
   SalesDocumentPayload,
} from 'freelanceman-common';
import { defaultSalesDocumentItemValue } from '@/components/shared/ui/helpers/constants/default-values';

const ItemsField = ({
   formMethods,
}: {
   formMethods: UseFormReturn<SalesDocumentPayload>;
}) => {
   const [dialogState, setDialogState] = useState<FormDialogState>({
      type: 'sales-document-item',
      mode: 'create',
      isOpen: false,
      data: {},
      entity: 'sales-document-item',
      openedOn: 'global-add-button',
   });
   const { control, watch } = formMethods;
   const items = watch('items')
   const fieldArrayMethods = useFieldArray<SalesDocumentPayload>({
      control,
      name: 'items',
   });

   const { remove, fields } = fieldArrayMethods;
   const adjustmentPercent = Number(watch('discountPercent')) || 0
   const adjustmentFlat = Number(watch('discountFlat')) || 0
   const tax = Number(watch('tax')) || 0
   
   let subtotal = 0
   if (items) {
     items.forEach((item) => {
       subtotal += item.rate * item.quantity
     })
   }
   
   let adjustedSubtotal = subtotal * (1 - adjustmentPercent / 100) - adjustmentFlat
   
   let total = adjustedSubtotal * (1 + tax / 100)

   const handleViewItem = (itemData, index) => {
      setDialogState((prev) => {
         return {
            ...prev,
            isOpen: true,
            mode: 'edit',
            data: { ...itemData, index },
         };
      });
   };

   const handleNewItem = () => {
      setDialogState((prev) => {
         return {
            ...prev,
            mode: 'create',
            isOpen: true,
            data: {...defaultSalesDocumentItemValue}
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
            currency={currency}
         />
      );
   });

   return (
      <fieldset className="flex flex-col grow justify-between h-[200px] rounded-xl border border-tertiary p-3 relative gap-3">
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
            <h2 className="text-lg text-secondary peer-focus-within:text-primary order-1">
               Items & Pricing
            </h2>
         </div>
         <AdjustmentsField formMethods={formMethods} />
         <footer className="flex w-full px-3 text-secondary justify-end gap-5">
            <span>
               Subtotal: <span className="text-primary">{subtotal.toLocaleString()}</span>
            </span>
            <span>
               Total: <span className="text-primary">{total.toLocaleString()}</span>
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
   item: SalesDocumentItemDto;
   index: number;
   handleEdit: (itemData: any) => void;
   handleDelete: (index: number) => void;
   currency: string;
}) => {
   const amount = item.rate * item.quantity;

   return (
      <div className="flex flex-col gap-2 peer w-full cursor-pointer">
         <div className="flex h-fit bg-freelanceman-green rounded-md">
            <div
               className="flex h-fit bg-foreground justify-between rounded-md border border-tertiary items-start grow px-2 py-2"
               onClick={() => handleEdit(item)}
            >
               <div className="leading-snug mr-2">
                  <p className="line-clamp-2">{item.title}</p>
                  <p className="text-sm text-secondary line-clamp-1">
                     {item.description}
                  </p>
               </div>
               <div className="leading-snug flex w-[230px] shrink-0">
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
            <div className="flex items-center justify-center shrink-0 ml-2 mr-1">
               <X
                  className="w-[15px] h-[15px] stroke-[3px] text-freelanceman-darkgrey cursor-pointer text-secondary hover:text-general-red"
                  onClick={() => handleDelete(index)}
               />
            </div>
         </div>
      </div>
   );
};

export default ItemsField;
