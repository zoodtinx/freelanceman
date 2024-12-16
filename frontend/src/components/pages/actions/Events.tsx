import { Calendar, Client, Date, Plus } from '@/components/shared/icons';
import { eventColumns } from './eventColumn';
import {
   flexRender,
   getCoreRowModel,
   useReactTable,
   ColumnFiltersState,
   getSortedRowModel,
   getFilteredRowModel,
} from '@tanstack/react-table';
import { useRef, useState } from 'react';
import {
   ToggleGroup,
   ToggleGroupItem,
} from '@/components/shared/ui/ToggleGroup';
import { useAllEventQuery } from '@/lib/api/eventApi';
import EventTable from './EventTable';
import { useActionsViewContext } from '@/lib/context/ActionsViewContext';
import EventDialog from '@/components/shared/ui/EventDialog';

export default function Events() {
   
   const { data: eventsData, isLoading } = useAllEventQuery();
   const {
      dialogState,
      setDialogState
   } = useActionsViewContext();
   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
      {
         id: 'status',
         value: 'scheduled',
      },
   ]);

   const ongoingFilter = [
      {
        id: 'status',
        value: 'onGoing',
      },
    ];

    const ongoingTable = useReactTable({
      data: eventsData,
      columns: eventColumns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        columnFilters: ongoingFilter, // Apply the ongoing filter
        columnVisibility: {
          status: false, // Hide status column in this table if not needed
        },
      },
    });

   const table = useReactTable({
      data: eventsData,
      columns: eventColumns,
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
      return <div>Loading</div>;
   }

   const handleNewTask = () => {
      setDialogState((prevState) => {
         return {
            ...prevState,
            actionType: 'event',
            id: '',
            isOpen: true,
            mode: 'create',
         }
      })
   };

   const filter = (value: string) => {
      if (value === 'all') {
         setColumnFilters(
            (prev) => prev.filter((filter) => filter.id !== 'status')
         );
         return;
      } else {
         setColumnFilters([
            {
               id: 'status',
               value: value,
            },
         ]);
      }
   };

   const OnGoingTable = () => {
      if (columnFilters[0].value !== 'scheduled') {
         return null
      }
      return <EventTable table={ongoingTable} />
   }

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
                  <ToggleGroupItem>
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
                  <ToggleGroupItem value="all" onClick={() => filter('all')}>
                     All
                  </ToggleGroupItem>
               </ToggleGroup>
            </div>
            <div
               onClick={handleNewTask}
               className="hover:bg-tertiary rounded-xl transition-colors h-[40px] w-[40px] flex justify-center items-center"
            >
               <Plus className="aspect-square h-[20px]" />
            </div>
         </div>
         {/* <OnGoingTable /> */}
         <EventTable table={table} />
         {/* <EventDialog
            dialogState={dialogState}
            setDialogState={setDialogState}
         /> */}
      </>
   );
}



