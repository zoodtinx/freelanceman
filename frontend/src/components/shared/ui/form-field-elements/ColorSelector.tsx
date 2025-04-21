import { useState } from 'react';
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/shared/ui/primitives/Popover';
import { getColorName } from '@/components/shared/ui/helpers/Helpers';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { FormElementProps } from '@/lib/types/form-element.type';

export const ColorSelectorForm = <TFormData extends FieldValues>({
   formMethods,
   className,
   fieldName,
   required,
   errorMessage,
}: FormElementProps<TFormData>): JSX.Element => {
   const {
      control,
      formState: { errors },
   } = formMethods;

   return (
      <Controller
         name={fieldName as Path<TFormData>}
         control={control}
         rules={{
            required: required
               ? errorMessage || 'Please select a color'
               : false,
         }}
         render={({ field }) => {
            const handleValueChange = (value: string) => {
               field.onChange(value);
            };

            return (
               <div className={className}>
                  <ColorSelectorPopover
                     value={field.value}
                     onChange={handleValueChange}
                  />
                  {errors[fieldName] && (
                     <p className="text-red-500 text-sm mt-1 animate-shake">
                        {errors[fieldName]?.message as string}
                     </p>
                  )}
               </div>
            );
         }}
      />
   );
};

export const ColorSelectorPopover = ({
   value,
   onChange,
}: {
   value: string;
   onChange: (val: string) => void;
}) => {
   const [isOpen, setIsOpen] = useState(false);

   const handleSelectColor = (selectedColor: string) => {
      onChange(selectedColor);
      setIsOpen(false);
   };

   const ThemeColorLabel = () => {
      const colorName = getColorName(value);
      return (
         <p
            className={`p-1 px-2 w-full rounded-full border border-transparent text-center select-none cursor-default bg-theme-${value}`}
         >
            {colorName}
         </p>
      );
   };

   const ThemeColorInput = () => {
      return (
         <p className="p-1 px-2 w-full text-secondary border rounded-full text-center select-none cursor-default">
            Select a color
         </p>
      );
   };

   return (
      <Popover open={isOpen}>
         <PopoverTrigger asChild>
            <button
               onClick={() => setIsOpen(!isOpen)}
               className="focus:outline-none w-full"
            >
               {value ? <ThemeColorLabel /> : <ThemeColorInput />}
            </button>
         </PopoverTrigger>
         <PopoverContent className="bg-foreground border-tertiary grid grid-cols-7 gap-2 rounded-xl p-2 cursor-default select-none">
            <ThemeColorGroup setColor={handleSelectColor} />
         </PopoverContent>
      </Popover>
   );
};

const ThemeColorGroup = ({ setColor }) => {
   const colors = [
      'red',
      'orange',
      'peach',
      'yellow',
      'beige',
      'coral',
      'maroon',
      'bronze',
      'olive',
      'green',
      'mint',
      'turquoise',
      'teal',
      'blue',
      'purple',
      'lavender',
      'lilac',
      'magenta',
      'pink',
      'taupe',
      'zinc',
   ];

   const colorSelections = colors.map((color) => {
      return (
         <div
            key={color}
            onClick={() => setColor(color)}
            className={`w-6 h-6 rounded-full bg-theme-${color}
            border border-transparent hover:border-primary transition-colors duration-75`}
         />
      );
   });

   return <>{colorSelections}</>;
};
