import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Controller, FieldValues } from 'react-hook-form';
import { InputProps } from '../../../../lib/types/form-input-props.types';
import { Calendar } from '../calendar';
import { cn } from '@/lib/helper/utils';
import { format } from 'date-fns';
import { ActionFormData } from '@types';

const DatePicker = ({ formMethods }: InputProps<ActionFormData>): JSX.Element => {
   const {
      control,
      formState: { errors },
   } = formMethods;

   return (
      <Controller
         name="dueDate"
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
