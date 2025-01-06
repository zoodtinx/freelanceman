import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from '@/components/shared/ui/popover';
import { Plus } from '@/components/shared/icons';
import ContactDialog from '@/components/shared/ui/ContactDialog';
import { FormDialogState } from '@/lib/types/dialog.types';
import { defaultContact } from '@/components/shared/ui/form/utils';
import { useEffect, useState } from 'react';
import { User, BookUser, Folder } from 'lucide-react';
import FileTable from './FileTable';
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { createFileColumns } from './FileColumn';
import { useFileQuery } from '@/lib/api/file-api';
import { mockFiles } from '@mocks';

const FilePageLayout = (): JSX.Element => {
   const [dialogState, setDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      type: 'clientContact',
      mode: 'view',
      data: defaultContact,
   });

      const {data: fileList, isLoading} = useFileQuery

      if (isLoading) {
         return <></>
      }

      const table = useReactTable({
            data: mockFiles,
            columns: createFileColumns(setDialogState),
            getCoreRowModel: getCoreRowModel(),
            getSortedRowModel: getSortedRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
            defaultColumn: {
               minSize: 0,
            },
            state: {
               columnVisibility: {
                  status: false,
               },
            },
         });
         
   
   return (
      <div className="flex flex-col w-full bg-foreground rounded-[30px] p-4 pt-5 sm:w-full h-full gap-[6px] shrink-0 overflow-hidden ">
         <div className="flex justify-between">
            <div className="flex items-center gap-1">
               <Folder className="h-6 w-6 mt-1" />
               <p className="text-xl pt-1 leading-none mr-2">Files</p>
            </div>
            <NewFileButton setDialogState={setDialogState} />
         </div>
         <FileTable table={table} />
         <ContactDialog dialogState={dialogState} setDialogState={setDialogState} />
      </div>
   );
};

const NewFileButton = ({
   setDialogState,
}: {
   setDialogState: (dialogState: object) => void;
}) => {
   const dialogState = {
      isOpen: true,
      id: '',
      mode: 'create',
      data: defaultContact,
   };
   const handleClick = (type: string) => {
      if (type === 'client') {
         setDialogState({
            ...dialogState,
            type: 'clientContact',
         });
      } else if (type === 'partner') {
         setDialogState({
            ...dialogState,
            type: 'partnerContact',
         });
      }
   };

   return (
      <Popover>
         <PopoverTrigger>
            <button className="hover:bg-tertiary rounded-xl transition-colors h-[40px] w-[40px] flex justify-center items-center cursor-pointer">
               <Plus className="aspect-square h-[20px]" />
            </button>
         </PopoverTrigger>
         <PopoverContent className="w-fit cursor-default">
            <p onClick={() => handleClick('client')}>Client contact</p>
            <p onClick={() => handleClick('partner')}>Partner contact</p>
         </PopoverContent>
      </Popover>
   );
};

export default FilePageLayout;
