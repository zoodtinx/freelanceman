'use client';

import { useEffect, useRef, useState } from 'react';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { FormElementProps } from '@/lib/types/form-element.type';
import { Input } from '@/components/shared/ui/primitives/Input';
import { useUserQuery } from '@/lib/api/user-api';
import { Loader2 } from 'lucide-react';

type NumberInputFormProps<TFieldValues extends FieldValues> = Omit<
   React.InputHTMLAttributes<HTMLInputElement>,
   'type'
> &
   FormElementProps<TFieldValues>;

export const NumberInputForm = <TFieldValues extends FieldValues>({
   formMethods,
   className,
   fieldName,
   required,
   errorMessage,
   placeholder,
   onKeyDown,
}: NumberInputFormProps<TFieldValues>) => {
   const {
      control,
      formState: { errors },
   } = formMethods;

   return (
      <Controller
         name={fieldName as Path<TFieldValues>}
         control={control}
         rules={{
            required: required
               ? errorMessage || 'This field is required'
               : false,
            validate: (v) => !isNaN(Number(v)) || 'Invalid number',
         }}
         render={({ field }) => (
            <NumberInput
               value={field.value}
               onChange={field.onChange}
               placeholder={placeholder}
               className={className}
               onKeyDown={onKeyDown}
               showError={!!errors[fieldName]}
               errorMessage={errors[fieldName]?.message as string}
            />
         )}
      />
   );
};

interface NumberInputProps {
   value: string;
   onChange: (val: string) => void;
   placeholder?: string;
   className?: string;
   onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
   showError?: boolean;
   errorMessage?: string;
}

export const NumberInput = ({
   value,
   onChange,
   placeholder,
   className,
   onKeyDown,
   showError,
   errorMessage,
}: NumberInputProps) => {
   const [isEditing, setIsEditing] = useState(!value || parseFloat(value) === 0);
   const [display, setDisplay] = useState('');
   const containerRef = useRef<HTMLDivElement>(null);
   const { data: userData } = useUserQuery();

   useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
         if (
            containerRef.current &&
            !containerRef.current.contains(e.target as Node)
         ) {
            if (value) setIsEditing(false);
         }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
         document.removeEventListener('mousedown', handleClickOutside);
   }, [value]);

   useEffect(() => {
      if (value === '' || value === undefined) {
         setDisplay('');
         return;
      }
      const num = parseFloat(value);
      if (!isNaN(num)) {
         setDisplay(num.toLocaleString('en-US'));
      }
   }, [value]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/,/g, '');
      if (/^\d*\.?\d*$/.test(raw)) {
         const normalized = raw.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
         onChange(normalized);
      }
   };

   return (
      <div ref={containerRef} className="flex flex-col">
         {isEditing ? (
            <Input
               inputMode="decimal"
               className={className}
               onKeyDown={(e) => {
                  if (e.key === 'Enter') e.preventDefault();
                  if (onKeyDown) onKeyDown(e);
               }}
               onChange={handleChange}
               value={display}
               placeholder={placeholder}
               autoFocus
            />
         ) : (
            <div
               className="flex items-center gap-1"
               onClick={() => setIsEditing(true)}
            >
               <p className="cursor-text text-md font-medium">
                  {display || placeholder}
               </p>
               <p className="text-md text-secondary">
                  {!userData ? (
                     <Loader2 className="animate-spin w-3 h-3" />
                  ) : (
                     userData.currency
                  )}
               </p>
            </div>
         )}
         {showError && (
            <p className="text-red-500 font-normal animate-shake text-sm pt-1">
               {errorMessage}
            </p>
         )}
      </div>
   );
};
