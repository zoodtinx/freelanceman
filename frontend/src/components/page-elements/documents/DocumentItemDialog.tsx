import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from 'src/components/shared/ui/primitives/Dialog';
import { Button } from 'src/components/shared/ui/primitives/Button';
import { Pencil, Settings } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useEditProject } from '@/lib/api/project-api';
import { DialogProps } from '@/lib/types/dialog.types';
import {
   defaultProject,
   paymentStatusSelections,
   projectStatusSelections,
} from 'src/components/shared/ui/constants';
import { Path, SubmitHandler, useForm } from 'react-hook-form';
import type { NewTaskPayload, Project } from '@types';
import { InputProps } from '@/lib/types/form-input-props.types';
import StatusSelect from 'src/components/shared/ui/form-field-elements/StatusSelectForm';
import { Textarea } from 'src/components/shared/ui/primitives/Textarea';

const DocumentItemDialog: React.FC<DialogProps> = ({
   dialogState,
   setDialogState,
}) => {

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

   return (
      <Dialog open={true} onOpenChange={handleDialogueClose}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Profile
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px] flex flex-col focus:outline-none bg-primary text-foreground">
            <form onSubmit={handleSubmit(onSubmit, onError)}>
               <DialogHeader className="py-1 bg-transparent">
                  <DialogTitle className="flex text-base w-full text-center items-center gap-1">
                     <Settings className="w-[13px] h-[13px]" />
                     <p>Project Settings</p>
                  </DialogTitle>
               </DialogHeader>
               <div className="bg-background rounded-2xl text-primary">
                  <div className="p-4 flex flex-col gap-2">
                     Hello
                  </div>
                  <DialogFooter>
                     <div className="flex justify-between p-4">
                        <div>
                           <Button variant={'destructiveOutline'}>
                              Discard
                           </Button>
                           <Button variant={'link'}>Delete Project</Button>
                        </div>
                        <div className="flex gap-2">
                           <Button variant={'default'}>Save</Button>
                        </div>
                     </div>
                  </DialogFooter>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   );
};

export default DocumentItemDialog