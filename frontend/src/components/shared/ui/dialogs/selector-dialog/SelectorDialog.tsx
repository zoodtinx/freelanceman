import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from 'src/components/shared/ui/primitives/Dialog';
import { Button } from 'src/components/shared/ui/primitives/Button';
import { Plus } from 'lucide-react';
import ContactSelector from '@/components/shared/ui/dialogs/selector-dialog/ContactSelector';
import useSelectionDialogStore from '@/lib/zustand/selection-dialog-store';

const SelectorDialog = () => {
   const { selectorDialogState, setSelectorDialogState } =
      useSelectionDialogStore();
   const type = selectorDialogState.type;

   const handleDialogClose = () => {
      setSelectorDialogState((prev) => {
         return {
            ...prev,
            isOpen: false
         }
      })
   };

   const headerText = selectorDialogState.tab === 'client' ? 'Client Contact' : 'Partner Contact'

   const Selector = () => {
      switch (type) {
         case 'contact':
            return <ContactSelector />;
         default:
            return null;
      }
   }

   return (
      <Dialog open={selectorDialogState.isOpen} onOpenChange={handleDialogClose}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Profile
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px] flex flex-col focus:outline-none bg-constant-primary text-white select-none">
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
