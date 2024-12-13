import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Controller, FieldValues } from 'react-hook-form';
import { InputProps } from './props.type';
import { Calendar } from '../calendar';
import { cn } from '@/lib/helper/utils';
import { format } from 'date-fns';

const DatePicker = <TFieldValues extends FieldValues = FieldValues>({
   formMethods
}: InputProps<TFieldValues>): JSX.Element => {
   const {control} = formMethods
   
   return (
      <Controller
         name="dueDate"
         control={control}
         render={({ field: { value, onChange } }) => (
            <Popover>
               <PopoverTrigger asChild>
                  <p
                     className={cn(
                        'justify-start font-semibold cursor-pointer',
                        !value && 'text-muted-foreground'
                     )}
                  >
                     {value ? format(new Date(value), 'PPP') : 'Pick a date'}
                  </p>
               </PopoverTrigger>
               <PopoverContent className="w-auto p-0">
                  <Calendar
                     mode="single"
                     selected={value ? new Date(value) : undefined}
                     onSelect={(selectedDate) =>
                        onChange(selectedDate ? selectedDate.toISOString() : '')
                     }
                  />
               </PopoverContent>
            </Popover>
         )}
      />
   );
};

export default DatePicker;
