import React, { useEffect, useMemo, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../primitives/Popover';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { setHours, setMinutes, format } from 'date-fns';
import { FormElementProps } from '@/lib/types/form-element.type';
import { Clock, XIcon } from 'lucide-react';

export const TimePickerForm = <TFieldValues extends FieldValues>({
   formMethods,
   fieldName,
   isWithTime = false
}: FormElementProps<TFieldValues>): JSX.Element | null => {
   const { control, watch } = formMethods;

   return (
      <Controller
         name={fieldName as Path<TFieldValues>}
         control={control}
         render={({ field }) => {
            const handleChange = (value: string) => {
               field.onChange(value);
               if (value.includes('T')) {
                  formMethods.setValue('isWithTime' as any, true as any, {
                     shouldDirty: false,
                  });
               } else {
                  formMethods.setValue('isWithTime' as any, false as any, {
                     shouldDirty: false,
                  });
               }
            };

            const value = watch(fieldName as Path<TFieldValues>);

            return (
               <div className='flex gap-1 items-center'>
                  <Clock className="w-5 h-5 text-secondary" />
                  <TimePicker value={value || null} handleChange={handleChange} enableTime={isWithTime} />
               </div>
            );
         }}
      />
   );
};

interface TimePickerProps {
   value: string | null;
   handleChange: (value: string) => void;
   enableTime?: boolean
}

const TimePicker: React.FC<TimePickerProps> = ({ value, handleChange, enableTime = false }) => {
   const dateObject = useMemo(() => new Date(value as string), [value]);

   const hours = Array.from({ length: 12 }, (_, i) =>
      String(i + 1).padStart(2, '0')
   );
   const minutes = Array.from({ length: 12 }, (_, i) =>
      String(i * 5).padStart(2, '0')
   );

   const [selectedHour, setSelectedHour] = useState('00');
   const [selectedMinute, setSelectedMinute] = useState('00');
   const [selectedPeriod, setSelectedPeriod] = useState('AM');
   const [isPopoverOpen, setIsPopoverOpen] = useState(false);
   const [isWithTime, setIsWithTime] = useState(enableTime);

   useEffect(() => {
      if (!value || !value.includes('T')) {
         return;
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

      const currentHour = dateObject.getHours();
      const currentMinute = dateObject.getMinutes();

      let hour = Number(selectedHour);
      if (selectedPeriod === 'AM' && hour === 12) {
         hour = 0;
      } else if (selectedPeriod === 'PM' && hour !== 12) {
         hour += 12;
      }

      if (hour === currentHour && Number(selectedMinute) === currentMinute) {
         return;
      }

      const updatedDate = setMinutes(
         setHours(dateObject, hour),
         Number(selectedMinute)
      );
      handleChange(updatedDate.toISOString());
   }, [selectedHour, selectedMinute, selectedPeriod, dateObject, handleChange]);

   const togglePeriod = () => {
      setSelectedPeriod((prev) => (prev === 'AM' ? 'PM' : 'AM'));
   };

   const handleAddTime = () => {
      setIsWithTime(true);
      setIsPopoverOpen(true);
      const updatedDate = setMinutes(setHours(dateObject, 8), 0);
      handleChange(updatedDate.toISOString());
      setSelectedHour('08');
      setSelectedMinute('00');
      setSelectedPeriod('AM');
      setIsPopoverOpen(true);
   };

   const clearTimeSelection = () => {
      if (value) {
         handleChange(value.split('T')[0]);
      }
      setSelectedHour('08');
      setSelectedMinute('00');
      setSelectedPeriod('AM');
      setIsWithTime(false);
      setIsPopoverOpen(false);
   };

   const triggerText = () => {
      if (isWithTime) {
         return (
            <div className="flex items-center gap-1 cursor-pointer group font-semibold">
               <p className="text-primary font-normal">
                  {`${selectedHour}:${selectedMinute} ${selectedPeriod}`}
               </p>
               <div
                  className="text-secondary text-sm opacity-100 transition-all duration-150"
                  onClick={(e) => {
                     e.stopPropagation();
                     clearTimeSelection();
                  }}
               >
                  <XIcon className="h-[14px] w-[14px] stroke-[3px] opacity-0 group-hover:opacity-100 transition-opacity text-secondary" />
               </div>
            </div>
         );
      } else {
         return (
            <p
               className="text-secondary cursor-pointer hover:text-primary "
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
      return <></>;
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
