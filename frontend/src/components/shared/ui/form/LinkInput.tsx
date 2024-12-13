import { FieldValues, Path } from 'react-hook-form';
import { InputProps } from './props.type';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { ActionFormData } from '@types';

const LinkInput = ({
   formMethods,
}: InputProps<ActionFormData>): JSX.Element => {
   const [isButtonMode, setIsButtonMode] = useState(false);
   const [url, setUrl] = useState('');
   const [error, setError] = useState('');

   const { register, setValue, getValues } = formMethods;

   useEffect(() => {
      const currentUrl = getValues('link');
      if (currentUrl) {
         const { error } = validateUrl(currentUrl);

         if (!error) {
            setUrl(currentUrl);
            setIsButtonMode(true);
         } else {
            setError(error);
            setIsButtonMode(false);
         }
      }
   }, [getValues]);

   const validateUrl = (inputValue: string) => {
      if (!inputValue.trim()) {
         return { error: 'URL cannot be empty.' };
      }

      try {
         new URL(inputValue);
         return { error: '' };
      } catch {
         return {
            error: 'Invalid URL. Please enter a valid link. (Or leave empty)',
         };
      }
   };

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
         setValue('link', inputValue);
         setError('');
         setIsButtonMode(true);
      }
   };

   const handleChange = () => {
      setError('');
      setIsButtonMode(false);
   };

   const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setIsButtonMode(false);
      setValue('link', '');
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
                  {...register?.('link' as Path<TFieldValues>, {
                     required: 'Please enter link',
                  })}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="flex px-2 h-6 w-full border border-secondary rounded-md bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="Enter your link"
               />
               {error && (
                  <p className="mt-1 text-sm text-red-500 animate-shake">
                     {error}
                  </p>
               )}
            </div>
         )}
      </div>
   );
};

export default LinkInput;
