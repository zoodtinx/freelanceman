import { TextInputForm, TextAreaForm } from 'src/components/shared/ui/form-field-elements';
import { Client, SalesDocument } from '@types';
import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useAllClientsQuery } from '@/lib/api/client-api';
import { SelectWithSearch } from 'src/components/shared/ui/form-field-elements';

const ClientInfoField = ({ formMethods }:{ formMethods : UseFormReturn<SalesDocument>} ) => {
   // const userData = some logic to fetch user data
   const [searchTerm, setSearchTerm] = useState({})
   const [clientData, setClientData] = useState<Client | undefined>()
   const {data: clientList, isLoading} = useAllClientsQuery(searchTerm)

   const {setValue, watch} = formMethods

   const searchName = (value: string) => {
      setSearchTerm({ name: value });
   };

   const selectedProject = watch('selectedProjectClientId');

   const populateClientField = (value: string) => {
      const selectedClientData = clientList?.find(
         (client) => client.id === value
      );
      setClientData(selectedClientData);
   };

   useEffect(() => {
      if (selectedProject) {
         const selectedClient = clientList?.find(
            (client) => client.id === selectedProject
         );
         if (selectedClient) {
            setValue('clientId', selectedClient.id);
            setValue('clientName', selectedClient.name);
            setValue('clientTaxId', selectedClient.taxId);
            setValue('clientAddress', selectedClient.address);
            setValue('clientPhone', selectedClient.phoneNumber);
            setValue('clientOffice', selectedClient.office);
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
         setValue('clientOffice', clientData.office);
         setValue('clientDetail', clientData.detail);
      }
   }, [clientData, setValue]);

   const clientSelection = clientList
      ? clientList.map((client) => {
           return { value: client.id, label: client.name };
        })
      : [];

   return (
      <fieldset className="flex flex-col grow rounded-xl border border-tertiary p-3 relative gap-3">
         <div className="flex flex-col h-full">
            <div className="flex flex-col gap-2 peer order-2 h-full">
               <div className="flex gap-2">
                  <TextInputForm
                     fieldName="clientName"
                     label="Name"
                     formMethods={formMethods}
                     className="flex-1"
                  />
                  <TextInputForm
                     fieldName="clientTaxId"
                     label="Tax ID"
                     formMethods={formMethods}
                     className="flex-1"
                  />
               </div>
               <TextInputForm
                  fieldName="clientAddress"
                  label="Address"
                  formMethods={formMethods}
                  className="flex-1"
               />
               <div className="flex gap-2">
                  <TextInputForm
                     fieldName="clientPhone"
                     label="Phone Number"
                     formMethods={formMethods}
                     className="flex-1"
                  />
                  <TextInputForm
                     fieldName="clientOffice"
                     label="Office"
                     formMethods={formMethods}
                     className="flex-1"
                  />
               </div>
               <TextAreaForm
                  fieldName="clientDetail"
                  className='h-full'
                  label="Additional Detail"
                  formMethods={formMethods}
               />
            </div>
            <div className="text-lg text-secondary peer-focus-within:text-primary order-1 flex justify-between items-end">
               <h2>Client Info</h2>
               <SelectWithSearch
                  selections={clientSelection}
                  placeholder='Select a client'
                  className="h-6 text-sm px-2 rounded-lg font-medium text-primary border border-primary"
                  isLoading={isLoading}
                  handleSelect={populateClientField}
                  handleSearch={searchName}
               />
            </div>
         </div>
      </fieldset>
   );
};

export default ClientInfoField