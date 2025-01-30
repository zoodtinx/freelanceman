
import { cn } from '@/lib/helper/utils';
import { Dispatch, SetStateAction } from 'react';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { Checkbox } from '@/components/shared/ui/primitives/CheckBox';
import { SelectState } from '@/lib/types/list.type';
import { formatDate, formatTime } from '@/lib/helper/formatDateTime';
import type { FormDialogState } from '@/lib/types/dialog.types';
import type { Event } from '@types';
import { EllipsisVertical } from 'lucide-react';
import { EditPopover } from '@/components/shared/ui/EditPopover';

interface EventListProps {
   eventsData: Event[] | undefined;
   isLoading: boolean;
   selectState: SelectState;
   setSelectState: Dispatch<SetStateAction<SelectState>>;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
}

export const ProjectEventList: React.FC<EventListProps> = ({
   eventsData,
   isLoading,
   selectState = false,
   setDialogState,
   setSelectState,
}) => {
   if (isLoading) {
      return <p>Loading...</p>;
   }

   console.log('eventsData', eventsData);

   if (!eventsData || eventsData.length === 0) {
      return <p>No Event available</p>;
   }

   const fileListItems = eventsData.map((eventsData) => (
      <EventListItem
         key={eventsData.id}
         data={eventsData}
         setSelectState={setSelectState}
         selectState={selectState}
         setDialogState={setDialogState}
      />
   ));

   return (
      <div className="flex flex-col h-0 grow overflow-y-auto">
         {fileListItems}
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

const EventListItem = ({
   data,
   selectState,
   setSelectState,
   setDialogState,
   deleteFunction,
}: EventListItemProps) => {
   const isSelected = selectState.selectedValues?.includes(data.id) || '';

   const formattedDate = formatDate(data.dueDate, 'LONG');
   const formattedTime = formatTime(data.dueDate);

   return (
      <div className="flex h-14 gap-2 border-b border-b-tertiary  items-center">
         <div className="flex items-center text-center leading-tight justify-center aspect-square h-full border-r border-r-tertiary bg-quaternary">
            5 <br/>
            DEC
         </div>
         <div className="flex flex-col justify-center">
            <p>{data.name}</p>
            <div></div>
            <div className="flex">
               {formattedTime && (
                  <p className="text-sm text-secondary w-[60px]">
                     {formattedTime}
                  </p>
               )}
               <p className="text-sm text-secondary w-fit">{formattedDate}</p>
            </div>
         </div>
      </div>
   );
};

