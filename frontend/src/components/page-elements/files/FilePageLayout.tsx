import {
   fileTypeSelections,
   fileCategorySelections,
} from 'src/components/shared/ui/helpers/constants/selections';
import { useState } from 'react';
import { Folder } from 'lucide-react';
import { FilterSelect } from 'src/components/shared/ui/select/PrebuiltSelect';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { FileList } from '@/components/page-elements/files/FileList';
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
          toast.error('Error deleting files')
      },
      successCallback() {
          toast.success('Files deleted')
      },
      optimisticUpdate: {
         enable: true,
         key: ['files'],
         type: 'delete'
      }
   })

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
      toast.loading('Deleting files')
      setSelectState((prev) => {
         return {
            ...prev,
            enableSelect: false
         }
      })
      await deleteManyFiles.mutateAsync(selectState.selectedValues)
      toast.dismiss()
      toast.success('Files deleted')
   }

   return (
      <div className="flex flex-col w-full bg-foreground rounded-[20px] p-4 pt-2 sm:w-full h-full gap-[6px] shrink-0 overflow-hidden shadow-md">
         <div className="flex justify-between pt-2">
            <div className="flex items-center gap-1">
               <Folder className="h-6 w-6 mt-1" />
               <p className="text-xl pt-1 leading-none mr-2">Files</p>
            </div>
            <AddButton onClick={handleNewFile} />
         </div>
         <div className="flex gap-1 text-base">
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
               className={cn({ hidden: selectState.enableSelect })}
            />
            <FilterSelect
               onValueChange={(value) => handleFileFilter('category', value)}
               selectContents={fileCategorySelections}
               value={fileFilter.category as string}
               placeholder="Category"
               className={cn({ hidden: selectState.enableSelect })}
            />
            <SearchBox
               className={cn('rounded-full h-7', {
                  hidden: selectState.enableSelect,
               })}
               onChange={(e) => handleFileFilter('displayName', e.target.value)}
            />
         </div>
         <SharedFileList
            variant="project-page"
            filesQueryResult={filesQueryResult}
            setSelectState={setSelectState}
            selectState={selectState}
            placeHolder="Add a file"
            addFn={handleNewFile}
         />
      </div>
   );
};

export default FilePageLayout;
