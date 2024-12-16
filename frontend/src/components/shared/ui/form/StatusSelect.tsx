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
   dialogState
}: InputProps<ActionFormData>): JSX.Element => {
   if (!dialogState) {
      return <div></div>
   }
   
   const { control, getValues } = formMethods;

   const statusField = getValues('status')
   
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

   return (
      <Controller
         name="status"
         control={control}
         defaultValue="scheduled" 
         rules={{ required: 'Please select a status' }}
         render={({ field }) => {
            const color = getStatusColor(field.value); 

            const handleStatusChange = (value: string) => {
               field.onChange(value); 
            };

            console.log(field.value)

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
                     {dialogState.actionType === 'event' ? (
                        <>
                           <DialogueSelectItem value="scheduled">
                              Scheduled
                           </DialogueSelectItem>
                           <DialogueSelectItem value="onGoing">
                              Ongoing
                           </DialogueSelectItem>
                        </>
                     ) : (
                        <>
                           <DialogueSelectItem value="planned">
                              Planned
                           </DialogueSelectItem>
                           <DialogueSelectItem value="inProgress">
                              In Progress
                           </DialogueSelectItem>
                        </>
                     )}
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
