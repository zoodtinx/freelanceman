import { FormDialogState } from 'src/lib/types/form-dialog.types';
import { Row } from '@tanstack/react-table';
import { Event } from '@types';
import { Dispatch, SetStateAction } from 'react';

interface CellWrapperProps {
   rowData: Row<Event>;
   setDialogState: Dispatch<SetStateAction<FormDialogState>>;
   tableType: string;
}

export const CellWrapper = ({
   rowData,
   setDialogState,
   tableType,
}: CellWrapperProps): JSX.Element => {
   const handleClick = () => {
      setDialogState({
         id: rowData.original.id,
         isOpen: true,
         mode: 'view',
         type: tableType,
         data: rowData.original,
      });
   };

   const eventName = rowData.original.name;

   return (
      <p onClick={handleClick} className="cursor-pointer">
         {eventName}
      </p>
   );
};
