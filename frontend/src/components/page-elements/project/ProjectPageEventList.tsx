import { EditPopover } from '@/components/shared/ui/EditPopover';
import { cn } from '@/lib/helper/utils';
import { Dispatch, SetStateAction } from 'react';
import { EllipsisVertical } from 'lucide-react';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { Checkbox } from '@/components/shared/ui/primitives/CheckBox';
import { SelectState } from '@/lib/types/list.type';
import { formatDate, formatTime } from '@/lib/helper/formatDateTime';
import type { FormDialogState } from '@/lib/types/dialog.types';
import type { Event } from '@types';

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
   selectState,
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

   return <div className='flex flex-col h-0 grow overflow-y-auto'>{fileListItems}</div>;
};



interface EventListItemProps {
   data: Event;
   selectState: SelectState;
   setSelectState: Dispatch<SetStateAction<SelectState>>;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
   deleteFunction: () => void;
}

export const EventListItem = ({
   data,
   selectState,
   setSelectState,
   setDialogState,
   deleteFunction,
}: EventListItemProps) => {
   const isSelected = selectState.selectedValues.includes(data.id);

   const formattedDate = formatDate(data.dueDate, 'SHORT');
   const formattedTime = formatTime(data.dueDate);

   const handleClick = () => {
      if (selectState.enableSelect) {
         if (isSelected) {
            setSelectState((prev) => {
               return {
                  ...prev,
                  selectedValues: prev.selectedValues.filter(
                     (id) => id !== data.id
                  ),
               };
            });
         } else {
            setSelectState((prev) => {
               return {
                  enableSelect: true,
                  selectedValues: [...prev.selectedValues, data.id],
               };
            });
         }
      } else if (!selectState.enableSelect) {
         setDialogState({
            isOpen: true,
            data: data,
            id: data.id,
            mode: 'view',
            type: 'file',
         });
      }
   };

   return (
      <div className="flex flex-col cursor-default" onClick={handleClick}>
         <div
            className={cn(
               'flex px-2 items-center bg-transparent hover:bg-quaternary transition-colors duration-100',
               { 'bg-quaternary': isSelected }
            )}
         >
            <Checkbox
               className={cn(
                  'h-[14px] w-0 opacity-0 transition-all duration-150',
                  { 'w-[14px] mr-1  opacity-100': selectState.enableSelect }
               )}
               checked={isSelected}
            />
            <div className="flex flex-col w-full">
               <div className="flex justify-between py-2 grow items-center">
                  <div className="flex gap-1 items-center text-[15px]">
                     <p>{data.name}</p>
                  </div>
                  <div className="flex">
                     <p className="text-sm text-secondary w-[60px]">
                        {formattedTime}
                     </p>
                     <p className="text-sm text-secondary w-[50px]">
                        {formattedDate}
                     </p>
                  </div>
               </div>
            </div>
            <EditPopover />
         </div>
         <Separator className="bg-quaternary h-[1px]" />
      </div>
   );
};
