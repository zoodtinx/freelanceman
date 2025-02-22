import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from 'src/components/shared/ui/primitives/Popover';
import { Plus } from '@/components/shared/icons';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { Contact, ContactSearchOption } from '@types';
import { FormDialogState } from 'src/lib/types/form-dialog.types';
import { defaultContact } from 'src/components/shared/ui/helpers/constants/default-values';
import { useState } from 'react';
import { User, BookUser } from 'lucide-react';
import { useAllContactsQuery } from '@/lib/api/contact-api';
import { defaultContactValues } from 'src/components/shared/ui/helpers/constants/default-values';
import useDialogStore from '@/lib/zustand/dialog-store';

export const ContactColumn = (): JSX.Element => {
   const setFormDialogState = useDialogStore((state) => state.setFormDialogState);

   const [searchOptions, setSearchOptions] = useState<ContactSearchOption>({});

   const { data: contacts, isLoading } = useAllContactsQuery(searchOptions);

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchOptions((prev) => ({ ...prev, name: event.target.value }));
   };

   const handleNewContact = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'all-client-page',
         type: 'client-contact',
         data: defaultContactValues
      })
   }

   return (
      <div className="flex flex-col w-[335px] rounded-[20px] bg-foreground p-4 pt-2 sm:w-full h-auto gap-[6px] shrink-0 shadow-md">
         <div className="flex justify-between">
            <div className="flex items-center gap-1">
               <BookUser className="h-auto w-[28px]" />
               <p className="text-xl pt-1 leading-none mr-2">Client Contacts</p>
            </div>
            <NewContactButton setDialogState={handleNewContact} />
         </div>
         <SearchBox
            placeholder="Search contact"
            className="w-full"
            onChange={handleSearch}
            value={searchOptions.name || ''}
         />
         {isLoading ? (
            <p>Loading...</p>
         ) : (
            <div className="flex flex-col gap-1 min-h-0 overflow-y-auto">
               {contacts?.map((contact) => (
                  <ContactCard
                     key={contact.id}
                     contact={contact}
                  />
               ))}
            </div>
         )}
      </div>
   );
};

export const ContactCard = ({
   contact
}: {
   contact: Contact;
}) => {
   const setFormDialogState = useDialogStore((state) => state.setFormDialogState);

   let avatar;
   if (!contact.avatar) {
      avatar = <User className="w-8 h-8" />;
   } else {
      avatar = (
         <img
            src={contact.avatar}
            alt="Contact Avatar"
            className="w-full h-full object-cover"
         />
      );
   }

   const handleClick = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'view',
         openedOn: 'client-page',
         type: 'client-contact',
         data: contact
      })
   }

   return (
      <div
         onClick={handleClick}
         className="flex w-full h-fit rounded-full bg-quaternary p-2 items-center gap-2 border-[1.5px] border-transparent transition-colors duration-75 hover:border-primary cursor-default"
      >
         <div className="flex w-14 h-14 bg-tertiary rounded-full items-center justify-center text-secondary overflow-hidden">
            {avatar}
         </div>
         <div className="flex flex-col leading-tight h-fit">
            <p className="font-semibold text-md">{contact.name}</p>
            <p className="font-semibold text-base text-secondary">
               {contact.company}
            </p>
            <p className="text-base text-secondary">{contact.role}</p>
         </div>
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
