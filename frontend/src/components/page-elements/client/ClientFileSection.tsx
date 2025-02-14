import { defaultFileValues } from 'src/components/shared/ui/helpers/constants/default-values';
import FileListItem from '@/components/page-elements/client/FileListItem';
import AddButton from '@/components/shared/ui/AddButton';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import React, {
   Dispatch,
   LegacyRef,
   SetStateAction,
   useRef,
   useState,
} from 'react';
import {
   FormDialogState,
   PromptDialogProps,
   PromptDialogState,
} from 'src/lib/types/form-dialog.types';
import FileDialog from 'src/components/shared/ui/dialogs/form-dialog/FileDialog';
import { FileSearchOption } from '@types';
import { useAllFilesQuery, useDeleteFile } from '@/lib/api/file-api';
import { FilterSelect } from '@/components/shared/ui/PrebuiltSelect';
import { clientPageFileCategorySelections } from 'src/components/shared/ui/helpers/constants/selections';
import MultiSelectButton from '@/components/shared/ui/MultiSelectButton';
import DeletePromptDialog from 'src/components/shared/ui/dialogs/ConfirmationDialog/ConfirmationDialog';
import { cn } from '@/lib/helper/utils';
import { useParams } from 'react-router-dom';
import { ClientSectionProps } from 'src/components/page-elements/client/props.type';
import { FileList } from '@/components/page-elements/files/FileList';

const ClientFileSection: React.FC<ClientSectionProps> = () => {
   const clientId = useParams().clientId || '';
   const fileSectionRef = useRef<HTMLDivElement | undefined>();

   const [dialogState, setDialogState] = useState<FormDialogState>({
      isOpen: false,
      id: '',
      mode: 'view',
      type: 'file',
      data: {},
      page: 'client-page'
   });

   const [selectState, setSelectState] = useState({
      enableSelect: false,
      selectedValues: [] as string[],
   });

   const [fileFilter, setFileFilter] = useState<FileSearchOption>({
      clientId: clientId,
   });

   const [promptDialogState, setPromptDialogState] =
      useState<PromptDialogState>({
         isOpen: false,
         data: {
            label: 'Santorini Poster Draft 1',
            action: () => console.log('hey'),
         },
      });

   const { data: filesData, isLoading } = useAllFilesQuery(fileFilter);

   const { mutate: deleteFile, isPending } = useDeleteFile();

   if (isPending) {
      return <p>Loading...</p>;
   }

   const handleAddFile = () => {
      setDialogState({
         isOpen: true,
         data: defaultFileValues,
         id : defaultFileValues.id,
         mode: 'create',
         type: 'file',
         page: 'client-page'
      })
   };

   const enableMultiSelect = () => {
      if (selectState.enableSelect) {
         return;
      }
      setSelectState({
         enableSelect: true,
         selectedValues: [],
      });
   };

   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFileFilter((prev) => {
         return {
            ...prev,
            name: e.target.value,
         };
      });
   };

   const handleCategoryFilter = (value: any) => {
      setFileFilter((prev) => {
         return {
            ...prev,
            category: value,
         };
      });
   };

   const selectAll = () => {
      if (!filesData) {
         return
      }
      setSelectState((prev) => {
         const selected = filesData.map((file) => {
            return file.id
         })
         return {
            ...prev,
            selectedValues: selected
         }
      })
   }

   return (
      <div
         className="flex flex-col w-full bg-foreground rounded-[20px] p-2 sm:w-full gap-1 shrink-0 overflow-hidden h-1/2 shadow-md"
         ref={fileSectionRef}
      >
         <div className="flex justify-between items-center">
            <p className="text-lg pl-2">Files</p>
            <AddButton onClick={handleAddFile} />
         </div>
         <div className="flex gap-1 px-2">
            <div className="relative">
               <MultiSelectButton
                  enableMultiSelect={enableMultiSelect}
                  selectState={selectState}
                  setSelectState={setSelectState}
                  onDelete={deleteFile}
                  selectAllFn={selectAll}
                  ref={fileSectionRef}
               />
            </div>
            <FilterSelect
               onValueChange={handleCategoryFilter}
               selectContents={clientPageFileCategorySelections}
               value={fileFilter.category}
               placeholder="Category"
               className={cn({ hidden: selectState.enableSelect })}
            />
            <SearchBox
               onChange={handleSearch}
               className={cn('border rounded-full h-[27px] w-[250px]', {
                  hidden: selectState.enableSelect,
               })}
            />
         </div>
         <FileList
            filesData={filesData}
            isLoading={isLoading}
            selectState={selectState}
            setDialogState={setDialogState}
            setSelectState={setSelectState}
            size='md'
         />
         <DeletePromptDialog
            promptDialogState={promptDialogState}
            setPromptDialogState={setPromptDialogState}
            setDialogState={setDialogState}
         />
      </div>
   );
};

export default ClientFileSection;
