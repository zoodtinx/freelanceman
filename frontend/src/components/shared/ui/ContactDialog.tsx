import { Path, useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import React, { useEffect } from 'react';
import {
   DialogContent,
   DialogHeader,
   Dialog,
   DialogFooter,
   DialogTitle,
   DialogTrigger,
} from './Dialog';
import { Button } from './button';
import type { DialogProps } from './props.type';
import StatusSelect from './form/StatusSelect';


const ContactDialog: React.FC<DialogProps> = ({
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


export default ContactDialog;