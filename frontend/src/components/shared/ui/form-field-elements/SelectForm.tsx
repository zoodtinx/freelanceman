import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/shared/ui/select/Select';
import { Controller, FieldValues, Path } from 'react-hook-form';
import {
   SelectFormElementProps
} from '@/lib/types/form-element.type';

export const SelectForm = <TFieldValues extends FieldValues>({
   formMethods,
   fieldName,
   required,
   errorMessage,
   selection,
}: SelectFormElementProps<TFieldValues>): JSX.Element => {
   const {
      control,
      formState: { errors },
      clearErrors,
      watch,
   } = formMethods;

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
               <div className="w-fit">
                  <SelectElement
                     selections={selection}
                     value={value}
                     onValueChange={handleSelect}
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

export const SelectElement = ({
   value,
   onValueChange,
   selections,
}: {
   value: any;
   onValueChange: (value: any) => void;
   selections: {
      label: string;
      value: string;
   }[];
}) => {
   return (
      <Select value={value} onValueChange={onValueChange}>
         <SelectTrigger className="w-fit" isWithIcon={true}>
            <p className='font-medium'><SelectValue placeholder="Select currency" /></p>
         </SelectTrigger>
         <SelectContent className='h-[300px] w-[270px]'>
            {selections.map((selection, i) => (
               <SelectItem value={selection.value} className='truncate' key={i}>
                  {selection.label}
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   );
};
