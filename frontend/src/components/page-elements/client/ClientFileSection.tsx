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
} from '@/lib/types/dialog.types';
import FileDialog from '@/components/shared/ui/FileDialog';
import { File, FileSearchOption } from '@types';
import { useAllFilesQuery, useDeleteFile } from '@/lib/api/file-api';
import { FilterSelect } from '@/components/shared/ui/PrebuiltSelect';
import { clientPageFileCategorySelections } from '@/components/shared/ui/selections';
import MultiSelectButton from '@/components/shared/ui/MultiSelectButton';
import DeletePromptDialog from '@/components/shared/ui/DeletePromptDialog';

const ClientFileSection: React.FC = () => {
   const fileSectionRef = useRef<HTMLDivElement | undefined>();

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

   const [fileFilter, setFileFilter] = useState<FileSearchOption>({});

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
      console.log('added file');
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

   return (
      <div
         className="flex flex-col w-full bg-foreground rounded-[30px] p-4 pt-5 sm:w-full gap-[6px] shrink-0 overflow-hidden h-1/2"
         ref={fileSectionRef}
      >
         <div className="flex justify-between items-center h-[33px]">
            <p className="text-lg">Files</p>
            <AddButton onClick={handleAddFile} />
         </div>
         <div className="flex gap-1">
            <div className="relative">
               <MultiSelectButton
                  enableMultiSelect={enableMultiSelect}
                  selectState={selectState}
                  setSelectState={setSelectState}
                  onDelete={deleteFile}
                  ref={fileSectionRef}
               />
            </div>
            <FilterSelect
               onValueChange={handleCategoryFilter}
               selectContents={clientPageFileCategorySelections}
               value={fileFilter.category}
               placeholder="Category"
            />
            <SearchBox
               onChange={handleSearch}
               className="border rounded-full h-[27px] w-[250px]"
            />
         </div>
         <FileList
            filesData={filesData}
            isLoading={isLoading}
            selectState={selectState}
            setDialogState={setDialogState}
            setSelectState={setSelectState}
         />
         <DeletePromptDialog
            promptDialogState={promptDialogState}
            setPromptDialogState={setPromptDialogState}
            setDialogState={setDialogState}
         />
         <FileDialog
            dialogState={dialogState}
            setDialogState={setDialogState}
            setPromptDialogState={setPromptDialogState}
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
