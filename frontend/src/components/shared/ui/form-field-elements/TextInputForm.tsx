import { FieldValues, Path } from 'react-hook-form';
import { FormElementProps } from '@/lib/types/form-element.type';
import { Input } from '@/components/shared/ui/primitives/Input';

export const TextInputForm = <TFieldValues extends FieldValues>({
   formMethods,
   className,
   fieldName,
   required,
   errorMessage,
   placeholder,
   number = false
}: FormElementProps<TFieldValues>) => {
   const {
      register,
      formState: { errors }
   } = formMethods;

   return (
      <div className="flex flex-col">
         <Input
            {...register(fieldName as Path<TFieldValues>, {
               required: required ? errorMessage || 'This field is required' : false,
            })}
            className={className}
            placeholder={placeholder}
            type={number ? 'number' : 'text'}
         />
         {errors[fieldName] && (
            <p className="text-red-500 font-normal animate-shake text-sm pt-1">
            {errors[fieldName]?.message as string}
         </p>
         )}
      </div>
   );
};
