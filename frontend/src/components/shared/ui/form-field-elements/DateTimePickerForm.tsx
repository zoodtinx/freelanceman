import DatePicker from '../primitives/DatePicker';
import TimePicker from '../primitives/TimePicker';
import { InputProps } from '../../../../lib/types/form-input-props.types';
import { ActionFormData } from '@types';
import { format, parseISO } from 'date-fns';
import { Path } from 'react-hook-form';

const DateTimePicker = <TFieldValues extends ActionFormData>({
   formMethods,
   dialogState,
   fieldName,
}: InputProps<TFieldValues>): JSX.Element => {
   const {
      formState: { errors },
      watch,
   } = formMethods;

   const dueDateISO = watch(fieldName  as Path<TFieldValues>);
   const withTime = watch('withTime' as Path<TFieldValues>) ?? true;
   const dueDate = dueDateISO ? parseISO(dueDateISO) : null;

   if (dialogState?.mode === 'view' && dueDate) {
      return (
         <div className="text-left">
            <p className="">{format(dueDate, 'MMMM do, yyyy')}</p>
            {withTime && (
               <p className="text-gray-600">{format(dueDate, 'hh:mm a')}</p>
            )}
         </div>
      );
   }

   return (
      <div>
         <DatePicker
            fieldName={fieldName}
            formMethods={formMethods}
            dialogState={dialogState}
         />
         <TimePicker
            fieldName={fieldName}
            formMethods={formMethods}
            dialogState={dialogState}
         />
         {errors.dueDate && (
            <p className="text-sm text-red-500 font-normal animate-shake">
               {errors.dueDate.message as string}
            </p>
         )}
      </div>
   );
};

export default DateTimePicker;
