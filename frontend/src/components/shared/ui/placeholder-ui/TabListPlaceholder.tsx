import { cn } from '@/lib/helper/utils';
import { Plus } from 'lucide-react';

const TabListPlaceHolder = ({
   addFn,
   children,
   page = 'allClientPage',
   className,
   containerClassName
}: {
   children: string;
   addFn: () => void;
   page?: 'allProjectPage' | 'allClientPage'
   className?: string;
   containerClassName?: string;
}) => {
   const placeholders = [...Array(20)].map((_,i) => {
      return (
         <div
         key={i}
         className={cn(
               `w-full shrink-0 opacity-60 rounded-[15px] border border-dashed border-secondary h-[50px]`,
               className
            )}
         />
      );
   });

   return (
      <div className={cn("flex flex-col gap-1 grow overflow-hidden relative pt-1 box-border", containerClassName)}>
         <div
            className={cn(
               'z-10 absolute h-full w-full left-0 bottom-0 bg-gradient-to-t from-foreground to-transparent pointer-events-none',
               page === 'allProjectPage' &&
                  'bg-gradient-to-t from-background to-transparent'
            )}
         />
         <div
            onClick={addFn}
            className={cn(
               `flex shrink-0 w-full gap-1 rounded-[15px] border border-dashed text-secondary border-secondary h-[50px] cursor-pointer`,
               'items-center justify-center hover:text-primary hover:border-primary transition-colors duration-100',
               className
            )}
         >
            <Plus className="w-6 h-6" />
            <p>{children}</p>
         </div>
         {placeholders}
      </div>
   );
};
export default TabListPlaceHolder;
