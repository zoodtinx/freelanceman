import { Controller, FieldValues } from 'react-hook-form';
import { InputProps } from './props.type';
import {
   Select,
   SelectContent,
   DialogueSelectItem,
   DialogueSelectTrigger,
   SelectValue,
} from '@/components/shared/ui/FilterSelect';
import { ActionFormData } from '@types';

const StatusSelect = ({
   formMethods,
}: InputProps<ActionFormData>): JSX.Element => {
   const { control } = formMethods;

   // Helper function to determine color based on status
   const getStatusColor = (status: string) => {
      switch (status) {
         case 'scheduled':
            return 'bg-yellow-100';
         case 'inprogress':
            return 'bg-emerald-200';
         case 'completed':
            return 'bg-blue-100';
         case 'cancelled':
            return 'bg-red-200';
         default:
            return '';
      }
   };

   return (
      <Controller
         name="status"
         control={control}
         defaultValue="scheduled" // Default value for status
         rules={{ required: 'Please select a status' }}
         render={({ field }) => {
            const color = getStatusColor(field.value); // Dynamically get color based on current status

            const handleStatusChange = (value: string) => {
               field.onChange(value); // Update the form state
            };

            return (
               <Select value={field.value} onValueChange={handleStatusChange}>
                  <DialogueSelectTrigger
                     mode="base"
                     className={`p-1 pl-3 pr-4 rounded-full flex items-center gap-1 w-fit ${color}`}
                  >
                     <div className="aspect-square w-[8px] rounded-full bg-primary" />
                     <p className="font-semibold">
                        <SelectValue />
                     </p>
                  </DialogueSelectTrigger>
                  <SelectContent className="flex flex-col gap-1">
                     <DialogueSelectItem value="scheduled">
                        Scheduled
                     </DialogueSelectItem>
                     <DialogueSelectItem value="inprogress">
                        In Progress
                     </DialogueSelectItem>
                     <DialogueSelectItem value="completed">
                        Completed
                     </DialogueSelectItem>
                     <DialogueSelectItem value="cancelled">
                        Cancelled
                     </DialogueSelectItem>
                  </SelectContent>
               </Select>
            );
         }}
      />
   );
};

export default StatusSelect;
