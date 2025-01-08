import { ColumnDef, Row } from '@tanstack/react-table';
import type { Task } from '@types';
import { EllipsisVertical } from 'lucide-react';
import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from 'src/components/shared/ui/primitives/Popover';
import { Separator } from 'src/components/shared/ui/primitives/Separator';
import { Dispatch, SetStateAction } from 'react';
import { useDeleteTask } from '@/lib/api/task-api';
import { formatDate, formatTime } from '@/lib/helper/formatDateTime';
import { FormDialogState } from '@/lib/types/dialog.types';

type SetDialogState = Dispatch<SetStateAction<FormDialogState>>;

export const createTaskColumn = (setDialogState: SetDialogState): ColumnDef<Task>[] => [
   {
      id: 'select',
      size: 7,
      minSize: 0,
      enableResizing: false,
      header: ({ table }) => (
         <div className="h-full flex items-center">
            <input
               type="checkbox"
               checked={table.getIsAllRowsSelected()}
               onChange={table.getToggleAllPageRowsSelectedHandler()}
            />
         </div>
      ),
      cell: ({ row }) => (
         <div className="h-full flex items-center">
            <input
               type="checkbox"
               checked={row.getIsSelected()}
               disabled={!row.getCanSelect()}
               onChange={row.getToggleSelectedHandler()}
            />
         </div>
      ),
   },
   {
      id: 'taskName',
      accessorKey: 'name',
      minSize: 0,
      maxSize: 500,
      header: 'Task',
      enableSorting: true,
      enableResizing: false,
      cell: ({ row }) => (
         <CellWrapper rowData={row} setDialogState={setDialogState} />
      ),
   },
   {
      id: 'time',
      accessorKey: 'dueDate',
      size: 20,
      maxSize: 20,
      minSize: 0,
      header: 'Time',
      cell: ({ getValue }) => formatTime(getValue() as string),
      enableResizing: false,
   },
   {
      id: 'dueDate',
      minSize: 0,
      maxSize: 20,
      size: 20,
      accessorKey: 'dueDate',
      header: 'Date',
      cell: ({ getValue }) => formatDate(getValue() as string),
      enableSorting: true,
      enableResizing: false,
   },
   {
      id: 'edit',
      minSize: 0,
      maxSize: 5,
      size: 5,
      enableResizing: false,
      cell: ({ row }) => (
         <EditPopover rowData={row} setDialogState={setDialogState} />
      ),
   },
   {
      id: 'status',
      accessorKey: 'status',
      enableHiding: false,
   },
];

interface CellWrapperProps {
   rowData: Row<Task>;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
}

export const EditPopover = ({ rowData, setDialogState }: CellWrapperProps): JSX.Element => {
   const { mutate: deleteTask } = useDeleteTask();

   const handleEdit = () => {
      setDialogState({
         isOpen: true,
         id: rowData.original.id,
         mode: 'view',
         type: 'task',
         data: rowData.original,
      });
   };

   const handleDelete = () => {
      deleteTask(rowData.original.id);
   };

   return (
      <Popover>
         <PopoverTrigger className="flex items-center">
            <EllipsisVertical className="w-4 h-4 text-secondary hover:text-primary transition-colors" />
         </PopoverTrigger>
         <PopoverContent className="w-[80px] cursor-default">
            <p onClick={handleEdit}>Edit</p>
            <Separator />
            <p onClick={handleDelete} className="text-red-400">Delete</p>
         </PopoverContent>
      </Popover>
   );
};

export const CellWrapper = ({ rowData, setDialogState }: CellWrapperProps): JSX.Element => {
   const handleClick = () => {
      setDialogState({
         id: rowData.original.id,
         isOpen: true,
         mode: 'view',
         type: 'task',
         data: rowData.original,
      });
   };

   const taskName = rowData.original.name;

   return (
      <p onClick={handleClick} className="cursor-pointer">
         {taskName}
      </p>
   );
};
