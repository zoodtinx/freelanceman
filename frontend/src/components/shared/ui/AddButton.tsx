import { Plus } from 'lucide-react';
import React from 'react';

interface AddButtonProps {
   onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
   return (
      <button
         type="button"
         onClick={onClick}
         className="h-[33px] w-[33px] p-1 flex justify-center items-center cursor-pointer text-secondary hover:text-primary transition-colors"
      >
         <Plus className="stroke-[2.75px] w-full h-full" />
      </button>
   );
};

export default AddButton;
