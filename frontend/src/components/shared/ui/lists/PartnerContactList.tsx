import { AvatarDisplay } from '@/components/shared/ui/AvatarDisplay';
import { defaultPartnerContactValues } from '@/components/shared/ui/helpers/constants/default-values';
import {
   ApiErrorPlaceHolder
} from '@/components/shared/ui/placeholder-ui/ListPlaceHolder';
import LoadMoreButton from '@/components/shared/ui/placeholder-ui/LoadMoreButton';
import { PartnerPageTabsLoader } from '@/components/shared/ui/placeholder-ui/PartnerPageLoader';
import SearchNotFoundPlaceholder from '@/components/shared/ui/placeholder-ui/SearchNotFoundPlaceHolder';
import TabListPlaceHolder from '@/components/shared/ui/placeholder-ui/TabListPlaceholder';
import { ScrollArea } from '@/components/shared/ui/primitives/ScrollArea';
import { useFileUrlQuery } from '@/lib/api/file-api';
import { usePartnerContactsQuery } from '@/lib/api/partner-contact-api';
import { cn } from '@/lib/helper/utils';
import { ListProps } from '@/lib/types/list-props.type';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { UseQueryResult } from '@tanstack/react-query';
import {
   PartnerContactFilterDto,
   PartnerContactFindManyItem,
   PartnerContactFindManyResponse,
} from 'freelanceman-common';
import React, { forwardRef, useEffect, useRef } from 'react';

export const PartnerContactList: React.FC<
   ListProps<PartnerContactFindManyResponse,PartnerContactFilterDto>
> = ({  filter, setFilter, className, queryResult }) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const {
      data: contacts,
      isLoading,
      isError,
      refetch,
   } = queryResult

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
         type: 'partnerContact',
         mode: 'create',
         entity: 'partnerContact',
         openedOn: 'partnerPage',
         data: { ...defaultPartnerContactValues },
      });
   };

   if (isLoading) {
      return <div className='px-2'><PartnerPageTabsLoader /></div>
   }

   if (contacts?.total === 0) {
      if (contacts.unfilteredTotal === 0) {
          return (
            <div className='px-2'>
               <TabListPlaceHolder
                  addFn={handleNewPartner}
                  children="Add a new partner contact"
               />
            </div>
      );
      }
      return <SearchNotFoundPlaceholder>No partner matched your search.</SearchNotFoundPlaceholder>;
   }

   if (isError || !contacts) {
      return <ApiErrorPlaceHolder retryFn={refetch} />;
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
      <ScrollArea className={cn("h-full sm:pt-1", className)}>
         <div className={cn("flex flex-col gap-1 grow pb-7")}>
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
   { contact: PartnerContactFindManyItem }
>(({ contact }, ref) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const { data } = useFileUrlQuery(contact.avatar ?? '', Boolean(contact.avatar));

   const handleClick = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'edit',
         openedOn: 'partnerPage',
         type: 'partnerContact',
         data: contact,
         entity: 'partnerContact',
      });
   };

   return (
      <div
         ref={ref}
         className={cn(
            'flex rounded-[15px] h-[50px] shrink-0 relative border-2 border-transparent hover:border-primary transition-colors bg-quaternary cursor-default',
            'sm:w-full sm:h-[45px]'
         )}
         onClick={handleClick}
      >
         <div className="z-10 flex items-center px-4 justify-between w-full text-primary sm:px-2">
            <div className="flex items-center">
               <p className="w-[190px] transition-opacity leading-tight sm:hidden">
                  {contact.role}
               </p>
               <div className="flex items-center gap-[11px]">
                  <AvatarDisplay
                     page={'partner-page'}
                     url={data?.url}
                     className="sm:w-8 sm:h-8 w-[38px] shrink-0"
                  />
                  <p className="font-medium max-w-[700px] w-[300px] text-md truncate cursor-default sm:w-fit">
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
