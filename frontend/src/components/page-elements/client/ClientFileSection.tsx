import AddButton from '@/components/shared/ui/AddButton';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import React, { useState } from 'react';

const ClientFileSection: React.FC = () => {

   const handleAddFile = () => {
      console.log('added file');
   };

   return (
      <div className="flex flex-col w-full bg-foreground rounded-[30px] p-4 pt-5 sm:w-full gap-[6px] shrink-0 overflow-hidden h-1/2">
         <div className="flex justify-between items-center h-[33px]">
            <p className="text-lg">Files</p>
            <AddButton onClick={handleAddFile} />
         </div>
         <SearchBox className="border rounded-full h-[27px] w-[250px]" />
      </div>
   );
};

export default ClientFileSection;
