import { Plus } from 'lucide-react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
   TextAreaInput,
   TextInput,
} from '@/components/shared/ui/form-field-elements/TextInputForm';
import { useForm, UseFormReturn } from 'react-hook-form';
import { Client } from '@types';
import { Button } from '@/components/shared/ui/primitives/Button';

const ClientInfoSection = ({ clientData }: { clientData: Client }) => {
   const [mode, setMode] = useState<'view' | 'edit'>('view');
   const formMethods = useForm({
      defaultValues: clientData,
   });

   return (
      <div className="flex flex-col bg-foreground p-4 rounded-3xl shrink-0 transition-all duration-150">
         <p className="text-lg">Information</p>
         <ClientInfoForm formMethods={formMethods} mode={mode} setMode={setMode} />
      </div>
   );
};

const ClientInfoForm = ({
   formMethods,
   mode,
   setMode
}: {
   formMethods: UseFormReturn<Client>;
   mode: 'view' | 'edit';
   setMode: Dispatch<SetStateAction<'view' | 'edit'>>
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
            <div className='flex-1 shrink-0'>
               <p className="text-sm text-secondary">{label}</p>
               <p>{value}</p>
            </div>
         )
      ) : isTextArea ? (
         <TextAreaInput
            formMethods={formMethods}
            fieldName={fieldName}
            label={label}
         />
      ) : (
         <TextInput
            formMethods={formMethods}
            fieldName={fieldName}
            label={label}
         />
      );

   if (!address && !email && !phoneNumber && !taxId && mode === 'view') {
      return (
         <div className="flex flex-col pt-4 pb-5 items-center justify-center text-secondary cursor-pointer" onClick={() => setMode('edit')}>
            <Plus className="h-5 w-5" />
            <p className="select-none">Add client details</p>
         </div>
      );
   }

   const handleDiscard = () => {
      setMode('view')
   }

   return (
      <form className="flex flex-col gap-2 w-full">
         {renderField('Address', address, 'address', true)}

         <div className="flex gap-3 w-full">
            {renderField('Email', email, 'email')}
            {renderField('Phone Number', phoneNumber, 'phoneNumber')}
         </div>

         {renderField('Tax ID', taxId, 'taxId')}
         <div className='flex justify-between pt-1'>
            <Button size={'sm'} className='' variant={'destructiveOutline'} onClick={handleDiscard} >Discard</Button>
            <Button size={'sm'} className='' variant={'submit'} >Save</Button>
         </div>
      </form>
   );
};

export default ClientInfoSection;
