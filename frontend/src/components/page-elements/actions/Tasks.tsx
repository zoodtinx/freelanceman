import { useState } from 'react';
import {
   getCoreRowModel,
   useReactTable,
   getSortedRowModel,
   getFilteredRowModel,
} from '@tanstack/react-table';
import { Calendar, Plus } from '@/components/shared/icons';
import { createTaskColumn } from './TaskColumn';
import {
   ToggleGroup,
   ToggleGroupItem,
} from 'src/components/shared/ui/primitives/ToggleGroup';
import { TableWithTaskBar } from '@/components/shared/ui/table-elements/PrebuiltTable';
import { NewActionButton } from '@/components/page-elements/actions/NewActionButton';
import TaskDialog from '@/components/shared/ui/TaskDialog';
import { useAllTasksQuery } from '@/lib/api/task-api';
import { taskDefaultValues } from 'src/components/shared/ui/primitives/utils';

import type { FormDialogState } from '@/lib/types/dialog.types';
import type { Task, TaskSearchOptions, TaskStatus } from '@types';
import FilterBar from '@/components/page-elements/actions/FilterBar';

export default function Tasks() {
   const [taskDialogState, setTaskDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      mode: 'view',
      type: 'task',
      data: taskDefaultValues,
   });

   const [taskFilter, setTaskFilter] = useState<TaskSearchOptions>({
      // show 'scheduled' tasks first when page loads
      status: 'planned',
   });

   const { data: tasksData, isLoading } = useAllTasksQuery(taskFilter);

   const table = useReactTable<Task>({
      data: tasksData as unknown as Task[],
      columns: createTaskColumn(setTaskDialogState), // pass setDialogState function for button in the table cell
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
      setTaskFilter({ status: status as TaskStatus });
   };

   return (
      <>
         <div className="flex w-full justify-between">
            <div className="flex items-end pb-3 gap-1">
               <Calendar className="w-[28px] h-auto" />
               <p className="text-xl leading-none mr-2">Tasks</p>
               <FilterBar
                  onValueChange={setStatusFilter}
                  type="event"
                  value={taskFilter.status || ''}
               />
            </div>
            <NewActionButton type="task" setDialogState={setTaskDialogState} />
         </div>
         <TableWithTaskBar isLoading={isLoading} table={table} />
         <TaskDialog
            dialogState={taskDialogState}
            setDialogState={setTaskDialogState}
         />
      </>
   );
}
