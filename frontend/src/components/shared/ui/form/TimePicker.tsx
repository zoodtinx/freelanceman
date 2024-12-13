import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { InputProps } from './props.type';
import { FieldValues } from 'react-hook-form';

const TimePicker = <TFieldValues extends FieldValues = FieldValues>({
   formMethods
}: InputProps<TFieldValues>): JSX.Element => {
   const { setValue, watch } = formMethods;
   
   const hours = Array.from({ length: 12 }, (_, i) =>
      String(i + 1).padStart(2, '0')
   );
   const minutes = Array.from({ length: 60 }, (_, i) =>
      String(i).padStart(2, '0')
   );

   const [selectedHour, setSelectedHour] = useState('1');
   const [selectedMinute, setSelectedMinute] = useState('00');
   const [selectedPeriod, setSelectedPeriod] = useState('AM');
   const [isWithTime, setIsWithTime] = useState(false);

   const fieldValue = watch('dueDate');

   const updateDueDate = () => {
      const currentDate = new Date(fieldValue || new Date().toISOString());
      let hoursIn24Format = parseInt(selectedHour, 10);
      if (selectedPeriod === 'PM' && hoursIn24Format !== 12) {
         hoursIn24Format += 12;
      } else if (selectedPeriod === 'AM' && hoursIn24Format === 12) {
         hoursIn24Format = 0;
      }

      currentDate.setHours(hoursIn24Format, parseInt(selectedMinute, 10));
      setValue('dueDate', currentDate.toISOString());
   };

   const togglePeriod = () => {
      setSelectedPeriod((prev) => (prev === 'AM' ? 'PM' : 'AM'));
   };

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

export default TimePicker;
