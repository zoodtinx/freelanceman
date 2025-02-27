import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { InputProps } from '@/lib/types/form-input-props.types';
import { parseISO, setHours, setMinutes } from 'date-fns';

interface TimePickerProps {
   value: string | null;
   onChange: (value: string) => void;
   setValue: (field: string, value: boolean) => void;
   watch: () => void;
}

const TimePickerInterface: React.FC<TimePickerProps> = ({
   value,
   onChange,
   setValue,
   watch,
}) => {
   const isWithTime = watch('withTime'); // Check if time is enabled
   const isDateSelected = watch('dueDate'); // Check if date is selected

   const hours = Array.from({ length: 12 }, (_, i) =>
      String(i + 1).padStart(2, '0')
   );
   const minutes = Array.from({ length: 12 }, (_, i) =>
      String(i * 5).padStart(2, '0')
    );
    

   const [selectedHour, setSelectedHour] = useState('08');
   const [selectedMinute, setSelectedMinute] = useState('00');
   const [selectedPeriod, setSelectedPeriod] = useState('AM');
   const [isPopoverOpen, setIsPopoverOpen] = useState(false);
   const [isInitialMount, setIsInitialMount] = useState(true); // Track if it's the first render

   const updateDueDate = () => {
      if (!value) return;

      const currentDate = parseISO(value);
      let hoursIn24Format = parseInt(selectedHour, 10);

      if (selectedPeriod === 'PM' && hoursIn24Format !== 12) {
         hoursIn24Format += 12;
      } else if (selectedPeriod === 'AM' && hoursIn24Format === 12) {
         hoursIn24Format = 0;
      }

      const updatedDate = setMinutes(
         setHours(currentDate, hoursIn24Format),
         parseInt(selectedMinute, 10)
      );

      onChange(updatedDate.toISOString());
      setValue('withTime', true);
   };

   const togglePeriod = () => {
      setSelectedPeriod((prev) => (prev === 'AM' ? 'PM' : 'AM'));
   };

   const handleAddTime = () => {
      if (!value) return; // Prevent adding time if no date is set

      const currentDate = parseISO(value);
      const updatedDate = setMinutes(setHours(currentDate, 8), 0); // Default 8:00 AM
      onChange(updatedDate.toISOString());
      setValue('withTime', true);
      setSelectedHour('08');
      setSelectedMinute('00');
      setSelectedPeriod('AM');
      setIsPopoverOpen(true); // Keep the popover open
   };

   const clearTimeSelection = () => {
      if (value) {
         onChange(value.split('T')[0]); // Remove the time part from the ISO string
      }
      setSelectedHour('08');
      setSelectedMinute('00');
      setSelectedPeriod('AM');
      setValue('withTime', false);
      setIsPopoverOpen(false); // Close the popover
   };

   const extractTime = () => {
      if (!value || !value.includes('T')) return;

      const currentDate = parseISO(value);
      if (isNaN(currentDate.getTime())) return;

      const hours = currentDate.getHours();
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHour = hours % 12 || 12;

      setSelectedHour(String(displayHour).padStart(2, '0'));
      setSelectedMinute(minutes);
      setSelectedPeriod(period);
   };

   // Sync withTime on initial load (edit mode) but avoid default time in create mode
   useEffect(() => {
      if (isInitialMount) {
         setIsInitialMount(false); // Prevent auto time addition after the first render
         if (value && value.includes('T')) {
            setValue('withTime', true); // Edit mode: set withTime if time exists
            extractTime(); // Extract time from value
         } else {
            setValue('withTime', false); // Create mode: only set date by default
         }
      }
   }, [value, setValue]);

   useEffect(() => {
      if (isWithTime) {
         updateDueDate(); // Update due date if time picker values change
      }
   }, [selectedHour, selectedMinute, selectedPeriod]);

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
                  handleAddTime(); // Only add time when the user clicks "Add time"
               }}
            >
               Add time
            </p>
         );
      }
   };

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
            <PopoverContent className="w-fit p-4 flex">
               <div className="flex gap-2">
                  <div>
                     <label className="block text-sm font-medium mb-1">
                        Hours
                     </label>
                     <select
                        className="w-full border rounded-md p-2"
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

                  <div>
                     <label className="block text-sm font-medium mb-1">
                        Minutes
                     </label>
                     <select
                        className="w-full border rounded-md p-2"
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
                  <div className="mt-4 flex justify-between items-center">
                     <button
                        className="px-4 py-2 bg-gray-200 rounded-md"
                        onClick={() => togglePeriod()}
                     >
                        {selectedPeriod}
                     </button>
                  </div>
               </div>
            </PopoverContent>
         )}
      </Popover>
   );
};

const DatePicker = <TFieldValues extends FieldValues>({
   formMethods,
   fieldName,
}: InputProps<TFieldValues>): JSX.Element | null => {
   const { control, setValue, watch } = formMethods;

   return (
      <Controller
         name={fieldName as Path<TFieldValues>}
         control={control}
         render={({ field: { value, onChange } }) => (
            <TimePickerInterface
               value={value || null}
               onChange={onChange}
               setValue={setValue}
               watch={watch}
            />
         )}
      />
   );
};

export default DatePicker;
