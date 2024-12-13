import { Calendar, Client, Date, Plus } from '@/components/shared/icons';
import { eventColumns } from './eventColumn2';
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
import NewEventDialog from '@/components/shared/ui/NewEventDialog';
import EventDialog from '@/components/shared/ui/EventDialog';

export default function Events() {
   const { data: eventsData, isLoading } = useAllEventQuery();
   const {
      isTaskDialogOpen,
      setIsTaskDialogOpen,
      isNewTaskDialogOpen,
      setIsNewTaskDialogOpen,
      isEventDialogOpen,
      setIsEventDialogOpen,
      eventDialogData
   } = useActionsViewContext();
   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
      {
         id: 'status',
         value: 'scheduled',
      },
   ]);

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
      setIsEventDialogOpen({
         id: '',
         isOpen: true,
         mode: 'create',
         actionType: 'event',
      });
   };

   const filter = (value: string) => {
      if (value === 'all') {
         setColumnFilters(
            (prev) => prev.filter((filter) => filter.id !== 'status') // Clear the status filter
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

   return (
      <>
         <div className="flex w-full justify-between">
            <div className="flex items-end pb-3 gap-1">
               <Calendar className="w-[28px] h-auto" />
               <p className="text-xl leading-none mr-2">Upcoming Events</p>
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
         <EventTable table={table} />
         <EventDialog
            dialogState={isEventDialogOpen}
            setDialogState={setIsEventDialogOpen}
            dialogData={eventDialogData}
         />
         <NewEventDialog
            dialogueState={isNewTaskDialogOpen}
            setDialogueState={setIsNewTaskDialogOpen}
         />
      </>
   );
}



