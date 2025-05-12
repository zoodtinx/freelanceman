import { useClientContactsQuery } from 'src/lib/api/client-contact-api';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import {
   ApiErrorPlaceHolder,
   NoDataPlaceHolder,
} from '@/components/shared/ui/placeholder-ui/ListPlaceHolder';
import { UseQueryResult } from '@tanstack/react-query';
import {
   ClientContactFilterDto,
   ClientContactListPayload,
   ClientContactPayload,
} from 'freelanceman-common';
import LoadMoreButton from '@/components/shared/ui/placeholder-ui/LoadMoreButton';
import { ListProps } from '@/lib/types/list-props.type';
import { AvatarDisplay } from '@/components/shared/ui/AvatarDisplay';
import { useFileUrlQuery } from '@/lib/api/file-api';
import { forwardRef, useEffect, useRef } from 'react';
import { ClientContactListLoader } from '@/components/shared/ui/placeholder-ui/ClientContactLoader';
import { cn } from '@/lib/helper/utils';

export const ContactList = ({
   addFn,
   filter,
   setFilter,
   page
}: ListProps<ClientContactFilterDto>) => {
   const {
      data: contacts,
      isLoading,
      isError,
      refetch,
   } = useClientContactsQuery(
      filter
   ) as UseQueryResult<ClientContactListPayload>;

   const lastItemRef = useRef<HTMLDivElement>(null);

useEffect(() => {
      if (!contacts || contacts?.items.length <= 20) {
         return;
      }

      if (lastItemRef.current) {
         lastItemRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
         });
      }
   }, [contacts?.items.length]);

   if (isLoading) return <ClientContactListLoader />;
   if (isError || !contacts) return <ApiErrorPlaceHolder retryFn={refetch} />;
   if (!contacts.items.length)
      return <NoDataPlaceHolder addFn={addFn}>Add a contact</NoDataPlaceHolder>;

   console.log('length', contacts?.items.length);
   console.log('total', contacts.total);

   const handleLoadMore = () => {
      const curentLength = contacts?.items.length;

      if (!curentLength) {
         return;
      }

      setFilter((prev) => {
         return {
            ...prev,
            take: curentLength + 13,
         };
      });
   };

   const contactCards = contacts.items.map((contact, i, arr) => {
      const isLast = i === arr.length - 1;
      return (
         <ContactCard
            key={contact.id}
            contact={contact}
            page={page}
            ref={isLast ? lastItemRef : undefined}
         />
      );
   });

   const remainingItems = contacts.total - contacts.items.length > 0;

   return (
      <div className="grow overflow-y-auto h-0 pt-1">
         <div className="flex flex-col gap-1">{contactCards}</div>
         {remainingItems && (
            <div className="flex justify-center pt-3">
               <LoadMoreButton
                  loadMoreFn={handleLoadMore}
                  isLoading={isLoading}
               />
            </div>
         )}
      </div>
   );
};

export const ContactCard = forwardRef<
   HTMLDivElement,
   { contact: ClientContactPayload, page: string }
>(({ contact, page }, ref) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const { data } = useFileUrlQuery(
      contact.avatar,
      Boolean(contact.avatar)
   );

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
         ref={ref}
         onClick={handleClick}
         className={cn(`flex w-full rounded-full bg-quaternary p-1 items-center gap-2 h-[75px] shrink-0
               border-[1.5px] border-transparent transition-colors duration-75 hover:border-primary 
               cursor-default`, page !== 'all-client-page' && 'h-[55px]' )}
      >
         <AvatarDisplay url={data?.url} />
         <div className="flex flex-col leading-tight">
            <p className="font-semibold text-md">{contact.name}</p>
            {page === 'all-client-page' && <p className="font-semibold text-base text-secondary">
               {contact.company.name}
            </p>}
            <p className="text-base text-secondary">{contact.role}</p>
         </div>
      </div>
   );
});

ContactCard.displayName = 'ContactCard';
