import { useLocation } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';
import { createFileColumns } from '@/components/page-elements/files/FileColumn';
import { defaultFile } from '@/components/shared/ui/constants';
import { FormDialogState } from '@/lib/types/dialog.types';
import { mockFiles } from '@mocks';
import {
   getCoreRowModel,
   getFilteredRowModel,
   getSortedRowModel,
   useReactTable,
} from '@tanstack/react-table';
import { FileText, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/shared/ui/primitives/Button';

const DocumentPageLayout: React.FC = () => {
   const [dialogState, setDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      type: 'file',
      mode: 'create',
      data: defaultFile,
   });

   const location = useLocation();
   const pathnameArray = location.pathname.split('/').filter((path) => path);
   const filteredPathnameArray = pathnameArray.slice(2);

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
      <div className="flex flex-col w-full grow bg-foreground rounded-[30px] px-4 pt-6 sm:w-full h-full shrink-0">
         <div className="flex mb-3 justify-between">
            <div className="flex items-center gap-1">
               <FileText className="h-6 w-6 mt-1" />
               <Link
                  to={'/home/documents'}
                  className="text-xl pt-1 leading-none mr-2"
               >
                  Documents
               </Link>
               {filteredPathnameArray.length > 0 &&
                  filteredPathnameArray.map((pathName) => {
                     return (
                        <div className="flex" key={pathName}>
                           <ChevronRight />
                           {pathName}
                        </div>
                     );
                  })}
            </div>
            <Link to={'./create'}>
               <Button>New Document</Button>
            </Link>
         </div>
         <Outlet />
      </div>
   );
};

export default DocumentPageLayout;
