import { TextInput, TextAreaInput } from '@/components/shared/ui/form-field-elements/TextInput';
import { mockItems } from '@mocks';
import { Button } from '@/components/shared/ui/primitives/Button';
import { SalesDocument, SalesDocumentItem } from '@types';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm, useFieldArray, UseFormReturn, FieldValues, Path, ArrayPath, FieldArrayWithId } from 'react-hook-form';
import { X, Plus } from 'lucide-react';
import DocumentItemDialog from '@/components/page-elements/documents/DocumentItemDialog';
import { FormDialogState } from '@/lib/types/dialog.types';

const CreateDocumentPage: React.FC = () => {
   const formMethods = useForm<SalesDocument>({
      defaultValues: { projectTitle: 'Hello', items: mockItems },
   });

   return (
      <>
         <form className="flex flex-col grow gap-3">
            <div className="flex grow gap-3">
               <div className="flex flex-col w-1/2 h-full gap-3">
                  <ProjectInfoField formMethods={formMethods} />
                  <PartyInfoField formMethods={formMethods} />
               </div>
               <div className="flex flex-col w-1/2 h-full gap-3">
                  <ItemsField formMethods={formMethods} />
                  <AdjustmentsField formMethods={formMethods} />
               </div>
            </div>
            <footer className="flex pb-2 justify-between">
               <div>
                  <Button variant={'destructive'}>Delete</Button>
               </div>
               <div className="flex gap-2">
                  <Button variant={'outline'}>Save Draft</Button>
                  <Button variant={'submit'} className='bg-freelanceman-cyan text-freelanceman-darkgrey' >Create PDF</Button>
               </div>
            </footer>
         </form>
      </>
   );
};

const ProjectInfoField = ({ formMethods }) => {
   return (
      <fieldset className="flex flex-col h-2/5 rounded-xl border border-tertiary p-3 relative gap-3">
         <div className="flex flex-col">
            <div className="flex gap-2 peer order-2">
               <div className="peer flex-1">
                  <TextInput fieldName="number" label="Number" formMethods={formMethods} />
               </div>
               <div className="peer flex-1">
                  <TextInput fieldName="issuedAt" label="Date" formMethods={formMethods} />
               </div>
               <div className="peer flex-1">
                  <TextInput fieldName="currency" label="Currency" formMethods={formMethods} />
               </div>
            </div>
            <h2 className="text-lg text-secondary peer-focus-within:text-primary order-1">
               Quotation Info
            </h2>
         </div>
         <div className="flex flex-col grow">
            <div className="flex flex-col gap-2 peer order-2 h-full">
               <TextInput fieldName="projectTitle" label="Project Title" formMethods={formMethods} />
               <TextInput fieldName="referenceNumber" label="Reference Number" formMethods={formMethods} />
               <TextAreaInput fieldName="projectDescription" label="Project Details" formMethods={formMethods} />
            </div>
            <div className="text-lg text-secondary peer-focus-within:text-primary order-1 flex justify-between items-end">
               <p>Project Info</p>
               <button className="h-6 text-sm px-2 rounded-lg font-medium text-primary border border-primary">
                  Select a project
               </button>
            </div>
         </div>
      </fieldset>
   );
};

const PartyInfoField = ({ formMethods }) => {
   return (
      <fieldset className="flex flex-col h-3/5 rounded-xl border border-tertiary p-3 relative gap-3">
         <div className="flex flex-col h-full">
            <div className="flex flex-col gap-2 peer order-2 h-full">
               <div className="flex gap-2">
                  <TextInput fieldName="freelancerName" label="Project Title" formMethods={formMethods} className="flex-1" />
                  <TextInput fieldName="freelancerTaxId" label="Reference Number" formMethods={formMethods} className="flex-1" />
               </div>
               <div className="flex gap-2">
                  <TextInput fieldName="freelancerPhone" label="Phone Number" formMethods={formMethods} className="flex-1" />
                  <TextInput fieldName="freelancerTaxId" label="Tax ID" formMethods={formMethods} className="flex-1" />
               </div>
               <TextAreaInput fieldName="freelancerDetail" label="Additional Detail" formMethods={formMethods} />
            </div>
            <div className="text-lg text-secondary peer-focus-within:text-primary order-1 flex justify-between items-end">
               <h2>Freelancer Info</h2>
               <button className="h-6 text-sm px-2 rounded-lg font-medium text-primary border border-primary">
                  Use your profile
               </button>
            </div>
         </div>
         <div className="flex flex-col">
            <div className="flex flex-col gap-2 peer order-2">
               <div className="flex gap-2">
                  <TextInput fieldName="clientName" label="Name" formMethods={formMethods} className="flex-1" />
                  <TextInput fieldName="clientTaxId" label="Tax ID" formMethods={formMethods} className="flex-1" />
               </div>
               <TextInput fieldName="clientAddress" label="Address" formMethods={formMethods} className="flex-1" />
               <div className="flex gap-2">
                  <TextInput fieldName="clientPhone" label="Phone Number" formMethods={formMethods} className="flex-1" />
                  <TextInput fieldName="clientOffice" label="Office" formMethods={formMethods} className="flex-1" />
               </div>
               <TextAreaInput fieldName="clientDetail" label="Additional Detail" formMethods={formMethods} />
            </div>
            <div className="text-lg text-secondary peer-focus-within:text-primary order-1 flex justify-between items-end">
               <h2>Client Info</h2>
               <button className="h-6 text-sm px-2 rounded-lg font-medium text-primary border border-primary">
                  Use your profile
               </button>
            </div>
         </div>
      </fieldset>
   );
};


const AdjustmentsField = ({ formMethods }) => {
   return (
      <fieldset className="h-2/7 rounded-xl border border-tertiary p-3">
         <div className="flex flex-col">
            <div className="flex flex-col gap-2 peer order-2">
               <div className="flex gap-2">
                  <TextInput fieldName="subtotal" label="Subtotal" formMethods={formMethods} className="flex-1" />
                  <TextInput fieldName="discount" label="Discount" formMethods={formMethods} className="flex-1" />
               </div>
               <div className="flex gap-2">
                  <TextInput fieldName="tax" label="Tax" formMethods={formMethods} className="flex-1" />
                  <TextInput fieldName="customAdjustment" label="Custom Adjustment" formMethods={formMethods} className="flex-1" />
               </div>
               <TextAreaInput fieldName="note" label="Additional Notes" formMethods={formMethods} />
            </div>
            <h2 className="text-lg text-secondary peer-focus-within:text-primary order-1">
               Adjustments & Notes
            </h2>
         </div>
      </fieldset>
   );
};


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
   const { control, register,watch } = formMethods;
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

   const itemList = fields.map((field, index) => {
      return (
         <ItemBar
            key={field.id}
            item={field as unknown as SalesDocumentItem}
            index={index}
            handleEdit={() => handleViewItem(field, index)}
            handleDelete={remove}
         />
      );
   });

   const items = watch('items')
   console.log('items', items)


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
   handleDelete
}: {
   item: SalesDocumentItem;
   index: number;
   handleEdit: (itemData: any) => void;
   handleDelete: (index: number) => void;
}) => {
   const currency = 'THB';

   return (
      <div className="flex flex-col gap-2 peer cursor-default">
         <div className="flex h-fit bg-freelanceman-green rounded-md">
            <div
               className="flex h-fit bg-foreground justify-between rounded-md border border-tertiary items-start grow px-2 py-2"
               onClick={() => handleEdit(item)}
            >
               <div className="leading-snug mr-2">
                  <p className="line-clamp-2">{item.name}</p>
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



export default CreateDocumentPage;
