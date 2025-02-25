import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../primitives/Popover';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { parseISO, setHours, setMinutes } from 'date-fns';
import { FormElementProps } from '@/lib/types/form-element.type';

export const TimePickerForm = <TFieldValues extends FieldValues>({
   formMethods,
   fieldName,
}: FormElementProps<TFieldValues>): JSX.Element | null => {
   const { control, watch } = formMethods;

   return (
      <Controller
         name={fieldName as Path<TFieldValues>}
         control={control}
         render={({ field }) => {
            const handleChange = (value: string) => {
               field.onChange(value);
            };

            const value = watch(fieldName as Path<TFieldValues>);

            return (
               <TimePicker value={value || null} handleChange={handleChange} />
            );
         }}
      />
   );
};

interface TimePickerProps {
   value: string | null;
   handleChange: (value: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ value, handleChange }) => {
   const
   const isWithTime = value && value.includes('T');

   const hours = Array.from({ length: 12 }, (_, i) =>
      String(i + 1).padStart(2, '0')
   );
   const minutes = Array.from({ length: 60 }, (_, i) =>
      String(i).padStart(2, '0')
   );

   const [selectedHour, setSelectedHour] = useState('08');
   const [selectedMinute, setSelectedMinute] = useState('00');
   const [selectedPeriod, setSelectedPeriod] = useState('AM');
   const [isPopoverOpen, setIsPopoverOpen] = useState(false);

   const togglePeriod = () => {
      setSelectedPeriod((prev) => (prev === 'AM' ? 'PM' : 'AM'));
   };

   const handleAddTime = () => {
      if (!value) return;

      const currentDate = parseISO(value);
      const updatedDate = setMinutes(setHours(currentDate, 8), 0);
      handleChange(updatedDate.toISOString());
      setSelectedHour('08');
      setSelectedMinute('00');
      setSelectedPeriod('AM');
      setIsPopoverOpen(true);
   };

   const clearTimeSelection = () => {
      setSelectedHour('08');
      setSelectedMinute('00');
      setSelectedPeriod('AM');
      if (value) {
         handleChange(value.split('T')[0]);
      }
      setIsPopoverOpen(false);
   };

   const triggerText = () => {
      if (isWithTime) {
         return (
            <div className="flex items-center gap-2 cursor-pointer">
               <p className="text-primary">
                  {`${selectedHour}:${selectedMinute} ${selectedPeriod}`}
               </p>
               <button
                  className="text-red-500 hover:text-red-600 text-sm"
                  onClick={(e) => {
                     e.stopPropagation();
                     clearTimeSelection();
                  }}
               >
                  ✕
               </button>
            </div>
         );
      } else {
         return (
            <p
               className="text-secondary cursor-pointer hover:text-primary"
               onClick={(e) => {
                  e.stopPropagation();
                  handleAddTime();
               }}
            >
               Add time
            </p>
         );
      }
   };
   
   if (!isWithTime) {
      return null
   }

   if (!value) {
      return <p>Add time</p>;
   }


   return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
         <PopoverTrigger asChild>
            <div
               className="text-secondary"
               onClick={() => setIsPopoverOpen(true)}
            >
               {triggerText()}
            </div>
         </PopoverTrigger>
         {value && (
            <PopoverContent className="w-[150px] p-2 flex bg-foreground rounded-xl">
               <div className="flex gap-1 w-full">
                  <div className="w-1/2">
                     <label className="block text-sm text-secondary font-medium mb-1 text-center">
                        Hours
                     </label>
                     <select
                        className="w-full border border-tertiary rounded-md p-1 appearance-none text-md text-center"
                        value={selectedHour}
                        onChange={(e) => setSelectedHour(e.target.value)}
                     >
                        {hours.map((hour) => (
                           <option key={hour} value={hour}>
                              {hour}
                           </option>
                        ))}
                     </select>
                  </div>

                  <div className="w-1/2">
                     <label className="block text-sm text-secondary mb-1 text-center">
                        Minutes
                     </label>
                     <select
                        className="w-full border border-tertiary rounded-md p-1 appearance-none text-md text-center"
                        value={selectedMinute}
                        onChange={(e) => setSelectedMinute(e.target.value)}
                     >
                        {minutes.map((minute) => (
                           <option key={minute} value={minute}>
                              {minute}
                           </option>
                        ))}
                     </select>
                  </div>
               </div>
               <button
                  className="px-4 py-1 bg-tertiary rounded-md"
                  onClick={() => togglePeriod()}
               >
                  {selectedPeriod}
               </button>
            </PopoverContent>
         )}
      </Popover>
   );
};
