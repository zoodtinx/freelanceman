import { Plus } from 'lucide-react';

const ActionPageTaskListPlaceholder = ({ addFn }: { addFn: () => void }) => {
   const placeholders = [...Array(20)].map(() => {
      return (
         <div
            className={`w-full shrink-0 opacity-60 rounded-2xl border border-dashed border-secondary h-[55px]`}
         />
      );
   });

   return (
      <div className="flex flex-col gap-1 w-full h-full overflow-hidden relative p-4 pt-1 box-border">
         <div className='z-10 absolute h-full w-full left-0 bottom-0 bg-gradient-to-t from-foreground to-transparent pointer-events-none' />
         <div
            onClick={addFn}
            className={`flex shrink-0 w-full gap-1 rounded-2xl border border-dashed text-secondary border-secondary h-[55px] cursor-pointer
                        items-center justify-center hover:text-primary hover:border-primary transition-colors duration-100`}
         >
            <Plus className="w-6 h-6" />
            <p>Add a new task</p>
         </div>
         {placeholders}
      </div>
   );
};
export default ActionPageTaskListPlaceholder;