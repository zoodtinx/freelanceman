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
import { Pencil, Settings } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useEditProject, useProjectQuery } from '@/lib/api/project-api';
import { DialogProps } from '@/lib/types/dialog.types';
import {
   defaultProject,
   paymentStatusSelections,
   projectStatusSelections,
} from '@/components/shared/ui/form/utils';
import { Path, SubmitHandler, useForm } from 'react-hook-form';
import type { NewTaskPayload, Project } from '@types';
import { InputProps } from '@/lib/types/form-input-props.types';
import StatusSelect from '@/components/shared/ui/form/StatusSelect';
import { Textarea } from '@/components/shared/ui/textarea';

const ProjectSettingsDialog: React.FC<DialogProps> = ({
   dialogState,
   setDialogState,
}) => {
   const { mutate: editProject } = useEditProject(dialogState.id);

   const formMethods = useForm<Project>({
      defaultValues: dialogState.data,
   });

   const { handleSubmit, reset } = formMethods;

   const handleDialogueClose = () => {
      setDialogState({
         isOpen: false,
         id: '',
         mode: 'view',
         type: 'project',
         data: defaultProject,
      });
   };

   useEffect(() => {
      formMethods.reset(dialogState.data);
   }, [dialogState.data, formMethods]);

   const onError = (errors: any) => {
      console.error('Validation Errors:', errors);
   };

   const onSubmit: SubmitHandler<NewTaskPayload> = (data) => {
      console.log(data);
   };

   const allValues = formMethods.getValues();

   return (
      <Dialog open={dialogState.isOpen} onOpenChange={handleDialogueClose}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Profile
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit(onSubmit, onError)}>
               <DialogHeader>
                  <DialogTitle className="flex items-center gap-1">
                     <Settings className="w-5 h-auto" />
                     <p>Project Settings</p>
                  </DialogTitle>
               </DialogHeader>
               <div className="p-4 flex flex-col gap-2">
                  <div className="flex items-start text-md min-h-7 max-h-[700px]">
                     <p className="text-md w-[140px] shrink-0">Project Name</p>
                     <ProjectNameInput
                        formMethods={formMethods}
                        dialogState={dialogState}
                        fieldName="name"
                     />
                  </div>
                  <div className="flex items-center shrink-0">
                     <p className="text-md w-[140px]">Project Status</p>
                     <StatusSelect
                        formMethods={formMethods}
                        selection={projectStatusSelections}
                        dialogState={dialogState}
                        fieldName="projectStatus"
                     />
                  </div>
                  <div className="flex items-center shrink-0">
                     <p className="text-md w-[140px]">Payment Status</p>
                     <StatusSelect
                        formMethods={formMethods}
                        selection={paymentStatusSelections}
                        dialogState={dialogState}
                        fieldName="paymentStatus"
                     />
                  </div>
               </div>
               <DialogFooter>
                  <div className="flex justify-between p-4">
                     <div>
                        <Button variant={'destructiveOutline'}>Discard</Button>
                        <Button variant={'link'}>Delete Project</Button>
                     </div>
                     <div className="flex gap-2">
                        <Button variant={'default'}>Save</Button>
                     </div>
                  </div>
               </DialogFooter>
            </form>
         </DialogContent>
      </Dialog>
   );
};

const ProjectNameInput: React.FC<InputProps<Project>> = ({
   fieldName,
   formMethods,
}) => {
   const [isEditing, setIsEditing] = useState(false);
   const { register, setValue, watch } = formMethods;

   const handleEditToggle = () => {
      setIsEditing((prev) => !prev);
   };

   const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setValue(fieldName as Path<Project>, event.target.value);
      setIsEditing(false);
   };

   const projectName = watch('name');

   return (
      <div className="flex items-start w-full group">
         {isEditing ? (
            <Textarea
               {...register(fieldName as Path<Project>)}
               className="resize-none w-full border border-secondary rounded-md placeholder:text-secondary"
               placeholder={'Enter a name'}
               onBlur={handleBlur}
               autoFocus
            />
         ) : (
            <>
               <div className="flex-1 border border-transparent rounded-md cursor-default font-semibold">
                  {projectName || (
                     <span className="text-secondary">{'Enter a name'}</span>
                  )}
               </div>
               <button
                  type="button"
                  className="p-1 bg-transparent border-none opacity-0 transition-opacity hover:bg-gray-100 group-hover:opacity-100 rounded-md"
                  onClick={handleEditToggle}
                  aria-label="Edit name"
               >
                  <Pencil className="w-4 h-4 " />
               </button>
            </>
         )}
      </div>
   );
};

export default ProjectSettingsDialog;
