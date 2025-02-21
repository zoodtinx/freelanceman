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
         className="h-[30px] w-[30px] flex justify-center items-center cursor-pointer text-secondary hover:text-primary transition-colors"
      >
         <Plus className="stroke-[2.75px] w-5 h-5" />
      </button>
   );
};

export default AddButton;
