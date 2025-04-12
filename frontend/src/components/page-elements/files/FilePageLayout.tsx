import {
   fileTypeSelections,
   fileCategorySelections,
} from 'src/components/shared/ui/helpers/constants/selections';
import { defaultContact } from 'src/components/shared/ui/helpers/constants/default-values';
import { Plus } from '@/components/shared/icons';
import { FormDialogState } from 'src/lib/types/form-dialog.types';
import { useEffect, useState } from 'react';
import { Folder } from 'lucide-react';
import { FilterSelect } from 'src/components/shared/ui/select/PrebuiltSelect';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { FileList } from '@/components/page-elements/files/FileList';
import { FileSearchOption } from '@types';
import { useAllFilesQuery, useFilesQuery } from '@/lib/api/file-api';
import MultiSelectButton from 'src/components/shared/ui/select/MultiSelectButton';
import { cn } from '@/lib/helper/utils';
import { defaultFileValues } from 'src/components/shared/ui/helpers/constants/default-values';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';

const FilePageLayout = (): JSX.Element => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const [fileDialogState, setFileDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      mode: 'view',
      type: 'file',
      data: {},
      page: ''
   });

   const [fileFilter, setFileFilter] = useState<FileSearchOption>({
   });

   const [selectState, setSelectState] = useState({
      enableSelect: false,
      selectedValues: [] as string[],
   });

   const { data: filesData, isLoading } = useFilesQuery(fileFilter);

   const enableMultiSelect = () => {
      if (selectState.enableSelect) {
         return;
      }
      setSelectState({
         enableSelect: true,
         selectedValues: [],
      });
   };

   const selectAll = () => {
      if (!filesData) {
         return;
      }
      setSelectState((prev) => {
         const selected = filesData.map((file) => {
            return file.id;
         });
         return {
            ...prev,
            selectedValues: selected,
         };
      });
   };

   const handleFileFilter = (type, value: any) => {
      if (type === 'type') {
         setFileFilter((prev) => {
            return {
               ...prev,
               type: value,
            };
         });
      } else if (type === 'category') {
         setFileFilter((prev) => {
            return {
               ...prev,
               category: value,
            };
         });
      }
   };

   const handleNewFile = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'file-page',
         type: 'file',
         data: defaultFileValues,
      });
   };
   

   return (
      <div className="flex flex-col w-full bg-foreground rounded-[20px] p-4 pt-2 sm:w-full h-full gap-[6px] shrink-0 overflow-hidden shadow-md">
         <div className="flex justify-between">
            <div className="flex items-center gap-1">
               <Folder className="h-6 w-6 mt-1" />
               <p className="text-xl pt-1 leading-none mr-2">Files</p>
            </div>
            <NewFileButton setDialogState={handleNewFile} />
         </div>
         <div className="flex gap-1">
            <MultiSelectButton
               selectState={selectState}
               setSelectState={setSelectState}
               enableMultiSelect={enableMultiSelect}
               selectAllFn={selectAll}
            />
            <FilterSelect
               onValueChange={(value) => handleFileFilter('type', value)}
               selectContents={fileTypeSelections}
               value={fileFilter.type}
               placeholder="Type"
               className={cn({ hidden: selectState.enableSelect })}
            />
            <FilterSelect
               onValueChange={(value) => handleFileFilter('category', value)}
               selectContents={fileCategorySelections}
               value={fileFilter.category}
               placeholder="Category"
               className={cn({ hidden: selectState.enableSelect })}
            />
            <SearchBox
               className={cn('rounded-full h-7', {
                  hidden: selectState.enableSelect,
               })}
            />
         </div>
         <FileList
            filesData={filesData}
            isLoading={isLoading}
            selectState={selectState}
            setDialogState={setFileDialogState}
            setSelectState={setSelectState}
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
