import React from 'react';
import {
   ToggleGroup,
   ToggleGroupItem,
} from 'src/components/shared/ui/primitives/ToggleGroup';

interface FilterBarProps {
   value: string;
   onValueChange: (value: string) => void;
   type: 'event' | 'task';
}

const statusOptions = {
   task: [
      { value: 'planned', label: 'Planned' },
      { value: 'in-progress', label: 'In Progress' },
      { value: 'completed', label: 'Completed' },
      { value: 'cancelled', label: 'Cancelled' },
      { value: 'all', label: 'All' },
   ],
   event: [
      { value: 'scheduled', label: 'Scheduled' },
      { value: 'ongoing', label: 'Ongoing' },
      { value: 'completed', label: 'Completed' },
      { value: 'cancelled', label: 'Cancelled' },
      { value: 'all', label: 'All' },
   ],
};

const FilterBar: React.FC<FilterBarProps> = ({ value, onValueChange, type }) => {
   const options = statusOptions[type];

   return (
      <ToggleGroup
         type="single"
         value={value}
         onValueChange={(value) => {
            onValueChange(value);
         }}
      >
         {options.map((option) => (
            <ToggleGroupItem key={option.value} value={option.value}>
               {option.label}
            </ToggleGroupItem>
         ))}
      </ToggleGroup>
   );
};

export default FilterBar;
