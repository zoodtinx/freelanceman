import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import { InputProps } from '../../../../lib/types/form-input-props.types';
import { ActionFormData } from '@types';

const DateTimePicker = <TFieldValues extends ActionFormData>({
   formMethods,
   fieldName
}: InputProps<TFieldValues>): JSX.Element => {
   const {
      formState: { errors },
   } = formMethods;

   return (
      <div>
         <DatePicker fieldName={fieldName} formMethods={formMethods} />
         <TimePicker fieldName={fieldName} formMethods={formMethods} />
         {errors.dueDate && (
            <p className="text-sm text-red-500 font-normal animate-shake">
               {errors.dueDate.message as string}
            </p>
         )}
      </div>
   );
};

export default DateTimePicker;
