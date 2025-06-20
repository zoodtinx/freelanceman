import { Loader2, Plus } from 'lucide-react';
import React from 'react';

interface LoadMoreButtonProps {
   loadMoreFn: () => void;
   isLoading: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
   isLoading,
   loadMoreFn,
}) => {
   if (isLoading) {
      return (
         <div className="h-6 flex items-center gap-1">
            <Loader2 className="animate-spin h-5 w-5" />
            {/* <p>Loading</p> */}
         </div>
      );
   }

   return (
      <div
         onClick={loadMoreFn}
         className={`w-fit flex text-center cursor-pointer text-secondary border-secondary rounded-full px-2 pr-3
                     h-6 items-center justify-center transition-colors gap-1 sm:pb-3
                     hover:border-primary hover:text-primary`}
      >
         <Plus className="w-4 h-4" />
         <p>Load more</p>
      </div>
   );
};

export default LoadMoreButton;
