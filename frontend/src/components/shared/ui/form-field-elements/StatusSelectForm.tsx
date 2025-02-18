import { Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import { StandardSelect } from 'src/components/shared/ui/select/PrebuiltSelect';
import { SelectInputProps } from '@/lib/types/form-input-props.types';

const StatusSelect = <TFormData extends FieldValues>({
   formMethods,
   dialogState,
   selection,
   fieldName,
}: SelectInputProps<TFormData>): JSX.Element => {
   const { control } = formMethods;

   if (dialogState?.mode === 'view') {
      const currentSelection = selection.find(
         (item) =>
            item.value === formMethods.getValues(fieldName as Path<TFormData>)
      );
      const text = currentSelection?.text || 'No status selected';
      const color = currentSelection?.color || '';

      return (
         <div
            className={`p-1 pl-3 pr-4 rounded-full flex items-center gap-1 w-fit ${color}`}
         >
            <div className="aspect-square w-[8px] rounded-full bg-primary" />
            <p className="font-semibold">{text}</p>
         </div>
      );
   }

   return (
      <Controller
         name={fieldName as Path<TFormData>}
         control={control}
         defaultValue={'planned' as PathValue<TFormData, Path<TFormData>>}
         rules={{ required: 'Please select a status' }}
         render={({ field }) => {
            const handleStatusChange = (value: string) => {
               field.onChange(value);
            };

            const currentSelection = selection.find(
               (item) => item.value === field.value
            );

            const color = currentSelection?.color || '';

            return (
               <StandardSelect
                  onValueChange={handleStatusChange}
                  selectContents={selection}
                  value={field.value}
                  className={`p-1 pl-3 pr-4 rounded-full flex font-semibold items-center gap-1 w-fit ${color}`}
               />
            );
         }}
      />
   );
};

export default StatusSelect;
