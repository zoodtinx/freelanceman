import { Controller } from 'react-hook-form';
import { InputProps } from '../../../../lib/types/form-input-props.types';
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
   dialogState,
}: InputProps<ActionFormData>): JSX.Element => {
   if (!dialogState) {
      return <div></div>;
   }

   const { control } = formMethods;

   const getStatusColor = (status: string) => {
      const statusColors: Record<string, Record<string, string>> = {
         event: {
            scheduled: 'bg-yellow-100',
            onGoing: 'bg-emerald-200',
            completed: 'bg-blue-100',
            cancelled: 'bg-red-200',
         },
         task: {
            planned: 'bg-yellow-100',
            inProgress: 'bg-emerald-200',
            completed: 'bg-blue-100',
            cancelled: 'bg-red-200',
         },
      };

      return statusColors[dialogState.actionType]?.[status] || '';
   };

   const getStatuses = () => {
      const statusOptions: Record<string, { value: string; text: string }[]> = {
         task: [
            { value: 'planned', text: 'Planned' },
            { value: 'onGoing', text: 'Ongoing' },
            { value: 'completed', text: 'Completed' },
            { value: 'cancelled', text: 'Cancelled' },
         ],
         event: [
            { value: 'scheduled', text: 'Scheduled' },
            { value: 'inProgress', text: 'In Progress' },
            { value: 'completed', text: 'Completed' },
            { value: 'cancelled', text: 'Cancelled' },
         ],
      };

      return statusOptions[dialogState.actionType] || [];
   };

   return (
      <Controller
         name="status"
         control={control}
         defaultValue="planned"
         rules={{ required: 'Please select a status' }}
         render={({ field }) => {
            const color = getStatusColor(field.value);

            const handleStatusChange = (value: string) => {
               field.onChange(value);
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
                     {getStatuses().map(({ value, text }) => (
                        <DialogueSelectItem key={value} value={value}>
                           {text}
                        </DialogueSelectItem>
                     ))}
                  </SelectContent>
               </Select>
            );
         }}
      />
   );
};

export default StatusSelect;
