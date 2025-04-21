import { Controller, FieldValues, Path } from 'react-hook-form';
import { SelectFormElementProps } from '@/lib/types/form-element.type';
import StatusSelect from '@/components/shared/ui/select/StatusSelect';

export const StatusSelectForm = <TFormData extends FieldValues>({
   formMethods,
   className,
   fieldName,
   selection,
   required,
   errorMessage,
}: SelectFormElementProps<TFormData>): JSX.Element => {
   const {
      control,
      formState: { errors },
   } = formMethods;

   return (
      <Controller
         name={fieldName as Path<TFormData>}
         control={control}
         rules={{
            required: required
               ? errorMessage || 'Please select a status'
               : false,
         }}
         render={({ field }) => {
            const handleValueChange = (value: string) => {
               field.onChange(value);
            };

            return (
               <div className={className}>
                  <StatusSelect
                     handleValueChange={handleValueChange}
                     selections={selection}
                     value={field.value}
                     className={className}
                  />
                  {errors[fieldName] && (
                     <p className="text-red-500 text-sm mt-1 animate-shake">
                        {errors[fieldName]?.message as string}
                     </p>
                  )}
               </div>
            );
         }}
      />
   );
};
