import { format } from 'date-fns';
import { getIcon, formatCategory } from 'src/components/shared/ui/helpers/Helpers';
import { ColumnDef, Row } from '@tanstack/react-table';
import type { File } from '@types';
import { EllipsisVertical } from 'lucide-react';
import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from 'src/components/shared/ui/primitives/Popover';
import { Separator } from 'src/components/shared/ui/primitives/Separator';
import { Dispatch, SetStateAction } from 'react';
import { useDeleteFile } from '@/lib/api/file-api';
import { formatDate } from '@/lib/helper/formatDateTime';
import { formatBytes } from '@/lib/helper/formatFile';
 
interface FileColumnProps {
   setDialogState: Dispatch<SetStateAction<any>>;
}

export const createDocumentDraftColumns = (setDialogState: () => void): ColumnDef<File>[] => [
   {
      id: 'name',
      accessorKey: 'name',
      header: 'Name',
      minSize: 0,
      maxSize: 400,
      enableSorting: true,
      cell: ({ row }) => (
         <CellWrapper rowData={row} setDialogState={setDialogState} />
      ),
   },
   {
      id: 'category',
      accessorKey: 'category',
      header: 'Category',
      size: 20,
      cell: ({ getValue }) => <span>{formatCategory(getValue())}</span>,
   },
   {
      id: 'size',
      accessorKey: 'size',
      header: 'Size',
      size: 20,
      cell: ({ getValue }) => formatBytes(getValue() as number),
   },
   {
      id: 'dateCreated',
      accessorKey: 'dateCreated',
      size: 20,
      header: 'Date Created',
      cell: ({ getValue }) => formatDate(getValue() as string),
   },
   {
      id: 'actions',
      size: 5,
      header: '',
      cell: ({ row }) => (
         <EditPopover rowData={row} setDialogState={setDialogState} />
      ),
   },
];

export const EditPopover = ({ rowData, setDialogState }: CellWrapperProps): JSX.Element => {
   const { mutate: deleteFile } = useDeleteFile();

   const handleEdit = () => {
      setDialogState({
         isOpen: true,
         id: rowData.original.id,
         mode: 'view',
         actionType: 'file',
         data: rowData.original,
      });
   };

   const handleDelete = () => {
      deleteFile(rowData.original.id);
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

interface CellWrapperProps {
   rowData: Row<File>;
   setDialogState: Dispatch<SetStateAction<any>>;
}

export const CellWrapper = ({ rowData, setDialogState }: CellWrapperProps): JSX.Element => {
   const handleClick = () => {
      setDialogState({
         id: rowData.original.id,
         isOpen: true,
         mode: 'view',
         actionType: 'file',
         data: rowData.original,
      });
   };

   const fileName = rowData.original.name;

   return (
      <p onClick={handleClick} className="cursor-pointer w-full">
         {fileName}
      </p>
   );
};
