import { Popover, PopoverContent, PopoverTrigger } from '../primitives/Popover';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { Calendar } from '@/components/shared/ui/primitives/Calendar';
import { cn } from '@/lib/helper/utils';
import { formatDate } from '@/lib/helper/formatDateTime';
import { useEffect, useState } from 'react';
import { FormElementProps } from '@/lib/types/form-element.type';
import { useRef } from 'react';

export const DatePickerForm = <TFieldValues extends FieldValues>({
   formMethods,
   fieldName,
}: FormElementProps<TFieldValues>) => {
   const { control } = formMethods;
   const [isOpen, setIsOpen] = useState(false);
   const popoverRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            popoverRef.current &&
            !popoverRef.current.contains(event.target as Node)
         ) {
            setIsOpen(false);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   return (
      <Controller
         name={fieldName as Path<TFieldValues>}
         control={control}
         rules={{ required: 'Date is required' }}
         render={({ field: { value, onChange } }) => {
            return (
               <Popover open={isOpen}>
                  <PopoverTrigger asChild>
                     <p
                        className={cn(
                           'justify-start font-semibold cursor-pointer',
                           !value && 'text-muted-foreground'
                        )}
                        onClick={() => setIsOpen(true)}
                     >
                        {value ? formatDate(value, 'LONG') : 'Pick a date'}
                     </p>
                  </PopoverTrigger>
                  <PopoverContent
                     className="p-0 bg-foreground rounded-xl"
                     ref={popoverRef}
                  >
                     <Calendar
                        mode="single"
                        selected={value ? new Date(value) : undefined}
                        onSelect={(selectedDate) => {
                           setIsOpen(false);
                           onChange(
                              selectedDate ? selectedDate.toISOString() : ''
                           );
                        }}
                     />
                  </PopoverContent>
               </Popover>
            );
         }}
      />
   );
};
