import { Button } from '@/components/shared/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import type { Event } from '@types';
import { ArrowUpDown } from 'lucide-react';
import { Dots } from '@/components/shared/icons';

function convertToHHMM(localeTimeString) {
   // Use a regular expression to match the hour and minute components
   const match = localeTimeString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);

   if (!match) {
      throw new Error('Invalid time format');
   }

   let hours = parseInt(match[1], 10);
   const minutes = match[2];
   const period = match[3]; // AM/PM

   // Convert to 24-hour format
   if (period) {
      if (period.toUpperCase() === 'PM' && hours < 12) {
         hours += 12; // Convert PM hour to 24-hour format
      } else if (period.toUpperCase() === 'AM' && hours === 12) {
         hours = 0; // Convert 12 AM to 0 hours
      }
   }

   // Pad hours to ensure two digits
   const paddedHours = hours.toString().padStart(2, '0');

   return `${paddedHours}:${minutes}`;
}

export const eventColumns: ColumnDef<Event>[] = [
   {
      id: 'eventName',
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
               <p>Event</p>
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         );
      },
      enableSorting: true,
   },
   {
      id: 'eventTime',
      accessorKey: 'dueDate',
      header: 'Time',
      cell: ({ getValue }) => {
         const isoString = getValue(); // Get the ISO string from the cell
         const date = new Date(isoString); // Convert ISO string to Date object
         return <span>{convertToHHMM(date.toLocaleTimeString())}</span>; // Format it as a readable date
      },
      size: 10,
      enableResizing: false,
   },
   {
      id: 'eventDate',
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
               <p>Date</p>
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
