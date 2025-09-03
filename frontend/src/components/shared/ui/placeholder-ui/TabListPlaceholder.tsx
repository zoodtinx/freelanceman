import { cn } from '@/lib/helper/utils';
import { Plus } from 'lucide-react';

type TabListPlaceholderProps = {
   addFn: () => void;
   children: string;
   page?: 'allProjectPage' | 'allClientPage';
   className?: string;
   containerClassName?: string;
   placeholderCount?: number; // specify the amount in the main fn
};

const TabListPlaceHolder: React.FC<TabListPlaceholderProps> = ({
   addFn,
   children,
   page = 'allClientPage',
   className,
   containerClassName,
   placeholderCount = 20, // default to 1 if not specified
}) => {
   return (
      <div
         className={cn(
            "flex flex-col gap-1 grow overflow-hidden relative pt-1 box-border",
            containerClassName
         )}
      >
         <div
            className={cn(
               'z-10 absolute h-full w-full left-0 bottom-0 bg-gradient-to-t from-foreground to-transparent pointer-events-none',
               page === 'allProjectPage' &&
                  'bg-gradient-to-t from-background to-transparent'
            )}
         />
         <TabListAddButton addFn={addFn} className={className}>
            {children}
         </TabListAddButton>
         {Array.from({ length: placeholderCount }).map((_, i) => (
            <TabListPlaceholderTab className={className} key={i} />
         ))}
      </div>
   );
};

export const TabListAddButton: React.FC<{
   addFn: () => void;
   children: string;
   className?: string;
}> = ({ addFn, children, className }) => (
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
);

export const TabListPlaceholderTab: React.FC<{ className?: string }> = ({ className }) => (
   <div
      className={cn(
         `w-full shrink-0 opacity-60 rounded-[15px] border border-dashed border-secondary h-[50px]`,
         className
      )}
   />
);

export default TabListPlaceHolder;
