import React from 'react';
import { formatDate, formatTime } from '@/lib/helper/formatDateTime';
import type { EventPayload } from 'freelanceman-common/src/schemas';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { X } from 'lucide-react';
import { useEditEvent } from '@/lib/api/event-api';

interface EventListProps {
   eventsData: EventPayload[] | undefined;
   isLoading: boolean;
}

export const EventList: React.FC<EventListProps> = ({
   eventsData,
   isLoading,
}) => {
   if (isLoading) {
      return <p>Loading...</p>;
   }

   if (!eventsData || eventsData.length === 0) {
      return <p>No Event available</p>;
   }

   const groupedEvents = eventsData.reduce((acc, event) => {
      const date = formatDate(event.dueAt, 'SHORT');
      if (!acc[date]) {
         acc[date] = [];
      }
      acc[date].push(event);
      return acc;
   }, {} as Record<string, EventPayload[]>);

   const processedEvents = Object.keys(groupedEvents).map((date) => ({
      date,
      events: groupedEvents[date],
   }));

   const eventGroups = processedEvents.map((group) => {
      return (
         <React.Fragment key={group.date}>
            <EventGroup eventGroupData={group} />
            <div className="border-[0.5px] border-tertiary" />
            <div className="flex justify-center">
               <p className="w-fit text-center py-2 cursor-pointer">
                  Load more
               </p>
            </div>
         </React.Fragment>
      );
   });

   return (
      <div className="flex flex-col h-0 grow overflow-y-auto">
         <div className="flex flex-col">{eventGroups}</div>
      </div>
   );
};

const EventGroup = ({ eventGroupData }: { eventGroupData: any }) => {
   const formattedDate = formatDate(eventGroupData.date, 'SHORT');
   const month = formattedDate.split(' ')[0];
   const date = formattedDate.split(' ')[1];

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
      <div className="flex w-full cursor-default">
         <div className="flex flex-col w-12 min-h-14 items-center text-center leading-tight justify-center aspect-square h-full bg-foreground border-r border-r-tertiary">
            <p className="text-md font-normal">{date}</p>
            <p className="">{month}</p>
         </div>
         <div className="flex flex-col w-full">{events}</div>
      </div>
   );
};

const EventListItem = ({ data }: { data: EventPayload }) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const editEvents = useEditEvent({
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
         openedOn: 'action-page',
         type: 'event',
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
         <div
            className="h-full absolute flex items-center pr-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleCancelEvent}
         >
            <X className="h-4 cursor-pointer text-secondary" />
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
