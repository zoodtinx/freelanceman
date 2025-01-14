import { fileTypeSelections } from 'src/components/shared/ui/constants';
import {
   Popover,
   PopoverTrigger,
   PopoverContent,
} from 'src/components/shared/ui/primitives/Popover';
import { Plus } from '@/components/shared/icons';
import ContactDialog from '@/components/shared/ui/ContactDialog';
import { FormDialogState } from '@/lib/types/dialog.types';
import { defaultContact } from 'src/components/shared/ui/constants';
import { useEffect, useState } from 'react';
import { User, BookUser, Folder } from 'lucide-react';
import FileTable from './FileTable';
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { createFileColumns } from './FileColumn';
import { useFileQuery } from '@/lib/api/file-api';
import { mockFiles } from '@mocks';
import FileDialog from '@/components/shared/ui/FileDialog';
import { defaultFile } from 'src/components/shared/ui/constants';
import { FilterSelect } from '@/components/shared/ui/PrebuiltSelect';
import { SearchBox } from '@/components/shared/ui/SearchBox';

const FilePageLayout = (): JSX.Element => {
   const [dialogState, setDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      type: 'file',
      mode: 'create',
      data: defaultFile,
   });

      const [filter, setFilter] = useState({})

      const onFileTypeChange = (value) => {
         setFilter({ type: value })
      }

      // const {data: fileList, isLoading} = useFileQuery

      // if (isLoading) {
      //    return <></>
      // }

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
         <div className='flex gap-2'>
            <FilterSelect
               onValueChange={onFileTypeChange}
               value=""
               placeholder="Type"
               selectContents={fileTypeSelections}
               className='h-7'
            />
            <FilterSelect
               onValueChange={onFileTypeChange}
               value=""
               placeholder="Category"
               selectContents={fileTypeSelections}
               className='h-7'
            />
            < SearchBox className='border border-primary rounded-full h-7' />
         </div>
         <FileTable table={table} />
         <FileDialog
            dialogState={dialogState}
            setDialogState={setDialogState}
         />
      </div>
   );
};

const NewFileButton = ({
   setDialogState,
   type, // Accept "clientContact" or "partnerContact" as props
}: {
   setDialogState: (dialogState: object) => void;
   type: 'clientContact' | 'partnerContact';
}) => {
   const handleClick = () => {
      setDialogState({
         isOpen: true,
         id: '',
         mode: 'create',
         data: defaultContact,
         type, // Use the provided type prop
      });
   };

   return (
      <button
         onClick={handleClick}
         className="hover:bg-tertiary rounded-xl transition-colors h-[40px] w-[40px] flex justify-center items-center cursor-pointer"
      >
         <Plus className="aspect-square h-[20px]" />
      </button>
   );
};


export default FilePageLayout;
