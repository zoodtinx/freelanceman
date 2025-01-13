import { SearchBox } from '@/components/shared/ui/SearchBox';
import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/helper/utils';
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from '@/components/shared/ui/primitives/Command';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/shared/ui/primitives/Popover';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/shared/ui/primitives/Selection';
import { SelectGroup } from '@radix-ui/react-select';

type SelectProps = Omit<
   React.ComponentPropsWithoutRef<typeof Popover>,
   'children'
> & {
   selectContents: { value: string; label: string }[];
   className?: string;
   onValueChange: (value: string, onChange?: (value: string) => void) => void;
   value: string;
   placeholder?: string;
   isWithIcon?: boolean;
   size?: 'sm' | 'md' | 'lg' | 'xl';
   isLoading?: boolean;
   onInputChange?: (filter: any) => void;
};

const SelectWithSearch: React.FC<SelectProps> = ({
   selectContents,
   className = 'w-[200px] border border-gray-300 rounded-md font-normal py-1 px-2 items-center',
   onValueChange,
   value,
   placeholder = 'Select',
   isWithIcon = true,
   onInputChange,
   isLoading,
}) => {

   const namefilter = (value) => {
      console.log('value', value);
      onInputChange({ name: value });
   };

   console.log('selectContent', selectContents);

   console.log('isLoading', isLoading);

   return (
      <Select value={value} onValueChange={onValueChange}>
         <SelectTrigger className={className} isWithIcon={isWithIcon}>
            <SelectValue placeholder={placeholder} />
         </SelectTrigger>
         <SelectContent className="flex flex-col gap-1 max-h-[250px] overflow-y-auto relative">
            <SearchBox
               onChange={(e) => namefilter(e.target.value)}
               className="sticky"
            />
            <SelectGroup className=''>
               {isLoading
                  ? 'loading'
                  : selectContents.map((selection) => (
                       <SelectItem
                          key={selection.value}
                          value={selection.value}
                       >
                          <p className="truncate">{selection.label}</p>
                       </SelectItem>
                    ))}
            </SelectGroup>
         </SelectContent>
      </Select>
   );
};

export { SelectWithSearch };
