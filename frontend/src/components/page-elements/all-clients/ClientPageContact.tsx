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
      <div className="flex flex-col w-[335px] rounded-[20px] bg-foreground p-4 pt-2 sm:w-full h-auto gap-[6px] shrink-0 shadow-md">
         <div className="flex justify-between py-1 pt-2">
            <div className="flex items-center gap-1">
               <BookUser className="h-auto w-[28px]" />
               <p className="text-xl pt-1 leading-none mr-2">Client Contacts</p>
            </div>
            <AddButton onClick={handleNewContact} />
         </div>
         {isLoading ? (
            <Skeleton className="h-7 w-[300px] rounded-full shrink-0" />
         ) : (
            <SearchBox
               placeholder="Search client"
               className="w-[300px]"
               onChange={handleSearch}
               value={filter.name || ''}
            />
         )}
         <ContactList
            addFn={handleNewContact}
            filter={filter}
            setFilter={setFilter}
            page="all-clients-page"
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
