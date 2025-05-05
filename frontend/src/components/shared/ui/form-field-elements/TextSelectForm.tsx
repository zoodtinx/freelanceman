import { Controller, FieldValues, Path } from 'react-hook-form';
import { SelectFormElementProps } from '@/lib/types/form-element.type';
import { TextSelect } from '@/components/shared/ui/select/TextSelect';

export const TextSelectForm = <TFormData extends FieldValues>({
   formMethods,
   className,
   fieldName,
   selection,
   required,
   errorMessage,
   placeholder
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
                  <TextSelect
                     handleValueChange={handleValueChange}
                     selections={selection}
                     value={field.value}
                     className={className}
                     placeholder={placeholder}
                  />
                  {errors[fieldName] && (
                     <p className="text-red-500 text-sm animate-shake">
                        {errors[fieldName]?.message as string}
                     </p>
                  )}
               </div>
            );
         }}
      />
   );
};
