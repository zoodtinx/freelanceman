import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from 'src/components/shared/ui/primitives/Popover';
import { Plus } from 'lucide-react';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import type {
   ClientContactPayload,
   ClientContactFilterDto,
} from 'freelanceman-common/src/schemas';
import { defaultContact } from 'src/components/shared/ui/helpers/constants/default-values';
import { useState } from 'react';
import { User, BookUser } from 'lucide-react';
import { useClientContactsQuery } from 'src/lib/api/client-contact-api';
import { defaultContactValues } from 'src/components/shared/ui/helpers/constants/default-values';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import AddButton from '@/components/shared/ui/AddButton';
import { Skeleton } from '@/components/shared/ui/primitives/Skeleton';
import { ContactList } from '@/components/shared/ui/lists/ClientContactList';
import { cn } from '@/lib/helper/utils';

export const ContactColumn = (): JSX.Element => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const [filter, setFilter] = useState<ClientContactFilterDto>({});

   const { isLoading } = useClientContactsQuery(filter);

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilter((prev) => ({ ...prev, name: event.target.value }));
   };

   const handleNewContact = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'all-client-page',
         type: 'client-contact',
         entity: 'clientContact',
         data: { ...defaultContactValues },
      });
   };

   return (
      <div
         className={cn(
            'flex flex-col rounded-[20px] bg-foreground h-full flex-1 shadow-md relative overflow-hidden',
            'sm:shadow-sm sm:h-1/2'
         )}
      >
         <div
            className={cn(
               'flex flex-col w-full justify-between p-4 pb-3',
               'sm:pt-2 sm:px-2 sm:pb-0 sm:gap-2'
            )}
         >
            <div className="flex justify-between sm:pl-1">
               <div className="flex gap-1 items-center">
                  <div className="flex items-end gap-1 sm:items-center">
                     <BookUser className="w-[28px] h-auto mt-[2px] sm:w-[22px] sm:mt-0" />
                     <p className="text-xl leading-none mr-2 sm:text-lg">
                        Contacts
                     </p>
                  </div>
               </div>
               <AddButton onClick={handleNewContact} />
            </div>
            {isLoading ? (
               <Skeleton className="h-7 w-[300px] rounded-full shrink-0" />
            ) : (
               <SearchBox
                  placeholder="Search client"
                  className="w-full"
                  onChange={handleSearch}
                  value={filter.name || ''}
               />
            )}
         </div>
         <ContactList
            addFn={handleNewContact}
            filter={filter}
            setFilter={setFilter}
            page="all-clients-page"
            className="px-2 pt-1"
         />
      </div>
   );
};

export const NewContactButton = ({
   setDialogState,
}: {
   setDialogState: (dialogState: object) => void;
}) => {
   const dialogState = {
      isOpen: true,
      id: '',
      mode: 'create',
      data: defaultContact,
   };
   const handleClick = (type: string) => {
      if (type === 'client') {
         setDialogState({
            ...dialogState,
            type: 'clientContact',
         });
      } else if (type === 'partner') {
         setDialogState({
            ...dialogState,
            type: 'partnerContact',
         });
      }
   };

   return (
      <Popover>
         <PopoverTrigger>
            <button className="hover:bg-tertiary rounded-xl transition-colors h-[40px] w-[40px] flex justify-center items-center cursor-pointer">
               <Plus className="aspect-square h-[20px]" />
            </button>
         </PopoverTrigger>
         <PopoverContent className="w-fit cursor-default">
            <p onClick={() => handleClick('client')}>Client contact</p>
            <p onClick={() => handleClick('partner')}>Partner contact</p>
         </PopoverContent>
      </Popover>
   );
};

export default ContactColumn;
