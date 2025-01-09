import { useState } from 'react';
import {
   getCoreRowModel,
   useReactTable,
   getSortedRowModel,
   getFilteredRowModel,
} from '@tanstack/react-table';
import { Calendar } from 'lucide-react';
import { createEventColumn } from './EventColumn';
import { TableWithTaskBar } from '@/components/shared/ui/table-elements/PrebuiltTable';
import { NewActionButton } from '@/components/page-elements/actions/NewActionButton';
import EventDialog from '@/components/shared/ui/EventDialog';
import { useAllEventQuery } from '@/lib/api/event-api';
import { eventDefaultValues } from 'src/components/shared/ui/primitives/utils';
import FilterBar from '@/components/page-elements/actions/FilterBar';

import type { FormDialogState } from '@/lib/types/dialog.types';
import type { Event, EventSearchOptions, EventStatus } from '@types';

export default function Events() {
   const [eventDialogState, setEventDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      mode: 'view',
      type: 'event',
      data: eventDefaultValues,
   });

   const [eventFilter, setEventFilter] = useState<EventSearchOptions>({
      //show 'scheduled' events first when page loads
      status: 'scheduled',
   });

   const { data: eventsData, isLoading } = useAllEventQuery(eventFilter);

   const table = useReactTable<Event>({
      data: eventsData as unknown as Event[],
      columns: createEventColumn(setEventDialogState), //pass setDialogState function for button in the table cell
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
         columnVisibility: {
            status: false,
         },
      },
   });

   const setStatusFilter = (status: string) => {
      setEventFilter({ status: status as EventStatus });
   };

   return (
      <>
         <div className="flex w-full justify-between">
            <div className="flex items-end pb-3 gap-1">
               <Calendar className="w-[28px] h-auto" />
               <p className="text-xl leading-none mr-2">Events</p>
               <FilterBar
                  onValueChange={setStatusFilter}
                  type="event"
                  value={eventFilter.status || ''}
               />
            </div>
            <NewActionButton
               type="event"
               setDialogState={setEventDialogState}
            />
         </div>
         <TableWithTaskBar isLoading={isLoading} table={table} />
         <EventDialog
            dialogState={eventDialogState}
            setDialogState={setEventDialogState}
         />
      </>
   );
}
