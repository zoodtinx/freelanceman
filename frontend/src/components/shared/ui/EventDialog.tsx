import React, { useEffect, useRef, useState } from 'react';
import {
   DialogContent,
   DialogFooter,
   DialogHeader,
   Dialog,
   DialogTitle,
   DialogTrigger,
} from './Dialog';
import { Button } from './button';
import {
   Check,
   Dot,
   X,
   Calendar as CalendarIcon,
   Pencil,
   ExternalLink,
} from 'lucide-react';
import {
   Select,
   SelectContent,
   DialogueSelectItem,
   DialogueSelectTrigger,
   SelectValue,
} from '@/components/shared/ui/FilterSelect';
import { Textarea } from './textarea';
import { Link } from 'react-router-dom';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { format } from 'date-fns';
import { cn } from '@/lib/helper/utils';
import { DialogueState } from 'src/lib/context/ProjectViewContextTypes';
import { useTaskQuery, useEditTask } from '@/lib/api/taskApi';
import { UseMutateFunction } from '@tanstack/react-query';
import { useEventQuery } from '@/lib/api/eventApi';

//Main Task Dialogue
interface TaskDialogueProps {
   dialogueState: DialogueState;
   setDialogueState: (newState: DialogueState) => void;
   mode?: string;
}

const EventDialog: React.FC<TaskDialogueProps> = ({
   dialogueState,
   setDialogueState,
   mode,
}) => {
   const { data, isLoading, error } = useEventQuery(dialogueState.id);
   const { mutate: editTask } = useEditTask(dialogueState.id);

   if (isLoading) {
      return null;
   }

   const handleDialogueClose = () => {
      setDialogueState({
         isOpen: false,
         id: dialogueState.id,
      });
   };

   const fallBackData = {
      id: '',
      name: '',
      status: '',
      details: '',
      link: '',
      createdAt: '',
      dueDate: '',
      project: '',
      projectId: '',
      client: '',
      clientId: '',
   };

   const task = data || fallBackData;

   return (
      <Dialog open={dialogueState.isOpen} onOpenChange={handleDialogueClose}>
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
            <DialogHeader className="">
               <DialogTitle className="flex flex-col items-start">
                  <TaskNameInput value={task.name} setValue={editTask} />
               </DialogTitle>
            </DialogHeader>
            <div className="px-5 py-3 flex flex-col gap-3">
               <div className="flex leading-tight">
                  <div className="w-1/2 flex flex-col box-border gap-1">
                     <p className="text-secondary">Status</p>
                     <StatusSelect value={task.status} setValue={editTask} />
                  </div>
                  <div className="w-1/2">
                     <p className="text-secondary">Due Date</p>
                     <DatePicker value={task.dueDate} setValue={editTask} />
                     <TimePicker value={task.dueDate} setValue={editTask} />
                  </div>
               </div>
               <div className="flex leading-tight">
                  <div className="w-1/2">
                     <p className="text-secondary">Project</p>
                     <Link
                        to={`../project/${task.projectId}`}
                        className="text-md font-semibold hover:text-secondary transition-colors duration-75"
                     >
                        {task.project}
                     </Link>
                  </div>
                  <div className="w-1/2">
                     <p className="text-secondary">Client</p>
                     <Link
                        relative="path"
                        to={`../client/${task.clientId}`}
                        className="text-md font-semibold hover:text-secondary transition-colors duration-75"
                     >
                        {task.client}
                     </Link>
                  </div>
               </div>
               <div className="w-full">
                  <p className="text-secondary">Details</p>
                  <TaskDetailInput value={task.details} setValue={editTask} />
               </div>
               <div>
                  <p className="text-secondary">Link</p>
                  <LinkInput value={task.link} setValue={editTask} />
               </div>
            </div>
            <DialogFooter>
               <div className="flex justify-between p-4">
                  <Button variant={'destructiveOutline'}>Delete Task</Button>
                  {task.status === 'completed' ? (
                     <Button variant={'ghost'} className="flex gap-1">
                        <p>Completed</p>
                     </Button>
                  ) : (
                     <Button
                        variant={'submit'}
                        className="flex gap-1"
                        onClick={() => {
                           editTask({ key: 'status', value: 'completed' });
                        }}
                     >
                        <p>Mark as completed</p>
                        <Check className="w-4 h-auto stroke-[2.5px]" />
                     </Button>
                  )}
               </div>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

interface InputProps<T> {
   value: T; // The current state of the input value
   setValue: UseMutateFunction<void, Error, { key: string; newValue: T }>; // Mutation function
}

//Task Name Input
const TaskNameInput: React.FC<InputProps<string>> = ({ value, setValue }) => {
   const editableRef = React.useRef<HTMLDivElement>(null);

   const handleNameChange = () => {
      if (editableRef.current) {
         const newValue = editableRef.current.innerText;
         setValue({ key: 'name', value: newValue });
      }
   };

   useEffect(() => {
      if (editableRef.current && editableRef.current.innerText !== value) {
         editableRef.current.innerText = value;
      }
   }, [value]);

   return (
      <div className="group w-full relative flex">
         <div
            id="editableDiv"
            className="peer w-full rounded-md focus:outline-none order-2 break-words whitespace-pre-wrap pr-7"
            contentEditable="true"
            role="textbox"
            onBlur={handleNameChange}
            ref={editableRef}
         >
            {/* {value} */}
         </div>
         <div className="w-[0px] shrink-0 text-secondary overflow-hidden peer-focus:w-[25px] peer-focus:text-primary group-hover:w-[25px] transition-all duration-100 order-1">
            <Pencil className="h-[18px] w-auto" />
         </div>
      </div>
   );
};

const TaskDetailInput: React.FC<InputProps<string>> = ({ value, setValue }) => {
   const textareaRef = useRef<HTMLTextAreaElement>(null);

   const handleChange = (value) => {
      setValue({ key: 'details', value });
   };

   return (
      <Textarea
         value={value}
         className="resize-none"
         onBlur={(e) => {
            handleChange(e.target.value);
         }}
      />
   );
};

//Link Input
const LinkInput: React.FC<InputProps<string>> = ({ value, setValue }) => {
   const formattedLink = value.replace('https://', '');
   const [isEditMode, setIsEditMode] = useState(false);
   const [newLink, setNewLink] = useState('');
   const inputRef = useRef(null);

   useEffect(() => {
      if (!value) {
         setIsEditMode(true);
      }
      if (isEditMode && inputRef.current) {
         inputRef.current.focus();
      }
   }, [isEditMode]);

   const updateLink = () => {
      setValue({ key: 'link', value: newLink });
      setIsEditMode(false);
   };

   const editCurrentLink = () => {
      setIsEditMode(true);
   };

   return isEditMode ? (
      <input
         type="url"
         onChange={(e) => setNewLink(e.target.value)}
         onBlur={updateLink}
         ref={inputRef}
         className="flex px-2 h-6 w-full bordeer rounded-md bg-transparent border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
   ) : (
      <div className="flex justify-between items-center px-1 bg-blue-50 border w-full h-6 rounded-md text-blue-600">
         <Link
            to={value}
            className="flex gap-1 items-center text-sm w-full overflow-hidden"
         >
            <ExternalLink className="w-4 h-auto" />
            <p className="text-ellipsis overflow-hidden whitespace-nowrap">
               {formattedLink}
            </p>
         </Link>
         <X
            className="w-4 h-auto text-gray-700 cursor-pointer"
            onClick={editCurrentLink}
         />
      </div>
   );
};

//Task Progress Status Selection
const StatusSelect: React.FC<InputProps<string>> = ({ value, setValue }) => {
   let color;
   switch (value) {
      case 'scheduled':
         color = 'bg-yellow-100';
         break;
      case 'onGoing':
         color = 'bg-emerald-200';
         break;
      case 'completed':
         color = 'bg-blue-100';
         break;
      case 'cancelled':
         color = 'bg-red-200';
         break;
   }

   const handleSelectChange = (value) => {
      setValue({ key: 'status', value: value });
   };

   return (
      <Select
         value={value}
         onValueChange={(value) => {
            handleSelectChange(value);
         }}
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
            <DialogueSelectItem value="onGoing">Ongoing</DialogueSelectItem>
            <DialogueSelectItem value="completed">Completed</DialogueSelectItem>
            <DialogueSelectItem value="cancelled">Cancelled</DialogueSelectItem>
         </SelectContent>
      </Select>
   );
};

//Date Picker
const DatePicker = React.forwardRef<HTMLDivElement, InputProps<string>>(
   ({ value, setValue }, ref) => {
      const [date, setDate] = React.useState<string>(value);
      return (
         <Popover>
            <PopoverTrigger asChild>
               <p
                  className={cn(
                     'justify-start text-md font-semibold cursor-pointer',
                     !date && 'text-muted-foreground'
                  )}
               >
                  {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
               </p>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
               <Calendar mode="single" selected={date} onSelect={setDate} />
            </PopoverContent>
         </Popover>
      );
   }
);

//Time Picker
const TimePicker: React.FC<InputProps<string>> = ({ value, setValue }) => {
   const [isSelectMode, setIsSelectMode] = useState(false);
   const formattedTime = value.split('T')[1].split(':').slice(0, 2).join(':');

   return (
      <div className="text-md">
         {isSelectMode ? <div>Hello</div> : <div>{formattedTime}</div>}
      </div>
   );
};

export default EventDialog;
