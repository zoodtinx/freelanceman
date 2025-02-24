import { FieldValues, Path } from 'react-hook-form';
import { FormElementProps } from '@/lib/types/form-element.type';
import { Textarea } from '@/components/shared/ui/primitives/Textarea';
import { cn } from '@/lib/helper/utils';

export const TextAreaForm = <TFieldValues extends FieldValues>({
   formMethods,
   className,
   fieldName,
   required,
   errorMessage,
   placeholder
}: FormElementProps<TFieldValues>) => {
   const {
      register,
      formState: { errors }
   } = formMethods;

   return (
      <div className="flex flex-col">
         <Textarea
            {...register(fieldName as Path<TFieldValues>, {
               required: required ? errorMessage || 'This field is required' : false
            })}
            className={cn('bg-transparent border-tertiary py-1 px-2 resize-none h-20' ,className)}
            placeholder={placeholder}
         />
         {errors[fieldName] && (
            <span className="text-button-red text-sm mt-1">
               {errors[fieldName]?.message as string}
            </span>
         )}
      </div>
   );
};
