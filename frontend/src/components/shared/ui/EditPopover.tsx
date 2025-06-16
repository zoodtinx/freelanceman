import { cn } from '@/lib/helper/utils';
import { Edit, EllipsisVertical, Trash } from 'lucide-react';
import React from 'react';
import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from 'src/components/shared/ui/primitives/Popover';

interface EditPopoverProps {
   deleteFn: () => void;
   editFn: () => void;
   className?: string;
}

export const EditPopover: React.FC<EditPopoverProps> = ({
   editFn,
   deleteFn,
   className
}): JSX.Element => {
   const handleEdit = (e: React.MouseEvent) => {
      e.stopPropagation();
      editFn();
   };

   const handleDelete = (e:React.MouseEvent) => {
      e.stopPropagation();
      deleteFn();
   };

   return (
      <Popover>
         <PopoverTrigger
            className={cn("flex items-center", className)}
            onClick={(e) => {
               e.stopPropagation();
            }}
         >
            <EllipsisVertical className="w-4 h-4 text-secondary hover:text-primary transition-colors" />
         </PopoverTrigger>
         <PopoverContent className="w-[100px] cursor-default select-none bg-foreground">
            <button
               className="flex gap-1 items-center p-1 px-2 rounded-md cursor-pointer hover:bg-background"
               onClick={(e) => handleEdit(e)}
            >
               <Edit className="h-4 w-4" />
               Edit
            </button>
            <button
               className="flex gap-1 items-center p-1 px-2 rounded-md cursor-pointer hover:bg-background"
               onClick={(e) => {
                  handleDelete(e);
               }}
            >
               <Trash className="h-4 w-4 shrink-0" />
               Delete
            </button>
         </PopoverContent>
      </Popover>
   );
};
