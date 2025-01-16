import { useRef, useEffect } from 'react';
import { useState } from 'react';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import * as React from 'react';
import {
   Popover,
} from '@/components/shared/ui/primitives/Popover';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/shared/ui/primitives/Selection';
import { div } from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/helper/utils';

type SelectProps = Omit<
   React.ComponentPropsWithoutRef<typeof Popover>,
   'children'
> & {
   selectContents: { value: string; label: string }[];
   className?: string;
   onValueChange: (value: string, onChange?: (value: string) => void) => void;
   value?: string;
   placeholder?: string;
   isWithIcon?: boolean;
   size?: 'sm' | 'md' | 'lg' | 'xl';
   isLoading?: boolean;
   onInputChange: (filter: any) => void;
};

const SelectWithApiSearch: React.FC<SelectProps> = ({
   selectContents,
   className = 'w-[200px] border border-gray-300 rounded-md font-normal py-1 px-2 items-center',
   onValueChange,
   value,
   placeholder = 'Select',
   isWithIcon = true,
   onInputChange,
   isLoading,
   size,
}) => {
   const [isOpen, setIsOpen] = useState(false)
   const [selectedValue, setSelectedValue] = useState({value: '', label: ''})

   const handleValueChange = (value: string) => {
      const selected = selectContents.find((selection) => selection.value === value)
      if (selected) {
         setSelectedValue(selected)
         onValueChange(value)
      }
   }

   const debouncedInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
         if (onInputChange) onInputChange(e.target.value);
      },
      [onInputChange]
   );

   const handleNewSelection = () => {
      onInputChange('')
   }

   const handleClose = () => {
      setIsOpen(false)
   }

   return (
      <Select
         value={value}
         onOpenChange={handleNewSelection}
         onValueChange={(value) => handleValueChange(value)}
      >
         <SelectTrigger
            className={cn(
               className,
               'flex justify-between items-center cursor-pointer'
            )}
         >
            <p className="truncate">
               {selectedValue.label ? selectedValue.label : placeholder}
            </p>
            {isWithIcon && <ChevronDown className="ml-1 h-4 w-4" />}
         </SelectTrigger>
         <SelectContent className="border-0 bg-foreground rounded-xl p-1 overflow-hidden text-sm font-normal w-[300px]">
            <div className="w-full max-h-[250px] pr-2 bg-foreground rounded-md border-0 flex flex-col">
               <SearchBox
                  onChange={debouncedInputChange}
                  className="w-full mb-2 bg-background"
                  placeholder="Search..."
               />
               <SelectionList
                  selectContents={selectContents}
                  isLoading={isLoading}
                  handleDialogClose={handleClose}
                  onValueChange={handleValueChange}
                  selectedValue={value}
                  
               />
            </div>
         </SelectContent>
      </Select>
   );
};

const SelectionList: React.FC<{
   selectContents: { value: string; label: string }[];
   isLoading: boolean;
   onValueChange: (value: string) => void;
   selectedValue?: string;
}> = ({ selectContents, isLoading, onValueChange, selectedValue, handleDialogClose }) => {
   const containerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
     const handleClickOutside = (event: MouseEvent) => {
       if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
         handleDialogClose();
       }
     };
 
     document.addEventListener('mousedown', handleClickOutside);
     return () => {
       document.removeEventListener('mousedown', handleClickOutside);
     };
   }, [handleDialogClose]);
   
   return (
      <div className="max-h-[250px] pr-2 overflow-y-auto overflow-x-hidden">
         {isLoading ? (
            <div className="text-gray-500 text-sm px-2 py-2">Loading...</div>
         ) : selectContents.length > 0 ? (
            selectContents.map((selection) => (
               <SelectItem
                  value={selection.value}
                  className='px-2 mr-2 rounded cursor-pointer hover:bg-gray-200'
                  onClick={() => {onValueChange(selection.value); handleDialogClose()}}
               >
                  <p className='w-full pr-5 line-clamp-2'>{selection.label}</p>
               </SelectItem>
            ))
         ) : (
            <div className="text-gray-500 text-sm px-2 py-2">No results found</div>
         )}
      </div>
   );
};

export { SelectWithApiSearch };
