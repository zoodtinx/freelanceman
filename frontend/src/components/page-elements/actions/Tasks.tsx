import { Plus } from '@/components/shared/icons';
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
import { useAllTasksQuery } from '@/lib/api/task-api';
import { CircleCheck } from 'lucide-react';
import { createTaskColumn } from './TaskColumn';
import TaskDialog from '@/components/shared/ui/TaskDialog';
import { formDefaultValue } from '@/components/shared/ui/primitives/utils';

export default function Tasks() {
   const [dialogState, setDialogState] = useState<DialogState>({
      isOpen: false,
      id: '',
      mode: 'view',
      actionType: 'task',
      data: {
         ...formDefaultValue('task')
      }
   })
   const { data: taskData, isLoading } = useAllTasksQuery();

   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
      {
         id: 'status',
         value: 'planned',
      },
   ]);

   const table = useReactTable({
      data: taskData,
      columns: createTaskColumn(setDialogState),
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
            actionType: 'task',
            id: '',
            isOpen: true,
            mode: 'create',
            data: {
               ...prevState.data,
               status: 'planned'
            }
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

   return (
      <>
         <div className="flex w-full justify-between">
            <div className="flex items-end pb-3 gap-1">
               <CircleCheck className="w-[28px] h-auto" />
               <p className="text-xl leading-none mr-2">Tasks</p>
               <ToggleGroup
                  type="multiple"
                  value={(columnFilters[0]?.value as string) || 'all'}
               >
                  <ToggleGroupItem
                     value="planned"
                     onClick={() => filter('planned')}
                  >
                     Planned
                  </ToggleGroupItem>
                  <ToggleGroupItem value='inProgress' onClick={() => filter('inProgress')}>
                     In progress
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
         <TaskDialog dialogState={dialogState} setDialogState={setDialogState} />
      </>
   );
}



