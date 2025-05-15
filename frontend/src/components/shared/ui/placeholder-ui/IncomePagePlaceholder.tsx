import { Plus } from 'lucide-react';

const IncomePagePlacholder = ({ addFn }: { addFn: () => void }) => {
   const placeholders = [...Array(20)].map(() => {
      return (
         <div
            className={`w-full shrink-0 rounded-2xl border border-dashed border-secondary h-[100px]`}
         />
      );
   });

   return (
      <div className="flex flex-col gap-2 w-full h-full pb-2 relative">
         <div className='z-10 absolute h-full w-full left-0 bottom-0 bg-gradient-to-t from-background via-background to-transparent pointer-events-none' />
         <div
            onClick={addFn}
            className={`flex flex-col shrink-0 w-full rounded-2xl border border-dashed text-secondary border-secondary h-[100px]
                        items-center justify-center hover:text-primary hover:border-primary transition-colors duration-100`}
         >
            <Plus className="w-8 h-8" />
            <p>Get started by create a new project first</p>
         </div>
         {placeholders}
      </div>
   );
};

export default IncomePagePlacholder;
