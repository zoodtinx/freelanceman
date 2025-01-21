import { SearchBox } from '@/components/shared/ui/SearchBox';
import AddButton from '@/components/shared/ui/AddButton';
import React, { useState } from 'react';
import ContactDialog from '@/components/shared/ui/ContactDialog';
import { ContactCard } from '@/components/page-elements/all-clients/ContactColumn';
import { useAllContactsQuery } from '@/lib/api/contact-api';
import { ContactSearchOption } from '@types';
import { defaultContact } from 'src/components/shared/ui/constants';
import { FormDialogState } from '@/lib/types/dialog.types';

const ClientContactSection: React.FC = () => {
   const [dialogState, setDialogState] = useState<FormDialogStatee>({
      isOpen: false,
      id: '',
      type: 'clientContact',
      mode: 'view',
      data: defaultContact,
   });

   const [searchOptions, setSearchOptions] = useState<ContactSearchOption>({});

   const { data: contacts, isLoading } = useAllContactsQuery(searchOptions);

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchOptions((prev) => ({ ...prev, name: event.target.value }));
   };

   return (
      <div className="flex flex-col bg-foreground p-4 flex-1 rounded-3xl gap-1">
         <div className="flex justify-between items-center">
            <p className="text-lg">Contacts</p>
            <AddButton />
         </div>
         <SearchBox className="border rounded-full h-7" />
         <div className="bg-cyan-300 grow overflow-y-auto h-0">
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
