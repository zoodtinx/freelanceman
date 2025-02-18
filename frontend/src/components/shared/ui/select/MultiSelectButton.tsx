import { cn } from '@/lib/helper/utils';
import React, { Dispatch, forwardRef, SetStateAction, useEffect, useRef, useState } from 'react';
import { CopyCheck, X } from 'lucide-react';
import { SelectState } from '@/lib/types/list.type';
import { Separator } from '@/components/shared/ui/primitives/Separator';
import { UseMutateFunction } from '@tanstack/react-query';

interface MultiSelectButtonProps {
   selectState: SelectState;
   setSelectState: Dispatch<SetStateAction<SelectState>>;
   enableMultiSelect: () => void;
   className?: string;
   onDelete: UseMutateFunction<void, Error, string, unknown>
   selectAllFn?: () => void;
}

const MultiSelectButton = forwardRef<HTMLDivElement, MultiSelectButtonProps>(
   (
      {
         selectState,
         setSelectState,
         enableMultiSelect,
         className = '',
         selectAllFn,
         onDelete,
      },
      ref
   ) => {
      const taskBarRef = useRef<HTMLDivElement | null>(null);

      useEffect(() => {
         const handleClickOutside = (event: MouseEvent) => {
            if (
               taskBarRef.current &&
               !taskBarRef.current.contains(event.target as Node) &&
               ref &&
               typeof ref !== 'function' &&
               ref.current &&
               !ref.current.contains(event.target as Node)
            ) {
               setSelectState({
                  enableSelect: false,
                  selectedValues: [],
               });
            }
         };

         const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
               setSelectState({
                  enableSelect: false,
                  selectedValues: [],
               });
            }
         };

         document.addEventListener('mousedown', handleClickOutside);
         document.addEventListener('keydown', handleEscapeKey);

         return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
         };
      }, [setSelectState, ref]); // Include `ref` in the dependency array

      const handleDeselectAll = () => {
         setSelectState({
            enableSelect: false,
            selectedValues: [],
         });
      }

      const handleDelete = () => {
         console.log('deleting')
      }

      return (
         <div
            className={cn(
               'flex items-center cursor-default group rounded-full',
               'h-[27px]',
               'transition-colors duration-150',
               'border border-secondary hover:border-primary',
               {
                  'border-primary text-primary': selectState.enableSelect,
               },
               className
            )}
            ref={taskBarRef} // Use the combined ref here
            onClick={enableMultiSelect}
         >
            {selectState.enableSelect ? (
               <div className="flex h-full items-center gap-2 ml-1 pl-1 pr-2">
                  <div
                     className="flex items-center"
                     onClick={handleDeselectAll}
                  >
                     <X className="w-4 h-4 group-hover:text-primary" />
                     <p
                        className={`
                              transition-all duration-150 ease-in-out
                              text-nowrap group-hover:text-primary
                           `}
                     >
                        {selectState.selectedValues.length} Selected
                     </p>
                  </div>
                  <div className="h-full border-[0.5px] border-secondary" />
                  <button onClick={selectAllFn}>Select all</button>
                  <div className="h-full border-[0.5px] border-secondary" />
                  <button
                     className="text-freelanceman-red"
                     onClick={handleDelete}
                  >
                     Delete
                  </button>
               </div>
            ) : (
               <div className="flex items-center px-2">
                  <CopyCheck className="w-4 h-4 text-secondary group-hover:text-primary" />
                  <p
                     className={cn(
                        'w-0 text-transparent overflow-hidden transition-all duration-150 ease-in-out text-nowrap group-hover:w-[107px] group-hover:text-primary',
                        {
                           'text-primary group-hover:w-0 pl-1':
                              selectState.enableSelect,
                        }
                     )}
                  >
                     &nbsp;Select Multiple
                  </p>
               </div>
            )}
         </div>
      );
   }
);

MultiSelectButton.displayName = 'MultiSelectButton'; 

export default MultiSelectButton;
