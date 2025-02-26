import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../primitives/Popover';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { setHours, setMinutes, format } from 'date-fns';
import { FormElementProps } from '@/lib/types/form-element.type';
import { XIcon } from 'lucide-react';

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

   const dateObject = new Date(value as string)

   const hours = Array.from({ length: 12 }, (_, i) =>
      String(i + 1).padStart(2, '0')
   );
   const minutes = Array.from({ length: 60 }, (_, i) =>
      String(i).padStart(2, '0')
   );

   const [selectedHour, setSelectedHour] = useState('00');
   const [selectedMinute, setSelectedMinute] = useState('00');
   const [selectedPeriod, setSelectedPeriod] = useState('AM');
   const [isPopoverOpen, setIsPopoverOpen] = useState(false);
   const [isWithTime, setIsWithTime] = useState(value && value.includes('T'))

   useEffect(() => {
      if (!value || !value.includes('T')) {
         return
      }
      const formattedDate = format(dateObject, 'hh:mm a');
      const [time, period] = formattedDate.split(' ');
      const [hour, minute] = time.split(':');
      setSelectedHour(hour);
      setSelectedMinute(minute);
      setSelectedPeriod(period);

   }, []);

   useEffect(() => {
      if (!value || !value.includes('T')) {
         return;
      }

      let hour = Number(selectedHour);
   
      if (selectedPeriod === 'AM' && hour === 12) {
         hour = 0; 
      } else if (selectedPeriod === 'PM' && hour !== 12) {
         hour += 12; 
      }
   
      const updatedDate = setMinutes(setHours(dateObject, hour), Number(selectedMinute));
      handleChange(updatedDate.toISOString());
   }, [selectedHour, selectedMinute, selectedPeriod, dateObject, handleChange, value]);


   const togglePeriod = () => {
      setSelectedPeriod((prev) => (prev === 'AM' ? 'PM' : 'AM'));
   };

   const handleAddTime = () => {
      setIsWithTime(true)
      setIsPopoverOpen(true)
      const updatedDate = setMinutes(setHours(dateObject, 8), 0);
      handleChange(updatedDate.toISOString());
      setSelectedHour('08');
      setSelectedMinute('00');
      setSelectedPeriod('AM');
      setIsPopoverOpen(true);
   };

   const clearTimeSelection = () => {า
      if (value) {
         handleChange(value.split('T')[0]);
      }
      setSelectedHour('08');
      setSelectedMinute('00');
      setSelectedPeriod('AM');
      setIsWithTime(false)
      setIsPopoverOpen(false);
   };

   const triggerText = () => {
      if (isWithTime) {
         return (
            <div className="flex items-center gap-1 cursor-pointer group">
               <p className="text-primary">
                  {`${selectedHour}:${selectedMinute} ${selectedPeriod}`}
               </p>
               <div
                  className="text-secondary text-sm opacity-0 hover:text-red-500 group-hover:opacity-100 transition-all duration-150"
                  onClick={(e) => {
                     e.stopPropagation();
                     clearTimeSelection();
                  }}
               >
                  <XIcon className='h-[14px] w-[14px] stroke-[3px]' />
               </div>
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

   if (!value) {
      return <></>
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
