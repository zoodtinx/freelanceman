import { forwardRef, useState } from 'react';
import { UsersRound, Loader2 } from 'lucide-react';
import { useClientContactsQuery } from 'src/lib/api/client-contact-api';
import AddButton from '@/components/shared/ui/AddButton';
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
import { useFileUrlQuery } from '@/lib/api/file-api';
import { ClientContactFindManyItem, ClientContactFindManyResponse, PartnerContactFindManyResponse, ProjectFindOneResponse } from 'freelanceman-common';

export const ProjectContactSection = ({
   project,
}: {
   project: ProjectFindOneResponse;
}): JSX.Element => {
   // hooks
   const setSelectorDialogState = useSelectionDialogStore(
      (state) => state.setSelectorDialogState
   );
   const [tab, setTab] = useState<'client' | 'partner'>('client');

   // fetch contacts and cast type
   const {
      data: clientContacts,
      isLoading: clientIsLoading,
      isError: clientIsError,
   } = useClientContactsQuery(
      {projectId: project.id},
      tab === 'client'
   ) as UseQueryResult<ClientContactFindManyResponse>;
   const {
      data: partnerContacts,
      isLoading: partnerIsLoading,
      isError: partnerIsError,
   } = usePartnerContactsQuery(
      {projectId: project.id},
      tab === 'partner'
   ) as UseQueryResult<PartnerContactFindManyResponse>;

   // conditional state values for tab render
   const contacts = tab === 'client' ? clientContacts : partnerContacts;
   const isLoading = tab === 'client' ? clientIsLoading : partnerIsLoading;
   const isError = tab === 'client' ? clientIsError : partnerIsError;

   const handleAddContact = () => {
      const selected = contacts?.items.map(
         (contact: any): SelectObject => {
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
         selected: selected!,
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
                     'flex items-center gap-1 text-secondary transition-colors duration-150 h-full border-tertiary hover:text-primary lg:font-normal',
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
                     'flex items-center gap-1 text-secondary transition-colors duration-150 h-full  border-tertiary hover:text-primary lg:font-normal',
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
            <NoDataPlaceHolder className='pb-0' addFn={handleAddContact}>
               Add Contact
            </NoDataPlaceHolder>
         ) : (
            <div className="flex flex-col gap-1 h-0 grow overflow-y-auto p-3">
               {contacts?.items.map((contact) => (
                  <ContactCard page='projectPage' key={contact.id} contact={contact as any} />
               ))}
            </div>
         )}
      </>
   );
};

export const ContactCard = forwardRef<
   HTMLDivElement,
   { contact: ClientContactFindManyItem; page: string }
>(({ contact, page }, ref) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   // fetch avatar image url
   const { data } = useFileUrlQuery(
      contact.avatar || '',
      Boolean(contact.avatar)
   );

   const handleClick = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'edit',
         openedOn: 'clientPage',
         type: 'clientContact',
         entity: 'clientContact',
         data: contact,
      });
   };

   return (
      <div
         ref={ref}
         onClick={handleClick}
         className={cn(
            `flex w-full rounded-full bg-quaternary p-1 items-center gap-2 h-[55px] shrink-0
               border-[1.5px] border-transparent transition-colors duration-75 hover:border-primary 
               cursor-default`,
            page === 'all-client-page' && 'h-[75px] p-2',
            'sm:h-fit'
         )}
      >
         <AvatarDisplay page={page} url={data?.url} className='sm:w-8 sm:h-8' />
         <div className="flex flex-col leading-tight">
            <p className="font-semibold text-md sm:text-base">{contact.name}</p>
            {page === 'all-client-page' && (
               <p className="font-semibold text-base text-secondary">
                  {contact.company?.name}
               </p>
            )}
            <p className="text-base text-secondary sm:hidden">{contact.role}</p>
         </div>
      </div>
   );
});
