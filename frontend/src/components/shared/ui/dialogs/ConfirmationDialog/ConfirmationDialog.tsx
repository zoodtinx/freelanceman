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
import useDialogStore from '@/lib/zustand/dialog-store';

const ConfirmationDialog = () => {
   const confirmationDialogState = useDialogStore(
      (state) => state.confirmationDialogState
   );

   const setConfirmationDialogState = useDialogStore(
      (state) => state.setConfirmationDialogState
   );
   
   const setFormDialogState = useDialogStore(
      (state) => state.setFormDialogState
   );

   const handleSubmit = () => {
      console.log('submit')
   };

   const handleCancel = () => {
      setFormDialogState((prev) => {
         return {
            ...prev,
            isOpen: true
         }
      })
      setConfirmationDialogState((prev) => {
         return {
            ...prev,
            isOpen: false
         }
      })
      console.log('cancelled')
   };

   const message = confirmationDialogState.message
   const rightButtonFn = confirmationDialogState.actions.primary
   const leftButtonFn = confirmationDialogState.actions.secondary
   const type = confirmationDialogState.type

   return (
      <Dialog open={confirmationDialogState.isOpen} onOpenChange={handleCancel} >
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Contact
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px] w-[400px] flex flex-col focus:outline-none bg-red-700 rounded-2xl text-white">
            <DialogHeader className="py-1 bg-transparent text-md">
               <DialogTitle className="flex text-base w-full text-center items-center gap-1">
                  <Trash2 className="w-[14px] h-[14px]" />
                  Confirm Delete
               </DialogTitle>
            </DialogHeader>
            <div className="bg-background rounded-2xl text-primary">
               <div className="text-wrap p-4 text-md">
                  {message()}
               </div>
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

export default ConfirmationDialog;
