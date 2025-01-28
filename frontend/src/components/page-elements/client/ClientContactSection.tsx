import { SearchBox } from '@/components/shared/ui/SearchBox';
import AddButton from '@/components/shared/ui/AddButton';
import React, { useState } from 'react';
import ContactDialog from '@/components/shared/ui/ContactDialog';
import { ContactCard } from '@/components/page-elements/all-clients/ContactColumn';
import { useAllContactsQuery } from '@/lib/api/contact-api';
import { ContactSearchOption } from '@types';
import { defaultContact } from 'src/components/shared/ui/constants';
import { FormDialogState } from '@/lib/types/dialog.types';
import { useParams } from 'react-router-dom';

const ClientContactSection: React.FC = () => {
   const clientId = useParams().clientId || '';

   console.log('clientId', clientId)

   const [dialogState, setDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      type: 'clientContact',
      mode: 'view',
      data: defaultContact,
   });



   const [searchOptions, setSearchOptions] = useState<ContactSearchOption>({
      companyId: clientId
   });

   const { data: contacts, isLoading } = useAllContactsQuery(searchOptions);

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchOptions((prev) => ({ ...prev, name: event.target.value }));
   };

   const handleNewContact = () => {
      setDialogState((prev) => {
         return {
            ...prev,
            mode: 'create',
            isOpen: true,
            data: {
               ...prev.data,
               company: clientId     // fix this
            }
         }
      })
   }

   return (
      <div className="flex flex-col bg-foreground p-4 flex-1 rounded-3xl gap-1">
         <div className="flex justify-between items-center">
            <p className="text-lg">Contacts</p>
            <AddButton onClick={handleNewContact} />
         </div>
         <div className="grow overflow-y-auto h-0 pt-1">
            {isLoading ? (
               <p>Loading...</p>
            ) : (
               <div className="flex flex-col gap-1">
                  {contacts?.map((contact) => (
                     <ContactCard
                        key={contact.id}
                        contact={contact}
                        setDialogState={setDialogState}
                     />
                  ))}
               </div>
            )}
         </div>
         <ContactDialog
            dialogState={dialogState}
            setDialogState={setDialogState}
         />
      </div>
   );
};

export default ClientContactSection;
