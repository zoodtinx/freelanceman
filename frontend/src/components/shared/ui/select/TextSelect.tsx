import * as React from 'react';
import {
   Select,
   SelectValue,
   SelectTrigger,
   SelectContent,
   SelectItem,
} from 'src/components/shared/ui/select/Select';
import { SelectItemContent } from '@/components/shared/ui/select/select.type';
import { cn } from '@/lib/helper/utils';

interface StandardSelectProps {
   selections: SelectItemContent[];
   isWithIcon?: boolean;
   value: string;
   handleValueChange: (value: string) => void;
   className?: string;
   placeholder?: string;
}

export const TextSelect = React.forwardRef<
   HTMLButtonElement,
   StandardSelectProps
>(
   (
      {
         className,
         isWithIcon = true,
         selections,
         value,
         handleValueChange,
         placeholder,
      },
      ref
   ) => {
      return (
         <div className={cn('', className)}>
            <Select value={value} onValueChange={handleValueChange}>
               <SelectTrigger ref={ref} isWithIcon={isWithIcon}>
                  <div className={cn('text-base', className)}>
                     <SelectValue placeholder={placeholder} />
                  </div>
               </SelectTrigger>
               <SelectContent className="flex flex-col gap-1 max-h-[250px] overflow-y-auto">
                  {selections.map((selection) => (
                     <SelectItem key={selection.value} value={selection.value}>
                        {selection.label}
                     </SelectItem>
                  ))}
               </SelectContent>
            </Select>
         </div>
      );
   }
);
