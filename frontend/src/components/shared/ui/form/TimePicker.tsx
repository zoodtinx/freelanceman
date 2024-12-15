import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Controller } from 'react-hook-form';
import { InputProps } from './props.type';
import { ActionFormData } from '@types';
import { format, parseISO, setHours, setMinutes, parse, setSeconds } from 'date-fns';

interface TimePickerProps {
   value: string | null; // ISO string
   onChange: (newValue: string) => void;
}

const TimePickerInterface: React.FC<TimePickerProps> = ({ value, onChange }) => {
   const hours = Array.from({ length: 12 }, (_, i) =>
      String(i + 1).padStart(2, '0')
   );
   const minutes = Array.from({ length: 60 }, (_, i) =>
      String(i).padStart(2, '0')
   );

   const [selectedHour, setSelectedHour] = useState('01');
   const [selectedMinute, setSelectedMinute] = useState('00');
   const [selectedPeriod, setSelectedPeriod] = useState('AM');
   const [isWithTime, setIsWithTime] = useState(false);

   const updateDueDate = () => {
      if (!value) return;

      const currentDate = parseISO(value);
      let hoursIn24Format = parseInt(selectedHour, 10);

      if (selectedPeriod === 'PM' && hoursIn24Format !== 12) {
         hoursIn24Format += 12;
      } else if (selectedPeriod === 'AM' && hoursIn24Format === 12) {
         hoursIn24Format = 0;
      }

      // Set the new hours and minutes using date-fns
      const updatedDate = setMinutes(setHours(currentDate, hoursIn24Format), parseInt(selectedMinute, 10));
      
      // Format to local ISO string
      onChange(updatedDate.toISOString());
   };

   const togglePeriod = () => {
      setSelectedPeriod((prev) => (prev === 'AM' ? 'PM' : 'AM'));
   };

   const extractTime = () => {
      if (!value) return;

      const currentDate = parseISO(value);
      if (isNaN(currentDate.getTime())) return; // Check for invalid date

      const hours = currentDate.getHours();
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHour = hours % 12 || 12;

      setSelectedHour(String(displayHour).padStart(2, '0'));
      setSelectedMinute(minutes);
      
      // Set period based on extracted time
      setSelectedPeriod(period);

      // If the ISO string contains time, set `isWithTime` to true
      setIsWithTime(true);
   };

   useEffect(() => {
      extractTime();
   }, [value]);

   const triggerText = () => {
      if (isWithTime) {
         return (
            <p className="text-primary cursor-pointer">
               {`${selectedHour}:${selectedMinute} ${selectedPeriod}`}
            </p>
         );
      } else {
         return (
            <p className="text-secondary cursor-pointer hover:text-primary">
               Add time
            </p>
         );
      }
   };

   return (
      <Popover>
         <PopoverTrigger asChild>
            <div className="text-secondary">{triggerText()}</div>
         </PopoverTrigger>
         <PopoverContent className="w-fit p-4 flex">
            <div className="flex gap-2">
               <div>
                  <label className="block text-sm font-medium mb-1">
                     Hours
                  </label>
                  <select
                     className="w-full border rounded-md p-2"
                     value={selectedHour}
                     onChange={(e) => {
                        setIsWithTime(true);
                        setSelectedHour(e.target.value);
                        updateDueDate();
                     }}
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
                     onChange={(e) => {
                        setIsWithTime(true);
                        setSelectedMinute(e.target.value);
                        updateDueDate();
                     }}
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
                     onClick={() => {
                        setIsWithTime(true);
                        togglePeriod();
                        updateDueDate();
                     }}
                  >
                     {selectedPeriod}
                  </button>
               </div>
            </div>
         </PopoverContent>
      </Popover>
   );
};





const TimePicker = ({
   formMethods,
}: InputProps<ActionFormData>): JSX.Element => {
   const { control } = formMethods;

   return (
      <Controller
         name="dueDate"
         control={control}
         render={({ field: { value, onChange } }) => (
            <TimePickerInterface value={value} onChange={onChange} />
         )}
      />
   );
};

export default TimePicker;
