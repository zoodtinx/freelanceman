import React, { useEffect, useRef, useState } from 'react';
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { cn } from '@/lib/helper/utils';
import { Textarea } from '@/components/shared/ui/primitives/Textarea';
import { Pencil } from 'lucide-react';

interface HeadlineTextInputFormProps<TFieldValues extends FieldValues> {
   formMethods: UseFormReturn<TFieldValues>;
   className?: string;
   fieldName: string;
   placeholder?: string;
   required?: boolean;
   errorMessage?: string;
   isWithIcon?: boolean;
}

export const HeadlineTextInputForm = <TFieldValues extends FieldValues>({
   formMethods,
   className,
   fieldName,
   placeholder,
   required,
   errorMessage,
   isWithIcon = true,
}: HeadlineTextInputFormProps<TFieldValues>): JSX.Element => {
   const {
      control,
      formState: { errors },
      clearErrors,
      watch,
   } = formMethods;

   return (
      <Controller
         name={fieldName as Path<TFieldValues>}
         control={control}
         rules={{
            required: required
               ? errorMessage || 'This field is required'
               : false,
         }}
         render={({ field }) => {
            const handleChange = (
               e: React.ChangeEvent<HTMLTextAreaElement>
            ) => {
               clearErrors(fieldName as Path<TFieldValues>);
               field.onChange(e);
            };

            const value = watch(fieldName as Path<TFieldValues>);

            return (
               <div className="w-full">
                  <HeadlineTextInput
                     value={value as string}
                     onChange={handleChange}
                     placeholder={placeholder}
                     className={className}
                     isWithIcon={isWithIcon}
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

interface HeadlineTextInputProps {
   className?: string;
   placeholder?: string;
   value: string;
   onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
   isWithIcon?: boolean;
}

const HeadlineTextInput: React.FC<HeadlineTextInputProps> = ({
   className,
   placeholder = 'Headline',
   value,
   onChange,
   isWithIcon = true,
}) => {
   const [isEditing, setIsEditing] = useState(value === '');
   const wrapperRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (!isEditing && value === '') {
         setIsEditing(true);
      }
   }, [value, isEditing]);

   return (
      <div
         ref={wrapperRef}
         className={cn('w-full relative flex items-center text-', className)}
      >
         {isEditing ? (
            <Textarea
               rows={2}
               className={cn(
                  'w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500',
                  'text-lg font-medium p-1 px-2 leading-snug placeholder:text-secondary',
                  'bg-transparent border-tertiary mt-1 rounded-[9px] placeholder:font-normal'
               )}
               placeholder={placeholder}
               value={value}
               onChange={onChange}
               autoFocus
               onFocus={(e) => {
                  const val = e.currentTarget.value;
                  e.currentTarget.selectionStart = val.length;
                  e.currentTarget.selectionEnd = val.length;
               }}
            />
         ) : (
            <div className="flex gap-1 relative group w-full items-center">
               <p
                  className="grow text-lg font-medium cursor-text focus:outline-none focus:ring-0 focus:shadow-none"
                  onClick={() => setIsEditing(true)}
                  tabIndex={0}
                  role="textbox"
                  aria-label={placeholder}
               >
                  {value || placeholder}
               </p>
               {isWithIcon && (
                  <div className="transition-opacity opacity-100 group-hover:opacity-100">
                     <Pencil className="shrink-0 w-[14px] h-auto text-secondary" />
                  </div>
               )}
            </div>
         )}
      </div>
   );
};

export default HeadlineTextInputForm;
