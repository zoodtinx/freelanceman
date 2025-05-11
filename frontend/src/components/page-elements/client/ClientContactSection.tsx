import AddButton from '@/components/shared/ui/AddButton';
import React, { useState } from 'react';
import { ClientSectionProps } from 'src/components/page-elements/client/props.type';
import { defaultContactValues } from 'src/components/shared/ui/helpers/constants/default-values';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { ClientContactFilterDto } from 'freelanceman-common';
import { UsersRound } from 'lucide-react';
import { ContactList } from '@/components/shared/ui/lists/ClientContactList';

const ClientContactSection: React.FC<ClientSectionProps> = ({ clientData }) => {
   const [filter, setFilter] = useState<ClientContactFilterDto>({
      companyId: clientData.id
   });

   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );
   const handleNewContact = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'client-page',
         type: 'client-contact',
         entity: 'clientContact',
         data: { ...defaultContactValues, companyId: clientData.id },
      });
   };

   return (
      <div className="flex flex-col bg-foreground flex-1 rounded-[20px] shadow-md h-1/2">
         <div className="flex justify-between items-center px-4 pr-2 h-9">
            <div className="flex gap-1 items-center">
               <UsersRound className="w-4 h-4" />
               <p className="text-md">Contacts</p>
            </div>
            <AddButton className="w-7 h-7" onClick={handleNewContact} />
         </div>
         <div className="w-full border-[0.5px] border-tertiary" />
         <div className='flex flex-col grow p-2'>
            <ContactList
               addFn={handleNewContact}
               filter={filter}
               setFilter={setFilter}
               page="client-page"
            />
         </div>
      </div>
   );
};

export default ClientContactSection;
