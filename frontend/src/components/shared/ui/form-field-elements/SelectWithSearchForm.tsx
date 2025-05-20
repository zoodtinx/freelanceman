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
               <div>
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
                     type={type}
                     cancel={{
                        enable: enableCancel,
                        handleCancel: handleCancel,
                     }}
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

type SelectWithSearchProps = Pick<
   SelectWithSearchFormElementProps<FieldValues>,
   'isWithIcon' | 'size' | 'placeholder' | 'className'
> & {
   handleSelect: (value: string, onChange?: (value: string) => void) => void;
   value?: string;
   selections: SelectItemContent[] | undefined;
   isLoading: boolean;
   handleSearch: (value: string) => void;
   type: 'client' | 'project';
   optionalTriggerUi?: React.ReactNode;
   cancel?: {
      enable: boolean;
      handleCancel: (e: React.MouseEvent) => void;
   };
};

export const SelectWithSearch: React.FC<SelectWithSearchProps> = ({
   selections,
   isLoading,
   handleSelect,
   handleSearch,
   value,
   className,
   placeholder,
   size,
   isWithIcon = true,
   optionalTriggerUi,
   cancel,
   type
}) => {
   const setFormDialogState = useFormDialogStore(
      (state) => state.setFormDialogState
   );
   const [isOpen, setIsOpen] = useState(false);
   const [selectedValue, setSelectedValue] = useState<SelectItemContent>({
      value: '',
      label: '',
   });

   const selectRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      if (value) {
         const selectedValueContent = selections?.find(
            (selection) => selection.value === value
         );
         setSelectedValue(
            (selectedValueContent as SelectItemContent) || {
               value: '',
               label: '',
            }
         );
      } else {
         setSelectedValue({
            value: '',
            label: '',
         });
      }
   }, [selections, value]);

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
      const selected = selections?.find(
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

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleSearch(e.target.value);
   };

   const handleOpen = () => {
      setIsOpen(true);
   };

   const handleAddSelection = () => {
      if (type === 'client') {
         setFormDialogState({
            entity: 'client',
            isOpen: true,
            data: {...defaultClientValue},
            mode: 'create',
            type: 'new-client',
            openedOn: 'global-add-button'
         })
      }
   }

   return (
      <Select value={value} open={isOpen}>
         <SelectTrigger
            className={cn(
               'flex justify-between items-center cursor-pointer font-medium text-base gap-1 group',
               size === 'lg' && 'text-md',
               className
            )}
            onClick={handleOpen}
         >
            {value && cancel?.enable && (
               <X
                  onClick={cancel.handleCancel}
                  className={cn(
                     'border border-secondary text-secondary h-4 w-4 box-contents rounded-md opacity-100',
                     'hover:border-button-red hover:text-button-red'
                  )}
               />
            )}
            {optionalTriggerUi ? (
               optionalTriggerUi
            ) : (
               <p className="truncate font-normal">
                  {selectedValue.label ? selectedValue.label : placeholder}
               </p>
            )}
            {isWithIcon && !value && <ChevronDown className="h-4 w-4" />}
         </SelectTrigger>
         <SelectContent
            className="bg-foreground overflow-hidden text-sm font-normal w-[300px] shadow-sm"
            ref={selectRef}
         >
            <div className="w-full max-h-[250px] bg-foreground rounded-md border-0 flex flex-col gap-1">
               <SearchBox
                  onChange={handleInputChange}
                  className="w-full bg-background rounded-md"
                  placeholder="Search..."
               />
               <SelectionList
                  selections={selections}
                  isLoading={isLoading}
                  handleSelect={handleValueChange}
                  handleClose={handleClose}
               />
               <div
                  onClick={handleAddSelection}
                  className="text-center w-full py-1 bg-constant text-secondary hover:text-primary transition-colors cursor-pointer"
               >
                  + Create a client
               </div>
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
   selections = [],
   handleClose,
}) => {
   return (
      <div className="max-h-[250px] overflow-y-auto overflow-x-hidden">
         {isLoading ? (
            <div className="text-gray-500 text-sm">Loading...</div>
         ) : selections.length > 0 ? (
            selections.map((selection) => (
               <div
                  key={selection.value}
                  className="py-1 px-2 rounded-md cursor-pointer hover:bg-background"
                  onClick={() => {
                     handleSelect(selection.value);
                     handleClose();
                  }}
               >
                  <p className="w-full pr-5 line-clamp-2 text-base">
                     {selection.label}
                  </p>
               </div>
            ))
         ) : (
            <div className="py-1 px-2 rounded-md cursor-pointer hover:bg-background text-secondary">
               No result found
            </div>
         )}
      </div>
   );
};
