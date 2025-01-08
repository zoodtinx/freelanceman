import React, { forwardRef, useRef } from 'react';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from 'src/components/shared/ui/table-elements/Table';
import { flexRender, RowData } from '@tanstack/react-table';
import { Table as TableType } from '@tanstack/react-table';
import TaskBar from '@/components/shared/ui/table-elements/TaskBar';

interface TableProps<TData> {
   table: TableType<TData>;
}

export const StandardTable = forwardRef<HTMLTableElement, TableProps<any>>(
   <TData extends RowData>(
      { table }: TableProps<TData>,
      ref: React.Ref<HTMLTableElement>
   ): JSX.Element => {
      return (
         <div className="relative overflow-y-auto">
            <Table className="overflow-hidden cursor-default relative" ref={ref}>
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
         </div>
      );
   }
);

export const TableWithTaskBar = <T,>({
   isLoading,
   table,
}: {
   isLoading: boolean;
   table: TableType<T>;
}) => {
   const tableRef = useRef<HTMLTableElement | null>(null);

   if (isLoading) {
      return 'loading...';
   }

   return (
      <div className="relative overflow-auto">
         <StandardTable ref={tableRef} table={table} />
         <TaskBar table={table} tableRef={tableRef} />
      </div>
   );
};


