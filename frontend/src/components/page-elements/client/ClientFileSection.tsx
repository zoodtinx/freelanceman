import { cn } from '@/lib/helper/utils';
import AddButton from '@/components/shared/ui/AddButton';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { getIcon, formatCategory } from '@/components/page-elements/files/Helpers';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { File } from '@types';
import { formatDate } from '@/lib/helper/formatDateTime';
import { formatBytes } from '@/lib/helper/formatFile';
import { Checkbox } from '@/components/shared/ui/primitives/CheckBox';
import { CopyCheck, EllipsisVertical, FileStack } from 'lucide-react';
import { FormDialogState } from '@/lib/types/dialog.types';
import { mockFiles } from '@mocks';

const ClientFileSection: React.FC = () => {
   const [selectState, setSelectState] = useState({
         enableSelect: true,
         selectedValues: [] as string[]
   })

   const handleAddFile = () => {
      console.log('added file');
   };

   const data: FileData = {
      id: "file-2",
      fileName: "logo_concept_v3.png",
      name: "Logo Concept v3",
      type: "image",
      category: "project-asset",
      link: "https://files.example.com/logo_concept_v3.png",
      project: "Brand Redesign",
      projectId: "project-101",
      client: "Client A",
      clientId: "client-001",
      size: 204800,
      createdAt: "2025-01-02T08:45:00Z"
   };

   const fileList = () => {
      const fileListItems = mockFiles.map((file) => {
         return (
            <FileListItem
               data={file}
               setSelectState={setSelectState}
               color={'F39E60'}
               type="file"
               selectState={selectState}
            />
         );
      }) 
      return fileListItems
   }

   const enableMultiSelect = () => {
      setSelectState({
         enableSelect: !selectState.enableSelect,
         selectedValues: [],
      });
   };

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
                  { 'border-freelanceman-teal hover:border-freelanceman-teal bg-freelanceman-teal text-foreground': selectState.enableSelect }
               )}
               onClick={enableMultiSelect}
            >
               <CopyCheck
                  className={cn(
                     'w-4 h-4 text-secondary group-hover:text-primary',
                     { 'text-primary': selectState.enableSelect }
                  )}
               />
                  <p className={cn(
                    'w-0 text-transparent overflow-hidden transition-all duration-150 ease-in-out text-nowrap group-hover:w-[107px] group-hover:text-primary',
                    { 'text-primary group-hover:w-0 pl-1' : selectState.enableSelect}
                  )}>
                    &nbsp;Select Multiple
                  </p>
            </div>
            <SearchBox className="border rounded-full h-[27px] w-[250px]" />
         </div>
         <div>{fileList()}</div>
      </div>
   );
};

export default ClientFileSection;


interface SelectState {
   enableSelect: boolean,
      selectedValues: string[]
}

interface FileListItemProps {
   data: File,
   type: 'file' | 'document-draft',
   selectState: SelectState,
   setSelectState: Dispatch<SetStateAction<SelectState>>,
   setDialogState: Dispatch<SetStateAction<FormDialogState>>,
   deleteFunction: () => void,
   color?: string,
}

const FileListItem: React.FC<FileListItemProps> = ({
   data,
   type,
   color,
   selectState,
   setSelectState,
   setDialogState,
   deleteFunction,
}) => {

   const formattedDate = formatDate(data.createdAt, 'LONG');
   const formattedSize = formatBytes(data.size) || '';
   const formattedCategory = formatCategory(data.category);
   const icon = getIcon(data.type, color);

   const isSelected = selectState.selectedValues.includes(data.id)

   const handleSelect = () => {
      if (isSelected) {
         setSelectState((prev) => {
            return {
               enableSelect: true,
               selectedValues: prev.selectedValues.filter(
                  (id) => id !== data.id
               ),
            };
         });
         return;
      } else if (!isSelected) {
         setSelectState((prev) => {
            return {
               enableSelect: true,
               selectedValues: [...prev.selectedValues, data.id],
            };
         });
      }
   };

   return (
      <div className="flex flex-col">
         <div
            className={cn(
               'flex px-2 items-center bg-transparent hover:bg-quaternary transition-colors duration-100',
               { 'bg-quaternary': isSelected }
            )}
         >
            {/* {selectState.enableSelect && <Checkbox className="w-[14px] h-[14px]" checked={isSelected} onCheckedChange={handleSelect} />} */}
            <Checkbox
               className={cn('h-[14px] w-0 opacity-0 transition-all duration-150', {'w-[14px] mr-1  opacity-100' : selectState.enableSelect})}
               checked={isSelected}
               onCheckedChange={handleSelect}
            />
            <div className="flex flex-col w-full mr-2">
               <div className="flex justify-between py-2 grow items-center">
                  <div className="flex gap-1 items-center">
                     {type === 'file' && (
                        <div className="flex w-4 h-4 items-center">{icon}</div>
                     )}
                     <p>{data.name}</p>
                  </div>
                  <div className="flex gap-2">
                     <p className="text-sm text-secondary w-[120px]">
                        {formattedCategory}
                     </p>
                     <p className="text-sm text-secondary w-[110px]">
                        {formattedDate}
                     </p>
                     <p className="text-sm text-secondary w-[70px]">
                        {formattedSize}
                     </p>
                  </div>
               </div>
            </div>
            <EllipsisVertical className="w-4 h-4" />
         </div>
         <Separator className="bg-quaternary h-[1px]" />
      </div>
   );
};
