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
} from '@/components/shared/ui/select/Select';
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
   const selectRef = useRef()

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setIsOpen(false);
         }
      };

      const handleEscapeKey = (event: KeyboardEvent) => {
         if (event.key === 'Escape') {
            setIsOpen(false);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
         document.removeEventListener('keydown', handleEscapeKey);
      };
   }, []);

   const handleValueChange = (value: string) => {
      const selected = selectContents.find((selection) => selection.value === value)
      if (selected) {
         setSelectedValue(selected)
         onValueChange(value)
      }
   }

   const debouncedInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
         if (onInputChange){
             onInputChange(e.target.value);
            }
      },
      [onInputChange]
   );

   const handleNewSelection = () => {
      onInputChange('')
   }

   const handleClose = () => {
      setIsOpen(false)
   }

   const handleInputChange = (e) => {
      onInputChange(e.target.value)
   }

   
   return (
      <Select
         value={value}
         onOpenChange={handleNewSelection}
         onValueChange={(value) => handleValueChange(value)}
         open={isOpen}
      >
         <SelectTrigger
            className={cn(
               className,
               'flex justify-between items-center cursor-pointer font-medium'
            )}
            onClick={() => setIsOpen(true)}
         >
            <p className="truncate">
               {selectedValue.label ? selectedValue.label : placeholder}
            </p>
            {/* {isWithIcon && <ChevronDown className="ml-1 h-4 w-4" />} */}
         </SelectTrigger>
         <SelectContent className="bg-foreground rounded-xl p-1 overflow-hidden text-sm font-normal w-[300px] shadow-sm" ref={selectRef}>
            <div className="w-full max-h-[250px] bg-foreground rounded-md border-0 flex flex-col">
               <SearchBox
                  onChange={handleInputChange}
                  className="w-full mb-2 bg-background rounded-md"
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
               <div
                  value={selection.value}
                  key={selection.value}
                  className='p-1 px-2 rounded cursor-pointer hover:bg-background'
                  onClick={() => {onValueChange(selection.value); handleDialogClose()}}
               >
                  <p className='w-full pr-5 line-clamp-2'>{selection.label}</p>
               </div>
            ))
         ) : (
            <div className="text-gray-500 text-sm px-2 py-2">No results found</div>
         )}
      </div>
   );
};

export { SelectWithApiSearch };
