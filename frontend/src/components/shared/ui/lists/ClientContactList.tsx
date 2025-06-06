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
import { Plus } from 'lucide-react';
import { ScrollArea } from '@/components/shared/ui/primitives/ScrollArea';

export const ContactList = ({
   addFn,
   filter,
   setFilter,
   page,
   className
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
      if (!contacts || contacts?.items.length <= 25) {
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
   if (isError && !contacts) return <ApiErrorPlaceHolder retryFn={refetch} />;
   if (!contacts?.items?.length) {
      if (page === 'all-clients-page') {
         return <ContactListPlaceholder addFn={addFn} />;
      } else {
         return <NoDataPlaceHolder addFn={addFn} children='Add a contact'  />
      }
   }

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
            page={page ? page : 'all-client-page'}
            ref={isLast ? lastItemRef : undefined}
         />
      );
   });

   const remainingItems = contacts.total - contacts.items.length > 0;

   return (
      <ScrollArea className={cn("grow overflow-y-auto h-0", className)}>
         <div className="flex flex-col gap-1">{contactCards}</div>
         {remainingItems && (
            <div className="flex justify-center pt-2 pb-8">
               <LoadMoreButton
                  loadMoreFn={handleLoadMore}
                  isLoading={isLoading}
               />
            </div>
         )}
      </ScrollArea>
   );
};

export const ContactCard = forwardRef<
   HTMLDivElement,
   { contact: ClientContactPayload; page: string }
>(({ contact, page }, ref) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const { data } = useFileUrlQuery(contact.avatar, Boolean(contact.avatar));

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
                  {contact.company.name}
               </p>
            )}
            <p className="text-base text-secondary sm:hidden">{contact.role}</p>
         </div>
      </div>
   );
});

ContactCard.displayName = 'ContactCard';


const ContactListPlaceholder = ({ addFn }: { addFn: () => void }) => {
   const placeholders = [...Array(25)].map(() => {
      return (
         <div className="h-[75px] opacity-50 shrink-0 border border-secondary border-dashed rounded-full" />
      );
   });

   return (
      <div className="flex flex-col pt-1 gap-1 h-full overflow-hidden relative">
         <div className="z-10 absolute h-full w-full bottom-0 bg-gradient-to-t from-foreground to-transparent pointer-events-none" />
         <div
            onClick={addFn}
            className={`h-[75px] shrink-0 border border-dashed border-secondary flex gap-2 justify-center items-center text-secondary
                        rounded-full hover:border-primary hover:text-primary transition-colors duration-100 cursor-pointer`}
         >
            <Plus className="w-6 h-6" />
            <p>Add a new contact</p>
         </div>
         {placeholders}
      </div>
   );
};
