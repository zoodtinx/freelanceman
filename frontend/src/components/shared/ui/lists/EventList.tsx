import React, { useRef, forwardRef, useEffect } from 'react';
import { formatDate, formatTime } from '@/lib/helper/formatDateTime';
import type { EventFindManyItem } from 'freelanceman-common/src/schemas';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { useDeleteEvent, useEventsQuery } from '@/lib/api/event-api';
import {
   ApiErrorPlaceHolder,
   NoDataPlaceHolder,
   LoadingPlaceHolder,
} from '@/components/shared/ui/placeholder-ui/ListPlaceHolder';
import { cn } from '@/lib/helper/utils';
import LoadMoreButton from '@/components/shared/ui/placeholder-ui/LoadMoreButton';
import EventListLoader from '@/components/shared/ui/placeholder-ui/EventListLoader';
import { ListProps } from '@/lib/types/list-props.type';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { EventFilterDto } from 'freelanceman-common';
import ActionPageEventListPlaceholder from '@/components/shared/ui/placeholder-ui/ActionPageEventListPlaceholder';
import { ScrollArea } from '@/components/shared/ui/primitives/ScrollArea';
import { format } from 'date-fns';
import { Trash } from 'lucide-react';
import SearchNotFoundPlaceholder from '@/components/shared/ui/placeholder-ui/SearchNotFoundPlaceHolder';

export const EventList: React.FC<ListProps<EventFilterDto>> = ({
   addFn,
   filter,
   setFilter,
   loader = 'skeleton',
   page,
}) => {
   const {
      data: eventsData,
      isLoading,
      isError,
      refetch,
   } = useEventsQuery(filter);

   const lastItemRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (!eventsData || eventsData?.items.length <= 25) {
         return;
      }

      if (lastItemRef.current) {
         lastItemRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
         });
      }
   }, [eventsData?.items.length]);

   if (isLoading) {
      if (loader == 'skeleton') {
         return (
            <div className="px-2">
               <EventListLoader />
            </div>
         );
      } else {
         return <LoadingPlaceHolder />;
      }
   }

   if (isError && !eventsData) {
      return <ApiErrorPlaceHolder retryFn={refetch} />;
   }

   if (eventsData?.total === 0) {
      if (eventsData.unfilteredTotal === 0) {
         return <ActionPageEventListPlaceholder addFn={addFn} />;
      }
      return <SearchNotFoundPlaceholder>No project matched your search.</SearchNotFoundPlaceholder>;
   }

   const groupedEvents = eventsData.items.reduce(
      (acc: any, event: EventFindManyItem) => {
         const date = format(event.dueAt ?? '', 'dd MMM yy');

         if (!acc[date]) {
            acc[date] = [];
         }
         acc[date].push(event as any);
         return acc;
      },
      {} as Record<string, EventFindManyItem[]>
   );

   const processedEvents = Object.keys(groupedEvents).map((date) => ({
      date,
      events: groupedEvents[date],
   }));

   const remainingItems = eventsData.total - eventsData.items.length > 0;

   const eventGroups = processedEvents.map((group, i, arr) => {
      const isLast = i === arr.length - 1;

      return (
         <React.Fragment key={group.date}>
            <EventGroup
               eventGroupData={group}
               ref={isLast ? lastItemRef : undefined}
               index={i}
            />
         </React.Fragment>
      );
   });

   const handleLoadMore = () => {
      const curentLength = eventsData?.items.length;

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

   return (
      <ScrollArea className="flex flex-col h-0 grow">
         {page !== 'project-page' && <Separator className="sm:hidden" />}
         <div className="flex flex-col">{eventGroups}</div>
         {remainingItems && (
            <div className="flex justify-center pt-3 pb-8">
               <LoadMoreButton
                  loadMoreFn={handleLoadMore}
                  isLoading={isLoading}
               />
            </div>
         )}
      </ScrollArea>
   );
};

const EventGroup = forwardRef<
   HTMLDivElement,
   { eventGroupData: any; index: number }
>(({ eventGroupData }, ref) => {
   const formattedDate = formatDate(eventGroupData.date, 'SHORT');
   const month = formattedDate.split(' ')[0].toUpperCase();
   const date = formattedDate.split(' ')[1];

   const dueAt = new Date(eventGroupData.date);
   console.log('eventGroupData.date', eventGroupData.date);
   const today = new Date();
   const isToday =
      dueAt.getDate() === today.getDate() &&
      dueAt.getMonth() === today.getMonth() &&
      dueAt.getFullYear() === today.getFullYear();
   const isPastDue = new Date() > dueAt;
   const isScheduled = new Date() < dueAt;

   const events = eventGroupData.events.map(
      (data: EventFindManyItem, index: number) => {
         return (
            <React.Fragment key={data.id}>
               <EventListItem data={data} />
               {index !== eventGroupData.events.length - 1 && (
                  <div className="border-[0.5px] border-tertiary border-dotted" />
               )}
            </React.Fragment>
         );
      }
   );

   return (
      <div
         className={cn('flex w-full cursor-default border-b border-tertiary')}
         ref={ref}
      >
         <div
            className={`flex flex-col w-14 min-h-14 grow items-center text-center leading-tight justify-start
                           aspect-square bg-foreground relative border-r border-r-tertiary`}
         >
            <p className="text-md font-normal pt-3">{date}</p>
            <p className="text-sm">{month}</p>
            <div
               className={cn(
                  'absolute w-full h-full',
                  isPastDue && 'bg-background opacity-70',
                  isScheduled && 'bg-general-blue opacity-10',
                  isToday && 'bg-general-red opacity-5 dark:opacity-20'
               )}
            />
         </div>
         <div className="flex flex-col w-full">{events}</div>
      </div>
   );
});

EventGroup.displayName = 'EventGroup';

const EventListItem = ({ data }: { data: EventFindManyItem }) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const formattedTime = formatTime(data.dueAt ?? '');

   const deleteEvent = useDeleteEvent();

   const handleOpenDialog = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'edit',
         openedOn: 'actionPage',
         type: 'event',
         entity: 'event',
         data: data as any,
      });
   };

   const handleDelete = () => {
      deleteEvent.mutate(data.id);
   };

   return (
      <div
         className="flex flex-col justify-center h-14 pl-3 hover:bg-background transition-colors duration-75 group relative"
         onClick={handleOpenDialog}
      >
         <p>{data.name}</p>
         <div className="flex items-center">
            <p className="text-sm text-secondary w-[54px]">
               {formattedTime ? formattedTime : 'All day'}
            </p>
            <EventTags tags={data.tags} />
         </div>
         <div
            className="h-full absolute flex items-center pr-3 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleDelete}
         >
            <Trash className="h-4 cursor-pointer text-secondary hover:text-primary" />
         </div>
      </div>
   );
};

const EventTags = ({ tags }: { tags: string[] }) => {
   const eventsBubble = tags.map((tag) => {
      return (
         <p
            key={tag}
            className="text-sm py-0 px-2 border border-tertiary text-secondary rounded-full leading-normal"
         >
            {tag}
         </p>
      );
   });

   return <div className="flex items-center gap-1">{eventsBubble}</div>;
};
