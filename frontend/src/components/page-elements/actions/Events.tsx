import { useRef, useState } from 'react';
import { Calendar } from 'lucide-react';
import { NewActionButton } from '@/components/page-elements/actions/NewActionButton';
import EventDialog from '@/components/shared/ui/EventDialog';
import { useAllEventQuery, useDeleteEvent } from '@/lib/api/event-api';
import { eventDefaultValues } from 'src/components/shared/ui/constants';

import type { FormDialogState } from '@/lib/types/dialog.types';
import type { EventSearchOptions, EventStatus } from '@types';

import { EventList } from '@/components/page-elements/actions/EventList';
import { ToggleGroup, ToggleGroupItem } from '@/components/shared/ui/primitives/ToggleGroup';

export default function Events() {
   const [eventDialogState, setEventDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      mode: 'view',
      type: 'event',
      data: eventDefaultValues,
      page: 'action-page'
   });

   const [eventFilter, setEventFilter] = useState({
      status: 'scheduled',
   });

   const [selectState, setSelectState] = useState({
      enableSelect: false,
      selectedValues: [] as string[],
   });

   const { data: eventsData, isLoading } = useAllEventQuery(eventFilter);

   return (
      <div className="flex flex-col grow">
         <div className="flex w-full justify-between">
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
                  <ToggleGroupItem value="finished">Finished</ToggleGroupItem>
               </ToggleGroup>
            </div>
            <NewActionButton
               type="event"
               setDialogState={setEventDialogState}
            />
         </div>
         <EventList
            eventsData={eventsData}
            isLoading={isLoading}
            setDialogState={setEventDialogState}
         />
         <EventDialog
            dialogState={eventDialogState}
            setDialogState={setEventDialogState}
         />
      </div>
   );
}
