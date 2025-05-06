import { cn } from '@/lib/helper/utils';
import { Dispatch, SetStateAction } from 'react';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { Checkbox } from '@/components/shared/ui/primitives/CheckBox';
import { SelectState } from '@/lib/types/list.type';
import { formatDate } from '@/lib/helper/formatDateTime';
import {
   getIcon,
} from 'src/components/shared/ui/helpers/Helpers';
import { FilePayload } from 'freelanceman-common/src/schemas';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';

interface FileListProps {
   filesData: FilePayload[] | undefined;
   isLoading: boolean;
   selectState: SelectState;
   setSelectState: Dispatch<SetStateAction<SelectState>>;
}

export const ProjectPageFileList: React.FC<FileListProps> = ({
   filesData,
   isLoading,
   selectState,
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
         deleteFunction={() => {}}
      />
   ));

   return (
      <div className="flex flex-col h-0  pt-1 grow overflow-y-auto">
         {fileListItems}
      </div>
   );
};

interface FileListItemProps {
   data: FilePayload;
   selectState: SelectState;
   setSelectState: Dispatch<SetStateAction<SelectState>>;
   deleteFunction: () => void;
}

export const FileListItem = ({
   data,
   selectState,
}: FileListItemProps) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );
   const handleClickFile = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'edit',
         openedOn: 'project-page',
         type: 'file',
         data: data,
         entity: 'file'
      });
   };
   const isSelected = selectState.selectedValues.includes(data.id);

   const dateUploaded = formatDate(data.createdAt, 'SHORT');

   return (
      <div className="flex flex-col cursor-default" onClick={handleClickFile}>
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
            <div className="flex justify-between py-[7px] grow items-center w-full">
               <div className="flex gap-2 items-center w-0 grow">
                  {getIcon(data.type, 'w-4 h-4 text-secondary')}
                  <p className="truncate pr-2">{data.displayName}</p>
               </div>
               <p className="text-sm text-secondary shrink-0">{dateUploaded}</p>
            </div>
         </div>
         <div className="px-2">
            <Separator className="bg-quaternary h-[1px]" />
         </div>
      </div>
   );
};
