import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { FormElementProps } from '@/lib/types/form-element.type';
import { validateUrl } from '@/components/shared/ui/helpers/Helpers';

const LinkInputForm = <TFieldValues extends FieldValues>({
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
      clearErrors,
      watch,
   } = formMethods;

   return (
      <Controller
         name={fieldName as Path<TFieldValues>}
         control={control}
         rules={{
            required: required
               ? errorMessage || 'Please enter a link'
               : false,
         }}
         render={({ field }) => {
            const handleValueChange = (value: string) => {
               clearErrors(fieldName as Path<TFieldValues>);
               field.onChange(value);
            };

            const handleDiscardValue = () => {
               field.onChange('');
            }

            const value = watch(fieldName as Path<TFieldValues>);

            return (
               <div className={className}>
                  <LinkInput
                     value={value}
                     placeholder={placeholder}
                     handleValueChange={handleValueChange}
                     handleDiscardValue={handleDiscardValue}
                  />
                  {errors[fieldName] && (
                     <p className="mt-1 text-red-500 font-normal animate-shake pt-1 text-sm">
                        {errors[fieldName]?.message as string}
                     </p>
                  )}
               </div>
            );
         }}
      />
   );
};

export default LinkInputForm

interface LinkInputProps {
   value: string;
   handleValueChange: (value: string) => void;
   handleDiscardValue: () => void;
   placeholder?: string 
}

const LinkInput:React.FC<LinkInputProps> = ({
   value,
   handleValueChange,
   handleDiscardValue,
   placeholder = 'Add a link'
}) => {
   const [isButtonMode, setIsButtonMode] = useState(false);
   const [url, setUrl] = useState('');
   const [error, setError] = useState('');

   useEffect(() => {
      if (value) {
         const { error } = validateUrl(value);

         if (!error) {
            setUrl(value);
            setIsButtonMode(true);
         } else {
            setError(error);
            setIsButtonMode(false);
         }
      }
   }, [value]);

   const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const inputValue = e.target.value.trim();
      if (inputValue) {
         const { error } = validateUrl(inputValue);

         if (error) {
            setError(error);
            setIsButtonMode(false);
            return;
         }

         setUrl(inputValue);
         handleValueChange(inputValue)
         setError('');
         setIsButtonMode(true);
      }
   };

   const handleChange = (e) => {
      setError('');
      setIsButtonMode(false);
   };

   const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setIsButtonMode(false);
      handleValueChange('')
      setError('');
   };

   return (
      <div>
         {isButtonMode ? (
            <div className="flex justify-between items-center gap-2 px-2 py-1 font-medium text-blue-600 bg-blue-100 rounded-md">
               <Link
                  to={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grow"
               >
                  <span className="truncate">{url}</span>
               </Link>
               <button
                  type="button"
                  onClick={handleReset}
                  className="text-gray-500"
                  aria-label="Reset"
               >
                  <X className="w-4 h-auto" />
               </button>
            </div>
         ) : (
            <div>
               <input
                  type="url"
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e)}
                  className="flex px-2 h-6 w-full border border-secondary rounded-md bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder={placeholder}
               />
            </div>
            
         )}
         {error && (
            <p className="mt-1 text-red-500 font-normal animate-shake text-sm">
               {error}
            </p>
         )}
      </div>
   );
};


