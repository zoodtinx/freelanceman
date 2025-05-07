import { Button } from '@/components/shared/ui/primitives/Button';
import { CirclePlus, Plus } from 'lucide-react';

export const ApiErrorPlaceHolder = ({
   children,
   retryFn,
}: {
   children: string;
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
   children,
   addFn,
}: {
   children: string;
   addFn: () => void;
}) => {
   return (
      <div className="flex flex-col justify-center items-center grow pb-5 gap-1 text-secondary">
         <Plus
            className="h-11 w-11 stroke text-tertiary hover:text-primary transition-colors cursor-pointer"
            onClick={addFn}
         />
         <p>{children}</p>
      </div>
   );
};
