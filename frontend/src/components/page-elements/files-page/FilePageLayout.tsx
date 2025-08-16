import {
   fileTypeSelections,
   fileCategorySelections,
} from 'src/components/shared/ui/helpers/constants/selections';
import { useState } from 'react';
import { Folder, Loader2 } from 'lucide-react';
import { FilterSelect } from 'src/components/shared/ui/select/PrebuiltSelect';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import MultiSelectButton from 'src/components/shared/ui/select/MultiSelectButton';
import { cn } from '@/lib/helper/utils';
import { defaultFileValues } from 'src/components/shared/ui/helpers/constants/default-values';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { FileFilterDto, FileFindManyItem } from 'freelanceman-common';
import AddButton from '@/components/shared/ui/AddButton';
import { toast } from 'sonner';
import { useDeleteManyFile, useFilesQuery } from '@/lib/api/file-api';
import { SharedFileList } from '@/components/shared/ui/lists/SharedFileList';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';

const FilePageLayout = (): JSX.Element => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );
   const setConfirmationDialogState = useConfirmationDialogStore(
      (state) => state.setConfirmationDialogState
   );
   const closeDialog = () => {
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
   };

   const [fileFilter, setFileFilter] = useState<FileFilterDto>({});

   const [selectState, setSelectState] = useState({
      enableSelect: false,
      selectedValues: [] as string[],
   });

   const filesQueryResult = useFilesQuery(fileFilter);
   const deleteManyFiles = useDeleteManyFile();

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
      if (!filesQueryResult.data) {
         return;
      }
      setSelectState((prev) => {
         const selected = filesQueryResult.data.items.map(
            (file: FileFindManyItem) => {
               return file.id;
            }
         );
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
         openedOn: 'filePage',
         type: 'newFile',
         entity: 'file',
         data: { ...defaultFileValues },
      });
   };

   const handleDeleteMultipleFiles = async () => {
      const deleteMulitFilesFn = async () => {
         toast.loading('Deleting multiple files...');
         await deleteManyFiles.mutateAsync(selectState.selectedValues);
      };
      setConfirmationDialogState({
         actions: {
            primary() {
               deleteMulitFilesFn();
            },
         },
         entityName: `${selectState.selectedValues.length} files`,
         isOpen: true,
         type: 'delete',
         dialogRequested: {
            mode: 'edit',
            type: 'file',
         },
      });
      closeDialog();
   };

   return (
      <div className="flex flex-col w-full bg-foreground rounded-[20px] sm:w-full h-full shrink-0 overflow-hidden shadow-md sm:border sm:border-secondary sm:dark:border-tertiary">
         <div
            className={cn(
               'flex flex-col w-full justify-between p-2 gap-2 pb-1',
               'sm:pt-2 sm:px-2 sm:pb-0 sm:gap-2'
            )}
         >
            <div className="flex justify-between pl-1">
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
            <div className="flex gap-1 sm:gap-[3px] text-base items-center">
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
                  className={cn(
                     { hidden: selectState.enableSelect },
                     'max-w-32'
                  )}
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
                  onChange={(e) => handleFileFilter('name', e.target.value)}
               />
               {filesQueryResult.isFetching && (
                  <Loader2 className="text-primary animate-spin" />
               )}
            </div>
         </div>
         <SharedFileList
            page="filePage"
            filter={fileFilter}
            setFilter={setFileFilter}
            setSelectState={setSelectState}
            selectState={selectState}
            placeHolder="Add a file"
            addFn={handleNewFile}
            className="px-2"
            variant="base"
         />
      </div>
   );
};

export default FilePageLayout;
