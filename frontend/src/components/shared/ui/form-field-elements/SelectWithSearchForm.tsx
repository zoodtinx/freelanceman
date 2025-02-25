import { useRef, useEffect, useState } from 'react';
import * as React from 'react';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import { cn } from '@/lib/helper/utils';
import {
   Select,
   SelectContent,
   SelectTrigger,
} from '@/components/shared/ui/select/Select';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { SelectWithSearchFormElementProps } from '@/lib/types/form-element.type';
import { SelectItemContent } from '@/components/shared/ui/select/select.type';
import { ChevronDown } from 'lucide-react';
import { useSelectionQuery } from '@/lib/api/selection-api';
import { useSearchOption } from '@/components/shared/ui/form-field-elements/useSearchOption';

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
}: SelectWithSearchFormElementProps<TFieldValues>): JSX.Element => {
   const {
      control,
      formState: { errors },
      clearErrors,
      watch,
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

            const value = watch(fieldName as Path<TFieldValues>);

            return (
               <div className={className}>
                  <SelectWithSearch
                     value={value}
                     handleSelect={handleSelect}
                     isLoading={isLoading}
                     selections={selections}
                     className={className}
                     isWithIcon={isWithIcon}
                     placeholder={placeholder}
                     handleSearch={handleSearch}
                     size={size}
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

type SelectWithSearchProps = Pick<
   SelectWithSearchFormElementProps<FieldValues>,
   'isWithIcon' | 'size' | 'placeholder' | 'className'
> & {
   handleSelect: (value: string, onChange?: (value: string) => void) => void;
   value?: string;
   selections: SelectItemContent[];
   isLoading: boolean;
   handleSearch: (value: string) => void;
};

const SelectWithSearch: React.FC<SelectWithSearchProps> = ({
   selections,
   isLoading,
   handleSelect,
   handleSearch,
   value,
   className,
   placeholder,
   isWithIcon = true,
   size,
}) => {
   const [isOpen, setIsOpen] = useState(false);
   const [selectedValue, setSelectedValue] = useState<SelectItemContent>({
      value: '',
      label: '',
   });

   const selectRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (value) {
         const selectedValueContent = selections?.find((selection) =>  selection.value === value)
         setSelectedValue(selectedValueContent as SelectItemContent || {
            value: '',
            label: '',
         })
      }
   },[selections, value])

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            selectRef.current &&
            !selectRef.current.contains(event.target as Node)
         ) {
            handleClose();
         }
      };

      const handleEscapeKey = (event: KeyboardEvent) => {
         if (event.key === 'Escape') {
            handleClose();
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
         document.removeEventListener('keydown', handleEscapeKey);
      };
   }, []);

   const handleValueChange = (value: string) => {
      const selected = selections.find(
         (selection) => selection.value === value
      );
      if (selected) {
         setSelectedValue(selected);
         handleSelect(value);
      }
   };

   const handleClose = () => {
      setIsOpen(false);
   };

   const handleInputChange = (e) => {
      handleSearch(e.target.value);
   };

   const handleOpen = () => {
      setIsOpen(true);
   };

   return (
      <Select value={value} open={isOpen}>
         <SelectTrigger
            className={cn(
               className,
               'flex justify-between items-center cursor-pointer font-medium'
            )}
            onClick={handleOpen}
         >
            <p className="truncate text-base font-normal">
               {selectedValue.label ? selectedValue.label : placeholder}
            </p>
            {isWithIcon && <ChevronDown className="ml-1 h-4 w-4" />}
         </SelectTrigger>
         <SelectContent
            className="bg-foreground rounded-xl p-1 overflow-hidden text-sm font-normal w-[300px] shadow-sm"
            ref={selectRef}
         >
            <div className="w-full max-h-[250px] bg-foreground rounded-md border-0 flex flex-col">
               <SearchBox
                  onChange={handleInputChange}
                  className="w-full mb-2 bg-background rounded-md"
                  placeholder="Search..."
               />
               <SelectionList
                  selections={selections}
                  isLoading={isLoading}
                  handleSelect={handleValueChange}
                  handleClose={handleClose}
               />
            </div>
         </SelectContent>
      </Select>
   );
};

type SelectionListProps = Pick<
   SelectWithSearchProps,
   'selections' | 'isLoading' | 'handleSelect'
> & {
   handleClose: () => void;
};

const SelectionList: React.FC<SelectionListProps> = ({
   handleSelect,
   isLoading,
   selections,
   handleClose,
}) => {
   return (
      <div className="max-h-[250px] pr-2 overflow-y-auto overflow-x-hidden">
         {isLoading ? (
            <div className="text-gray-500 text-sm px-2 py-2">Loading...</div>
         ) : selections?.length > 0 ? (
            selections.map((selection) => (
               <div
                  key={selection.value}
                  className="p-1 px-2 rounded cursor-pointer hover:bg-background"
                  onClick={() => {
                     handleSelect(selection.value);
                     handleClose();
                  }}
               >
                  <p className="w-full pr-5 line-clamp-2">{selection.label}</p>
               </div>
            ))
         ) : (
            <div className="text-gray-500 text-sm px-2 py-2">
               No results found
            </div>
         )}
      </div>
   );
};
