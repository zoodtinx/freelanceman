import { Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import { StandardSelect } from '@/components/shared/ui/PrebuiltSelect';
import { SelectInputProps } from '@/lib/types/form-input-props.types';

const SelectForm = <TFormData extends FieldValues>({
   formMethods,
   dialogState,
   selection,
   fieldName,
   placeholder,
   defaultValue,
   className
}: SelectInputProps<TFormData>): JSX.Element => {
   const { control, getValues } = formMethods;

   if (dialogState?.mode === 'view') {
      const currentSelection = selection.find(
         (item) =>
            item.value === formMethods.getValues(fieldName as Path<TFormData>)
      );
      const text = currentSelection?.text || 'No status selected';
      const color = currentSelection?.color || '';

      return (
            <p className={className}>{text}</p>
      );
   }


   return (
      <Controller
         name={fieldName as Path<TFormData>}
         control={control}
         defaultValue={defaultValue as PathValue<TFormData, Path<TFormData>>}
         rules={{ required: 'Please select a status' }}
         render={({ field }) => {
            const handleStatusChange = (value: string) => {
               field.onChange(value);
            };

            const currentSelection = selection.find(
               (item) => item.value === field.value
            );

            return (
               <StandardSelect
                  onValueChange={handleStatusChange}
                  selectContents={selection}
                  value={field.value}
                  placeholder={placeholder}
                  className={className}
               />
            );
         }}
      />
   );
};

export default SelectForm;
