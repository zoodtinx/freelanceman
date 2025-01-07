import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { InputProps } from '@/lib/types/form-input-props.types';
import { Calendar } from './Calendar';
import { cn } from '@/lib/helper/utils';
import { format } from 'date-fns';

const DatePicker = <TFieldValues extends FieldValues>({
   formMethods,
   fieldName
}: InputProps<TFieldValues>): JSX.Element => {
   const {
      control,
      formState: { errors },
   } = formMethods;

   return (
      <Controller
         name={fieldName as Path<TFieldValues>}
         control={control}
         rules={{ required: 'Date is required' }}
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
