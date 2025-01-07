import { Calendar, Plus } from '@/components/shared/icons';
import { createEventColumn } from './EventColumn';
import {
   getCoreRowModel,
   useReactTable,
   ColumnFiltersState,
   getSortedRowModel,
   getFilteredRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';
import {
   ToggleGroup,
   ToggleGroupItem,
} from 'src/components/shared/ui/primitives/ToggleGroup';
import EventTable from './EventTable';
import { useAllEventQuery } from '@/lib/api/event-api'
import EventDialog from '@/components/shared/ui/EventDialog';
import { formDefaultValue } from '@/components/shared/ui/primitives/utils';
import { DialogState } from '@/lib/types/project-view-context.types';

export default function Events() {
   const [dialogState, setDialogState] = useState<DialogState>({
      isOpen: false,
      id: '',
      mode: 'view',
      actionType: 'event',
      data: {
         ...formDefaultValue('event'),
      },
   });

   const { data: eventsData, isLoading } = useAllEventQuery();

   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
      {
         id: 'status',
         value: 'scheduled',
      },
   ]);

   const table = useReactTable({
      data: eventsData,
      columns: createEventColumn(setDialogState),
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnFiltersChange: setColumnFilters,
      state: {
         columnFilters,
         columnVisibility: {
            status: false,
         },
      },
   });

   if (isLoading) {
      return <div>Loading...</div>;
   }

   const handleNewEvent = () => {
      setDialogState((prevState) => ({
         actionType: 'event',
         id: '',
         isOpen: true,
         mode: 'create',
         data: {
            ...prevState.data,
            status: 'scheduled',
         },
      }));
   };

   const filter = (value: string) => {
      if (value === 'all') {
         setColumnFilters((prev) =>
            prev.filter((filter) => filter.id !== 'status')
         );
      } else {
         setColumnFilters([
            {
               id: 'status',
               value: value,
            },
         ]);
      }
   };

   return (
      <>
         <div className="flex w-full justify-between">
            <div className="flex items-end pb-3 gap-1">
               <Calendar className="w-[28px] h-auto" />
               <p className="text-xl leading-none mr-2">Events</p>
               <ToggleGroup
                  type="multiple"
                  value={(columnFilters[0]?.value as string) || 'all'}
               >
                  <ToggleGroupItem
                     value="scheduled"
                     onClick={() => filter('scheduled')}
                  >
                     Scheduled
                  </ToggleGroupItem>
                  <ToggleGroupItem
                     value="ongoing"
                     onClick={() => filter('ongoing')}
                  >
                     Ongoing
                  </ToggleGroupItem>
                  <ToggleGroupItem
                     value="completed"
                     onClick={() => filter('completed')}
                  >
                     Completed
                  </ToggleGroupItem>
                  <ToggleGroupItem
                     value="cancelled"
                     onClick={() => filter('cancelled')}
                  >
                     Cancelled
                  </ToggleGroupItem>
                  <ToggleGroupItem
                     value="all"
                     onClick={() => filter('all')}
                  >
                     All
                  </ToggleGroupItem>
               </ToggleGroup>
            </div>
            <div
               onClick={handleNewEvent}
               className="hover:bg-tertiary rounded-xl transition-colors h-[40px] w-[40px] flex justify-center items-center cursor-pointer"
            >
               <Plus className="aspect-square h-[20px]" />
            </div>
         </div>
         <EventTable table={table} />
         <EventDialog
            dialogState={dialogState}
            setDialogState={setDialogState}
         />
      </>
   );
}
