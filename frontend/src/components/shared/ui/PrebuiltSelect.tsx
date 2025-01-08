import * as React from 'react';
import { useState, useEffect } from 'react';
import {
   Select,
   SelectGroup,
   SelectValue,
   SelectTrigger,
   SelectContent,
   SelectLabel,
   SelectItem,
   SelectSeparator,
   SelectScrollUpButton,
   SelectScrollDownButton,
} from 'src/components/shared/ui/primitives/Selection';
import { cn } from '@/lib/helper/utils';
import { X } from 'lucide-react';

type SelectProps = Omit<
   React.ComponentPropsWithoutRef<typeof Select>,
   'children'
> & {
   selectContents: { value: string; label: string; color?: string }[];
   className?: string;
   onValueChange: (value: string) => void;
   value: string;
   placeholder?: string;
   isWithIcon?: boolean;
};

const StandardSelect = React.forwardRef<HTMLButtonElement, SelectProps>(
   (
      {
         className,
         selectContents,
         onValueChange,
         value,
         placeholder = 'Select a value',
         isWithIcon = true,
         ...props
      },
      ref
   ) => {
      return (
         <Select value={value} onValueChange={onValueChange} {...props}>
            <SelectTrigger
               className={className}
               ref={ref}
               isWithIcon={isWithIcon}
            >
               <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="flex flex-col gap-1">
               {selectContents.map((selection) => (
                  <SelectItem key={selection.value} value={selection.value}>
                     {selection.label}
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>
      );
   }
);

StandardSelect.displayName = 'StandardSelect';

const FilterSelect = React.forwardRef<HTMLButtonElement, SelectProps>(
   (
      {
         className,
         selectContents,
         onValueChange,
         value,
         placeholder = 'Select a value',
         isWithIcon = true,
         ...props
      },
      ref
   ) => {
      const [mode, setMode] = useState('base')

      useEffect(() => {
         if (!value) {
            setMode('base')
         } else {
            setMode('selected')
         }
      }, [value])

      return (
         <div className='flex gap-[1px]'>
            <Select value={value} onValueChange={(value) => {onValueChange(value)}} {...props}>
               <SelectTrigger
                  className={cn(
                     `flex h-5 gap-1 items-center justify-center focus:outline-none whitespace-nowrap border border-primary p-3 rounded-tl-full rounded-bl-full ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 bg-primary text-foreground ${
                        mode === 'base' &&
                        'rounded-tr-full rounded-br-full bg-transparent text-primary'
                     }`,
                     className
                  )}
                  ref={ref}
                  isWithIcon={isWithIcon}
               >
                  <SelectValue placeholder={placeholder} />
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
               className="flex h-5 gap-1 text-foreground items-center justify-center bg-primary border border-primary p-3 px-1 rounded-tr-full rounded-br-full"
               onClick={() => {
                  onValueChange('')
                  setMode('base');
               }}
            >
               <X className="w-4 h-4" />
            </div>
         )}
         </div>
      );
   }
);

FilterSelect.displayName = 'FilterSelect';

export { StandardSelect, FilterSelect };
