import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/helper/utils';
import { Plus, X } from 'lucide-react';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { FormElementProps } from '@/lib/types/form-element.type';

export const TagsInputForm = <TFieldValues extends FieldValues>({
   formMethods,
   className,
   fieldName,
   required,
   errorMessage,
   placeholder
}: FormElementProps<TFieldValues>) => {
   const {
      control,
      formState: { errors },
      getValues
   } = formMethods;

   let color
   let client: any = getValues('client' as any)
   if (client) {
      color = `theme-${client.themeColor}`
   } else {
      color = 'quaternary'
   }

   return (
      <Controller
         name={fieldName as Path<TFieldValues>}
         control={control}
         rules={{
            required: required
               ? errorMessage || 'This field is required'
               : false,
         }}
         render={({ field }) => (
            <TagsInput
               value={field.value || []}
               onChange={field.onChange}
               error={errors[fieldName]?.message as string}
               placeholder={placeholder}
               className={className}
               color={color}
            />
         )}
      />
   );
};

type TagsInputFormProps = {
   value: string[];
   onChange: (value: string[]) => void;
   error?: string;
   placeholder?: string;
   className?: string;
   color: string
};

export const TagsInput = ({
   value,
   onChange,
   error,
   placeholder,
   className,
   color
}: TagsInputFormProps) => {
   const inputRef = useRef<HTMLInputElement>(null);
   const tags = value || [];
   const [isAdding, setIsAdding] = useState(false);
   const [input, setInput] = useState('');

   console.log('color', color)

   useEffect(() => {
      if (!isAdding) return;

      const handleClickOutside = (e: MouseEvent) => {
         if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
            if (input.trim()) {
               addTag();
            } else {
               setIsAdding(false);
            }
            setInput('');
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, [isAdding, input, tags]);

   const addTag = () => {
      const trimmed = input.trim();
      if (!trimmed || tags.includes(trimmed)) return;
      onChange([...tags, trimmed]);
      setInput('');
      setIsAdding(false);
   };

   const removeTag = (tag: string) => {
      onChange(tags.filter((t) => t !== tag));
   };

   const exitInputMode = () => {
      setInput('');
      setIsAdding(false);
   };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         e.preventDefault();
         addTag();
      } else if (e.key === 'Escape') {
         e.preventDefault();
         e.stopPropagation();
         exitInputMode();
      }
   };

   return (
      <div className={cn('flex flex-wrap gap-1', className)}>
         {tags.map((tag) => (
            <div
               key={tag}
               className={`flex items-center bg-${color} text-primary px-3 py-[2px]  rounded-full text-base gap-1`}
            >
               {tag}
               <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-button-red hover:opacity-100 text-black opacity-20"
               >
                  <X className='w-4 h-4' />
               </button>
            </div>
         ))}

         {isAdding ? (
            <input
               ref={inputRef}
               type="text"
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={handleKeyDown}
               autoFocus
               className="px-3 py-1 rounded-full border border-primary bg-background text-sm w-28 focus:outline-none"
               placeholder={placeholder}
            />
         ) : (
            <button
               type="button"
               onClick={() => setIsAdding(true)}
               className={`flex items-center text-secondary border border-secondary pr-3 pl-2 py-[2px]  rounded-full text-base gap-1`}
            >
               <Plus className='w-4 h-4' />
               Add
            </button>
         )}

         {error && (
            <div className="text-button-red text-sm w-full mt-1">{error}</div>
         )}
      </div>
   );
};
