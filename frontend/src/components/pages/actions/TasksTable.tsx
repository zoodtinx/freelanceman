import {
   flexRender,
   getCoreRowModel,
   useReactTable,
   SortingState,
   getSortedRowModel,
   getFilteredRowModel,
} from '@tanstack/react-table';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/shared/ui/Table';
import {
   ToggleGroup,
   ToggleGroupItem,
} from '@/components/shared/ui/ToggleGroup';
import { Plus, Task } from '@/components/shared/icons';
import { tasks } from '@/lib/mock/tasks';
import { taskColumn } from './taskColumn';
import { useState } from 'react';

interface ColumnFilter {
   id: string;
   value: unknown;
}
type ColumnFiltersState = ColumnFilter[];

const TaskTable: React.FC = () => {
   const [sorting, setSorting] = useState<SortingState>([]);
   const [rowSelection, setRowSelection] = useState({})
   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
      {
         id: 'status',
         value: 'planned',
      },
   ]);
   const [columnVisibility, setColumnVisibility] = useState({
      taskName: true,
      deadline: true,
      status: false,
   });

   const table = useReactTable({
      data: tasks,
      columns: taskColumn,
      getCoreRowModel: getCoreRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      state: {
         sorting,
         columnFilters,
         columnVisibility,
      },
   });

   return (
      <>
         <div className="flex w-full justify-between">
            <div className="flex items-end pb-3 gap-1">
               <Task className="w-[28px] h-auto" />
               <p className="text-xl leading-none mr-2">Tasks</p>
               <ToggleGroup type="multiple">
                  <ToggleGroupItem value="planned">Planned</ToggleGroupItem>
                  <ToggleGroupItem value="completed">Completed</ToggleGroupItem>
                  <ToggleGroupItem value="canceled">Canceled</ToggleGroupItem>
                  <ToggleGroupItem value="all">All</ToggleGroupItem>
               </ToggleGroup>
            </div>
            <div className="hover:bg-tertiary rounded-xl transition-colors h-[40px] w-[40px] flex justify-center items-center">
               <Plus className="aspect-square h-[20px]" />
            </div>
         </div>
         <Table>
            <TableHeader>
               {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                     {headerGroup.headers.map((header) => {
                        return (
                           <TableHead key={header.id} width={header.getSize()}>
                              {header.isPlaceholder
                                 ? null
                                 : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                   )}
                           </TableHead>
                        );
                     })}
                  </TableRow>
               ))}
            </TableHeader>
            <TableBody>
               {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                     <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                     >
                        {row.getVisibleCells().map((cell) => (
                           <TableCell key={cell.id}>
                              {flexRender(
                                 cell.column.columnDef.cell,
                                 cell.getContext()
                              )}
                           </TableCell>
                        ))}
                     </TableRow>
                  ))
               ) : (
                  <TableRow>
                     <TableCell
                        colSpan={table.getAllColumns.length}
                        className="h-24 text-center"
                     >
                        No Results
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>
      </>
   );
};

export default TaskTable;
