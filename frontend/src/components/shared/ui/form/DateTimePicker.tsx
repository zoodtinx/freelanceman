import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import { InputProps } from '../../../../lib/types/form-input-props.types';
import { ActionFormData } from '@types';

const DateTimePicker = ({
   formMethods,
}: InputProps<ActionFormData>): JSX.Element => {
   const {
      formState: { errors },
   } = formMethods;

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
