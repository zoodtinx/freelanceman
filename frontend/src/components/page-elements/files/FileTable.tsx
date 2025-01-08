import React, { useEffect, useRef } from 'react';
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
import { useBulkEditEvent, useDeleteEvent } from '@/lib/api/event-api';
import { ActionResponsePayload } from '@types';

interface TableProps<TData> {
   table: TableType<TData>;
}

const FileTable = <TData extends RowData>({
   table,
}: TableProps<TData>): JSX.Element => {
   const tableRef = useRef<HTMLTableElement | null>(null);
   return (
      <div className="relative overflow-y-auto">
         <Table
            className="overflow-hidden cursor-default relative"
            ref={tableRef}
         >
            <TableHeader className="">
               {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="">
                     {headerGroup.headers.map((header) => {
                        return (
                           <TableHead
                              key={header.id}
                              width={header.getSize().toString()}
                           >
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

interface TaskBarProps<TData> {
   table: TableType<TData>;
}

const TaskBar = ({
   table,
   tableRef,
}: TaskBarProps<ActionResponsePayload> & {
   tableRef: React.RefObject<HTMLTableElement>;
}): JSX.Element | null => {
   const taskBarRef = useRef<HTMLDivElement | null>(null);
   const selectedRow = table.getSelectedRowModel().rows;
   const { mutate: bulkEditEvent, isPending: editingEvents } =
      useBulkEditEvent();
   const { mutate: bulkDeleteEvent, isPending: deletingEvents } =
      useDeleteEvent();

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
         if (event.key === 'Escape') {
            handleDeselect();
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
         document.removeEventListener('keydown', handleEscapeKey);
      };
   }, [table, tableRef]);

   if (selectedRow.length === 0) {
      return null;
   }

   const selectedCount = selectedRow.length;

   const handleDelete = () => {
      const selectedRowIds = table
         .getSelectedRowModel()
         .rows.map((row) => row.original.id);
      bulkDeleteEvent(selectedRowIds);
      table.resetRowSelection();
   };

   const handleMarkComplete = () => {
      const selectedRow = table
         .getSelectedRowModel()
         .rows.map((row) => row.original);
      bulkEditEvent({
         selectedEvents: selectedRow,
         key: 'status',
         value: 'completed',
      });
      table.resetRowSelection();
   };

   return (
      <div
         className="border rounded-full w-fit h-7 absolute top-0 left-6 bg-foreground shadow-md flex items-center cursor-default overflow-hidden select-none"
         ref={taskBarRef}
      >
         <TaskBarItem
            onClick={table.resetRowSelection}
            className="text-blue-500"
         >
            {selectedCount} selected
         </TaskBarItem>
         <div className="border-[0.5px] h-full"></div>
         <TaskBarItem onClick={handleMarkComplete}>
            Mark as completed
         </TaskBarItem>
         <div className="border-[0.5px] h-full"></div>
         <TaskBarItem onClick={handleDelete} className="text-red-500">
            Delete
         </TaskBarItem>
      </div>
   );
};

TaskBar.displayName = 'TaskBar';

const TaskBarItem: React.FC<{
   className?: string;
   children: React.ReactNode;
   onClick: () => void;
}> = ({ className = '', children, onClick }) => (
   <div
      onClick={onClick}
      className={`flex p-2 h-full items-center hover:bg-tertiary transition-colors duration-75 ${className}`}
   >
      <p>{children}</p>
   </div>
);

export default FileTable;
