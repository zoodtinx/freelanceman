import { cn } from '@/lib/helper/utils';
import React, { Dispatch, SetStateAction } from 'react';
import { getIcon, formatCategory } from '@/components/page-elements/files/Helpers';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { formatDate } from '@/lib/helper/formatDateTime';
import { formatBytes } from '@/lib/helper/formatFile';
import { Checkbox } from '@/components/shared/ui/primitives/CheckBox';
import { FormDialogState } from '@/lib/types/dialog.types';
import { File } from '@types';

interface SelectState {
   enableSelect: boolean,
      selectedValues: string[]
}

interface FileListItemProps {
   data: File;
   type: 'file' | 'document-draft';
   selectState: SelectState;
   setSelectState: Dispatch<SetStateAction<SelectState>>;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
   deleteFunction: () => void;
   color?: string;
}

const FileListItem: React.FC<FileListItemProps> = ({
   data,
   type,
   color,
   selectState,
   setSelectState,
   setDialogState,
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

   const handleClick = () => {
      if (selectState.enableSelect) {
         if (isSelected) {
            setSelectState((prev) => {
               return {
                  ...prev,
                  selectedValues: prev.selectedValues.filter(
                     (id) => id !== data.id
                  ),
               };
            });
         } else {
            setSelectState((prev) => {
               return {
                  enableSelect: true,
                  selectedValues: [...prev.selectedValues, data.id],
               };
            });
         }
      } else if (!selectState.enableSelect) {
         setDialogState({
            isOpen: true,
            data: data,
            id: data.id,
            mode: 'view',
            type: 'file',
         });
      }
   };

   return (
      <div className="flex flex-col cursor-default" onClick={handleClick}>
         <div
            className={cn(
               'flex px-2 items-center bg-transparent hover:bg-quaternary transition-colors duration-100',
               { 'bg-quaternary': isSelected }
            )}
         >
            <Checkbox
               className={cn('h-[14px] w-0 opacity-0 transition-all duration-150', {'w-[14px] mr-1  opacity-100' : selectState.enableSelect})}
               checked={isSelected}
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
         </div>
         <Separator className="bg-quaternary h-[1px]" />
      </div>
   );
};

export default FileListItem