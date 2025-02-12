import { useWatch } from 'react-hook-form';
import React from 'react';
import { Input } from '@/components/shared/ui/primitives/Input';
import { Plus, X } from 'lucide-react';
import { InputProps } from '@/lib/types/form-input-props.types';

const TextArrayInput = ({
   formMethods,
   fieldName,
}: InputProps<Contact>): JSX.Element => {
   const { getValues, setValue, register, watch } = formMethods;
   const arrayValue =
      useWatch({
         control: formMethods.control,
         name: fieldName,
      }) || [];

   console.log('arrayValue', arrayValue);

   const handleRemoveField = (index: number) => {
      const updatedArray = [...arrayValue];
      updatedArray.splice(index, 1);
      setValue(fieldName as string, updatedArray);
   };

   const handleAddField = () => {
      setValue(fieldName as string, [...arrayValue, '']);
   };

   const ArrayElement = () => {
      if (arrayValue.length > 1) {
         return (
            <>
               {arrayValue.map((value: string, index: number) => {
                  const inputFieldName = `${fieldName}.${index}` as const;
                  return (
                     <div key={index} className="flex items-center gap-1">
                        <Input
                           {...register(inputFieldName)}
                           defaultValue={value}
                           className="input w-full"
                           placeholder="Enter value"
                        />
                        <button
                           type="button"
                           onClick={() => handleRemoveField(index)}
                           className="rounded-full p-[0.7px] bg-red-600 text-white cursor-default aspect-square h-4 w-4 flex items-center justify-center"
                        >
                           <X className="w-3 h-3 stroke-2" />
                        </button>
                     </div>
                  );
               })}
            </>
         );
      } else {
         return (
            <div className="flex items-center gap-1">
               <Input
                  {...register(`${fieldName}.0` as const)}
                  defaultValue=""
                  className="input w-full"
                  placeholder="Enter value"
               />
            </div>
         );
      }
   };

   return (
      <div className="flex flex-col gap-2">
         <ArrayElement />
         <button
            type="button"
            onClick={handleAddField}
            className="flex rounded-md w-fit text-sm items-center gap-1 px-1 bg-primary text-foreground"
         >
            <Plus className="w-3 h-3" />
            Add more
         </button>
      </div>
   );
};

export default TextArrayInput