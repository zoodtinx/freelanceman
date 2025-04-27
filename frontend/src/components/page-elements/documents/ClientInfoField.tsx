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
import { SelectWithSearch } from 'src/components/shared/ui/form-field-elements';

const ClientInfoField = ({
   formMethods,
}: {
   formMethods: UseFormReturn<SalesDocumentPayload>;
}) => {
   // const userData = some logic to fetch user data
   const [searchTerm, setSearchTerm] = useState({});
   const [clientData, setClientData] = useState<ClientPayload | undefined>();
   const { data: clientList, isLoading } = useClientsQuery(searchTerm);
   

   const { setValue, watch } = formMethods;

   const searchName = (value: string) => {
      setSearchTerm({ name: value });
   };

   const selectedProject = watch('selectedProjectClientId');

   const populateClientField = (value: string) => {
      const selectedClientData = clientList?.find(
         (client: ClientPayload) => client.id === value
      );
      setClientData(selectedClientData);
   };

   useEffect(() => {
      if (selectedProject) {
         const selectedClient = clientList?.find(
            (client: ClientPayload) => client.id === selectedProject
         );
         if (selectedClient) {
            setValue('clientId', selectedClient.id);
            setValue('clientName', selectedClient.name);
            setValue('clientTaxId', selectedClient.taxId);
            setValue('clientAddress', selectedClient.address);
            setValue('clientPhone', selectedClient.phoneNumber);
            setValue('clientDetail', selectedClient.detail);
            return;
         }
      }
   }, [selectedProject, setValue, clientList]);

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

   const clientSelection = clientList
      ? clientList.map((client: ClientPayload) => {
           return { value: client.id, label: client.name };
        })
      : [];

   return (
      <fieldset className="flex flex-col grow rounded-xl border border-tertiary p-3 relative gap-3">
         <div className="flex flex-col h-full">
            <div className="flex flex-col gap-2 peer order-2 h-full">
               <div className="flex gap-2">
                  <div className="flex-1">
                     <Label className="pb-0">Name</Label>
                     <TextInputForm
                        fieldName="clientName"
                        formMethods={formMethods}
                        className="flex-1"
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
               <SelectWithSearch
                  type='client'
                  selections={clientSelection}
                  placeholder="Select a client"
                  className="h-6 text-sm px-2 rounded-lg font-medium text-primary border border-primary"
                  isLoading={isLoading}
                  value={clientData?.id}
                  handleSelect={populateClientField}
                  handleSearch={searchName}
               />
            </div>
         </div>
      </fieldset>
   );
};

export default ClientInfoField;
