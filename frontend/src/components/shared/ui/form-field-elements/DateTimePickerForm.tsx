import { FormElementProps } from '@/lib/types/form-element.type';
import {DatePickerForm} from '@/components/shared/ui/form-field-elements/DatePickerForm';
import {TimePickerForm} from '@/components/shared/ui/form-field-elements/TimePickerForm';

export const DateTimePickerForm = <TFieldValues extends FieldValues>({
   formMethods,
   fieldName,
   required,
   errorMessage,
}: FormElementProps<TFieldValues>): JSX.Element => {
   const {
      formState: { errors },
   } = formMethods;

   return (
      <div>
         <DatePickerForm
            fieldName={fieldName}
            formMethods={formMethods}
            required={required}
            errorMessage={errorMessage}
         />
         <TimePickerForm
            fieldName={fieldName}
            formMethods={formMethods}
         />
         {errors.dueDate && (
            <p className="text-sm text-red-500 font-normal animate-shake">
               {errors.dueDate.message as string}
            </p>
         )}
      </div>
   );
};
