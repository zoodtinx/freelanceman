import { Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import {
   Select,
   SelectContent,
   DialogueSelectItem,
   DialogueSelectTrigger,
   SelectValue,
} from '@/components/shared/ui/FilterSelect';
import { SelectInputProps } from '@/lib/types/form-input-props.types';

const StatusSelect = <TFormData extends FieldValues,>({
   formMethods,
   dialogState,
   selection,
   fieldName
}: SelectInputProps<TFormData>): JSX.Element => {
   if (!dialogState) {
      return <div></div>;
   }

   const { control } = formMethods;

   return (
      <Controller
         name={fieldName as Path<TFormData>}
         control={control}
         defaultValue={"planned" as PathValue<TFormData, Path<TFormData>>}
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
               <Select value={field.value} onValueChange={handleStatusChange}>
                  <DialogueSelectTrigger
                     mode="base"
                     className={`p-1 pl-3 pr-4 rounded-full flex items-center gap-1 w-fit ${color}`}
                  >
                     <div className="aspect-square w-[8px] rounded-full bg-primary" />
                     <p className="font-semibold">
                        <SelectValue />
                     </p>
                  </DialogueSelectTrigger>
                  <SelectContent className="flex flex-col gap-1">
                     {selection.map(({ value, text }) => (
                        <DialogueSelectItem key={value} value={value}>
                           {text}
                        </DialogueSelectItem>
                     ))}
                  </SelectContent>
               </Select>
            );
         }}
      />
   );
};

export default StatusSelect;
