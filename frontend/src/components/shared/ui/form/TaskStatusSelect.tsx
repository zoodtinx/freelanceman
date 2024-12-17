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
   dialogState,
   data,
}: InputProps<ActionFormData>): JSX.Element => {
   if (!dialogState || dialogState.actionType !== 'task') {
      return <div></div>;
   }

   const { control, getValues } = formMethods;

   const statusField = getValues('status');

   const getStatusColor = (status: string) => {
      const statusColors: Record<string, Record<string, string>> = {
         task: {
            planned: 'bg-yellow-100',
            onGoing: 'bg-emerald-200',
            completed: 'bg-blue-100',
            cancelled: 'bg-red-200',
         },
      };

      return statusColors['task']?.[status] || '';
   };

   const taskStatuses = [
      { value: 'planned', text: 'Planned' },
      { value: 'onGoing', text: 'Ongoing' },
      { value: 'completed', text: 'Completed' },
      { value: 'cancelled', text: 'Cancelled' },
   ];

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
                     {taskStatuses.map(({ value, text }) => (
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
