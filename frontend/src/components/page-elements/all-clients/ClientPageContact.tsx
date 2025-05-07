import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from 'src/components/shared/ui/primitives/Popover';
import { Plus } from '@/components/shared/icons';
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
import { ClientContactListLoader } from '@/components/shared/ui/placeholder-ui/ClientContactLoader';
import { AvatarDisplay } from '@/components/shared/ui/AvatarDisplay';
import { useFileUrlQuery } from '@/lib/api/file-api';

export const ContactColumn = (): JSX.Element => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const [searchOptions, setSearchOptions] = useState<ClientContactFilterDto>(
      {}
   );

   const { data: contacts, isLoading } = useClientContactsQuery(searchOptions);

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchOptions((prev) => ({ ...prev, name: event.target.value }));
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
               value={searchOptions.name || ''}
            />
         )}
         {isLoading ? (
            <ClientContactListLoader />
         ) : (
            <div className="flex flex-col gap-1 min-h-0 overflow-y-auto pt-1">
               {contacts?.map((contact: ClientContactPayload) => (
                  <ContactCard key={contact.id} contact={contact} />
               ))}
            </div>
         )}
      </div>
   );
};

export const ContactCard = ({ contact }: { contact: ClientContactPayload }) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

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

   const {data, isLoading } = useFileUrlQuery(contact.avatar, Boolean(contact.avatar))

   const handleClick = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'edit',
         openedOn: 'client-page',
         type: 'client-contact',
         entity: 'clientContact',
         data: contact,
      });
   };

   return (
      <div
         onClick={handleClick}
         className={`flex w-full rounded-full bg-quaternary p-1 items-center gap-2 h-[75px] shrink-0
            border-[1.5px] border-transparent transition-colors duration-75 hover:border-primary 
            cursor-default`}
      >
         <AvatarDisplay url={data?.url} />
         <div className="flex flex-col leading-tight">
            <p className="font-semibold text-md">{contact.name}</p>
            <p className="font-semibold text-base text-secondary">
               {contact.company.name}
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
