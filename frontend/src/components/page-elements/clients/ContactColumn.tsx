import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from 'src/components/shared/ui/primitives/Popover';
import { Plus } from '@/components/shared/icons';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { Contact, ContactSearchOption } from '@types';
import ContactDialog from '@/components/shared/ui/ContactDialog';
import { FormDialogState } from '@/lib/types/dialog.types';
import { defaultContact } from 'src/components/shared/ui/primitives/utils';
import { useState } from 'react';
import { User, BookUser } from 'lucide-react';
import { mockContacts as contacts } from '@mocks';
import { CircleUserRound } from 'lucide-react';
import { useAllContactsQuery } from '@/lib/api/contact-api';

const ContactColumn = (): JSX.Element => {
   const [dialogState, setDialogState] = useState<FormDialogState>({
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
      <div className="flex flex-col w-[350px] rounded-[30px] bg-foreground p-4 pt-5 sm:w-full h-full gap-[6px] shrink-0">
         <div className="flex justify-between">
            <div className="flex items-center gap-1">
               <BookUser className="h-6 w-6" />
               <p className="text-xl pt-1 leading-none mr-2">Client Contacts</p>
            </div>
            <NewContactButton setDialogState={setDialogState} />
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
         <ContactDialog dialogState={dialogState} setDialogState={setDialogState} />
      </div>
   );
};

const ContactCard = ({ contact, setDialogState }: { contact: Contact }) => {
   const handleClick = () => {
      let dialogType;
      if (contact.type === 'client') {
         dialogType = 'clientContact';
      } else if (contact.type === 'partner') {
         dialogType = 'partnerContact';
      }
      setDialogState({
         isOpen: true,
         id: '',
         type: dialogType,
         mode: 'view',
         data: contact,
      });
   };

   let avatar;
   if (!contact.avatar) {
      avatar = <User className="w-8 h-8" />;
   } else {
      avatar = <img src={contact.avatar} alt="Contact Avatar" className="w-full h-full object-cover" />;

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

const NewContactButton = ({
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
