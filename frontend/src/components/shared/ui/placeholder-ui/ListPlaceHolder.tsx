import { Button } from '@/components/shared/ui/primitives/Button';
import { cn } from '@/lib/helper/utils';
import { Loader2, Plus } from 'lucide-react';

export const ApiErrorPlaceHolder = ({
   children = 'Network Error',
   retryFn,
}: {
   children?: string;
   retryFn: () => void;
}) => {
   return (
      <div className="flex flex-col justify-center items-center grow pb-5 gap-1 text-secondary">
         <p>{children}</p>
         <Button
            className="border-secondary hover:text-secondary"
            size={'sm'}
            variant={'outline'}
            onClick={retryFn}
         >
            Try Again
         </Button>
      </div>
   );
};

export const NoDataPlaceHolder = ({
   children = 'Add New Entry',
   addFn,
   className,
}: {
   children?: string;
   addFn: () => void;
   className?: string;
}) => {
   return (
      <div
         onClick={addFn}
         className={cn(
            'flex flex-col justify-center items-center grow pb-5 gap-1 cursor-pointer text-secondary hover:text-primary transition-colors',
            className
         )}
      >
         <Plus className="h-8 w-8 transition-colors" />
         <p>{children}</p>
      </div>
   );
};

export const LoadingPlaceHolder = () => {
   return (
      <div className="flex justify-center items-center grow">
         <Loader2 className="animate-spin text-primary" />
      </div>
   );
};
