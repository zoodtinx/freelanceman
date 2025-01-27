import FileListItem from '@/components/page-elements/client/FileListItem';
import { cn } from '@/lib/helper/utils';
import AddButton from '@/components/shared/ui/AddButton';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { CopyCheck } from 'lucide-react';
import { FormDialogState } from '@/lib/types/dialog.types';
import { mockFiles } from '@mocks';
import FileDialog from '@/components/shared/ui/FileDialog';
import { File, FileSearchOption } from '@types';
import { useAllFilesQuery, useFileQuery } from '@/lib/api/file-api';
import { FilterSelect } from '@/components/shared/ui/PrebuiltSelect';
import { clientPageFileCategorySelections } from '@/components/shared/ui/selections';

const ClientFileSection: React.FC = () => {
   const [dialogState, setDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      mode: 'view',
      type: 'file',
      data: {},
   });
   const [selectState, setSelectState] = useState({
      enableSelect: false,
      selectedValues: [] as string[],
   });

   const [fileFilter, setFileFilter] = useState<FileSearchOption>({})
   console.log('fileFilter', fileFilter)

   const { data: filesData, isLoading } = useAllFilesQuery(fileFilter)

   const handleAddFile = () => {
      console.log('added file');
   };

   const enableMultiSelect = () => {
      setSelectState({
         enableSelect: !selectState.enableSelect,
         selectedValues: [],
      });
   };

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFileFilter((prev) => {
         return {
            ...prev,
            name: e.target.value
         }
      })
   }

   const handleCategoryFilter = (value: any) => {
      setFileFilter((prev) => {
         return {
            ...prev,
            category: value
         }
      })
   }

   return (
      <div className="flex flex-col w-full bg-foreground rounded-[30px] p-4 pt-5 sm:w-full gap-[6px] shrink-0 overflow-hidden h-1/2">
         <div className="flex justify-between items-center h-[33px]">
            <p className="text-lg">Files</p>
            <AddButton onClick={handleAddFile} />
         </div>
         <div className="flex gap-1">
            <div
               className={cn(
                  'flex h-[27px] group w-auto border rounded-full px-2 items-center transition-colors duration-150 cursor-default',
                  'border-secondary hover:border-primary',
                  {
                     'border-freelanceman-teal hover:border-primary bg-freelanceman-teal text-foreground':
                        selectState.enableSelect,
                  }
               )}
               onClick={enableMultiSelect}
            >
               <CopyCheck
                  className={cn(
                     'w-4 h-4 text-secondary group-hover:text-primary',
                     { 'text-primary': selectState.enableSelect }
                  )}
               />
               <p
                  className={cn(
                     'w-0 text-transparent overflow-hidden transition-all duration-150 ease-in-out text-nowrap group-hover:w-[107px] group-hover:text-primary',
                     {
                        'text-primary group-hover:w-0 pl-1':
                           selectState.enableSelect,
                     }
                  )}
               >
                  &nbsp;Select Multiple
               </p>
            </div>
            <FilterSelect onValueChange={handleCategoryFilter} selectContents={clientPageFileCategorySelections} value={fileFilter.category} placeholder='Category' />
            <SearchBox onChange={handleSearch} className="border rounded-full h-[27px] w-[250px]" />
         </div>
         <FileList
            filesData={filesData}
            isLoading={isLoading}
            selectState={selectState}
            setDialogState={setDialogState}
            setSelectState={setSelectState}
         />
         <FileDialog
            dialogState={dialogState}
            setDialogState={setDialogState}
         />
      </div>
   );
};

interface SelectState {
   enableSelect: boolean;
   selectedValues: string[];
}

interface FileListProps {
   filesData: File[] | undefined;
   isLoading: boolean;
   selectState: SelectState;
   setSelectState: Dispatch<SetStateAction<SelectState>>;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
}

const FileList: React.FC<FileListProps> = ({
   filesData,
   isLoading,
   selectState,
   setDialogState,
   setSelectState,
}) => {
   if (isLoading) {
      return <p>Loading...</p>;
   }

   if (!filesData || filesData.length === 0) {
      return <p>No files available</p>;
   }

   const fileListItems = filesData.map((file) => (
      <FileListItem
         key={file.id}
         data={file}
         setSelectState={setSelectState}
         color={'F39E60'}
         type="file"
         selectState={selectState}
         setDialogState={setDialogState}
      />
   ));

   return <div>{fileListItems}</div>;
};

export default ClientFileSection;