import { EditPopover } from '@/components/shared/ui/EditPopover';
import { cn } from '@/lib/helper/utils';
import { Dispatch, SetStateAction } from 'react';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { Checkbox } from '@/components/shared/ui/primitives/CheckBox';
import { SelectState } from '@/lib/types/list.type';
import { formatDate } from '@/lib/helper/formatDateTime';
import type { FormDialogState } from 'src/lib/types/form-dialog.types';
import type { File, SalesDocument } from '@types';
import {
   getIcon,
   formatCategory,
} from 'src/components/shared/ui/helpers/Helpers';
import { size } from 'lodash';
import { useNavigate } from 'react-router-dom';

interface FileListProps {
   documentDraftData: File[] | undefined;
   isLoading: boolean;
   selectState: SelectState;
   setSelectState: Dispatch<SetStateAction<SelectState>>;
}

export const DocumentDraftList: React.FC<FileListProps> = ({
   documentDraftData,
   isLoading,
   selectState,
   setDialogState,
   setSelectState,
   size,
}) => {
   if (isLoading) {
      return <p>Loading...</p>;
   }

   if (!documentDraftData || documentDraftData.length === 0) {
      return <p>No File available</p>;
   }

   const fileListItems = documentDraftData.map((documentDraftData) => (
      <DocumentListItem
         key={documentDraftData.id}
         data={documentDraftData}
         setSelectState={setSelectState}
         selectState={selectState}
         setDialogState={setDialogState}
         size={size}
      />
   ));

   return (
      <div className="flex flex-col h-0 grow overflow-y-auto pl-1 pt-1">
         {fileListItems}
      </div>
   );
};

interface DocumentListItemProps {
   data: SalesDocument;
   selectState: SelectState;
   setSelectState: Dispatch<SetStateAction<SelectState>>;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
   deleteFunction?: () => void;
}

export const DocumentListItem = ({
   data,
   selectState,
   setSelectState,
   setDialogState,
   size = 'base',
   deleteFunction,
}: DocumentListItemProps) => {
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
         setDialogState({
            isOpen: true,
            data: data,
            id: data.id,
            mode: 'view',
            type: 'file',
            page: 'file-page',
         });
      }
   };

   const documentCategory = data.category.charAt(0).toUpperCase() + data.category.slice(1);
   const amountTotal = data.total.toLocaleString()

   const navigate = useNavigate()

   const handleOpenDocument = () => {
      navigate(`./create/${data.id}`)
   }

   return (
      <div className="flex flex-col cursor-default" onClick={handleClick}>
         <div
            className={cn(
               'flex pr-1 pl-2 items-center bg-transparent hover:bg-quaternary',
               'border-l-[6px] border-secondary transition-colors duration-100',
               { 'bg-quaternary': isSelected },
               { 'border-freelanceman-orange' : data.category === 'quotation'},
               { 'border-freelanceman-cyan' : data.category === 'invoice'},
               { 'border-freelanceman-green' : data.category === 'receipt'},
            )}
         >
            <Checkbox
               className={cn(
                  'h-[14px] w-0 opacity-0 transition-all duration-150',
                  { 'w-[14px] mr-1  opacity-100': selectState.enableSelect }
               )}
               checked={isSelected}
            />
            <div className="flex flex-col w-full pr-2" onClick={handleOpenDocument}>
               <div className="flex justify-between py-[10px] grow items-center">
                  <div className="flex flex-col leading-snug">
                     <p className='text-sm'>{documentCategory}</p>
                     <p className='text-md'>{data.clientName}</p>
                     <p className='text-sm'>{data.projectTitle}</p>
                  </div>
                  <div className="flex flex-col justify-end">
                     <div className='text-right  text-primary '>
                        <p className="inline pr-1">{amountTotal}</p>
                        <p className="inline text-sm">{data.currency}</p>
                     </div>
                     <p className="text-sm text-secondary">{dateUploaded}</p>
                  </div>
               </div>
            </div>
            <EditPopover />
         </div>
         <Separator className="bg-quaternary h-[1px]" />
      </div>
   );
};
