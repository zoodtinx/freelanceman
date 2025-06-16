import React, { useRef, forwardRef, useEffect } from 'react';
import { formatDate, formatTime } from '@/lib/helper/formatDateTime';
import type { EventPayload } from 'freelanceman-common/src/schemas';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { X } from 'lucide-react';
import { useEditEvent, useEventsQuery } from '@/lib/api/event-api';
import {
   ApiErrorPlaceHolder,
   NoDataPlaceHolder,
   LoadingPlaceHolder,
} from '@/components/shared/ui/placeholder-ui/ListPlaceHolder';
import { cn } from '@/lib/helper/utils';
import { toast } from 'sonner';
import LoadMoreButton from '@/components/shared/ui/placeholder-ui/LoadMoreButton';
import EventListLoader from '@/components/shared/ui/placeholder-ui/EventListLoader';
import { ListProps } from '@/lib/types/list-props.type';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { EventFilterDto } from 'freelanceman-common';
import ActionPageEventListPlaceholder from '@/components/shared/ui/placeholder-ui/ActionPageEventListPlaceholder';
import { ScrollArea } from '@/components/shared/ui/primitives/ScrollArea';
import { format } from 'date-fns';

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
         return <EventListLoader />;
      } else {
         return <LoadingPlaceHolder />;
      }
   }

   if (isError && !eventsData) {
      return <ApiErrorPlaceHolder retryFn={refetch} />;
   }

   if (!eventsData || eventsData.items.length === 0) {
      if (page === 'action-page') {
         return <ActionPageEventListPlaceholder addFn={addFn} />
      }
      return <NoDataPlaceHolder addFn={addFn} children="Add New Event" />;
   }

   const groupedEvents = eventsData.items.reduce(
      (acc: any, event: EventPayload) => {
         const date = format(event.dueAt, 'dd MMM yy');

         if (!acc[date]) {
            acc[date] = [];
         }
         acc[date].push(event as any);
         return acc;
      },
      {} as Record<string, EventPayload[]>
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
         {page !== 'project-page' && <Separator className='sm:hidden' />}
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

const EventGroup = forwardRef<HTMLDivElement, { eventGroupData: any, index:number }>(
   ({ eventGroupData }, ref) => {
      const formattedDate = formatDate(eventGroupData.date, 'SHORT');
      const month = formattedDate.split(' ')[0].toUpperCase();
      const date = formattedDate.split(' ')[1];

      const dueAt = new Date(eventGroupData.date);
      console.log('eventGroupData.date', eventGroupData.date)
      const isToday = dueAt.getDate() === new Date().getDate();
      const isPastDue = new Date() > dueAt;
      const isScheduled = new Date() < dueAt;


      const events = eventGroupData.events.map(
         (data: EventPayload, index: number) => {
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
         <div className={cn("flex w-full cursor-default border-b border-tertiary")} ref={ref}>
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
   }
);

EventGroup.displayName = 'EventGroup';

const EventListItem = ({ data }: { data: EventPayload }) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const editEvents = useEditEvent({
      errorCallback() {
         toast.error('Error cancelling an event');
      },
      successCallback() {
         toast.success('Event cancelled');
      },
      optimisticUpdate: {
         enable: true,
         key: ['events'],
         type: 'edit',
      },
   });

   const formattedTime = formatTime(data.dueAt);

   const handleOpenDialog = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'edit',
         openedOn: 'actionPage',
         type: 'event',
         entity: 'event',
         data: data,
      });
   };

   const handleCancelEvent = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      editEvents.mutate({
         id: data.id,
         status: 'cancelled',
      });
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
         {data.status === 'scheduled' && <div
            className="h-full absolute flex items-center pr-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleCancelEvent}
         >
            <X className="h-4 cursor-pointer text-secondary" />
         </div>}
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
