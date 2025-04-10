import AddButton from '@/components/shared/ui/AddButton';
import React, { useState } from 'react';
import ContactDialog from 'src/components/shared/ui/dialogs/form-dialog/ClientContactDialog';
import { ContactCard } from 'src/components/page-elements/all-clients/ClientPageContact';
import { useClientContactsQuery } from 'src/lib/api/client-contact-api';
import { ClientContactSearchOption } from '@types';
import { defaultContact } from 'src/components/shared/ui/helpers/constants/default-values';
import { FormDialogState } from 'src/lib/types/form-dialog.types';
import { useParams } from 'react-router-dom';
import { ClientSectionProps } from 'src/components/page-elements/client/props.type';
import useDialogStore from '@/lib/zustand/dialog-store';
import { defaultContactValues } from 'src/components/shared/ui/helpers/constants/default-values';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';

const ClientContactSection: React.FC<ClientSectionProps> = () => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );
   const handleNewContact = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'client-page',
         type: 'client-contact',
         data: defaultContactValues,
      });
   };

   const clientId = useParams().clientId || '';

   const [searchOptions, setSearchOptions] = useState<ClientContactSearchOption>({
      companyId: clientId,
   });

   const { data: contacts, isLoading } = useClientContactsQuery(searchOptions);

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchOptions((prev) => ({ ...prev, name: event.target.value }));
   };

   return (
      <div className="flex flex-col bg-foreground p-2 flex-1 rounded-[20px] gap-1 shadow-md">
         <div className="flex justify-between items-center">
            <p className="text-lg px-2">Contacts</p>
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
                     />
                  ))}
               </div>
            )}
         </div>
      </div>
   );
};

export default ClientContactSection;
