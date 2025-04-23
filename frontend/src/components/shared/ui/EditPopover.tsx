import { FormDialogState } from 'src/lib/types/form-dialog.types';
import { Row } from '@tanstack/react-table';
import { EllipsisVertical } from 'lucide-react';
import React, { Dispatch, SetStateAction } from 'react';
import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from 'src/components/shared/ui/primitives/Popover';
import { Separator } from 'src/components/shared/ui/primitives/Separator';

interface EditPopoverProps {
   deleteFn: () => void;
   editFn: () => void;
}

export const EditPopover: React.FC<EditPopoverProps> = ({
   editFn,
   deleteFn,
}): JSX.Element => {
   
   const handleEdit = (e) => {
      e.stopPropagation();
      editFn();
   }
   
   const handleDelete = (e) => {
      e.stopPropagation();
      deleteFn();
   }

   return (
      <Popover>
         <PopoverTrigger
            className="flex items-center"
            onClick={(e) => {
               e.stopPropagation();
            }}
         >
            <EllipsisVertical className="w-4 h-4 text-secondary hover:text-primary transition-colors" />
         </PopoverTrigger>
         <PopoverContent className="w-[80px] cursor-default select-none bg-foreground">
            <p onClick={(e) => handleEdit(e)}>Edit</p>
            <Separator />
            <p onClick={(e) => handleDelete(e)} className="text-red-400">
               Delete
            </p>
         </PopoverContent>
      </Popover>
   );
};
