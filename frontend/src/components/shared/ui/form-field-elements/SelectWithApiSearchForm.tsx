import { Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import {
   SelectInputProps,
   SelectWithSearchInputProps,
} from '@/lib/types/form-input-props.types';
import { SelectWithApiSearch } from 'src/components/shared/ui/select/SelectWithApiSearch';

const SelectWithApiSearchForm = <TFormData extends FieldValues>({
   formMethods,
   dialogState,
   fieldName,
   placeholder,
   className,
   selection,
   isLoading,
   ApiSearchFn
}: SelectWithSearchInputProps<TFormData>): JSX.Element => {
   const { control, getValues } = formMethods;

   if (dialogState?.mode === 'view') {
      const currentSelection = selection.find(
         (item) =>
            item.value === formMethods.getValues(fieldName as Path<TFormData>)
      );
      const text = currentSelection?.text || 'No status selected';

      return <p className={className}>{text}</p>;
   }

   return (
      <Controller
         name={fieldName as Path<TFormData>}
         control={control}
         rules={{ required: 'Please select a status' }}
         render={({ field }) => {
            const handleStatusChange = (value: string) => {
               console.log('value', value)
               field.onChange(value);
            };

            return (
               <SelectWithApiSearch
                  onValueChange={handleStatusChange}
                  selectContents={selection}
                  value={field.value}
                  placeholder={placeholder}
                  className={className}
                  isLoading={isLoading}
                  onInputChange={ApiSearchFn}
               />
            );
         }}
      />
   );
};

export default SelectWithApiSearchForm;
