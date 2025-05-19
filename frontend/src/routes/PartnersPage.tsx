import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from 'src/components/shared/ui/select/Select';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { forwardRef, useState } from 'react';
import { BookUser, ChevronDown, User } from 'lucide-react';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import AddButton from '@/components/shared/ui/AddButton';
import {
   PartnerContactFilterDto,
   PartnerContactPayload,
} from 'freelanceman-common';
import { defaultPartnerContactValues } from '@/components/shared/ui/helpers/constants/default-values';
import { PartnerContactList } from '@/components/shared/ui/lists/PartnerContactList';

const PartnerContactLayout = (): JSX.Element => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const [filter, setFilter] = useState<PartnerContactFilterDto>({});
   const [searchMode, setSearchMode] =
      useState<keyof PartnerContactFilterDto>('name');

   const handleSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilter({ [searchMode]: event.target.value });
   };

   const handleSearchOptionChange = (mode: keyof PartnerContactFilterDto) => {
      setSearchMode(mode);
      setFilter({});
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
               value={filter[searchMode] || ''}
            />
         </div>
         <div className='flex flex-col grow overflow-hidden'>
            <PartnerContactList
               filter={filter}
               setFilter={setFilter}
               page="partner-page"
               addFn={handleNewPartner}
            />
         </div>
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

const PartnerTab = forwardRef<
   HTMLDivElement,
   { contact: PartnerContactPayload }
>(({ contact }, ref) => {
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
         entity: 'partner-contact',
      });
   };

   return (
      <div
         ref={ref}
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
                     <User className="text-secondary" />
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
});

PartnerTab.displayName = 'PartnerTab';

export default PartnerContactLayout;
