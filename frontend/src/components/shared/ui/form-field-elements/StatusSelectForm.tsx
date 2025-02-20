import { Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import { StandardSelect } from 'src/components/shared/ui/select/PrebuiltSelect';
import { SelectInputProps } from '@/lib/types/form-input-props.types';
import { cn } from '@/lib/helper/utils';

const StatusSelect = <TFormData extends FieldValues>({
   formMethods,
   dialogState,
   selection,
   fieldName,
   placeholder, 
   className
}: SelectInputProps<TFormData>): JSX.Element => {
   const { control } = formMethods;

   if (dialogState?.mode === 'view') {
      const currentSelection = selection.find(
         (item) =>
            item.value === formMethods.getValues(fieldName as Path<TFormData>)
      );
      const text = currentSelection?.label || 'No status selected';
      const color = currentSelection?.color || '';

      console.log('currentSelection?.value', currentSelection?.value)

      return (
         <div
            className={`p-1 pl-3 pr-4 rounded-full flex items-center gap-1 w-fit ${getStatusColor(currentSelection?.value)}`}
         >
            
            <p className="font-semibold">{text}</p>
         </div>
      );
   }

   return (
      <Controller
         name={fieldName as Path<TFormData>}
         control={control}
         rules={{ required: 'Please select a status' }}
         render={({ field }) => {
            console.log('field value', field.value)
            console.log('selections', selection)
            
            const handleValueChange = (value) => {
               console.log('value', value)
               field.onChange(value)
            }

            return (
               <StandardSelect
                  onValueChange={handleValueChange}
                  selectContents={selection}
                  defaultValue={field.value}
                  className={cn('shadow-none border-none text-base font-medium', className)}
               />
            );
         }}
      />
   );
};

const getStatusColor = (status) => {
   switch (status) {
      case 'pending': return 'bg-status-active'
      case 'scheduled': return 'bg-status-active'
      case 'finished': return 'bg-status-completed'
      case 'completed': return 'bg-status-completed'
      case 'cancelled': return 'bg-constant-tertiary'
   }
}

export default StatusSelect;
