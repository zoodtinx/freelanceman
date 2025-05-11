// components/shared/ui/FileList.tsx

import { cn } from '@/lib/helper/utils';
import { Dispatch, SetStateAction } from 'react';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { Checkbox } from '@/components/shared/ui/primitives/CheckBox';
import { SelectState } from '@/lib/types/list.type';
import { formatDate } from '@/lib/helper/formatDateTime';
import { getIcon } from '@/components/shared/ui/helpers/Helpers';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import useConfirmationDialogStore from '@/lib/zustand/confirmation-dialog-store';
import { FilePayload } from 'freelanceman-common/src/schemas';
import { toast } from 'sonner';
import { useDeleteFile } from '@/lib/api/file-api';
import {
   ApiErrorPlaceHolder,
   LoadingPlaceHolder,
   NoDataPlaceHolder,
} from '@/components/shared/ui/placeholders/ListPlaceHolder';
import { EditPopover } from '@/components/shared/ui/EditPopover';
import { UseQueryResult } from '@tanstack/react-query';

type Variant = 'base' | 'project-page';

interface SharedFileListProps {
   variant: Variant;
   filesQueryResult: UseQueryResult<FilePayload[]>;
   selectState: SelectState;
   setSelectState?: Dispatch<SetStateAction<SelectState>>;
   size?: 'base' | 'sm' | 'md';
   addFn: () => void;
   placeHolder?: string;
   className?: string
}

export const SharedFileList = ({
   variant,
   selectState,
   setSelectState,
   size = 'base',
   addFn,
   placeHolder = 'Add File',
   filesQueryResult,
   className
}: SharedFileListProps) => {
   const { data: files, isLoading, isError, refetch } = filesQueryResult;

   if (isLoading) return <LoadingPlaceHolder />;
   if (isError || !files) return <ApiErrorPlaceHolder retryFn={refetch} />;
   if (!files.length)
      return <NoDataPlaceHolder addFn={addFn}>{placeHolder}</NoDataPlaceHolder>;

   return (
      <div className={ cn("flex flex-col h-0 grow overflow-y-auto pt-1", className)}>
         {files.map((file) => (
            <SharedFileListItem
               key={file.id}
               data={file}
               variant={variant}
               selectState={selectState}
               setSelectState={setSelectState}
               size={size}
            />
         ))}
      </div>
   );
};

interface SharedFileListItemProps {
   data: FilePayload;
   variant: Variant;
   selectState: SelectState;
   setSelectState?: Dispatch<SetStateAction<SelectState>>;
   size?: 'base' | 'sm' | 'md';
}

const SharedFileListItem = ({
   data,
   variant,
   selectState,
   setSelectState,
   size = 'base',
}: SharedFileListItemProps) => {
   const isSelected = selectState.selectedValues.includes(data.id);
   const setFormDialogState = useFormDialogStore((s) => s.setFormDialogState);
   const setConfirmationDialogState = useConfirmationDialogStore(
      (s) => s.setConfirmationDialogState
   );

   const deleteFile = useDeleteFile({
      errorCallback: () => toast.error('Error deleting file'),
      successCallback: () => toast.success('File deleted'),
   });

   const handleOpenDialog = () => {
      setFormDialogState({
         isOpen: true,
         mode: 'edit',
         openedOn: variant,
         type: 'file',
         data,
         entity: 'file',
      });
   };

   const handleDeleteFile = () => {
      setConfirmationDialogState({
         actions: {
            primary() {
               deleteFile.mutate(data.id);
            },
         },
         entityName: data.displayName,
         isOpen: true,
         type: 'delete',
      });
   };

   const handleClick = () => {
      if (variant === 'base' && setSelectState) {
         if (selectState.enableSelect) {
            setSelectState((prev) => ({
               ...prev,
               selectedValues: isSelected
                  ? prev.selectedValues.filter((id) => id !== data.id)
                  : [...prev.selectedValues, data.id],
            }));
         } else {
            handleOpenDialog();
         }
      } else {
         handleOpenDialog();
      }
   };

   const dateUploaded = formatDate(
      data.createdAt,
      variant === 'base' ? 'LONG' : 'SHORT'
   );

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
               <div className="flex justify-between py-[10px] grow items-center">
                  <div className="flex gap-2 items-center">
                     {getIcon(data.type, 'w-4 h-4 text-secondary')}
                     <p className="text-[15px]">{data.displayName}</p>
                  </div>
                  <div className="flex">
                     {variant === 'base' && (
                        <p className="text-sm text-secondary w-[150px] line-clamp-1 text-right mr-5">
                           {data.client?.name || ''}
                        </p>
                     )}
                     <p className="text-sm text-secondary w-[60px]">
                        {dateUploaded}
                     </p>
                  </div>
               </div>
            </div>
            {variant === 'base' && (
               <EditPopover
                  editFn={handleOpenDialog}
                  deleteFn={handleDeleteFile}
               />
            )}
         </div>
         <Separator className="bg-quaternary h-[1px]" />
      </div>
   );
};
