import { useRef, useEffect, useState } from 'react';
import * as React from 'react';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { cn } from '@/lib/helper/utils';
import {
   Select,
   SelectContent,
   SelectTrigger,
   SelectValue,
} from '@/components/shared/ui/select/Select';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { SelectWithSearchFormElementProps } from '@/lib/types/form-element.type';
import { SelectItemContent } from '@/components/shared/ui/select/select.type';
import { ChevronDown, X } from 'lucide-react';
import { useSelectionQuery } from '@/lib/api/selection-api';
import { useSearchOption } from '@/components/shared/ui/form-field-elements/useSearchOption';
import useFormDialogStore from '@/lib/zustand/form-dialog-store';
import { defaultClientValue } from '@/components/shared/ui/helpers/constants/default-values';

export const SelectWithSearchForm = <TFieldValues extends FieldValues>({
   formMethods,
   className,
   fieldName,
   placeholder,
   isWithIcon,
   size,
   required,
   errorMessage,
   type,
   enableCancel = false,
}: SelectWithSearchFormElementProps<TFieldValues>): JSX.Element => {
   const {
      control,
      formState: { errors },
      clearErrors,
      watch,
      resetField,
   } = formMethods;

   const { searchTerm, handleSearch } = useSearchOption(type);

   const query = useSelectionQuery(type);

   const { data: selections, isLoading } = query(searchTerm);

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
            const handleSelect = (value: string) => {
               clearErrors(fieldName as Path<TFieldValues>);
               field.onChange(value);
            };

            const handleCancel = (e: React.MouseEvent) => {
               e.stopPropagation();
               resetField(fieldName as Path<TFieldValues>);
            };

            const value = watch(fieldName as Path<TFieldValues>);

            return (
               <div className="w-full">
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

const Select = ({
   value,
   onChange,
}: {
   value: string;
   onChange: (value: string) => void;
}) => {
   return (
      <Select value={value} onValueChange={onChange}>
         <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select currency" />
         </SelectTrigger>
         <SelectContent>
            
            <SelectItem value="THB">Thai Baht</SelectItem>
         </SelectContent>
      </Select>
   );
};
