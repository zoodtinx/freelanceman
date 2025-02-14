import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from 'src/components/shared/ui/primitives/Dialog';
import { Button } from 'src/components/shared/ui/primitives/Button';
import { Plus } from 'lucide-react';
import FileSelector from '@/components/shared/ui/dialogs/selector-dialog/FileSelector';
import useDialogStore from '@/lib/zustand/dialog-store';
import ContactSelector from '@/components/shared/ui/dialogs/selector-dialog/ContactSelector';

const SelectorDialog = () => {
   const selectorDialogState = useDialogStore((state) => state.selectorDialogState);
   const setSelectorDialogState = useDialogStore((state) => state.setSelectorDialogState);
   const type = selectorDialogState.type;

   const handleDialogClose = () => {
      setSelectorDialogState((prev) => {
         return {
            ...prev,
            isOpen: false
         }
      })
   };

   const headerText =
      selectorDialogState.type.charAt(0).toUpperCase() +
      selectorDialogState.type.slice(1);

   const Selector = () => {
      switch (type) {
         case 'file':
            return <FileSelector />;
         case 'contact':
            return <ContactSelector />;
         default:
            return null;
      }
   }

   return (
      <Dialog open={true} onOpenChange={handleDialogClose}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Profile
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px] flex flex-col focus:outline-none bg-freelanceman-darkgrey text-white select-none">
            <DialogHeader className="py-1 bg-transparent">
               <DialogTitle className="flex text-base w-full text-center items-center gap-1">
                  <Plus className="w-[13px] h-[13px]" />
                  <p>Select {headerText}</p>
               </DialogTitle>
            </DialogHeader>
            <div className="bg-background rounded-2xl text-primary">
               <Selector />
            </div>
         </DialogContent>
      </Dialog>
   );
};

export default SelectorDialog;
