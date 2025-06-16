import { forwardRef, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { FormElementProps } from '@/lib/types/form-element.type';
import { validateUrl } from '@/components/shared/ui/helpers/Helpers';
import { cn } from '@/lib/helper/utils';

export const LinkInputForm = <TFieldValues extends FieldValues>({
   formMethods,
   className,
   fieldName,
   placeholder,
   required,
   errorMessage,
}: FormElementProps<TFieldValues>): JSX.Element => {
   const {
      control,
      formState: { errors },
      watch,
      setError,
      clearErrors
   } = formMethods;

   return (
      <Controller
         name={fieldName as Path<TFieldValues>}
         control={control}
         rules={{
            required: required ? errorMessage || 'Please enter a link' : false,
         }}
         render={({ field }) => {
            const handleValueChange = (value: string) => {
               const isValidUrl = validateUrl(value)
               if (!isValidUrl) {
                  setError(fieldName as any, {type:'validate', message: 'Invalid URL format'})
                  return
               } else {
                  clearErrors(fieldName as any)
               }
               field.onChange(value);
            };

            const handleDiscardValue = () => {
               field.onChange('');
            };

            const value = watch(fieldName as Path<TFieldValues>);

            return (
               <div className={cn('flex flex-col', className)}>
                  <LinkInput
                     value={value}
                     placeholder={placeholder}
                     handleValueChange={handleValueChange}
                     handleDiscardValue={handleDiscardValue}
                     className="grow"
                     setError={setError}
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

interface LinkInputProps {
   value: string;
   handleValueChange: (value: string) => void;
   handleDiscardValue: () => void;
   placeholder?: string;
   className?: string;
   setError: any;
}

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> &
   LinkInputProps;

const LinkInput = forwardRef<HTMLInputElement, TextInputProps>(
   (
      {
         value,
         handleValueChange,
         className,
         placeholder = 'Add a link',
         onKeyDown,
      },
   ) => {
      const [isButtonMode, setIsButtonMode] = useState(false);
      const [url, setUrl] = useState('');

      const linkInputRef = useRef<HTMLInputElement | null>(null);

      const handleEnter = () => {
         if (linkInputRef.current) linkInputRef.current.blur();
      };

      useEffect(() => {
         if (value) {
            const { error } = validateUrl(value);

            if (!error) {
               setUrl(value);
               setIsButtonMode(true);
            } else {
               setIsButtonMode(false);
            }
         }
      }, [value]);

      const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
         const inputValue = e.target.value.trim();

         if (inputValue) {
            const { error } = validateUrl(inputValue);

            if (error) {
               setIsButtonMode(false);
               return;
            }

            setUrl(inputValue);
            handleValueChange(inputValue);
            setIsButtonMode(true);
         }
      };

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         const inputValue = e.target.value;
         setIsButtonMode(false);
         handleValueChange(inputValue);
      };

      const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
         e.stopPropagation();
         setIsButtonMode(false);
         handleValueChange('');
      };

      return (
         <div className={cn('flex flex-col', className)}>
            {isButtonMode ? (
               <div className="flex justify-between items-center gap-2 px-2 py-1 font-medium text-blue-600 bg-blue-100 rounded-md">
                  <Link
                     to={url}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="grow truncate"
                  >
                     <span className="truncate">{url}</span>
                  </Link>
                  <button
                     type="button"
                     onClick={handleReset}
                     className="text-gray-500 shrink-0"
                     aria-label="Reset"
                  >
                     <X className="w-4 h-auto" />
                  </button>
               </div>
            ) : (
               <input
                  ref={linkInputRef}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="flex grow rounded-md py-1 px-2 border border-tertiary transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-transparent"
                  placeholder={placeholder}
                  onKeyDown={(e) => {
                     if (e.key === 'Enter') {
                        e.preventDefault();
                        handleEnter();
                     }
                     if (onKeyDown) onKeyDown(e);
                  }}
               />
            )}
         </div>
      );
   }
);
