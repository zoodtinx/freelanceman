import React, { forwardRef, useEffect, useRef, useState } from 'react';
import {
   DialogContent,
   DialogFooter,
   DialogHeader,
   Dialog,
   DialogTitle,
   DialogTrigger,
} from './dialog';
import { Button } from './button';
import {
   Check,
   Dot,
   X,
   Calendar as CalendarIcon,
   Pencil,
   ExternalLink,
   ChevronDown,
   Plus,
} from 'lucide-react';
import {
   Select,
   SelectContent,
   DialogueSelectItem,
   DialogueSelectTrigger,
   SelectValue,
} from '@/components/shared/ui/FilterSelect';
import { Textarea } from './textarea';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { format } from 'date-fns';
import { cn } from '@/lib/helper/utils';
import { DialogueState } from 'src/lib/context/ProjectViewContextTypes';
import {
   useForm,
   SubmitHandler,
   UseFormSetValue,
   UseFormRegister,
   FieldValues,
   Path,
   Controller,
   Control
} from 'react-hook-form';
import type { Event } from '@types';
import { useActiveProjectsQuery } from '@/lib/api/projectApi';

//Main Task Dialogue
interface NewActionDialogProps {
   dialogueState: DialogueState;
   setDialogueState: (newState: DialogueState) => void;
}

type FormData = Pick<
   Event,
   'status' | 'dueDate' | 'project' | 'client' | 'details' | 'link' | 'name'
>;

const NewActionDialog: React.FC<NewActionDialogProps> = ({
   dialogueState,
   setDialogueState,
}) => {
   const {
      register,
      handleSubmit,
      setValue,
      getValues,
      formState: { errors },
      watch,
      reset,
      control
   } = useForm<FormData>({
      defaultValues: {
         status: 'scheduled', // Set default value here
      },
   });

   const onError = (errors) => {
      console.error('Validation Errors:', errors);
   };

   const onSubmit: SubmitHandler<FormData> = (data) => {
      console.log(data);
   };

   const handleDiscard = () => {
      reset()
      setDialogueState({
         isOpen: false,
         id: '',
      });
   }

   return (
      <Dialog open={dialogueState.isOpen} onOpenChange={handleDiscard}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Profile
            </Button>
         </DialogTrigger>
         <DialogContent
            className="sm:max-w-[425px] flex flex-col"
            onInteractOutside={(e) => {
               e.preventDefault();
            }}
         >
            <form onSubmit={handleSubmit(onSubmit, onError)}>
               <DialogHeader className="">
                  <DialogTitle className="flex flex-col items-start">
                     <TaskNameInput
                        setValue={setValue}
                        register={register}
                     />
                  </DialogTitle>
               </DialogHeader>
               <div className="px-5 py-3 flex flex-col gap-3">
                  <div className="flex leading-tight">
                     <div className="w-1/2 flex flex-col box-border gap-1">
                        <p className="text-secondary">Status</p>
                        <StatusSelect
                              control={control}
                        />
                     </div>
                     <div className="w-1/2">
                        <p className="text-secondary">Due Date</p>
                        <DatePicker setValue={setValue} register={register} />
                        <TimePicker />
                     </div>
                  </div>
                  <div className="flex leading-tight">
                     <div className="w-1/2">
                        <p className="text-secondary">Project</p>
                        <ProjectSelect
                           setValue={setValue}
                           register={register}
                           control={control}
                        />
                     </div>
                     <div className="w-1/2">
                        <p className="text-secondary">Client</p>
                        <ClientSelect getValues={getValues} watch={watch} />
                     </div>
                  </div>
                  <div className="w-full">
                     <p className="text-secondary">Details</p>
                     <TaskDetailInput
                        setValue={setValue}
                        getValues={getValues}
                        register={register}
                     />
                  </div>
                  <div>
                     <p className="text-secondary">Link</p>
                     <LinkInput register={register} />
                  </div>
               </div>
               <DialogFooter>
                  <div className="flex justify-between p-4">
                     <Button variant={'destructiveOutline'} onClick={handleDiscard}>Discard</Button>
                     <Button variant={'default'} type="submit">
                        Create Task
                     </Button>
                  </div>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
};

interface InputProps<TFieldValues extends FieldValues = FieldValues> {
   register?: UseFormRegister<TFieldValues>;
   setValue?: UseFormSetValue<TFieldValues>;
   getValues?: (field: Path<TFieldValues>) => string;
   watch?: (name?: string | string[], defaultValue?: unknown) => unknown;
   control?: Control<TFieldValues>;
}

//Task Name Input
const TaskNameInput = ({
   register,
   setValue,
}: InputProps<FormData>): JSX.Element => {
   const inputRef = useRef<HTMLDivElement | null>(null);
   useEffect(() => {
      // Focus on the `contentEditable` element when the component mounts
      inputRef.current?.focus();
   }, []);

   return (
      <div className="group w-full relative flex">
         <div
            suppressContentEditableWarning
            className="peer w-full rounded-md focus:outline-none order-2 break-words whitespace-pre-wrap pr-7"
            contentEditable="true"
            role="textbox"
            data-placeholder="New task name"
            onInput={(e) => setValue('name', e.currentTarget.textContent || '')} // Update form value
            {...{
               ...register('name', { required: 'Name is required' }),
               ref: undefined,
            }}
            ref={(el) => {
               // Assign the element to your custom ref
               inputRef.current = el;

               // Pass the element to React Hook Form's `register` function
               if (register?.ref) {
                  register.ref(el);
               }
            }}
         ></div>
         <div className="w-[0px] shrink-0 text-secondary overflow-hidden peer-focus:w-[25px] peer-focus:text-primary group-hover:w-[25px] transition-all duration-100 order-1">
            <Pencil className="h-[18px] w-auto" />
         </div>
      </div>
   );
};

const TaskDetailInput = ({ register }: InputProps<FormData>): JSX.Element => {
   return (
      <Textarea
         className="resize-none border-secondary placeholder:text-secondary"
         placeholder="Explain this task like you're telling your future self who's half asleep."
         {...register!('details')}
      />
   );
};

//Link Input
const LinkInput = ({ register }: InputProps<FormData>): JSX.Element => {
   return (
      <input
         type="url"
         {...register}
         className="flex px-2 h-6 w-full border border-secondary rounded-md bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
         placeholder="Enter your link"
      />
   );
};

//Task Progress Status Selection
const StatusSelect = ({ control }: InputProps<FormData>): JSX.Element => {
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
               <Select
                  value={field.value}
                  onValueChange={handleStatusChange}
               >
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
                     <DialogueSelectItem value="scheduled">Scheduled</DialogueSelectItem>
                     <DialogueSelectItem value="inprogress">In Progress</DialogueSelectItem>
                     <DialogueSelectItem value="completed">Completed</DialogueSelectItem>
                     <DialogueSelectItem value="cancelled">Cancelled</DialogueSelectItem>
                  </SelectContent>
               </Select>
            );
         }}
      />
   );
};


const ProjectSelect = ({
   control,
   setValue,
}: InputProps<FormData>): JSX.Element => {
   const { data: activeProjects } = useActiveProjectsQuery();

   if (!activeProjects) {
      return <>No projects available</>;
   }

   const handleProjectChange = (value: string, onChange: (value: string) => void) => {
      onChange(value); // Updates the 'project' field in the form
      const selectedProject = activeProjects.find((project) => project.id === value);
      if (selectedProject) {
         setValue('client', selectedProject.client || ''); // Updates the 'client' field in the form
      }
   };

   return (
      <Controller
         name="project"
         control={control}
         rules={{ required: 'Please select a project' }}
         render={({ field }) => (
            <Select
               onValueChange={(value) => handleProjectChange(value, field.onChange)}
               value={field.value}
            >
               <DialogueSelectTrigger mode="base">
                  <p className="font-semibold text-md flex gap-1 items-end">
                     <SelectValue placeholder="Select a project" />
                     <ChevronDown className="w-4 h-auto" />
                  </p>
               </DialogueSelectTrigger>
               <SelectContent className="flex flex-col gap-1">
                  {activeProjects.map((project) => (
                     <DialogueSelectItem key={project.id} value={project.id!}>
                        {project.name}
                     </DialogueSelectItem>
                  ))}
               </SelectContent>
            </Select>
         )}
      />
   );
};




const ClientSelect = ({ watch }: InputProps<FormData>): JSX.Element => {
   const { data: activeProjects, isLoading } = useActiveProjectsQuery();

   // Watch the "project" field reactively
   const client = watch('client');

   if (isLoading) {
      return <>Loading projects...</>;
   }

   // if (!selectedProject) {
   //    return <>Select a project first.</>;
   // }

   // // Find the client associated with the selected project
   // const selectedProjectClient = activeProjects?.find(
   //    (project) => project.id === selectedProject // Match by name
   // )?.client;

   return <div>{client || 'Select a project'}</div>;
};

const DatePicker = ({
   setValue,
   register,
}: InputProps<FormData>): JSX.Element => {
   const [date, setDate] = React.useState<string>('');

   useEffect(() => {
      setValue('dueDate', date); // Sync state with form
   }, [date, setValue]);

   const handleDateSelect = (selectedDate: Date | undefined) => {
      setDate(selectedDate ? selectedDate.toISOString() : '');
   };

   return (
      <div>
         <input type="hidden" {...register('dueDate')} value={date} />
         <Popover>
            <PopoverTrigger asChild>
               <p
                  className={cn(
                     'justify-start text-md font-semibold cursor-pointer',
                     !date && 'text-muted-foreground'
                  )}
               >
                  {date ? format(date, 'PPP') : 'Pick a date'}
               </p>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
               <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
               />
            </PopoverContent>
         </Popover>
      </div>
   );
};

const TimePicker = (): JSX.Element => {
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

   const handleTimeSelect = () => {
      const newTime = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;
      onChange(newTime);
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

export default NewActionDialog;
