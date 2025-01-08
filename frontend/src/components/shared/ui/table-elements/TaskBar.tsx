import { useBulkEditEvent, useDeleteEvent } from '@/lib/api/event-api';
import { useEffect, useRef } from 'react';
import { Table as TableType } from '@tanstack/react-table';

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

export default TaskBar