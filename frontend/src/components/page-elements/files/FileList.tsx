import { EditPopover } from '@/components/shared/ui/EditPopover';
import { cn } from '@/lib/helper/utils';
import { Dispatch, SetStateAction } from 'react';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { Checkbox } from '@/components/shared/ui/primitives/CheckBox';
import { SelectState } from '@/lib/types/list.type';
import { formatDate } from '@/lib/helper/formatDateTime';
import {
   getIcon,
   formatCategory,
} from 'src/components/shared/ui/helpers/Helpers';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { FilePayload } from '@schemas';

interface FileListProps {
   filesData: File[] | undefined;
   isLoading: boolean;
   selectState: SelectState;
   setSelectState: Dispatch<SetStateAction<SelectState>>;
   size: 'base' | 'sm' | 'md';
}

export const FileList: React.FC<FileListProps> = ({
   filesData,
   isLoading,
   selectState,
   setSelectState,
   size,
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
         size={size}
      />
   ));

   return (
      <div className="flex flex-col h-0 grow overflow-y-auto">
         {fileListItems}
      </div>
   );
};

interface FileListItemProps {
   data: FilePayload;
   selectState: SelectState;
   setSelectState: Dispatch<SetStateAction<SelectState>>;
   size: 'base' | 'sm' | 'md';
}

export const FileListItem = ({
   data,
   selectState,
   setSelectState,
   size = 'base',
}: FileListItemProps) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );
   
   const isSelected = selectState.selectedValues.includes(data.id);

   const dateUploaded = formatDate(data.createdAt, 'LONG');
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
         setFormDialogState({
            isOpen: true,
            data: data,
            id: data.id,
            mode: 'edit',
            type: 'file',
            page: 'file-page',
         });
      }
   };

   const handleClickFile = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'edit',
         openedOn:'file-page',
         type:'file',
         data: data
      })
   }

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
            <div className="flex flex-col w-full" onClick={handleClickFile}>
               <div className="flex justify-between py-[10px] grow items-center">
                  <div className="flex gap-2 items-center">
                     {getIcon(data.type, 'w-4 h-4 text-secondary')}
                     <div className="flex gap-1 items-center text-[15px]">
                        <p>{data.displayName}</p>
                     </div>
                  </div>
                  <div className="flex">
                     {size === 'base' && (
                        <p className="text-sm text-secondary w-[100px]">
                           {category}
                        </p>
                     )}
                     {size === 'base' && (
                        <p className="text-sm text-secondary w-[150px] line-clamp-1">
                           {data.client}
                        </p>
                     )}
                     <p className="text-sm text-secondary w-[120px]">
                        {dateUploaded}
                     </p>
                  </div>
               </div>
            </div>
            <EditPopover />
         </div>
         <Separator className="bg-quaternary h-[1px]" />
      </div>
   );
};
