import { cn } from '@/lib/helper/utils';
import React, { Dispatch, SetStateAction } from 'react';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { Checkbox } from '@/components/shared/ui/primitives/CheckBox';
import { SelectState } from '@/lib/types/list.type';
import { formatDate, formatTime } from '@/lib/helper/formatDateTime';
import type { FormDialogState } from '@/lib/types/dialog.types';
import type { Event } from '@types';
import { EllipsisVertical, PencilLine } from 'lucide-react';
import { EditPopover } from '@/components/shared/ui/EditPopover';

interface EventListProps {
   eventsData: Event[] | undefined;
   isLoading: boolean;
   selectState: SelectState;
   setSelectState: Dispatch<SetStateAction<SelectState>>;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
}

export const EventList: React.FC<EventListProps> = ({
   eventsData,
   isLoading,
   selectState = false,
   setDialogState,
   setSelectState,
}) => {
   if (isLoading) {
      return <p>Loading...</p>;
   }

   if (!eventsData || eventsData.length === 0) {
      return <p>No Event available</p>;
   }

   const groupedEvents = eventsData.reduce((acc, event) => {
      const date = formatDate(event.dueDate, 'SHORT');
      if (!acc[date]) {
         acc[date] = [];
      }
      acc[date].push(event);
      return acc;
   }, {} as Record<string, Event[]>);

   const processedEvents = Object.keys(groupedEvents).map((date) => ({
      date,
      events: groupedEvents[date],
   }));

   const eventGroups = processedEvents.map((group, index) => {
      return (
        <React.Fragment key={group.date}>
          <EventGroup eventGroupData={group} />
          <div className="border-[0.5px] border-dotted border-primary" />
        </React.Fragment>
      );
    });

   return (
      <div className="flex flex-col h-0 grow overflow-y-auto">
         <div className="flex flex-col">
            {eventGroups}
         </div>
      </div>
   );
};

interface EventListItemProps {
   data: Event;
   selectState: SelectState;
   setSelectState: Dispatch<SetStateAction<SelectState>>;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
   deleteFunction: () => void;
}

const EventGroup = ({eventGroupData}) => {
   const formattedDate = formatDate(eventGroupData.date, 'SHORT');
   const month = formattedDate.split(' ')[0]
   const date = formattedDate.split(' ')[1]

   const events = eventGroupData.events.map((data, index) => {
      return (
         <EventListItem data={data} key={data.id} />
      )
   })

   return (
      <div className='flex w-full cursor-default'>
         <div className="flex flex-col w-12 min-h-14 items-center text-center leading-tight justify-center aspect-square h-full border-x border-x-tertiary border-r-[0.75px] border-r-secondary">
            <p className='text-md'>{date}</p>
            <p className='font-medium'>{month}</p>
         </div>
         <div className='flex flex-col w-full'>{events}</div>
      </div>
   );
}

const EventListItem = ({
   data,
   setDialogState,
}: EventListItemProps) => {

   const formattedDate = formatDate(data.dueDate, 'SHORT');
   const formattedTime = formatTime(data.dueDate);

   const handleOpenDialog = () => {
      setDialogState({
         isOpen: true,
         mode: 'view',
         type: 'event',
         data: data,
         id: data.id,
         page: 'project-page',
      });
   };

   const tags = ['Meeting', 'London', 'Mechanical', 'Robot'];

   return (
      <div className="flex border-b border-b-tertiary border-r border-r-tertiary justify-between items-center pr-3 group">
         <div className="flex flex-col justify-center h-14 pl-3">
               <p>{data.name}</p>
               <div className="flex items-center">
                  <p className="text-sm text-secondary w-[54px]">
                     {formattedTime ? formattedTime : 'All day'}
                  </p>
                  <EventTags tags={tags} />
               </div>
            </div>
         <PencilLine
            className={`w-5 h-5 stroke-[1.5px] text-secondary opacity-0 cursor-pointer
               group-hover:opacity-100 hover:text-primary
               transition-all duration-100
               `}
            onClick={handleOpenDialog}
         />
      </div>
   );
};

const EventTags = ({ tags }: { tags: string[] }) => {
   const eventsBubble = tags.map((tag) => {
      return (
         <p
            key={tag}
            className="text-sm py-0 px-2 border text-secondary rounded-full leading-normal"
         >
            {tag}
         </p>
      );
   });

   return <div className="flex items-center gap-1">{eventsBubble}</div>;
};
