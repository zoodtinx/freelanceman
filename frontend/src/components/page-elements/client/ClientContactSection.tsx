import AddButton from '@/components/shared/ui/AddButton';
import React, { useState } from 'react';
import { ContactCard } from 'src/components/page-elements/all-clients/ClientPageContact';
import { useClientContactsQuery } from 'src/lib/api/client-contact-api';
import { ClientSectionProps } from 'src/components/page-elements/client/props.type';
import { defaultContactValues } from 'src/components/shared/ui/helpers/constants/default-values';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import {
   ApiErrorPlaceHolder,
   LoadingPlaceHolder,
   NoDataPlaceHolder,
} from '@/components/shared/ui/placeholders/ListPlaceHolder';
import { UseQueryResult } from '@tanstack/react-query';
import { ClientContactFilterDto, ClientContactListPayload } from 'freelanceman-common';
import { UsersRound } from 'lucide-react';
import LoadMoreButton from '@/components/shared/ui/placeholder-ui/LoadMoreButton';
import { ListProps } from '@/lib/types/list-props.type';

const ClientContactSection: React.FC<ClientSectionProps> = ({ clientData }) => {
   const [filter, setFilter] = useState({})

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
               <UsersRound className='w-4 h-4' />
               <p className="text-md">Contacts</p>
            </div>
            <AddButton className="w-7 h-7" onClick={handleNewContact} />
         </div>
         <div className="w-full border-[0.5px] border-tertiary" />
         <ContactList
            addFn={handleNewContact}
            filter={filter}
            setFilter={setFilter}
            page='client-page'
         />
      </div>
   );
};

export const ContactList = ({
   addFn,
   filter,
   setFilter,
}: ListProps<ClientContactFilterDto>) => {
   const {
      data: contacts,
      isLoading,
      isError,
      refetch,
   } = useClientContactsQuery(
      filter
   ) as UseQueryResult<ClientContactListPayload>;

   if (isLoading) return <LoadingPlaceHolder />;
   if (isError || !contacts) return <ApiErrorPlaceHolder retryFn={refetch} />;
   if (!contacts.items.length)
      return <NoDataPlaceHolder addFn={addFn}>Add a contact</NoDataPlaceHolder>;

    const handleLoadMore = () => {
      const curentLength = contacts?.items.length;

      if (!curentLength) {
         return;
      }

      setFilter((prev) => {
         return {
            ...prev,
            take: curentLength + 13,
         };
      });
   };

   return (
      <div className="grow overflow-y-auto h-0 pt-1">
         <div className="flex flex-col gap-1">
            {contacts?.items.map((contact) => (
               <ContactCard key={contact.id} contact={contact} />
            ))}
         </div>
         <div className="flex justify-center pt-3">
               <LoadMoreButton
                  loadMoreFn={handleLoadMore}
                  isLoading={isLoading}
               />
            </div>
      </div>
   );
};

export default ClientContactSection;
