'use client';

import { useEffect, useRef, useState } from 'react';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { FormElementProps } from '@/lib/types/form-element.type';
import { Input } from '@/components/shared/ui/primitives/Input';
import { useUserQuery } from '@/lib/api/user-api';
import { Loader2 } from 'lucide-react';

type NumberInputFormProps<TFieldValues extends FieldValues> = {
   mode?: 'budget' | 'plain';
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> &
   FormElementProps<TFieldValues>;

export const NumberInputForm = <TFieldValues extends FieldValues>({
   formMethods,
   className,
   fieldName,
   required,
   errorMessage,
   placeholder,
   onKeyDown,
   mode = 'budget',
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
            <>
               <NumberInput
                  mode={mode}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={placeholder}
                  className={className}
                  onKeyDown={onKeyDown}
               />
               {errors[fieldName] && (
                  <p className="text-red-500 text-sm animate-shake">
                     {errors[fieldName]?.message as string}
                  </p>
               )}
            </>
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
   mode?: 'budget' | 'plain';
}

export const NumberInput = ({
   value,
   onChange,
   placeholder,
   className,
   onKeyDown,
   mode,
}: NumberInputProps) => {
   const [isEditing, setIsEditing] = useState(
      !value || parseFloat(value) === 0
   );
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
         {isEditing || mode === 'plain' ? (
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
               autoFocus={mode !== 'plain'}
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
      </div>
   );
};
