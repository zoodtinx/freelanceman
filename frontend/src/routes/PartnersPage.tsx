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
import { BookUser, ChevronDown, User } from 'lucide-react';
import { usePartnerContactsQuery } from 'src/lib/api/partner-contact-api';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import AddButton from '@/components/shared/ui/AddButton';
import {
   PartnerContactFilterDto,
   PartnerContactPayload,
} from 'freelanceman-common';
import { PartnerPageTabsLoader } from '@/components/shared/ui/placeholder-ui/PartnerPageLoader';
import { defaultPartnerContactValues } from '@/components/shared/ui/helpers/constants/default-values';

const PartnerContactLayout = (): JSX.Element => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const [searchOptions, setSearchOptions] = useState<PartnerContactFilterDto>(
      {}
   );
   const [searchMode, setSearchMode] =
      useState<keyof PartnerContactFilterDto>('name');

   const { data: contacts, isLoading } = usePartnerContactsQuery(searchOptions);

   const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchOptions({ [searchMode]: event.target.value });
   };

   const handleSearchOptionChange = (mode: keyof PartnerContactFilterDto) => {
      setSearchMode(mode);
      setSearchOptions({});
   };

   const handleNewPartner = () => {
      setFormDialogState({
         isOpen: true,
         type: 'partner-contact',
         mode: 'create',
         entity: 'partnerContact',
         openedOn: 'partner-page',
         data: { ...defaultPartnerContactValues },
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
         <div className="flex gap-1">
            <SearchCategory onChange={handleSearchOptionChange} />
            <SearchBox
               placeholder="Search contact"
               className=""
               onChange={handleSearchValue}
               value={searchOptions[searchMode] || ''}
            />
         </div>
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
   onChange: (value: keyof PartnerContactFilterDto) => void;
}) => {
   return (
      <Select onValueChange={(value: any) => onChange(value)}>
         <SelectTrigger className="flex pl-3 pr-2 text-base w-[110px] gap-2 bg-primary text-foreground rounded-full border-none">
            <SelectValue placeholder="Name" />
            <ChevronDown className="w-4 h-4" />
         </SelectTrigger>
         <SelectContent>
            <SelectGroup>
               <SelectItem value="name">Name</SelectItem>
               <SelectItem value="role">Role</SelectItem>
               <SelectItem value="companyName">Company</SelectItem>
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
         entity: 'partnerContact'
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
               <div className="flex justify-center items-center h-9 w-9 rounded-full bg-tertiary mr-3 overflow-hidden object-contain">
                  {contact.avatar ? (
                     <img
                        src={contact.avatar}
                        alt="Avatar Preview"
                        className="w-full h-full object-cover"
                     />
                  ) : (
                     <User className='text-secondary' />
                  )}
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
