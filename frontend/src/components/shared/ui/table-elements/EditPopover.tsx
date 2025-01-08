import { FormDialogState } from '@/lib/types/dialog.types';
import { Row } from '@tanstack/react-table';
import { EllipsisVertical } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from 'src/components/shared/ui/primitives/Popover';
import { Separator } from 'src/components/shared/ui/primitives/Separator';

interface CellWrapperProps {
   rowData: Row<Event>;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
   tableType: string;
}

export const EditPopover = ({ rowData, setDialogState }: CellWrapperProps): JSX.Element => {
   const { mutate: deleteEvent } = useDeleteEvent();

   const handleEdit = () => {
      setDialogState({
         isOpen: true,
         id: rowData.original.id,
         mode: 'view',
         type: 'event',
         data: rowData.original,
      });
   };

   const handleDelete = () => {
      deleteEvent(rowData.original.id);
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
