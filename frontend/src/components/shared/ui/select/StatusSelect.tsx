import * as React from 'react';
import {
   Select,
   SelectValue,
   SelectTrigger,
   SelectContent,
   SelectItem,
} from 'src/components/shared/ui/select/Select';
import { SelectItemContent } from '@/components/shared/ui/select/select.type';
import { getStatusColor } from '@/components/shared/ui/helpers/Helpers';
import { cn } from '@/lib/helper/utils';

interface StandardSelectProps {
   selections: SelectItemContent[];
   isWithIcon?: boolean;
   value: string;
   handleValueChange: (value: string) => void;
   className?: string;
   showColor?: boolean
}

const StatusSelect = React.forwardRef<HTMLButtonElement, StandardSelectProps>(
   (
      { className, isWithIcon = true, selections, value, handleValueChange, showColor = true },
      ref
   ) => {
      return (
            <Select value={value} onValueChange={handleValueChange}>
               <SelectTrigger
                  ref={ref}
                  isWithIcon={isWithIcon}
                  className={cn("bg-foreground w-fit rounded-full py-1 px-2", className)}
               >
                  <div className={"flex gap-1 items-center text-base sm:text-sm"}>
                     {showColor && <div className={`w-3 h-3 rounded-full bg-${getStatusColor(value)}`} />}
                     <SelectValue />
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
      );
   }
);

export default StatusSelect;
