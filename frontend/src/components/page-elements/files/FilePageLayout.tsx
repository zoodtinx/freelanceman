import {
   fileTypeSelections,
   fileCategorySelections,
} from 'src/components/shared/ui/helpers/constants/selections';
import { useState } from 'react';
import { Folder } from 'lucide-react';
import { FilterSelect } from 'src/components/shared/ui/select/PrebuiltSelect';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import MultiSelectButton from 'src/components/shared/ui/select/MultiSelectButton';
import { cn } from '@/lib/helper/utils';
import { defaultFileValues } from 'src/components/shared/ui/helpers/constants/default-values';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { FileFilterDto, FilePayload } from 'freelanceman-common';
import AddButton from '@/components/shared/ui/AddButton';
import FileListLoader from '@/components/shared/ui/placeholder-ui/FilePageLoader';
import { toast } from 'sonner';
import { useDeleteManyFile, useFilesQuery } from '@/lib/api/file-api';
import { SharedFileList } from '@/components/shared/ui/lists/SharedFileList';

const FilePageLayout = (): JSX.Element => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );

   const [fileFilter, setFileFilter] = useState<FileFilterDto>({});

   const [selectState, setSelectState] = useState({
      enableSelect: false,
      selectedValues: [] as string[],
   });

   const filesQueryResult = useFilesQuery(fileFilter);
   const deleteManyFiles = useDeleteManyFile({
      errorCallback() {
         toast.error('Error deleting files');
      },
      successCallback() {
         toast.success('Files deleted');
      },
      optimisticUpdate: {
         enable: true,
         key: ['files'],
         type: 'delete',
      },
   });

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
         const selected = filesData.map((file: FilePayload) => {
            return file.id;
         });
         return {
            ...prev,
            selectedValues: selected,
         };
      });
   };

   const handleFileFilter = (type: keyof FileFilterDto, value: any) => {
      setFileFilter((prev) => {
         return {
            ...prev,
            [type]: value,
         };
      });
   };

   const handleNewFile = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'create',
         openedOn: 'file-page',
         type: 'new-file',
         entity: 'file',
         data: { ...defaultFileValues },
      });
   };

   const handleDeleteMultipleFiles = async () => {
      toast.loading('Deleting files');
      setSelectState((prev) => {
         return {
            ...prev,
            enableSelect: false,
         };
      });
      await deleteManyFiles.mutateAsync(selectState.selectedValues);
      toast.dismiss();
      toast.success('Files deleted');
   };

   return (
      <div className="flex flex-col w-full bg-foreground rounded-[20px] sm:w-full h-full shrink-0 overflow-hidden shadow-md">
         <div
            className={cn(
               'flex flex-col w-full justify-between p-4 pb-3',
               'sm:pt-2 sm:px-2 sm:pb-0 sm:gap-2'
            )}
         >
            <div className="flex justify-between sm:pl-1">
               <div className="flex gap-1 items-center">
                  <div className="flex items-end gap-1 sm:items-center">
                     <Folder className="w-[28px] h-auto mt-[2px] sm:w-[22px] sm:mt-0" />
                     <p className="text-xl leading-none mr-2 sm:text-lg">
                        Files
                     </p>
                  </div>
               </div>
               <AddButton onClick={handleNewFile} />
            </div>
            <div className="flex gap-1 sm:gap-[3px] text-base">
               <MultiSelectButton
                  selectState={selectState}
                  setSelectState={setSelectState}
                  enableMultiSelect={enableMultiSelect}
                  selectAllFn={selectAll}
                  onDelete={handleDeleteMultipleFiles}
               />
               <FilterSelect
                  onValueChange={(value) => handleFileFilter('type', value)}
                  selectContents={fileTypeSelections}
                  value={fileFilter.type as string}
                  placeholder="Type"
                  className={cn({ hidden: selectState.enableSelect }, 'max-w-32')}
               />
               <FilterSelect
                  onValueChange={(value) => handleFileFilter('category', value)}
                  selectContents={fileCategorySelections}
                  value={fileFilter.category as string}
                  placeholder="Category"
                  className={cn(
                     { hidden: selectState.enableSelect },
                     'sm:hidden'
                  )}
               />
               <SearchBox
                  className={cn('rounded-full h-7 sm:grow', {
                     hidden: selectState.enableSelect,
                  })}
                  onChange={(e) =>
                     handleFileFilter('displayName', e.target.value)
                  }
               />
            </div>
         </div>
         <SharedFileList
            page="file-page"
            filter={fileFilter}
            setFilter={setFileFilter}
            setSelectState={setSelectState}
            selectState={selectState}
            placeHolder="Add a file"
            addFn={handleNewFile}
            className="px-2"
         />
      </div>
   );
};

export default FilePageLayout;
