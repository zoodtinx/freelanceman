import { useState, useEffect } from 'react';
import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';

import { SearchBox } from '@/components/shared/ui/SearchBox';
import { cn } from '@/lib/helper/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/shared/ui/primitives/Popover';

type SelectProps = {
  selectContents: { value: string; label: string }[];
  className?: string;
  onValueChange: (value: string, onChange?: (value: string) => void) => void;
  value: string;
  placeholder?: string;
  isWithIcon?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

const SelectWithSearch: React.FC<SelectProps> = ({
  selectContents,
  className = 'w-[200px] border border-gray-300 rounded-md font-normal py-1 px-2 items-center',
  onValueChange,
  value,
  placeholder = 'Select',
  isWithIcon = true,
}) => {
  const [filteredSelection, setFilteredSelection] = useState(selectContents);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const filterSelection = (searchTerm: string) => {
      if (searchTerm.trim() === '') {
        return selectContents;
      }
      return selectContents.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };

    setFilteredSelection(filterSelection(searchTerm));
  }, [searchTerm, selectContents]);

  return (
     <Popover open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <PopoverTrigger asChild>
           <div
              className={cn(
                 className,
                 'flex justify-between items-center cursor-pointer'
              )}
              onClick={() => setIsOpen((prev) => !prev)}
           >
              <span className="truncate">
                 {value
                    ? selectContents.find((item) => item.value === value)
                         ?.label ?? placeholder
                    : placeholder}
              </span>
              {isWithIcon && <ChevronDown className="ml-2 h-4 w-4" />}
           </div>
        </PopoverTrigger>
        <PopoverContent className='border-0 bg-foreground rounded-xl p-2 shadow-lg overflow-hidden text-sm font-normal' >
           <div className="w-full max-h-[250px] pr-2 bg-foreground rounded-md relative border-0 overflow-y-scroll">
              <SearchBox
                 className="w-full mb-2 sticky top-0 bg-background"
                 placeholder="Search..."
                 onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="flex flex-col gap-1">
                 {filteredSelection.length > 0 ? (
                    filteredSelection.map((selection) => (
                       <div
                          key={selection.value}
                          onClick={() => {
                             onValueChange(selection.value);
                             setIsOpen(false); // Close the dropdown on selection
                          }}
                          className={cn(
                             'px-2 py-1 rounded cursor-pointer hover:bg-gray-200',
                             value === selection.value
                                ? 'bg-gray-100 font-semibold'
                                : ''
                          )}
                       >
                          <div className="flex items-center justify-between">
                             <span className="truncate">{selection.label}</span>
                             {value === selection.value && (
                                <Check className="h-4 w-4 text-blue-500" />
                             )}
                          </div>
                       </div>
                    ))
                 ) : (
                    <div className="text-gray-500 text-sm px-2 py-2">
                       No results found
                    </div>
                 )}
              </div>
           </div>
        </PopoverContent>
     </Popover>
  );
};

export { SelectWithSearch };
