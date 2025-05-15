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
         openedOn: 'action-page',
         type: 'event',
         entity: 'event',
         data: { ...defaultEventValues },
      });
   };

   return (
      <div className="flex flex-col h-full">
         <div className="flex w-full justify-between p-4 pb-3">
            <div className="flex gap-1 items-center">
               <div className="flex items-end gap-1">
                  <Calendar className="w-[28px] h-auto" />
                  <p className="text-xl leading-none mr-2">Events</p>
               </div>
               <ToggleGroup
                  type="single"
                  className="pt-1"
                  value={eventFilter.status as any}
                  onValueChange={(value: any) =>
                     setEventFilter((prev) => ({ ...prev, status: value }))
                  }
               >
                  <ToggleGroupItem value="scheduled">Scheduled</ToggleGroupItem>
                  <ToggleGroupItem value="completed">Completed</ToggleGroupItem>
                  <ToggleGroupItem value="cancelled">Cancelled</ToggleGroupItem>
               </ToggleGroup>
            </div>
            <AddButton onClick={handleNewEvent} />
         </div>
         <EventList
            filter={eventFilter}
            setFilter={setEventFilter}
            addFn={handleNewEvent}
            page="action-page"
         />
      </div>
   );
}
