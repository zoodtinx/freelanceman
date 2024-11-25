import { Button } from '@/components/shared/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import type { Task } from '@types';
import { ArrowUpDown } from 'lucide-react';
import { Dots } from '@/components/shared/icons';
import React from 'react';

export const taskColumn: ColumnDef<Task>[] = [
   {
      id: 'select',
      size: 7,
      minSize: 0,
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <div className="">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    },
   {
      id: 'taskName',
      accessorKey: 'name',
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
               }
               className="flex justify-between px-0"
            >
               <p>Task</p>
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         );
      },
      enableSorting: true,
   },
   {
      id: 'deadline',
      accessorKey: 'dueDate',
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
               }
               className="flex justify-between px-0"
            >
               <p>Deadline</p>
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         );
      },
      cell: ({ getValue }) => {
         const isoString = getValue(); // Get the ISO string from the cell
         const date = new Date(isoString); // Convert ISO string to Date object
         return (
            <span className="flex justify-between items-center">
               <p>{date.toLocaleDateString()}</p>
               <Dots className='w-4 h-4 text-secondary' />
            </span>
         ); // Format it as a readable date
      },
      size: 30,
      enableResizing: false,
   },
   {
      id: 'status',
      accessorKey: 'status',
      enableHiding: false,
   },
];

function IndeterminateCheckbox({
   indeterminate,
   className = '',
   ...rest
 }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
   const ref = React.useRef<HTMLInputElement>(null!)
 
   React.useEffect(() => {
     if (typeof indeterminate === 'boolean') {
       ref.current.indeterminate = !rest.checked && indeterminate
     }
   }, [ref, indeterminate])
 
   return (
     <input
       type="checkbox"
       ref={ref}
       className={className + ' cursor-pointer'}
       {...rest}
     />
   )
 }
 