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
import { BookUser, ChevronDown, Loader2, User } from 'lucide-react';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import AddButton from '@/components/shared/ui/AddButton';
import {
   PartnerContactFilterDto,
   PartnerContactFindManyItem,
} from 'freelanceman-common';
import { defaultPartnerContactValues } from '@/components/shared/ui/helpers/constants/default-values';
import { PartnerContactList } from '@/components/shared/ui/lists/PartnerContactList';
import useWelcomeDialogStore from '@/lib/zustand/welcome-dialog-store';
import { cn } from '@/lib/helper/utils';
import { usePartnerContactsQuery } from '@/lib/api/partner-contact-api';

const PartnerContactLayout = (): JSX.Element => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const [filter, setFilter] = useState<PartnerContactFilterDto>({});
   const [searchMode, setSearchMode] =
      useState<keyof PartnerContactFilterDto>('name');

   const partnerContactsQueryResult = usePartnerContactsQuery(filter);

   const setWelcomeDialogState = useWelcomeDialogStore(
      (state) => state.setWelcomeDialogState
   );

   // check if user has visited the page to show or hide welcome dialog
   if (localStorage.getItem('partners') !== 'visited') {
      setWelcomeDialogState({ isOpen: true, page: 'partnersPage' });
   }

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
         type: 'partnerContact',
         mode: 'create',
         entity: 'partnerContact',
         openedOn: 'partnerPage',
         data: { ...defaultPartnerContactValues },
      });
   };

   return (
      <div
         className={cn(
            'flex flex-col rounded-[20px] bg-foreground h-full flex-1 shadow-md relative overflow-hidden',
            'sm:shadow-md sm:h-1/2 sm:gap-1 sm:border sm:border-secondary sm:dark:border-tertiary'
         )}
      >
         <div
            className={cn(
               'flex flex-col w-full justify-between p-2 gap-2',
               'sm:pt-2 sm:px-2 sm:pb-0 sm:gap-2'
            )}
         >
            <div className="flex justify-between pl-1">
               <div className="flex items-center gap-1 sm:items-center">
                  <div className="flex items-end gap-1 sm:items-center">
                     <BookUser className="w-[28px] h-auto mt-[2px] sm:w-[22px] sm:mt-0" />
                     <p className="text-xl leading-none mr-2 sm:text-lg">
                        Partner Contacts
                     </p>
                  </div>
               </div>
               {partnerContactsQueryResult.isFetching ? (
                  <div className="h-[33px] w-[33px] p-1">
                     <Loader2 className="w-full h-full sm:w-[22px] animate-spin" />
                  </div>
               ) : (
                  <AddButton onClick={handleNewPartner} />
               )}
            </div>
            <div className="flex gap-1 lg:w-1/2">
               <SearchCategory onChange={handleSearchOptionChange} />
               <SearchBox
                  placeholder="Search contact"
                  className="w-full"
                  onChange={handleSearchValue}
                  value={filter[searchMode] || ''}
               />
            </div>
         </div>
         <PartnerContactList
            queryResult={partnerContactsQueryResult}
            filter={filter}
            addFn={handleNewPartner}
            setFilter={setFilter}
            page="partner-page"
            className="px-2"
         />
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
               <SelectItem value="company">Company</SelectItem>
            </SelectGroup>
         </SelectContent>
      </Select>
   );
};

const PartnerTab = forwardRef<
   HTMLDivElement,
   { contact: PartnerContactFindManyItem }
>(({ contact }, ref) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const handleClick = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'edit',
         openedOn: 'allClientsPage',
         type: 'partnerContact',
         data: contact,
         entity: 'partnerContact',
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
               {contact.company}
            </p>
         </div>
      </div>
   );
});

PartnerTab.displayName = 'PartnerTab';

export default PartnerContactLayout;
