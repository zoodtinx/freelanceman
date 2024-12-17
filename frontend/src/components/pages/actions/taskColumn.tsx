import { ColumnDef, Row } from '@tanstack/react-table';
import type { ActionResponsePayload } from '@types';
import { EllipsisVertical } from 'lucide-react';
import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from '@/components/shared/ui/popover';
import { Separator } from '@/components/shared/ui/separator';
import { format, toZonedTime } from 'date-fns-tz';
import { Dispatch, SetStateAction } from 'react';
import { DialogState } from 'src/lib/types/project-view-context.types';
import { useDeleteTask } from '@/lib/api/taskApi';


function formatDate(isoString: string) {
   const date = new Date(isoString);
   const monthAbbreviations = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
   ];
   return `${date.getDate()} ${monthAbbreviations[date.getMonth()]}`;
}

function formatTime(isoString: string) {
   const systemTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   const zonedDate = toZonedTime(isoString, systemTimeZone);
   return format(zonedDate, 'h:mm a', { timeZone: systemTimeZone });
}

interface TaskColumnProps {
   setDialogState: Dispatch<SetStateAction<DialogState>>,
}

export const createTaskColumn = (setDialogState: () => void): ColumnDef<ActionResponsePayload>[] => [
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
      id: 'eventName',
      accessorKey: 'name',
      minSize: 0,
      maxSize: 500,
      header: 'Event',
      enableSorting: true,
      enableResizing: false,
      cell: ({ row }) => {

         return (
            <CellWrapper rowData={row} setDialogState={setDialogState} />
         );
      },
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
      cell: ({ row }) => {
         return <EditPopover rowData={row} setDialogState={setDialogState} />;
      },
   },
   {
      id: 'status',
      accessorKey: 'status',
      enableHiding: false,
   },
];


export const EditPopover = ({rowData, setDialogState}: CellWrapperProps):JSX.Element => {

   const {mutate: deleteTask} = useDeleteTask()

   const handleEdit = () => {
      setDialogState({
         isOpen: true,
         id: rowData.original.id,
         mode: 'view',
         actionType: 'task',
         data : {
            ...rowData.original
         }
      })
   }

   const handleDelete = () => {
      deleteTask(rowData.original.id)
   }

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


interface CellWrapperProps {
   rowData: Row<ActionResponsePayload>,
   setDialogState: Dispatch<SetStateAction<DialogState>>,
}

export const CellWrapper = ({ rowData, setDialogState }: CellWrapperProps): JSX.Element => {

   const handleClick = () => {
      setDialogState({
         id: rowData.original.id,
         isOpen: true,
         mode: 'view',
         actionType: 'task',
         data: rowData.original
      })
   }

   const taskName = rowData.original.name

   return (
      <p onClick={handleClick} className='cursor-pointer'>{taskName}</p>
   );
};
