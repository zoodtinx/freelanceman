import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { createFileColumns } from '@/components/page-elements/files/FileColumn';
import FileTable from '@/components/page-elements/files/FileTable';
import { defaultFile } from '@/components/shared/ui/constants';
import { FormDialogState } from '@/lib/types/dialog.types';
import { mockFiles } from '@mocks';
import {
   getCoreRowModel,
   getFilteredRowModel,
   getSortedRowModel,
   useReactTable,
} from '@tanstack/react-table';
import { FileText, Plus } from 'lucide-react';

const ViewDocumentLayout: React.FC = () => {
   const [dialogState, setDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      type: 'file',
      mode: 'create',
      data: defaultFile,
   });

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
      <div className="flex w-full gap-2 grow">
         <div className="flex flex-col border w-1/2 border-tertiary rounded-xl p-2">
            <div className="flex items-center justify-between">
               <p className="text-lg">File</p>
               <NewButton />
            </div>
            <FileTable table={table} />
         </div>
         <div className="border w-1/2 border-tertiary rounded-xl  p-2">
            <div className="flex items-center justify-between">
               <p className="text-lg">Drafts</p>
               <NewButton />
            </div>
            <FileTable table={table} />
         </div>
      </div>
   );
};

const NewButton = () => {
   return (
      <button className="hover:bg-tertiary rounded-lg transition-colors h-[25px] w-[25px] flex justify-center items-center cursor-pointer">
         <Plus className="stroke-[2.75px] w-5 h-5" />
      </button>
   );
};

export default ViewDocumentLayout;
