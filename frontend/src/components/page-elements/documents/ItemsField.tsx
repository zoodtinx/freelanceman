import { SalesDocument, SalesDocumentItem } from '@types';
import React, { useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { X, Plus } from 'lucide-react';
import DocumentItemDialog from '@/components/page-elements/documents/DocumentItemDialog';
import { FormDialogState } from 'src/lib/types/form-dialog.types';
import AdjustmentsField from '@/components/page-elements/documents/AdjustmentsField';

const ItemsField = ({
   formMethods,
}: {
   formMethods: UseFormReturn<SalesDocument>;
}) => {
   const [dialogState, setDialogState] = useState<FormDialogState>({
      type: 'invoice',
      mode: 'create',
      id: '',
      isOpen: false,
      data: {},
   });
   const { control, watch } = formMethods;
   const fieldArrayMethods = useFieldArray<SalesDocument>({
      control,
      name: 'items',
   });

   const { remove, fields } = fieldArrayMethods;

   const subtotal = 2000;
   const discount = 2000;
   const tax = 2000;
   const total = 2000;

   const handleViewItem = (itemData, index) => {
      setDialogState((prev) => {
         return {
            ...prev,
            isOpen: true,
            mode: 'view',
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
         };
      });
   };
   
   const currency = watch('currency')

   const itemList = fields.map((field, index) => {
      return (
         <ItemBar
            key={field.id}
            item={field as unknown as SalesDocumentItem}
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
         <footer className="footer-summary flex w-full justify-between px-3 text-secondary ">
            <span>
               Subtotal: <span className="text-primary">{subtotal}</span>
            </span>
            <span>
               Discount: <span className="text-primary">{discount}</span>
            </span>
            <span>
               Tax: <span className="text-primary">{tax}</span>
            </span>
            <span>
               Total: <span className="text-primary">{total}</span>
            </span>
         </footer>
         <DocumentItemDialog
            dialogState={dialogState}
            setDialogState={setDialogState}
            fieldArrayMethods={fieldArrayMethods}
            formMethods={formMethods}
         />
      </fieldset>
   );
};

const ItemBar = ({
   item,
   index,
   handleEdit,
   handleDelete,
   currency
}: {
   item: SalesDocumentItem;
   index: number;
   handleEdit: (itemData: any) => void;
   handleDelete: (index: number) => void;
   currency: string
}) => {


   return (
      <div className="flex flex-col gap-2 peer cursor-default w-full">
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
                     <p>{item?.amount?.toLocaleString() || ''}</p>
                     <p className="text-sm">{currency}</p>
                  </div>
               </div>
            </div>
            <div className="flex w-[20px] items-center justify-center shrink-0">
               <X
                  className="w-[13px] h-[13px] stroke-[3px] text-freelanceman-darkgrey cursor-pointer"
                  onClick={() => handleDelete(index)}
               />
            </div>
         </div>
      </div>
   );
};

export default ItemsField;
