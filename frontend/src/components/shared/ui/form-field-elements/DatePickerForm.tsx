import { Popover, PopoverContent, PopoverTrigger } from '../primitives/Popover';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { Calendar } from '@/components/shared/ui/primitives/Calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/helper/utils';
import { useEffect, useState } from 'react';
import { FormElementProps } from '@/lib/types/form-element.type';
import { useRef } from 'react';
import { format } from 'date-fns';

export const DatePickerForm = <TFieldValues extends FieldValues>({
   formMethods,
   fieldName,
   className,
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
                     <div className='flex gap-1 items-center'>
                        <CalendarIcon className="w-5 h-5 text-secondary" />
                        <p
                           className={cn(
                              'justify-start font-semibold cursor-pointer text-md w-fit',
                              !value &&
                                 'text-secondary text-base',
                              className
                           )}
                           onClick={() => setIsOpen(true)}
                        >
                           {value ? format(new Date(value), 'd MMMM yyyy') : 'Pick a date'}
                        </p>
                     </div>
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
