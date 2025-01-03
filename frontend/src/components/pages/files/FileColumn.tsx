import { ColumnDef, Row } from '@tanstack/react-table';
import type { File } from '@types';
import { EllipsisVertical } from 'lucide-react';
import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from '@/components/shared/ui/popover';
import { Separator } from '@/components/shared/ui/separator';
import { Dispatch, SetStateAction } from 'react';
import { useDeleteFile } from '@/lib/api/file-api';

function formatFileSize(size?: number): string {
   if (!size) return 'N/A';
   if (size < 1024) return `${size} B`;
   if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
   if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
   return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function formatDate(isoString: string): string {
   const date = new Date(isoString);
   const monthAbbreviations = [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
   ];
   return `${date.getDate()} ${monthAbbreviations[date.getMonth()]}`;
}

interface FileColumnProps {
   setDialogState: Dispatch<SetStateAction<any>>;
}

export const createFileColumns = (setDialogState: () => void): ColumnDef<File>[] => [
   {
      id: 'type',
      accessorKey: 'type',
      header: 'Type',
      enableSorting: true,
      cell: ({ getValue }) => <span>{getValue()}</span>,
   },
   {
      id: 'name',
      accessorKey: 'name',
      header: 'Name',
      enableSorting: true,
      cell: ({ row }) => (
         <CellWrapper rowData={row} setDialogState={setDialogState} />
      ),
   },
   {
      id: 'category',
      accessorKey: 'category',
      header: 'Category',
      cell: ({ getValue }) => <span>{getValue()}</span>,
   },
   {
      id: 'size',
      accessorKey: 'size',
      header: 'Size',
      cell: ({ getValue }) => formatFileSize(getValue() as number),
   },
   {
      id: 'dateCreated',
      accessorKey: 'dateCreated',
      header: 'Date Created',
      cell: ({ getValue }) => formatDate(getValue() as string),
   },
   {
      id: 'actions',
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
      <p onClick={handleClick} className="cursor-pointer">
         {fileName}
      </p>
   );
};
