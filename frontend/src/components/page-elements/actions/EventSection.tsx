import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { NewActionButton } from '@/components/page-elements/actions/NewActionButton';
import { useEventsQuery } from '@/lib/api/event-api';
import { defaultEventValues } from 'src/components/shared/ui/helpers/constants/default-values';
import { EventList } from '@/components/page-elements/actions/EventList';
import {
   ToggleGroup,
   ToggleGroupItem,
} from '@/components/shared/ui/primitives/ToggleGroup';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';

export default function EventSection() {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const [eventFilter, setEventFilter] = useState({
      status: 'scheduled',
   });

   const { data: eventsData, isLoading } = useEventsQuery(eventFilter);

   const handleNewEvent = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'action-page',
         type: 'event',
         data: defaultEventValues,
      });
   };

   return (
      <div className="flex flex-col grow">
         <div className="flex w-full justify-between pb-1">
            <div className="flex gap-1 items-center">
               <div className="flex items-end pb-3 gap-1">
                  <Calendar className="w-[28px] h-auto" />
                  <p className="text-xl leading-none mr-2">Events</p>
               </div>
               <ToggleGroup
                  type="single"
                  value={eventFilter.status}
                  onValueChange={(value) =>
                     setEventFilter((prev) => ({ ...prev, status: value }))
                  }
               >
                  <ToggleGroupItem value="scheduled">Scheduled</ToggleGroupItem>
                  <ToggleGroupItem value="completed">Completed</ToggleGroupItem>
                  <ToggleGroupItem value="cancelled">Cancelled</ToggleGroupItem>
               </ToggleGroup>
            </div>
            <NewActionButton type="event" setDialogState={handleNewEvent} />
         </div>
         <EventList
            eventsData={eventsData}
            isLoading={isLoading}
            setDialogState={handleNewEvent}
         />
      </div>
   );
}
