import { ColumnDef } from '@tanstack/react-table';
import type { Event } from '@types';
import { EllipsisVertical } from 'lucide-react';
import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from '@/components/shared/ui/popover';
import { Button } from '@/stories/Button';
import { Separator } from '@/components/shared/ui/separator';
import { useEditEvent } from '@/lib/api/eventApi';
import { useActionsViewContext } from '@/lib/context/ActionsViewContext';
import { readFileSync } from 'fs';
import type { Row } from '@tanstack/react-table';

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

export const eventColumns: ColumnDef<Event>[] = [
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
      cell: ({getValue, row}) => {
         const taskId = row.original.id
         const value = getValue()

         return (
            <CellWrapper cellValue={value as string} taskId={taskId} />
         )
      }
   },
   {
      id: 'time',
      accessorKey: 'time',
      size: 15,
      maxSize: 15,
      minSize: 0,
      header: 'Time',
      enableResizing: false,
   },
   {
      id: 'dueDate',
      minSize: 0,
      maxSize: 15,
      size: 15,
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
         const taskId = row.original.id

         return (
            <EditPopover id />
         );
      },
   },
   {
      id: 'status',
      accessorKey: 'status',
      enableHiding: false,
   },
];

export const EditPopover = ({id} : {id:string}):JSX.Element => {
   const {isTaskDialogOpen, setIsTaskDialogOpen} = useActionsViewContext()
   
   const handleEdit = () => {
      setIsTaskDialogOpen({
         isOpen: true,
         id: id
      })
   }

   return (
      <Popover>
         <PopoverTrigger className="flex items-center">
            <EllipsisVertical className="w-4 h-4 text-secondary hover:text-primary transition-colors" />
         </PopoverTrigger>
         <PopoverContent className="w-[80px] cursor-default">
            <p onClick={handleEdit}>Edit</p>
            <Separator />
            <p className="text-red-400">Delete</p>
         </PopoverContent>
      </Popover>
   );
};


export const CellWrapper = ({ taskId, cellValue }: { taskId:string, cellValue:string }): JSX.Element => {
   const { setIsTaskDialogOpen } = useActionsViewContext();

   const handleClick = () => {
      setIsTaskDialogOpen({
         id: taskId,
         isOpen: true
      })
   }

   return (
      <p onClick={handleClick}>{cellValue}</p>
   );
};
