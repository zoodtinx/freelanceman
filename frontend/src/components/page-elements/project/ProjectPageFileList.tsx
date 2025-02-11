import { cn } from '@/lib/helper/utils';
import { Dispatch, SetStateAction } from 'react';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { Checkbox } from '@/components/shared/ui/primitives/CheckBox';
import { SelectState } from '@/lib/types/list.type';
import { formatDate } from '@/lib/helper/formatDateTime';
import type { FormDialogState } from '@/lib/types/dialog.types';
import type { File } from '@types';
import {
   getIcon,
   formatCategory,
} from 'src/components/shared/ui/helpers/Helpers';

interface FileListProps {
   filesData: File[] | undefined;
   isLoading: boolean;
   selectState: SelectState;
   setSelectState: Dispatch<SetStateAction<SelectState>>;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
}

export const ProjectPageFileList: React.FC<FileListProps> = ({
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
      return <p>No File available</p>;
   }

   const fileListItems = filesData.map((filesData) => (
      <FileListItem
         key={filesData.id}
         data={filesData}
         setSelectState={setSelectState}
         selectState={selectState}
         setDialogState={setDialogState}
      />
   ));

   return (
      <div className="flex flex-col h-0  pt-1 grow overflow-y-auto">
         {fileListItems}
      </div>
   );
};

interface FileListItemProps {
   data: File;
   selectState: SelectState;
   setSelectState: Dispatch<SetStateAction<SelectState>>;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
   deleteFunction: () => void;
}

export const FileListItem = ({
   data,
   selectState,
   setSelectState,
   setDialogState,
}: FileListItemProps) => {
   const isSelected = selectState.selectedValues.includes(data.id);

   const dateUploaded = formatDate(data.createdAt, 'SHORT');
   const category = formatCategory(data.category);

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
            page: 'project-page'
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
               className={cn(
                  'h-[14px] w-0 opacity-0 transition-all duration-150',
                  { 'w-[14px] mr-1  opacity-100': selectState.enableSelect }
               )}
               checked={isSelected}
            />
            <div className="flex flex-col w-full">
               <div className="flex justify-between py-[7px] grow items-center">
                  <div className="flex gap-2 items-center">
                     {getIcon(data.type, 'w-4 h-4 text-secondary')}
                     <div className="flex gap-1 items-center text-base">
                        <p>{data.displayName}</p>
                     </div>
                  </div>
                  <p className="text-sm text-secondary">{dateUploaded}</p>
               </div>
            </div>
         </div>
         <div className="px-2">
            <Separator className="bg-quaternary h-[1px]" />
         </div>
      </div>
   );
};
