import { cn } from '@/lib/helper/utils';
import { getIcon, formatCategory } from '@/components/page-elements/files/Helpers';
import AddButton from '@/components/shared/ui/AddButton';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import React, { Dispatch, SetStateAction, useState } from 'react';
import FileTable from '@/components/page-elements/files/FileTable';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { File } from '@types';
import { formatDate } from '@/lib/helper/formatDateTime';
import { formatBytes } from '@/lib/helper/formatFile';
import { Checkbox } from '@/components/shared/ui/primitives/CheckBox';
import { ProjectTab } from '@/components/page-elements/all-projects/ProjectList';
import { EllipsisVertical } from 'lucide-react';
import { FormDialogState } from '@/lib/types/dialog.types';

const ClientFileSection: React.FC = () => {
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

   const selectState = {
      enableSelect: true,
      selectedValue: ["file-2", "file-2"],
   }

   return (
      <div className="flex flex-col w-full bg-foreground rounded-[30px] p-4 pt-5 sm:w-full gap-[6px] shrink-0 overflow-hidden h-1/2">
         <div className="flex justify-between items-center h-[33px]">
            <p className="text-lg">Files</p>
            <AddButton onClick={handleAddFile} />
         </div>
         <SearchBox className="border rounded-full h-[27px] w-[250px]" />
         <div>
            <FileListItem data={data} color={'F39E60'} type='file' selectState={selectState} />
            <FileListItem data={data} color={'F39E60'} type='file' selectState={selectState} />
            <FileListItem data={data} color={'F39E60'} type='file' selectState={selectState} />
         </div>
      </div>
   );
};

export default ClientFileSection;


interface ListItemProps<TListData> {
   data: Record<string, any>,
   column: string[],
   type: 'file' | 'document-draft',
   dateFormat: 'LONG' | 'SHORT'
   selectState: {
      enableSelect: boolean,
      selectedValue: string[]
   },
   setSelectState: Dispatch<SetStateAction<string>>,
   setDialogState: Dispatch<SetStateAction<FormDialogState>>,
   deleteFunction: () => void,
   color?: string,
}

const FileListItem = <TListData,>({
   data,
   type,
   color,
   columnKey,
   dateFormat,
   selectState,
   setSelectState,
   setDialogState,
   deleteFunction,
}: ListItemProps<TListData>) => {

   const formattedDate = formatDate(data.createdAt, 'LONG');
   const formattedSize = formatBytes(data.size) || '';
   const formattedCategory = formatCategory(data.category);
   const icon = getIcon(data.type, color);

   const isSelected = selectState.selectedValue.includes(data.id)

   return (
      <div className="flex flex-col">
          <div className={cn('flex px-2 gap-2 items-center bg-transparent hover:bg-quaternary transition-colors duration-100', { 'bg-quaternary': isSelected })}>
            {selectState.enableSelect && <Checkbox className="w-[14px] h-[14px]" checked={isSelected} />}
            <div className="flex flex-col w-full mr-2">
               <div className="flex justify-between py-2 grow items-center">
                  <div className="flex gap-1 items-center">
                     {type === 'file' && <div className="flex w-4 h-4 items-center">{icon}</div>}
                     <p>{data.name}</p>
                  </div>
                  <div className="flex gap-5">
                     <p className="text-sm text-secondary">
                        {formattedCategory}
                     </p>
                     <p className="text-sm text-secondary">{formattedDate}</p>
                     <p className="text-sm text-secondary">{formattedSize}</p>
                  </div>
               </div>
            </div>
            <EllipsisVertical className="w-4 h-4" />
         </div>
         <Separator className="bg-quaternary h-[1px]" />
      </div>
   );
};
