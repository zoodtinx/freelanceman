import React, { forwardRef, useEffect, useRef } from 'react';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/shared/ui/Table';
import { flexRender } from '@tanstack/react-table';
import type { Table as TableType, RowData, Row } from '@tanstack/react-table'; // Import RowData for better type constraints

interface TableProps<TData> {
   table: TableType<TData>;
}

const EventTable = <TData extends RowData>({
   table,
}: TableProps<TData>): JSX.Element => {
   const tableRef = useRef<HTMLTableElement | null>(null)
   return (
      <div className='relative'>
         <Table className="overflow-hidden cursor-default relative" ref={tableRef}>
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
         <TaskBar table={table} tableRef={tableRef} />
      </div>
   );
};

export default EventTable;


interface TaskBarProps<TData> {
   table: TableType<TData>;
}

const TaskBar = ({
   table,
   tableRef,
}: TaskBarProps<Event> & { tableRef: React.RefObject<HTMLTableElement> }): JSX.Element | null => {
   const taskBarRef = useRef<HTMLDivElement | null>(null);
   const selectedRow = table.getSelectedRowModel().rows;

   useEffect(() => {
      const handleDeselect = () => {
         table.resetRowSelection();
      };

      const handleClickOutside = (event: MouseEvent) => {
         if (
            taskBarRef.current &&
            !taskBarRef.current.contains(event.target as Node) &&
            tableRef.current &&
            !tableRef.current.contains(event.target as Node)
         ) {
            handleDeselect();
         }
      };

      const handleEscapeKey = (event: KeyboardEvent) => {
         if (event.key === "Escape") {
            handleDeselect();
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);

      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
         document.removeEventListener("keydown", handleEscapeKey);
      };
   }, [table, tableRef]);

   if (selectedRow.length === 0) {
      return null;
   }

   const selectedCount = selectedRow.length;

   return (
      <div
         className="border rounded-full w-fit h-7 absolute top-0 left-6 bg-foreground shadow-md flex items-center cursor-default overflow-hidden select-none"
         ref={taskBarRef}
      >
         <TaskBarItem className="text-blue-500">{selectedCount} selected</TaskBarItem>
         <div className="border-[0.5px] h-full"></div>
         <TaskBarItem>Mark as completed</TaskBarItem>
         <div className="border-[0.5px] h-full"></div>
         <TaskBarItem>Cancel event</TaskBarItem>
         <div className="border-[0.5px] h-full"></div>
         <TaskBarItem className="text-red-500">Delete</TaskBarItem>
      </div>
   );
};


TaskBar.displayName = 'TaskBar';

const TaskBarItem: React.FC<{
   className?: string;
   children: React.ReactNode;
}> = ({ className = '', children }) => (
   <div className={`flex p-2 h-full items-center active:bg-tertiary transition-colors duration-75 ${className}`}>
      <p>{children}</p>
   </div>
);
