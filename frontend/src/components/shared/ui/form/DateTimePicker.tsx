import React from 'react';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import { InputProps } from './props.type';
import { ActionFormData } from '@types';

const DateTimePicker = ({
   formMethods,
   dialogState,
}: InputProps<ActionFormData>): JSX.Element => {
   const {
      getValues,
      formState: { errors },
      watch
   } = formMethods;


   const dueDate = watch('dueDate')
   console.log('dueDate', dueDate)

   return (
      <div>
         <DatePicker formMethods={formMethods} />
         <TimePicker formMethods={formMethods} />
         {errors.dueDate && (
            <p className=" text-sm text-red-500 font-normal animate-shake">
               {errors.dueDate.message}
            </p>
         )}
      </div>
   );
};

export default DateTimePicker;
