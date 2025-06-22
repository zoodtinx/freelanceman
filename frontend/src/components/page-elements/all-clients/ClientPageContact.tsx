import { SearchBox } from '@/components/shared/ui/SearchBox';
import type { ClientContactFilterDto } from 'freelanceman-common/src/schemas';
import { useState } from 'react';
import { BookUser, Loader2 } from 'lucide-react';
import { useClientContactsQuery } from 'src/lib/api/client-contact-api';
import { defaultContactValues } from 'src/components/shared/ui/helpers/constants/default-values';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import AddButton from '@/components/shared/ui/AddButton';
import { ContactList } from '@/components/shared/ui/lists/ClientContactList';
import { cn } from '@/lib/helper/utils';

export const ContactColumn = (): JSX.Element => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const [filter, setFilter] = useState<ClientContactFilterDto>({});

   const clientContactsQueryResult = useClientContactsQuery(filter);

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilter((prev) => ({ ...prev, name: event.target.value }));
   };

   const handleNewContact = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'allClientsPage',
         type: 'clientContact',
         entity: 'clientContact',
         data: { ...defaultContactValues },
      });
   };

   return (
      <div
         className={cn(
            'flex flex-col rounded-[20px] bg-foreground h-full shadow-md relative overflow-hidden w-[350px] pb-2',
            'sm:shadow-sm sm:h-1/2 sm:w-full'
         )}
      >
         <div
            className={cn(
               'flex flex-col w-full justify-between p-2 pb-1 gap-2',
               'sm:pt-2 sm:px-2 sm:pb-0 sm:gap-2'
            )}
         >
            <div className="flex justify-between pl-1">
               <div className="flex gap-1 items-center">
                  <div className="flex items-end gap-1 sm:items-center">
                     <BookUser className="w-[28px] h-auto mt-[2px] sm:w-[22px] sm:mt-0" />
                     <p className="text-xl leading-none mr-2 sm:text-lg">
                        Contacts
                     </p>
                  </div>
               </div>
               {clientContactsQueryResult.isFetching ? (
                  <div className="h-[33px] w-[33px] p-1">
                     <Loader2 className="w-full h-full sm:w-[22px] animate-spin" />
                  </div>
               ) : (
                  <AddButton onClick={handleNewContact} />
               )}
            </div>
            <SearchBox
               placeholder="Search client"
               className="w-full"
               onChange={handleSearch}
               value={filter.name || ''}
            />
         </div>
         <ContactList
            addFn={handleNewContact}
            filter={filter}
            setFilter={setFilter}
            page="allClientsPage"
            className="px-2 pt-1"
            queryResult={clientContactsQueryResult}
         />
      </div>
   );
};

export default ContactColumn;
