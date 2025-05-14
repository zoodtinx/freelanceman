import { FieldValues, Path } from 'react-hook-form';
import { FormElementProps } from '@/lib/types/form-element.type';
import { Input } from '@/components/shared/ui/primitives/Input';

type TextInputProps<TFieldValues extends FieldValues> =
   React.InputHTMLAttributes<HTMLInputElement> & FormElementProps<TFieldValues>;

export const TextInputForm = <TFieldValues extends FieldValues>({
   formMethods,
   className,
   fieldName,
   required,
   errorMessage,
   placeholder,
   number = false,
   onKeyDown
}:  TextInputProps<TFieldValues>) => {
   const {
      register,
      formState: { errors }
   } = formMethods;

   return (
      <div className="flex flex-col">
         <Input
            {...register(fieldName as Path<TFieldValues>, {
               required: required
                  ? errorMessage || 'This field is required'
                  : false,
            })}
            className={className}
            onKeyDown={(e) => {
               if (e.key === 'Enter') {
                  e.preventDefault();
               }
               if (onKeyDown) onKeyDown(e); 
            }}
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
