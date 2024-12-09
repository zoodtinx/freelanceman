import { Button } from '@/components/shared/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import type { Event } from '@types';
import { ArrowUpDown } from 'lucide-react';
import { Dots } from '@/components/shared/icons';

function convertToHHMM(localeTimeString) {
   const match = localeTimeString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);

   if (!match) {
      throw new Error('Invalid time format');
   }

   let hours = parseInt(match[1], 10);
   const minutes = match[2];
   const period = match[3]; // AM/PM

   if (period) {
      if (period.toUpperCase() === 'PM' && hours < 12) {
         hours += 12; // Convert PM hour to 24-hour format
      } else if (period.toUpperCase() === 'AM' && hours === 12) {
         hours = 0; // Convert 12 AM to 0 hours
      }
   }
   const paddedHours = hours.toString().padStart(2, '0');

   return `${paddedHours}:${minutes}`;
}

function convertToDayMonth(date: Date) {
   if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
   }

   const day = date.getDate(); // Get day without padding
   const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase(); // Get month abbreviation in uppercase

   return `${day} ${month}`;
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
         const formattedDate = convertToDayMonth(date)
         return (
            <span className="flex justify-between items-center">
               <p>{formattedDate}</p>
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
