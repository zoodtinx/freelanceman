import { cn } from '@/lib/helper/utils';
import { Plus } from 'lucide-react';
import React from 'react';

interface AddButtonProps {
   onClick: () => void;
   className?: string
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, className }) => {
   return (
      <button
         type="button"
         onClick={onClick}
         className={cn(
            'h-[33px] w-[33px] p-1 flex justify-center items-center cursor-pointer text-secondary hover:text-primary transition-colors',
            className
         )}
      >
         <Plus className="stroke-[2.75px] w-full h-full" />
      </button>
   );
};

export default AddButton;
