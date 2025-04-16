import {
   Select,
   SelectValue,
   SelectTrigger,
   SelectContent,
   SelectItem,
} from 'src/components/shared/ui/select/Select';
import { SelectItemContent } from '@/components/shared/ui/select/select.type';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/helper/utils';

interface SelectProps {
   selectContents: SelectItemContent[];
   className?: string;
   onValueChange: (value: string) => void;
   value?: string;
   placeholder?: string;
   isWithIcon?: boolean;
}

export const FilterSelect = ({
   className,
   selectContents,
   onValueChange,
   value,
   placeholder = 'Select a value',
   isWithIcon = true,
}: SelectProps) => {
   const initialValue = selectContents.find(
      (selection) => selection.value === value
   ) || {
      label: '',
      value: '',
   };
   const [mode, setMode] = useState('base');
   const [selectedValue, setSelectedValue] = useState(initialValue);

   useEffect(() => {
      if (!value) {
         setMode('base');
      } else {
         setMode('selected');
      }
   }, [value]);

   const handleValueChange = (value: string) => {
      const selected = selectContents.find(
         (selection) => selection.value === value
      );
      if (selected) {
         setSelectedValue(selected);
         onValueChange(value);
      }
   };

   const handleDiscardFilter = () => {
      setSelectedValue({ value: '', label: '' });
      onValueChange('');
   };

   return (
      <div className="flex gap-[1px]">
         <Select value={value} onValueChange={handleValueChange}>
            <SelectTrigger
               className={cn(
                  `flex h-5 gap-1 items-center justify-center focus:outline-none 
                  whitespace-nowrap border border-primary p-3 rounded-tl-full rounded-bl-full
                  ring-offset-background placeholder:text-muted-foreground 
                  disabled:cursor-not-allowed disabled:opacity-50 
                  [&>span]:line-clamp-1 bg-primary text-foreground ${
                     mode === 'base' &&
                     'rounded-tr-full rounded-br-full bg-transparent text-secondary border-secondary'
                  }`,
                  className
               )}
               isWithIcon={isWithIcon}
            >
               <p className="truncate">
                  {selectedValue.label ? selectedValue.label : placeholder}
               </p>
            </SelectTrigger>
            <SelectContent className="flex flex-col gap-1">
               {selectContents.map((selection) => (
                  <SelectItem key={selection.value} value={selection.value}>
                     {selection.label}
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>
         {mode === 'selected' && (
            <div
               className={cn(
                  'flex h-5 gap-1 text-foreground items-center justify-center bg-primary border border-primary p-3 px-1 rounded-tr-full rounded-br-full',
                  className
               )}
               onClick={() => {
                  handleDiscardFilter();
                  setMode('base');
               }}
            >
               <X className="w-4 h-4" />
            </div>
         )}
      </div>
   );
};
