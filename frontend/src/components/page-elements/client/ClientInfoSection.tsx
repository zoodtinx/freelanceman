import React from 'react';
import {
   TextAreaInput,
   TextInput,
} from '@/components/shared/ui/form-field-elements/TextInputForm';
import { useForm } from 'react-hook-form';

const ClientInfoSection: React.FC = () => {
   const formMethods = useForm();
   return (
      <div className="flex flex-col bg-foreground p-4 rounded-3xl h-[250px] shrink-0">
         <p className="text-lg">Information</p>
         <form action="" className="flex flex-col gap-2 grow">
            <TextAreaInput
               formMethods={formMethods}
               fieldName="address"
               label="Address"
               className="flex grow"
            />
            <div className="flex gap-2">
               <TextInput
                  formMethods={formMethods}
                  fieldName="email"
                  label="Email"
                  className="w-1/2"
               />
               <TextInput
                  formMethods={formMethods}
                  fieldName="phoneNumber"
                  label="Phone Number"
                  className="w-1/2"
               />
            </div>
            <TextInput
               formMethods={formMethods}
               fieldName="taxId"
               label="Tax ID"
            />
         </form>
      </div>
   );
};

export default ClientInfoSection;
