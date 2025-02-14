import { FormDialogState } from 'src/lib/types/form-dialog.types';
import { Plus } from 'lucide-react';

export const NewActionButton: React.FC<{
   setDialogState: React.Dispatch<React.SetStateAction<FormDialogState>>;
   type: 'task' | 'event';
}> = ({ setDialogState, type }) => {
   const handleNewEvent = () => {
      setDialogState((prevState) => ({
         type: type,
         id: '',
         isOpen: true,
         mode: 'create',
         data: {
            ...prevState.data,
            status: 'scheduled',
         },
      }));
   };

   return (
      <div
         onClick={handleNewEvent}
         className="hover:bg-tertiary rounded-xl transition-colors h-[40px] w-[40px] flex justify-center items-center cursor-pointer"
      >
         <Plus className="aspect-square h-[20px]" />
      </div>
   );
};
