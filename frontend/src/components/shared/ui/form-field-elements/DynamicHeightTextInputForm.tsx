import { useEffect, useRef } from 'react';
import { cn } from '@/lib/helper/utils';
import { Pencil } from 'lucide-react';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { DynamicHeightTextInputFormElementProps } from '@/lib/types/form-element.type';

export const DynamicHeightTextInputForm = <TFieldValues extends FieldValues>({
   formMethods,
   className,
   fieldName,
   placeholder,
   required,
   errorMessage,
   isWithIcon = true
}: DynamicHeightTextInputFormElementProps<TFieldValues>): JSX.Element => {
   const {
      control,
      formState: { errors },
      // clearErrors,
      // watch,
   } = formMethods;

   return (
      <Controller
         name={fieldName as Path<TFieldValues>}
         control={control}
         rules={{
            required: required
               ? errorMessage || 'Please select a status'
               : false,
         }}
         render={({ field }) => {
            const handleValueChange = (value: string) => {
               // clearErrors(fieldName as Path<TFieldValues>);
               field.onChange(value);
            };

            return (
               <div className='w-full'>
                  <DynamicHeightTextInput
                     value={field.value || ''}
                     handleChanges={handleValueChange}
                     placeholder={placeholder}
                     isWithIcon={isWithIcon}
                     className={className}
                  />
                  {errors[fieldName] && (
                     <p className="text-red-500 font-normal animate-shake text-sm">
                        {errors[fieldName]?.message as string}
                     </p>
                  )}
               </div>
            );
         }}
      />
   );
};

interface DynamicHeightTextInputProps {
   className?: string;
   placeholder?: string;
   value: string;
   handleChanges: (value: string) => void;
   isWithIcon?:boolean
}

const DynamicHeightTextInput: React.FC<DynamicHeightTextInputProps> = ({
   className,
   placeholder = 'Title',
   value,
   handleChanges,
   isWithIcon = true
}) => {
   const inputRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      if (inputRef.current) {
         inputRef.current.textContent = value;

         const range = document.createRange();
         const selection = window.getSelection();

         range.selectNodeContents(inputRef.current);
         range.collapse(false);

         selection?.removeAllRanges();
         selection?.addRange(range);

         if (inputRef.current) {
            inputRef.current.blur();
         }
      }
   }, []);

   const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
      handleChanges(e.currentTarget.textContent as string);
   };

   return (
         <div className="w-full relative flex items-center">
            <div
               suppressContentEditableWarning
               className={cn(
                  'peer w-full rounded-md focus:outline-none break-words whitespace-pre-wrap text-lg font-medium pr-2 leading-tight',
                  className
               )}
               contentEditable
               role="textbox"
               data-placeholder={placeholder}
               onInput={handleInput}
               ref={inputRef}
            />
            {isWithIcon && <Pencil className="w-5 h-5 text-secondary" />}
         </div>
   );
};
