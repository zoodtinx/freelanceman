import { defaultPartnerContactValues } from '@/components/shared/ui/helpers/constants/default-values';
import {
   ApiErrorPlaceHolder,
   NoDataPlaceHolder,
} from '@/components/shared/ui/placeholder-ui/ListPlaceHolder';
import LoadMoreButton from '@/components/shared/ui/placeholder-ui/LoadMoreButton';
import { PartnerPageTabsLoader } from '@/components/shared/ui/placeholder-ui/PartnerPageLoader';
import TabListPlaceHolder from '@/components/shared/ui/placeholder-ui/TabListPlaceholder';
import { ScrollArea } from '@/components/shared/ui/primitives/ScrollArea';
import { usePartnerContactsQuery } from '@/lib/api/partner-contact-api';
import { ListProps } from '@/lib/types/list-props.type';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { UseQueryResult } from '@tanstack/react-query';
import {
   PartnerContactFilterDto,
   PartnerContactListPayload,
   PartnerContactPayload,
} from 'freelanceman-common';
import { User } from 'lucide-react';
import React, { forwardRef, useEffect, useRef } from 'react';

export const PartnerContactList: React.FC<
   ListProps<PartnerContactFilterDto>
> = ({ addFn, filter, setFilter }) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const {
      data: contacts,
      isLoading,
      isError,
      refetch,
   } = usePartnerContactsQuery(
      filter
   ) as UseQueryResult<PartnerContactListPayload>;

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

   const handleNewPartner = () => {
      setFormDialogState({
         isOpen: true,
         type: 'partner-contact',
         mode: 'create',
         entity: 'partner-contact',
         openedOn: 'partner-page',
         data: { ...defaultPartnerContactValues },
      });
   };

   if (isLoading) {
      return <PartnerPageTabsLoader />;
   }

   if (isError) {
      return <ApiErrorPlaceHolder retryFn={refetch} />;
   }

   if (!contacts || contacts.items.length === 0) {
      return (
         <TabListPlaceHolder
            addFn={handleNewPartner}
            children="Add a new partner contact"
         />
      );
   }

   const remainingItems = contacts?.total - contacts?.items.length > 0;
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

   const partnerTabs = contacts.items.map((contact, i, arr) => {
      const isLast = i === arr.length - 1;

      return (
         <PartnerTab
            key={contact.id}
            contact={contact}
            ref={isLast ? lastItemRef : undefined}
         />
      );
   });

   return (
      <ScrollArea className="h-full">
         <div className="flex flex-col gap-1">
            {partnerTabs}
            {remainingItems && (
               <div className="flex justify-center pt-3">
                  <LoadMoreButton
                     loadMoreFn={handleLoadMore}
                     isLoading={isLoading}
                  />
               </div>
            )}
         </div>
      </ScrollArea>
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
         <div className="z-10 flex items-center px-4 justify-between w-full text-primary sm:px-2">
            <div className="flex items-center">
               <p className="w-[190px] transition-opacity leading-tight sm:hidden">
                  {contact.role}
               </p>
               <div className='flex items-center'>
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
            </div>
            <p className="w-fit text-right transition-opacity sm:hidden">
               {contact.company}
            </p>
         </div>
      </div>
   );
});

PartnerTab.displayName = 'PartnerTab';
