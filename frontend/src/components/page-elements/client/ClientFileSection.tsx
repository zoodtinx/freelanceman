import AddButton from '@/components/shared/ui/AddButton';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import React, { useRef, useState } from 'react';
import { FileFilterDto } from '@schemas';
import { useAllFilesQuery, useDeleteFile } from '@/lib/api/file-api';
import { FilterSelect } from 'src/components/shared/ui/select/PrebuiltSelect';
import { clientPageFileCategorySelections, fileTypeSelections } from 'src/components/shared/ui/helpers/constants/selections';
import MultiSelectButton from 'src/components/shared/ui/select/MultiSelectButton';
import { cn } from '@/lib/helper/utils';
import { useParams } from 'react-router-dom';
import { ClientSectionProps } from 'src/components/page-elements/client/props.type';
import { FileList } from '@/components/page-elements/files/FileList';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';

const ClientFileSection: React.FC<ClientSectionProps> = () => {
   const { formDialogState, setFormDialogState } = useFormDialogStore();
   const clientId = useParams().clientId || '';
   const fileSectionRef = useRef<HTMLDivElement | undefined>();

   const [selectState, setSelectState] = useState({
      enableSelect: false,
      selectedValues: [] as string[],
   });

   const [fileFilter, setFileFilter] = useState<FileFilterDto>({
      clientId: clientId,
   });

   const { data: filesData, isLoading } = useAllFilesQuery(fileFilter);

   const { mutate: deleteFile, isPending } = useDeleteFile();

   if (isPending) {
      return <p>Loading...</p>;
   }


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

   const handleAddFile = () => {
      setFormDialogState({
         isOpen: true,
         type: 'new-file',
         mode: 'create',
         openedOn: 'client-page',
         data: formDialogState.data
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
               onValueChange={(value) => handleFileFilter('type', value)}
               selectContents={fileTypeSelections}
               value={fileFilter.type}
               placeholder="Type"
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
            setSelectState={setSelectState}
            size="md"
         />
      </div>
   );
};

export default ClientFileSection;
