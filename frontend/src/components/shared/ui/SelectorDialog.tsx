import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from 'src/components/shared/ui/primitives/Dialog';
import { Button } from 'src/components/shared/ui/primitives/Button';
import { CircleDollarSign, Plus } from 'lucide-react';
import { FilterSelect } from '@/components/shared/ui/PrebuiltSelect';
import { Checkbox } from '@/components/shared/ui/primitives/CheckBox';
import { Separator } from '@radix-ui/react-separator';
import { cn } from '@/lib/helper/utils';

const SelectorDialog = () => {

   const handleDialogueClose = () => {
      console.log('clicked')
   };

   return (
      <Dialog open={false} onOpenChange={handleDialogueClose}>
         <DialogTrigger asChild>
            <Button variant="outline" className="hidden">
               Edit Profile
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px] flex flex-col focus:outline-none bg-freelanceman-darkgrey text-white">
            <DialogHeader className="py-1 bg-transparent">
               <DialogTitle className="flex text-base w-full text-center items-center gap-1">
                  <Plus className="w-[13px] h-[13px]" />
                  <p>Select Document</p>
               </DialogTitle>
            </DialogHeader>
            <div className="bg-background rounded-2xl text-primary">
               <div className="px-4 py-3 flex flex-col">
                  <div className="border rounded-lg border-tertiary p-1 h-[200px] overflow-y-auto">
                     <SelectionList />
                  </div>
               </div>
               <DialogFooter>
                  <div className="flex justify-between p-4">
                     <Button variant={'destructiveOutline'}>Delete</Button>
                     <Button
                        variant={'submit'}
                        className="text-freelanceman-darkgrey"
                     >
                        Add
                     </Button>
                  </div>
               </DialogFooter>
            </div>
         </DialogContent>
      </Dialog>
   );
};

const SelectionList = () => {
   return (
      <div>
         <SelectionItem />
         <SelectionItem />
         <SelectionItem />
         <SelectionItem />
         <SelectionItem />
         <SelectionItem />
         <SelectionItem />
         <SelectionItem />
         <SelectionItem />
         <SelectionItem />
         <SelectionItem />
         <SelectionItem />
      </div>
   )
}


const SelectionItem = () => {
   const isSelected = true
   const selectState = {enableSelect:true}
   
   return (
      <div className="flex flex-col cursor-default">
         <div
            className={cn(
               'flex px-2 py-1 items-center bg-transparent hover:bg-quaternary transition-colors duration-100',
               { 'bg-quaternary': isSelected }
            )}
         >
            <Checkbox
               className={cn(
                  'h-[14px] w-0 opacity-0 transition-all duration-150',
                  { 'w-[14px] mr-1  opacity-100': selectState.enableSelect }
               )}
               checked={isSelected}
            />
            <div className="flex flex-col w-full">
               <div className="flex justify-between grow items-center">
                  <div className="flex gap-2 items-center">
                     <div className="flex gap-1 items-center text-base">
                        <p>Hello</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <Separator className="bg-quaternary h-[1px]" />
      </div>
   )
}

export default SelectorDialog;
