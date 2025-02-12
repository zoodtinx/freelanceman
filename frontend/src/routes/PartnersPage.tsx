import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from '@/components/shared/ui/Select';
import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from 'src/components/shared/ui/primitives/Popover';
import { Plus } from '@/components/shared/icons';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { Contact, ContactSearchOption, PartnerContact, PartnerContactSearchOption } from '@types';
import ContactDialog from '@/components/shared/ui/ContactDialog';
import { FormDialogState } from '@/lib/types/dialog.types';
import { defaultContact } from 'src/components/shared/ui/constants/default-values';
import { useState } from 'react';
import { User, BookUser } from 'lucide-react';
import { useAllPartnerContactsQuery } from '@/lib/api/partner-api';
import useDialogStore from '@/lib/zustand/dialog-store';
import { defaultPartnerValues } from 'src/components/shared/ui/constants/default-values';

const PartnerContactLayout = (): JSX.Element => {
   const [dialogState, setDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      type: 'partner-contact',
      page: 'client-page',
      mode: 'view',
      data: defaultContact,
   });

   const [searchOptions, setSearchOptions] = useState<PartnerContactSearchOption>({});
   const [searchMode, setSearchMode] = useState('name');

   const { data: contacts, isLoading } =
      useAllPartnerContactsQuery(searchOptions);

   const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
      switch (searchMode) {
         case 'name':
            setSearchOptions({ name: event.target.value });
            break;
         case 'role':
            setSearchOptions({ role: event.target.value });   
            break;
         case 'company':
            setSearchOptions({ company: event.target.value, });      
            break;
      }
   };

   const handleSearchOptionChange = (mode: string) => {
      setSearchMode(mode);
   };

   return (
      <div className="flex flex-col grow rounded-[20px] bg-foreground p-4 pt-2 sm:w-full h-full gap-[6px] shrink-0 shadow-md">
         <div className="flex justify-between">
            <div className="flex items-center gap-1">
               <BookUser className="h-auto w-[28px]" />
               <p className="text-xl pt-1 leading-none mr-2">
                  Partner Contacts
               </p>
            </div>
            <NewContactButton setDialogState={setDialogState} />
         </div>
         <div className="flex gap-1">
            <SearchCategory onChange={handleSearchOptionChange} />
            <SearchBox
               placeholder="Search contact"
               className="w-full"
               onChange={handleSearchValue}
               value={searchOptions.name || ''}
            />
         </div>
         {isLoading ? (
            <p>Loading...</p>
         ) : (
            <div className="flex flex-col gap-1 overflow-y-scroll  ">
               {contacts?.map((contact) => (
                  <PartnerTab
                     key={contact.id}
                     contact={contact}
                     setDialogState={setDialogState}
                  />
               ))}
            </div>
         )}
      </div>
   );
};

const SearchCategory = ({
   onChange,
}: {
   onChange: (value: string) => void;
}) => {
   return (
      <Select onValueChange={(value) => onChange(value)}>
         <SelectTrigger className="flex pl-3 pr-2 text-base w-[120px] gap-2 bg-primary text-foreground rounded-full border-none">
            <SelectValue placeholder="Name" />
         </SelectTrigger>
         <SelectContent>
            <SelectGroup>
               <SelectItem value="name">Name</SelectItem>
               <SelectItem value="role">Role</SelectItem>
               <SelectItem value="company">Company</SelectItem>
            </SelectGroup>
         </SelectContent>
      </Select>
   );
};

const PartnerTab = ({ contact }: { contact: PartnerContact }) => {
   const setFormDialogState = useDialogStore(
      (state) => state.setFormDialogState
   );

   const handleClick = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'view',
         openedOn: 'all-client-page',
         type: 'client-contact',
         data: contact,
      });
   };

   return (
      <div
         className="flex rounded-[15px] h-[50px] shrink-0 relative border-2 border-transparent hover:border-primary transition-colors bg-quaternary"
         onClick={handleClick}
      >
         <div className="z-10 flex items-center px-4 justify-between w-full text-primary">
            <div className="flex items-center">
               <p className="w-[190px] cursor-pointer hover:opacity-60 transition-opacity leading-tight">
                  {contact.role}
               </p>
               <div className="h-9 w-9 rounded-full bg-tertiary mr-3" />
               <p className="font-medium max-w-[700px] w-[300px] text-md truncate cursor-default">
                  {contact.name}
               </p>
            </div>
            <p className="w-fit text-right cursor-pointer hover:opacity-60 transition-opacity">
               {contact.company}
            </p>
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

export default PartnerContactLayout;
