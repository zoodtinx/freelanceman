import {
   TextInputForm,
   TextAreaForm,
   Label,
} from 'src/components/shared/ui/form-field-elements';
import {
   ClientPayload,
   SalesDocumentPayload,
} from 'freelanceman-common/src/schemas';
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useClientsQuery } from '@/lib/api/client-api';
import { UseQueryResult } from '@tanstack/react-query';
import { ClientListPayload } from 'freelanceman-common';
import { cn } from '@/lib/helper/utils';

const ClientInfoField = ({
   formMethods,
}: {
   formMethods: UseFormReturn<SalesDocumentPayload>;
}) => {
   // const userData = some logic to fetch user data
   const [searchTerm, setSearchTerm] = useState({});
   const [clientData, setClientData] = useState<ClientPayload | undefined>();
   const { data: clientList, isLoading } = useClientsQuery(
      searchTerm
   ) as UseQueryResult<ClientListPayload>;

   const {
      setValue,
      formState: { errors },
   } = formMethods;

   useEffect(() => {
      if (clientData) {
         setValue('clientId', clientData.id);
         setValue('clientName', clientData.name);
         setValue('clientTaxId', clientData.taxId);
         setValue('clientAddress', clientData.address);
         setValue('clientPhone', clientData.phoneNumber);
         setValue('clientDetail', clientData.detail);
      }
   }, [clientData, setValue]);

   const error = errors.clientName;

   return (
      <fieldset
         className={cn(
            'flex flex-1 flex-col grow rounded-xl border border-tertiary p-3 relative gap-3',
            error && 'border-general-red'
         )}
      >
         <div className="flex flex-col h-full">
            <div className="flex flex-col gap-2 peer order-2 h-full">
               <div className="flex gap-2">
                  <div className="flex-1">
                     <Label className="pb-0">Name</Label>
                     <TextInputForm
                        fieldName="clientName"
                        formMethods={formMethods}
                        className="flex-1"
                        errorMessage="Please add a client name"
                        required
                     />
                  </div>
                  <div className="flex-1">
                     <Label className="pb-0">Tax ID</Label>
                     <TextInputForm
                        fieldName="clientTaxId"
                        formMethods={formMethods}
                        className="flex-1"
                     />
                  </div>
               </div>
               <div className="flex gap-2">
                  <div className="flex-1">
                     <Label className="pb-0">Phone Number</Label>
                     <TextInputForm
                        fieldName="clientPhone"
                        formMethods={formMethods}
                        className="flex-1"
                     />
                  </div>
                  <div className="flex-1">
                     <Label className="pb-0">Office</Label>
                     <TextInputForm
                        fieldName="clientOffice"
                        formMethods={formMethods}
                        className="flex-1"
                     />
                  </div>
               </div>
               <div className="flex flex-col grow">
                  <Label className="pb-0">Address</Label>
                  <TextAreaForm
                     fieldName="clientAddress"
                     formMethods={formMethods}
                     className="flex-1 resize-none"
                  />
               </div>
            </div>
            <div className="text-lg text-secondary peer-focus-within:text-primary order-1 flex justify-between items-end">
               <h2>Client Info</h2>
            </div>
         </div>
      </fieldset>
   );
};

export default ClientInfoField;
