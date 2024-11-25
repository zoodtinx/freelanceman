import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/shared/ui/Table';
import { Calendar, Client, Date, Plus } from '@/components/shared/icons';
import { events } from '@/lib/mock/events';
import { eventColumns } from './eventColumn';
import {
   flexRender,
   getCoreRowModel,
   useReactTable,
   SortingState,
   getSortedRowModel,
   getFilteredRowModel,
} from '@tanstack/react-table';
import { useState } from 'react';
import {
   ToggleGroup,
   ToggleGroupItem,
} from '@/components/shared/ui/ToggleGroup';

interface ColumnFilter {
   id: string;
   value: unknown;
}
type ColumnFiltersState = ColumnFilter[];

export default function EventsTable() {
   const [sorting, setSorting] = useState<SortingState>([]);
   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
      {
         id: 'status',
         value: 'upcoming',
      },
   ]);
   const [columnVisibility, setColumnVisibility] = useState({
      eventDate: true,
      eventName: true,
      status: false,
   });

   const table = useReactTable({
      data: events,
      columns: eventColumns,
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

   // console.log('columnFilters', columnFilters[0]?.value);


   return (
      <>
         <div className="flex w-full justify-between">
            <div className="flex items-end pb-3 gap-1">
               <Calendar className='w-[28px] h-auto'/>
               <p className="text-xl leading-none mr-2">Upcoming Events</p>
               <ToggleGroup type="multiple" value={columnFilters[0]?.value as string || 'all'}>
                  <ToggleGroupItem
                     value="upcoming"
                     onClick={() =>
                        setColumnFilters([
                           {
                              id: 'status',
                              value: 'upcoming',
                           },
                        ])
                     }
                  >
                     Upcoming
                  </ToggleGroupItem>
                  <ToggleGroupItem
                     value="completed"
                     onClick={() =>
                        setColumnFilters([
                           {
                              id: 'status',
                              value: 'completed',
                           },
                        ])
                     }
                  >
                     Finished
                  </ToggleGroupItem>
                  <ToggleGroupItem
                     value="all"
                     onClick={() =>
                        setColumnFilters(
                           (prev) =>
                              prev.filter((filter) => filter.id !== 'status') // Clear the status filter
                        )
                     }
                  >
                     All
                  </ToggleGroupItem>
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
                        No results.
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>
      </>
   );
}
