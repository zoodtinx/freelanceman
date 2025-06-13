import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { defaultEventValues } from 'src/components/shared/ui/helpers/constants/default-values';
import { EventList } from '@/components/shared/ui/lists/EventList';
import {
   ToggleGroup,
   ToggleGroupItem,
} from '@/components/shared/ui/primitives/ToggleGroup';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import AddButton from '@/components/shared/ui/AddButton';
import { EventFilterDto } from 'freelanceman-common';
import { cn } from '@/lib/helper/utils';

export default function EventSection() {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const [eventFilter, setEventFilter] = useState<EventFilterDto>({
      status: 'scheduled',
   });

   const handleNewEvent = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'actionPage',
         type: 'event',
         entity: 'event',
         data: { ...defaultEventValues },
      });
   };

   return (
      <div className="flex flex-col h-full">
         <div
            className={cn(
               'flex w-full justify-between p-2 pl-3',
               'sm:p-2 sm:px-2'
            )}
         >
            <div className="flex gap-1 items-center">
               <div className="flex items-end gap-1 sm:items-center">
                  <Calendar className="w-[28px] h-auto sm:w-[22px]" />
                  <p className="text-xl leading-none mr-2 sm:text-lg">Events</p>
               </div>
               <ToggleGroup
                  type="single"
                  className="pt-1 sm:pt-0"
                  value={eventFilter.status as any}
                  onValueChange={(value: any) =>
                     setEventFilter((prev) => ({ ...prev, status: value }))
                  }
               >
                  <ToggleGroupItem value="scheduled">Scheduled</ToggleGroupItem>
                  <ToggleGroupItem value="completed">Completed</ToggleGroupItem>
               </ToggleGroup>
            </div>
            <AddButton onClick={handleNewEvent} />
         </div>
         <EventList
            filter={eventFilter}
            setFilter={setEventFilter}
            addFn={handleNewEvent}
            page="action-page"
            className="px-2"
         />
      </div>
   );
}
