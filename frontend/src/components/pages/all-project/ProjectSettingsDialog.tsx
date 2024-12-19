import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/shared/ui/Dialog';
import {
   Select,
   SelectValue,
   SelectContent,
   DialogueSelectTrigger,
   DialogueSelectItem,
} from '@/components/shared/ui/FilterSelect';
import { Button } from '@/components/shared/ui/button';
import { Settings } from 'lucide-react';
import React, { useEffect } from 'react';
import { UseMutateFunction } from '@tanstack/react-query';
import { useEditProject, useProjectQuery } from '@/lib/api/project-api';
import {
   ProjectSettingDialogState,
   DialogProps,
} from '@/lib/types/dialog.types';
import { defaultProject } from '@/components/shared/ui/form/utils';
import { useForm } from 'react-hook-form';

const ProjectSettingsDialog: React.FC<
   DialogProps<ProjectSettingDialogState>
> = ({ dialogState, setDialogState }) => {
   const { data: project, isLoading } = useProjectQuery(dialogState.id);
   const { mutate: editProject } = useEditProject(dialogState.id);

   if (isLoading) {
      return null;
   }

   if (!project) {
      return 'something went wrong';
   }

   const handleDialogueClose = () => {
      setDialogState({
         isOpen: false,
         id: '',
         data: defaultProject,
      });
   };

   return (
      <Dialog open={dialogState.isOpen} onOpenChange={handleDialogueClose}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Profile
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle className="flex items-center gap-1">
                  <Settings className="w-5 h-auto" />
                  <p>Project Settings</p>
               </DialogTitle>
            </DialogHeader>
            <div className="p-4 flex flex-col gap-2">
               <div className="flex justify-between items-start text-md gap-3 min-h-7 max-h-[700px]">
                  <p className="shrink-0 t">Project Name</p>
                  <ProjectNameInput
                     value={project.name}
                     setValue={editProject}
                  />
               </div>
               <div className="flex w-full gap-3">
                  <div className="flex justify-between items-center h-7 w-1/2 shrink-0">
                     <p className="text-md">Project Status</p>
                     <ProjectStatusSelect
                        value={project.projectStatus}
                        setValue={editProject}
                     />
                  </div>
                  <div className="flex justify-between items-center h-7 w-1/2 shrink-0">
                     <p className="text-md">Payment Status</p>
                     <PaymentStatusSelect
                        value={project.paymentStatus}
                        setValue={editProject}
                     />
                  </div>
               </div>
               {/* <div className="flex justify-between items-center h-7">
                  <p className="text-md">Color</p>
               </div> */}
            </div>
            <DialogFooter>
               <div className="flex justify-between p-4">
                  <Button variant={'outline'}>Delete Project</Button>
                  <div className="flex gap-2">
                     <Button variant={'outline'}>Discard</Button>
                     <Button variant={'default'}>Save</Button>
                  </div>
               </div>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

interface InputProps {
   value: string; // The current state of the input value
   setValue: UseMutateFunction<void, Error, { key: string; newValue: string }>; // Mutation function
}

const ProjectNameInput: React.FC<InputProps> = ({ value, setValue }) => {
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
      <div
         id="editableDiv"
         className="peer w-full rounded-md focus:outline-none order-2 break-words whitespace-pre-wrap pr-7"
         contentEditable="true"
         role="textbox"
         onBlur={handleNameChange}
         ref={editableRef}
      />
   );
};

const PaymentStatusSelect = React.forwardRef<HTMLSelectElement, InputProps>(
   ({ value, setValue }, ref) => {
      let color;
      switch (value) {
         case 'planned':
            color = 'bg-yellow-100';
            break;
         case 'inprogress':
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
         setValue({ key: 'paymentStatus', value: value });
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
               <DialogueSelectItem value="not processed">
                  Not Processed
               </DialogueSelectItem>
               <DialogueSelectItem value="processing">
                  Processing
               </DialogueSelectItem>
               <DialogueSelectItem value="paid">Paid</DialogueSelectItem>
               <DialogueSelectItem value="cancelled">
                  Cancelled
               </DialogueSelectItem>
            </SelectContent>
         </Select>
      );
   }
);

const ProjectStatusSelect = React.forwardRef<HTMLSelectElement, InputProps>(
   ({ value, setValue }, ref) => {
      let color;
      switch (value) {
         case 'onhold':
            color = 'bg-yellow-100';
            break;
         case 'active':
            color = 'bg-emerald-200';
            break;
         case 'completed':
            color = 'bg-blue-100';
            break;
      }

      const handleSelectChange = (value) => {
         setValue({ key: 'projectStatus', value: value });
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
               <DialogueSelectItem value="planned">Planned</DialogueSelectItem>
               <DialogueSelectItem value="onhold">On hold</DialogueSelectItem>
               <DialogueSelectItem value="active">Active</DialogueSelectItem>
               <DialogueSelectItem value="completed">
                  Completed
               </DialogueSelectItem>
            </SelectContent>
         </Select>
      );
   }
);

export default ProjectSettingsDialog;
