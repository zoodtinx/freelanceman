import { DocumentDraftSelections } from '@/components/shared/ui/selections';
import { FilterSelect } from '@/components/shared/ui/PrebuiltSelect';
import { Folder, SquarePen } from 'lucide-react';
import React, { useState } from 'react';
import { createDocumentPageFileColumn } from '@/components/page-elements/documents/DocumentPageFileColumn';
import DocumentDraftTable from 'src/components/page-elements/documents/DocumentDraftTable';
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
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { createDocumentDraftColumns } from '@/components/page-elements/documents/DocumentDraftColumn';

const ViewDocumentLayout: React.FC = () => {
   const [dialogState, setDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      type: 'file',
      mode: 'create',
      data: defaultFile,
   });

   return (
      <div className="flex w-full gap-3 grow ">
         <FileColumn setDialogState={setDialogState} />
         <DraftColumn setDialogState={setDialogState} />
      </div>
   );
};

const FileColumn = ({ setDialogState }) => {
   const table = useReactTable({
      data: mockFiles,
      columns: createDocumentPageFileColumn(setDialogState),
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
      <div className="flex flex-col w-1/2 rounded-xl px-2">
         <div className="w-full px-1 flex mb-1 gap-1">
            <FilterSelect
               selectContents={DocumentDraftSelections}
               placeholder="Type"
               className="h-[25px] w-fit py-0 px-2"
            />
            <FilterSelect
               selectContents={DocumentDraftSelections}
               placeholder="Client"
               className="h-[25px] w-fit py-0 px-2"
            />
            <SearchBox className="h-[25px] w-fit py-0 px-2 rounded-full border-secondary" />
         </div>
         <FileTable table={table}/>
      </div>
   );
};

const DraftColumn = ({ setDialogState }) => {
   const table = useReactTable({
      data: mockFiles,
      columns: createDocumentDraftColumns(setDialogState),
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
      <div className="flex flex-col border border-dashed w-1/2 border-primary rounded-xl p-2 py-1">
         <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-1">
               <SquarePen className="w-5 h-5" />
               <p className="text-lg">Drafts</p>
            </div>
         </div>
         <div className="w-full px-1 flex mb-1 gap-1">
            <FilterSelect
               selectContents={DocumentDraftSelections}
               placeholder="Type"
               className="h-[25px] w-fit py-0 px-2"
            />
            <FilterSelect
               selectContents={DocumentDraftSelections}
               placeholder="Client"
               className="h-[25px] w-fit py-0 px-2"
            />
            <SearchBox className="h-[25px] w-fit py-0 px-2 rounded-full border-secondary" />
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
