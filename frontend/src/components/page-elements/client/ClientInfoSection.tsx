import { Plus, PencilLine } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { TextAreaForm, TextInputForm } from 'src/components/shared/ui/form-field-elements';
import { useForm, UseFormReturn } from 'react-hook-form';
import { ClientPayload } from '@schemas';
import { Button } from '@/components/shared/ui/primitives/Button';
import { cn } from '@/lib/helper/utils';
import { ClientSectionProps } from 'src/components/page-elements/client/props.type';

const ClientInfoSection: React.FC<ClientSectionProps> = ({
   clientData,
}: {
   clientData: ClientPayload;
}) => {
   const [mode, setMode] = useState<'view' | 'edit'>('view');
   const formMethods = useForm({
      defaultValues: clientData,
   });

   return (
      <div className="flex flex-col bg-foreground p-2 rounded-[20px] shrink-0 transition-all duration-150 shadow-md">
         <div className="flex justify-between items-center">
            <p className="text-lg px-2">Information</p>
            <PencilLine
               className="w-5 h-5 mr-1"
               onClick={() => setMode('edit')}
            />
         </div>
         <AnimatedClientInfoForm
            formMethods={formMethods}
            mode={mode}
            setMode={setMode}
         />
      </div>
   );
};

const ClientInfoForm = ({
   formMethods,
   mode,
   setMode,
}: {
   formMethods: UseFormReturn<ClientPayload>;
   mode: 'view' | 'edit';
   setMode: Dispatch<SetStateAction<'view' | 'edit'>>;
}) => {
   const { watch } = formMethods;
   const address = watch('address');
   const email = watch('email');
   const phoneNumber = watch('phoneNumber');
   const taxId = watch('taxId');

   const renderField = (
      label: string,
      value: string | undefined,
      fieldName: string,
      isTextArea = false
   ) =>
      mode === 'view' ? (
         value && (
            <div className="flex-1 shrink-0">
               <p className="text-sm text-secondary">{label}</p>
               <p>{value}</p>
            </div>
         )
      ) : isTextArea ? (
         <TextAreaForm
            formMethods={formMethods}
            fieldName={fieldName}
            label={label}
         />
      ) : (
         <TextInputForm
            formMethods={formMethods}
            fieldName={fieldName}
            label={label}
         />
      );

   if (!address && !email && !phoneNumber && !taxId && mode === 'view') {
      return (
         <div
            className="flex flex-col pt-4 pb-5 items-center justify-center text-secondary cursor-pointer"
            onClick={() => setMode('edit')}
         >
            <Plus className="h-5 w-5" />
            <p className="select-none">Add client details</p>
         </div>
      );
   }

   const handleDiscard = () => {
      setMode('view');
   };

   return (
      <form className="flex flex-col gap-2 w-full">
         {renderField('Address', address, 'address', true)}

         <div className="flex gap-3 w-full">
            {renderField('Email', email, 'email')}
            {renderField('Phone Number', phoneNumber, 'phoneNumber')}
         </div>

         {renderField('Tax ID', taxId, 'taxId')}
         <div className="flex justify-between pt-1">
            <Button
               size={'sm'}
               className=""
               variant={'destructiveOutline'}
               onClick={handleDiscard}
            >
               Discard
            </Button>
            <Button size={'sm'} className="" variant={'submit'}>
               Save
            </Button>
         </div>
      </form>
   );
};

const AnimatedClientInfoForm = ({
   formMethods,
   mode,
   setMode,
}: {
   formMethods: UseFormReturn<ClientPayload>;
   mode: 'view' | 'edit';
   setMode: Dispatch<SetStateAction<'view' | 'edit'>>;
}) => {
   const { watch } = formMethods;
   const address = watch('address');
   const email = watch('email');
   const phoneNumber = watch('phoneNumber');
   const taxId = watch('taxId');

   const renderField = (
      label: string,
      value: string | undefined,
      fieldName: string,
      isTextArea = false
   ) =>
      mode === 'view' ? (
         value && (
            <div className="flex-1 shrink-0">
               <p className="text-sm text-secondary">{label}</p>
               <p>{value}</p>
            </div>
         )
      ) : isTextArea ? (
         <TextAreaForm
            formMethods={formMethods}
            fieldName={fieldName}
            label={label}
         />
      ) : (
         <TextInputForm
            formMethods={formMethods}
            fieldName={fieldName}
            label={label}
         />
      );

   const handleDiscard = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setMode('view');
   };

   return (
      <div className="flex flex-col w-full p-2">
         {mode === 'view' && !address && !email && !phoneNumber && !taxId && (
            <div
               className="flex flex-col items-center justify-center text-secondary cursor-pointer"
               onClick={() => setMode('edit')}
            >
               <Plus className="h-5 w-5" />
               <p className="select-none">Add client details</p>
            </div>
         )}
         {mode === 'view' && (
            <div className="flex flex-col gap-2">
               {address && (
                  <div>
                     <label className="text-secondary text-sm">Address</label>
                     <p>{address}</p>
                  </div>
               )}
               {email && (
                  <div className="flex flex-1 flex-col">
                     <label className="text-secondary text-sm">Email</label>
                     <p>{email}</p>
                  </div>
               )}
               {phoneNumber && (
                  <div className="flex flex-1 flex-col">
                     <label className="text-secondary text-sm">
                        Phone Number
                     </label>
                     <p>{phoneNumber}</p>
                  </div>
               )}
               {taxId && (
                  <div>
                     <label className="text-secondary text-sm">Tax ID</label>
                     <p>{taxId}</p>
                  </div>
               )}
            </div>
         )}
         {mode === 'edit' && (
            <form className="flex flex-col gap-2">
               <TextAreaForm
                  formMethods={formMethods}
                  fieldName="address"
                  label="Address"
               />
               <div className="flex gap-2 w-full">
                  <TextInputForm
                     formMethods={formMethods}
                     fieldName="email"
                     label="Email"
                  />
                  <TextInputForm
                     formMethods={formMethods}
                     fieldName="phoneNumber"
                     label="Phone Number"
                  />
               </div>
               <TextInputForm
                  formMethods={formMethods}
                  fieldName="taxId"
                  label="Tax ID"
               />
               <div className="flex justify-between pt-1">
                  <Button
                     size={'sm'}
                     variant={'destructiveOutline'}
                     onClick={handleDiscard}
                  >
                     Discard
                  </Button>
                  <Button size={'sm'} variant={'submit'}>
                     Save
                  </Button>
               </div>
            </form>
         )}
      </div>
   );
};

export default ClientInfoSection;
