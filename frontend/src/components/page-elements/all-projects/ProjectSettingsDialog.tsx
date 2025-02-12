import { Button } from 'src/components/shared/ui/primitives/Button';
import { Pencil } from 'lucide-react';
import React, { useState } from 'react';
import { useEditProject } from '@/lib/api/project-api';
import { DialogProps } from '@/lib/types/dialog.types';
import {
   paymentStatusSelections,
   projectStatusSelections,
} from 'src/components/shared/ui/constants/constants';
import { Path, SubmitHandler, useForm } from 'react-hook-form';
import type { NewTaskPayload, Project } from '@types';
import { InputProps } from '@/lib/types/form-input-props.types';
import StatusSelect from 'src/components/shared/ui/form-field-elements/StatusSelectForm';
import { Textarea } from 'src/components/shared/ui/primitives/Textarea';
import useDialogStore from '@/lib/zustand/dialog-store';
import { DialogFooter } from '@/components/shared/ui/primitives/Dialog';

const ProjectSettingsDialog: React.FC<DialogProps> = () => {
   const { formDialogState, setFormDialogState } = useDialogStore();
   const projectData = formDialogState.data as Project

   const { mutate: editProject } = useEditProject(projectData.id);

   const formMethods = useForm<Project>({
      defaultValues: projectData,
   });

   const { handleSubmit, reset } = formMethods;

   const handleDialogueClose = () => {
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: false
         }
      })
   };

   const onError = (errors: any) => {
      console.error('Validation Errors:', errors);
   };

   const onSubmit: SubmitHandler<NewTaskPayload> = (data) => {
      console.log(data);
   };

   return (
      <form onSubmit={handleSubmit(onSubmit, onError)}>
         <div className="bg-background rounded-2xl text-primary">
            <div className="p-4 flex flex-col gap-2">
               <div className="flex items-start text-md min-h-7 max-h-[700px]">
                  <p className="text-md w-[140px] shrink-0">Project Name</p>
                  <ProjectNameInput
                     formMethods={formMethods}
                     dialogState={formDialogState}
                     fieldName="name"
                  />
               </div>
               <div className="flex items-center shrink-0">
                  <p className="text-md w-[140px]">Project Status</p>
                  <StatusSelect
                     formMethods={formMethods}
                     selection={projectStatusSelections}
                     dialogState={formDialogState}
                     fieldName="projectStatus"
                  />
               </div>
               <div className="flex items-center shrink-0">
                  <p className="text-md w-[140px]">Payment Status</p>
                  <StatusSelect
                     formMethods={formMethods}
                     selection={paymentStatusSelections}
                     dialogState={formDialogState}
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
         </div>
      </form>
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
