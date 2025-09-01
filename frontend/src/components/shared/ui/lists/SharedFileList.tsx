// components/shared/ui/FileList.tsx

import { cn } from '@/lib/helper/utils';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { Checkbox } from '@/components/shared/ui/primitives/CheckBox';
import { SelectState } from '@/lib/types/list.type';
import { formatDate } from '@/lib/helper/formatDateTime';
import { getIcon } from '@/components/shared/ui/helpers/Helpers';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { useFilesQuery } from '@/lib/api/file-api';
import {
   ApiErrorPlaceHolder,
   LoadingPlaceHolder,
   NoDataPlaceHolder,
} from '@/components/shared/ui/placeholder-ui/ListPlaceHolder';
import { UseQueryResult } from '@tanstack/react-query';
import {
   FileFilterDto,
   FileFindManyItem,
   FileFindManyResponse,
} from 'freelanceman-common';
import LoadMoreButton from '@/components/shared/ui/placeholder-ui/LoadMoreButton';
import { forwardRef } from 'react';
import TabListPlaceHolder from '@/components/shared/ui/placeholder-ui/TabListPlaceholder';
import { ScrollArea } from '@/components/shared/ui/primitives/ScrollArea';
import SearchNotFoundPlaceholder from '@/components/shared/ui/placeholder-ui/SearchNotFoundPlaceHolder';
import { PartnerPageTabsLoader } from '@/components/shared/ui/placeholder-ui/PartnerPageLoader';

type Variant = 'base' | 'projectPage';

interface SharedFileListProps {
   selectState: SelectState;
   filter: FileFilterDto;
   setFilter: Dispatch<SetStateAction<FileFilterDto>>;
   setSelectState?: Dispatch<SetStateAction<SelectState>>;
   size?: 'base' | 'sm' | 'md';
   addFn: () => void;
   placeHolder?: string;
   className?: string;
   page: string;
   variant: Variant;
}

export const SharedFileList = ({
   selectState,
   setSelectState,
   size = 'base',
   addFn,
   placeHolder = 'Add File',
   className,
   filter,
   setFilter,
   page,
   variant,
}: SharedFileListProps) => {
   const {
      data: filesData,
      isLoading,
      isError,
      refetch,
   } = useFilesQuery(filter) as UseQueryResult<FileFindManyResponse>;

   const lastItemRef = useRef<HTMLDivElement>(null);

   // scroll down to bottom after fetching more data if user clicked load more
   useEffect(() => {
      if (!filesData || filesData?.items.length <= 30) {
         return;
      }

      if (lastItemRef.current) {
         lastItemRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
         });
      }
   }, [filesData?.items?.length]);

   // loading logics
   if (isLoading) {
      if (page === 'filePage') {
         return (
            <div className="px-2">
               <PartnerPageTabsLoader />
            </div>
         );
      } else {
         return <LoadingPlaceHolder />;
      }
   }

   // handle network error
   if (isError || !filesData) return <ApiErrorPlaceHolder retryFn={refetch} />;

   // handle search not found
   if (filesData?.total === 0) {
      // handle empty files list
      if (page === 'clientPage') {
         return (
            <div className="flex w-full h-full items-center justify-center text-secondary">
               No file related to this client
            </div>
         );
      }

      if (page === 'projectPage') {
         return (
            <NoDataPlaceHolder className="sm:pb-0" addFn={addFn}>
               {placeHolder}
            </NoDataPlaceHolder>
         );
      }

      if (page === 'filePage' && filesData.unfilteredTotal === 0) {
         return (
            <TabListPlaceHolder containerClassName="px-2" addFn={addFn}>
               Add a file
            </TabListPlaceHolder>
         );
      }

      return (
         <SearchNotFoundPlaceholder>
            No file matched your search.
         </SearchNotFoundPlaceholder>
      );
   }

   const remainingItems = filesData.total - filesData.items?.length > 0;
   const handleLoadMore = () => {
      const curentLength = filesData?.items?.length;
      console.log('curentLength', curentLength);

      if (!curentLength) {
         return;
      }

      setFilter((prev) => {
         return {
            ...prev,
            take: curentLength + 13,
         };
      });
   };

   return (
      <ScrollArea
         className={cn('flex flex-col h-0 grow overflow-y-auto', className)}
      >
         {filesData.items.map((file, i, arr) => {
            const isLast = i === arr.length - 1;

            return (
               <SharedFileListItem
                  key={file.id}
                  data={file}
                  selectState={selectState}
                  setSelectState={setSelectState}
                  size={size}
                  page={page}
                  variant={variant}
                  ref={isLast ? lastItemRef : undefined}
               />
            );
         })}
         {remainingItems && (
            <div className="flex justify-center pt-3 pb-8">
               <LoadMoreButton
                  loadMoreFn={handleLoadMore}
                  isLoading={isLoading}
               />
            </div>
         )}
      </ScrollArea>
   );
};

interface SharedFileListItemProps {
   data: FileFindManyItem;
   selectState: SelectState;
   setSelectState?: Dispatch<SetStateAction<SelectState>>;
   size?: 'base' | 'sm' | 'md';
   page: string;
   variant: Variant;
}

const SharedFileListItem = forwardRef<HTMLDivElement, SharedFileListItemProps>(
   (
      {
         data,
         variant,
         selectState,
         setSelectState,
         page,
      }: SharedFileListItemProps,
      ref
   ) => {
      const isSelected = selectState.selectedValues.includes(data.id);
      const setFormDialogState = useFormDialogStore(
         (s) => s.setFormDialogState
      );

      const handleOpenDialog = () => {
         setFormDialogState({
            isOpen: true,
            mode: 'edit',
            openedOn: page as any,
            type: 'file',
            data,
            entity: 'file',
         });
      };

      const handleClick = (e: React.MouseEvent) => {
         e.stopPropagation();
         if (setSelectState && selectState.enableSelect) {
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
         } else {
            handleOpenDialog();
         }
      };

      const dateUploaded = formatDate(
         data.createdAt!,
         variant === 'base' ? 'LONG' : 'SHORT'
      );

      return (
         <div
            ref={ref}
            className="flex flex-col cursor-default"
            onClick={handleClick}
         >
            <div
               className={cn(
                  'flex px-2 items-center bg-transparent hover:bg-quaternary transition-colors duration-100',
                  'sm:px-0',
                  isSelected && 'bg-quaternary',
                  page === 'project-page' && 'px-1'
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
                  <div
                     className={cn(
                        'flex py-[10px] grow gap-2 items-center',
                        'sm:py-2',
                        page === 'project-page' && 'py-[8px]'
                     )}
                  >
                     {getIcon(data.type, 'w-4 h-4 text-secondary shrink-0')}
                     <p className="text-[15px] truncate grow">{data.name}</p>
                     <div className="flex">
                        {page !== 'project-page' && (
                           <p className={cn("text-sm text-secondary w-[150px] line-clamp-1 text-right mr-5 sm:hidden", page === 'projectPage' && 'hidden')}>
                              {data.client?.name || ''}
                           </p>
                        )}
                        <p
                           className={cn(
                              'text-sm text-secondary text-right sm:hidden shrink-0',
                              page === 'projectPage' && 'hidden'
                           )}
                        >
                           {dateUploaded}
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            <Separator className="bg-quaternary h-[1px]" />
         </div>
      );
   }
);

SharedFileListItem.displayName = 'SharedFileListItem';
