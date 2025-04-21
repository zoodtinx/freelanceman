import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from 'src/components/shared/ui/select/Select';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { useState } from 'react';
import { BookUser, ChevronDown } from 'lucide-react';
import { usePartnerContactsQuery } from 'src/lib/api/partner-contact-api';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import AddButton from '@/components/shared/ui/AddButton';
import {
   PartnerContactFilterDto,
   PartnerContactPayload,
} from 'freelanceman-common';
import {
   PartnerPageFilterLoader,
   PartnerPageTabsLoader,
} from '@/components/shared/ui/placeholder-ui/PartnerPageLoader';

const PartnerContactLayout = (): JSX.Element => {
   const { formDialogState, setFormDialogState } = useFormDialogStore();

   const [searchOptions, setSearchOptions] = useState<PartnerContactFilterDto>(
      {}
   );
   const [searchMode, setSearchMode] = useState('name');

   const { data: contacts, isLoading } = usePartnerContactsQuery(searchOptions);

   const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
      switch (searchMode) {
         case 'name':
            setSearchOptions({ name: event.target.value });
            break;
         case 'role':
            setSearchOptions({ role: event.target.value });
            break;
      }
   };

   const handleSearchOptionChange = (mode: string) => {
      setSearchMode(mode);
      setSearchOptions({});
   };

   const handleNewPartner = () => {
      setFormDialogState({
         isOpen: true,
         type: 'partner-contact',
         mode: 'create',
         openedOn: 'partner-page',
         data: formDialogState.data,
      });
   };

   return (
      <div className="flex flex-col grow rounded-[20px] bg-foreground p-4 pt-2 sm:w-full h-full gap-[6px] shrink-0 shadow-md relative">
         <div className="flex justify-between py-2">
            <div className="flex items-center gap-1">
               <BookUser className="h-auto w-[28px]" />
               <p className="text-xl pt-1 leading-none mr-2">
                  Partner Contacts
               </p>
            </div>
            <AddButton onClick={handleNewPartner} />
         </div>
         {isLoading ? (
            <PartnerPageFilterLoader />
         ) : (
            <div className="flex gap-1">
               <SearchCategory onChange={handleSearchOptionChange} />
               <SearchBox
                  placeholder="Search contact"
                  className=""
                  onChange={handleSearchValue}
                  value={searchOptions.name || ''}
               />
            </div>
         )}
         {isLoading ? (
            <PartnerPageTabsLoader />
         ) : (
            <div className="flex flex-col gap-1 overflow-y-scroll  ">
               {contacts?.map((contact: any) => (
                  <PartnerTab key={contact.id} contact={contact} />
               ))}
               <div className="flex justify-center">
                  <p className="w-fit text-center py-2 cursor-pointer">
                     Load more
                  </p>
               </div>
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
         <SelectTrigger className="flex pl-3 pr-2 text-base w-[110px] gap-2 bg-primary text-foreground rounded-full border-none">
            <SelectValue placeholder="Name" />
            <ChevronDown className="w-4 h-4" />
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

const PartnerTab = ({ contact }: { contact: PartnerContactPayload }) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const handleClick = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'edit',
         openedOn: 'all-client-page',
         type: 'partner-contact',
         data: contact,
      });
   };

   return (
      <div
         className="flex rounded-[15px] h-[50px] shrink-0 relative border-2 border-transparent hover:border-primary transition-colors bg-quaternary cursor-default"
         onClick={handleClick}
      >
         <div className="z-10 flex items-center px-4 justify-between w-full text-primary">
            <div className="flex items-center">
               <p className="w-[190px] transition-opacity leading-tight">
                  {contact.role}
               </p>
               <div className="h-9 w-9 rounded-full bg-tertiary mr-3 overflow-hidden object-contain">
                  <img
                     src={contact.avatar}
                     alt="Avatar Preview"
                     className="w-full h-full object-cover"
                  />
               </div>
               <p className="font-medium max-w-[700px] w-[300px] text-md truncate cursor-default">
                  {contact.name}
               </p>
            </div>
            <p className="w-fit text-right transition-opacity">
               {contact.company.name}
            </p>
         </div>
      </div>
   );
};

export default PartnerContactLayout;
