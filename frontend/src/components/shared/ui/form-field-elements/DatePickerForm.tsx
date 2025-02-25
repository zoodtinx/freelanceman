import { Popover, PopoverContent, PopoverTrigger } from '../primitives/Popover';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { Calendar } from '@/components/shared/ui/primitives/Calendar';
import { cn } from '@/lib/helper/utils';
import { formatDate } from '@/lib/helper/formatDateTime';
import { useState } from 'react';
import { FormElementProps } from '@/lib/types/form-element.type';

export const DatePickerForm = <TFieldValues extends FieldValues>({
   formMethods,
   fieldName,
}: FormElementProps<TFieldValues>): JSX.Element => {
   const { control } = formMethods;
   const [isOpen, setIsOpen] = useState(false);

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
                  <PopoverContent className="w-auto p-0">
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
