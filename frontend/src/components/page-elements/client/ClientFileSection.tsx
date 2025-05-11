import AddButton from '@/components/shared/ui/AddButton';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import React, { useRef, useState } from 'react';
import { FileFilterDto } from 'freelanceman-common/src/schemas';
import { useFilesQuery, useDeleteFile } from '@/lib/api/file-api';
import { FilterSelect } from 'src/components/shared/ui/select/PrebuiltSelect';
import { fileTypeSelections } from 'src/components/shared/ui/helpers/constants/selections';
import MultiSelectButton from 'src/components/shared/ui/select/MultiSelectButton';
import { cn } from '@/lib/helper/utils';
import { useParams } from 'react-router-dom';
import { ClientSectionProps } from 'src/components/page-elements/client/props.type';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { defaultFileValues } from '@/components/shared/ui/helpers/constants/default-values';
import { SharedFileList } from '@/components/shared/ui/lists/SharedFileList';
import { Paperclip } from 'lucide-react';

const ClientFileSection: React.FC<ClientSectionProps> = ({clientData}) => {
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

   const filesQueryResult = useFilesQuery(fileFilter);

   const { mutate: deleteFile, isPending } = useDeleteFile();

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
      if (!filesQueryResult.data) {
         return;
      }
      setSelectState((prev) => {
         const selected = filesQueryResult.data.map((file) => {
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

   const handleAddFile = () => {
      setFormDialogState({
         isOpen: true,
         type: 'new-file',
         mode: 'create',
         openedOn: 'client-page',
         data: { ...defaultFileValues},
         entity: 'file',
      });
   };

   return (
      <div
         className="flex flex-col w-full bg-foreground rounded-[20px] sm:w-full shrink-0 overflow-hidden h-1/2 shadow-md"
         ref={fileSectionRef}
      >
         <div className="flex justify-between items-center px-4 pr-2 h-9">
            <div className="flex gap-1 items-center">
               <Paperclip className='w-4 h-4' />
               <p className="text-md">Files</p>
            </div>
            <AddButton className="w-7 h-7" onClick={handleAddFile} />
         </div>
         <div className="w-full border-[0.5px] border-tertiary" />
         <div className="flex gap-1 p-2">
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
         <SharedFileList
            variant="project-page"
            filesQueryResult={filesQueryResult}
            setSelectState={setSelectState}
            selectState={selectState}
            placeHolder="Add a file"
            addFn={handleAddFile}
            className="p-2 pt-0"
         />
      </div>
   );
};

export default ClientFileSection;
