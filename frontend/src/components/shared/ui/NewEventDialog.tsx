import {
   DialogContent,
   DialogFooter,
   DialogHeader,
   Dialog,
   DialogTitle,
   DialogTrigger,
} from './Dialog';
import { Button } from './button';
import { Textarea } from './textarea';
import { DialogueState } from 'src/lib/types/project-view-context.types';
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
import { useCreateEvent } from 'src/lib/api/event-api';
import { NewEventPayload } from '@types';
import LinkInput from './form/LinkInput';
import StatusSelect from './form/StatusSelect';
import ProjectSelect from './form/ProjectSelect';
import TimePicker from './form/TimePicker';
import TaskNameInput from '@/components/pages/all-project/TaskAndEventNameInput';
import DatePicker from './form/DatePicker';

//Main Task Dialogue
interface NewActionDialogProps {
   dialogueState: DialogueState;
   setDialogueState: (newState: DialogueState) => void;
}

type FormData = NewEventPayload

const NewEventDialog: React.FC<NewActionDialogProps> = ({
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
      control,
      field
   } = useForm<FormData>({
      defaultValues: {
         status: 'scheduled', // Set default value here
      },
   });

   const { mutate: createEvent, isLoading, isError, error } = useCreateEvent();

   if (isLoading) {
      return null
   }


   const onError = (errors) => {
      console.error('Validation Errors:', errors);
   };

   const onSubmit: SubmitHandler<FormData> = (data) => {
      console.log(data);
      createEvent(data)
   };

   const handleDiscard = () => {
      reset()
      setDialogueState({
         isOpen: false,
         id: '',
         actionType: 'event',
         mode: 'new'
      });
   }

   const client = watch('client');

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
                     <TaskNameInput setValue={setValue} register={register} />
                  </DialogTitle>
               </DialogHeader>
               <div className="px-5 py-3 flex flex-col gap-3">
                  <div className="flex leading-tight">
                     <div className="w-1/2 flex flex-col box-border gap-1">
                        <p className="text-secondary">Status</p>
                        <StatusSelect control={control} />
                     </div>
                     <div className="w-1/2">
                        <p className="text-secondary">Due Date</p>
                        <DatePicker control={control} />
                        <TimePicker setValue={setValue} watch={watch} />
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
                        {client || 'Select a project'}
                     </div>
                  </div>
                  <div className="w-full">
                     <p className="text-secondary">Details</p>
                     <Textarea
                        className="resize-none border-secondary placeholder:text-secondary"
                        placeholder="Explain this task like you're telling your future self who's half asleep."
                        {...register!('details')}
                     />
                  </div>
                  <div>
                     <p className="text-secondary">Link</p>
                     <LinkInput register={register} />
                  </div>
               </div>
               <DialogFooter>
                  <div className="flex justify-between p-4">
                     <Button
                        variant={'destructiveOutline'}
                        onClick={handleDiscard}
                     >
                        Discard
                     </Button>
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

export default NewEventDialog