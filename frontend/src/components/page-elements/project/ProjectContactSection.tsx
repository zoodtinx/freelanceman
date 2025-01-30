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
import { defaultContact } from 'src/components/shared/ui/constants';
import { useState } from 'react';
import { User, BookUser } from 'lucide-react';
import { mockContacts as contacts } from '@mocks';
import { CircleUserRound } from 'lucide-react';
import { useAllContactsQuery } from '@/lib/api/contact-api';

export const ProjectContactSection = (): JSX.Element => {
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
      <>
         <div className="flex justify-between my-1 px-2">
            <p className="flex items-center px-2 h-11 text-lg gap-1">
               <BookUser className='w-5 h-5' />
               Contacts
            </p>
            <NewContactButton setDialogState={setDialogState} />
         </div>
         <div className="w-full border-[0.5px] border-tertiary" />
         {isLoading ? (
            <p>Loading...</p>
         ) : (
            <div className="flex flex-col gap-1 h-0 grow overflow-y-auto p-3">
               {contacts?.map((contact) => (
                  <ContactCard
                     key={contact.id}
                     contact={contact}
                     setDialogState={setDialogState}
                  />
               ))}
            </div>
         )}
         <ContactDialog
            dialogState={dialogState}
            setDialogState={setDialogState}
         />
      </>
   );
};

export const ContactCard = ({
   contact,
   setDialogState,
}: {
   contact: Contact;
}) => {
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
      avatar = (
         <img
            src={contact.avatar}
            alt="Contact Avatar"
            className="w-full h-full object-cover"
         />
      );
   }

   return (
      <div
         onClick={handleClick}
         className="flex w-full h-fit rounded-full bg-quaternary p-2 items-center gap-2 border-[1.5px] border-transparent transition-colors duration-75 hover:border-primary cursor-default"
      >
         <div className="flex w-9 h-9 bg-tertiary rounded-full items-center justify-center text-secondary overflow-hidden">
            {avatar}
         </div>
         <div className="flex flex-col leading-tight h-fit">
            <p className="font-semibold text-md">{contact.name}</p>
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

export default ProjectContactSection;
