import React from 'react';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/shared/ui/Table';
import { flexRender } from '@tanstack/react-table';
import type { Table as TableType, RowData } from '@tanstack/react-table'; // Import RowData for better type constraints

interface TableProps<TData> {
   table: TableType<TData>;
}

const EventTable = <TData extends RowData>({
   table,
}: TableProps<TData>): JSX.Element => {
   return (
      <Table className="overflow-hidden cursor-default">
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
   );
};

export default EventTable;
