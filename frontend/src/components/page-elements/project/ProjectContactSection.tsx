import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from 'src/components/shared/ui/primitives/Popover';
import { Plus } from '@/components/shared/icons';
import { useEffect, useState } from 'react';
import { User, BookUser, UsersRound, Loader2 } from 'lucide-react';
import { useClientContactsQuery } from 'src/lib/api/client-contact-api';
import useDialogStore from '@/lib/zustand/dialog-store';
import { defaultContact } from 'src/components/shared/ui/helpers/constants/default-values';
import AddButton from '@/components/shared/ui/AddButton';
import {
   ClientContactFilterDto,
   ClientContactListPayload,
   ClientContactPayload,
   PartnerContactListPayload,
   ProjectPayload,
} from 'freelanceman-common';
import useSelectionDialogStore from '@/lib/zustand/selection-dialog-store';
import { SelectObject } from '@/lib/types/selector-dialog.types';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { cn } from '@/lib/helper/utils';
import { usePartnerContactsQuery } from '@/lib/api/partner-contact-api';
import {
   ApiErrorPlaceHolder,
   NoDataPlaceHolder,
} from '@/components/shared/ui/placeholder-ui/ListPlaceHolder';
import { AvatarDisplay } from '@/components/shared/ui/AvatarDisplay';
import { UseQueryResult } from '@tanstack/react-query';

export const ProjectContactSection = ({
   project,
}: {
   project: ProjectPayload;
}): JSX.Element => {
   const setFormDialogState = useDialogStore(
      (state) => state.setFormDialogState
   );

   const setSelectorDialogState = useSelectionDialogStore(
      (state) => state.setSelectorDialogState
   );

   const [tab, setTab] = useState<'client' | 'partner'>('client');
   const [searchOptions, setSearchOptions] = useState<ClientContactFilterDto>({
      projectId: project.id,
   });

   const {
      data: clientContacts,
      isLoading: clientIsLoading,
      isError: clientIsError,
   } = useClientContactsQuery(
      searchOptions,
      tab === 'client'
   ) as UseQueryResult<ClientContactListPayload>;
   const {
      data: partnerContacts,
      isLoading: partnerIsLoading,
      isError: partnerIsError,
   } = usePartnerContactsQuery(
      searchOptions,
      tab === 'partner'
   ) as UseQueryResult<PartnerContactListPayload>;

   const contacts = tab === 'client' ? clientContacts : partnerContacts;
   const isLoading = tab === 'client' ? clientIsLoading : partnerIsLoading;
   const isError = tab === 'client' ? clientIsError : partnerIsError;

   const handleAddContact = () => {
      const selected = contacts?.items.map(
         (contact: ClientContactPayload): SelectObject => {
            const detail = `${contact.role}, ${contact.company.name}`;
            return {
               id: contact.id,
               label: contact.name,
               value: contact.name,
               detail: detail,
            };
         }
      );

      setSelectorDialogState({
         isOpen: true,
         type: 'contact',
         selected: selected,
         projectId: project.id,
         tab: tab,
         mode: contacts?.items.length ? 'view' : 'select',
      });
   };

   const handleTabChange = (value: string) => {
      setTab(value as any);
   };

   return (
      <>
         <div className="flex justify-between px-4 pr-2 items-center">
            <div className="flex gap-3 h-9 text-md">
               <button
                  className={cn(
                     'flex items-center gap-1 text-secondary transition-colors duration-150 h-full border-tertiary hover:text-primary',
                     {
                        'text-primary': tab === 'client',
                     }
                  )}
                  onClick={() => handleTabChange('client')}
               >
                  <UsersRound className="w-4 h-4" />
                  Clients
               </button>
               <button
                  className={cn(
                     'flex items-center gap-1 text-secondary transition-colors duration-150 h-full  border-tertiary hover:text-primary',
                     {
                        'text-primary': tab === 'partner',
                     }
                  )}
                  onClick={() => handleTabChange('partner')}
               >
                  <UsersRound className="w-4 h-4" />
                  Partners
               </button>
            </div>
            <AddButton className="w-7 h-7" onClick={handleAddContact} />
         </div>
         <div className="w-full border-[0.5px] border-tertiary" />
         {isLoading ? (
            <div className="flex justify-center items-center grow">
               <Loader2 className="animate-spin text-primary" />
            </div>
         ) : isError ? (
            <ApiErrorPlaceHolder retryFn={() => {}}>
               Network Error
            </ApiErrorPlaceHolder>
         ) : !contacts?.items.length ? (
            <NoDataPlaceHolder addFn={handleAddContact}>
               Add Partner Contact
            </NoDataPlaceHolder>
         ) : (
            <div className="flex flex-col gap-1 h-0 grow overflow-y-auto p-3">
               {contacts?.items.map((contact) => (
                  <ContactCard key={contact.id} contact={contact as any} />
               ))}
            </div>
         )}
      </>
   );
};

export const ContactCard = ({ contact }: { contact: ClientContactPayload }) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );
   const handleClick = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'edit',
         openedOn: 'project-page',
         type: 'client-contact',
         data: contact,
         entity: 'clientContact',
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
         <AvatarDisplay />
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
            <div className="hover:bg-tertiary rounded-xl transition-colors h-[40px] w-[40px] flex justify-center items-center cursor-pointer">
               <Plus className="aspect-square h-[20px]" />
            </div>
         </PopoverTrigger>
         <PopoverContent className="w-fit cursor-default">
            <p onClick={() => handleClick('client')}>Client contact</p>
            <p onClick={() => handleClick('partner')}>Partner contact</p>
         </PopoverContent>
      </Popover>
   );
};

export default ProjectContactSection;
