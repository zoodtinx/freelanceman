import React from 'react';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogFooter,
   DialogTrigger,
} from '../../primitives/Dialog';
import { Button } from '../../primitives/Button';
import { Trash2 } from 'lucide-react';
import { PromptDialogProps } from 'src/lib/types/form-dialog.types';

const DeletePromptDialog: React.FC<PromptDialogProps> = ({
   promptDialogState,
   setPromptDialogState,
   setDialogState,
}) => {
   
   const handleSubmit = () => {
      promptDialogState.data.action();
      setPromptDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
   };

   const handleCancel = () => {
      setPromptDialogState((prev) => {
         return {
            ...prev,
            isOpen: false,
         };
      });
      setDialogState((prev) => {
         return {
            ...prev,
            isOpen: true,
         };
      });
   };

   return (
      <Dialog open={promptDialogState.isOpen}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Contact
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px] w-[400px] flex flex-col focus:outline-none bg-red-700 rounded-2xl text-white">
            <DialogHeader className="py-1 bg-transparent text-md">
               <DialogTitle className="flex text-base w-full text-center items-center gap-1">
                  <Trash2 className="w-[14px] h-[14px]" />
                  Delete file
               </DialogTitle>
            </DialogHeader>
            <div className="bg-background rounded-2xl text-primary">
               <p className="text-wrap p-4 text-md">
                  Are you sure you want to delete{' '}
                  <p className="inline text-freelanceman-red font-semibold">
                     {promptDialogState.data.label}
                  </p>
               </p>
               <DialogFooter>
                  <div className="flex justify-between p-4">
                     <Button
                        variant="destructiveOutline"
                        className="flex gap-1"
                        onClick={handleCancel}
                     >
                        Cancel
                     </Button>
                     <Button
                        type="submit"
                        variant="submit"
                        className="flex gap-1"
                        onClick={handleSubmit}
                     >
                        Yes
                     </Button>
                  </div>
               </DialogFooter>
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default DeletePromptDialog;
