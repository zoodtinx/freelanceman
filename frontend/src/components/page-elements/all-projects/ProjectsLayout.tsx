import { Building2, Folder, User } from 'lucide-react';
import React from 'react';

const ClientLayout: React.FC = () => {
   
  const clientData = {
      name: 'Sansiri PLC',
   };

   return (
      <div className="flex flex-col w-full bg-foreground rounded-[30px] p-4 pt-5 sm:w-full h-full gap-[6px] shrink-0 overflow-hidden ">
         <div className="flex justify-between">
            <div className="flex items-center gap-1 h-[40px]">
               <Building2 className="h-6 w-6 mt-1" />
               <p className="text-xl pt-1 leading-none mr-2">{clientData.name}</p>
            </div>
         </div>
      </div>
   );
};

export default ClientLayout;
