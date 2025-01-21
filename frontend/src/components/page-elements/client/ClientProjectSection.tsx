import { Building2, EllipsisVertical  } from 'lucide-react';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import React from 'react';
import { Switch } from '@/components/shared/ui/primitives/Switch';

const ClientProjectSection: React.FC = () => {
   const clientData = {
      name: 'Sansiri PLC',
   };

   return (
      <div className="flex flex-col w-full bg-foreground rounded-[30px] p-4 pt-5 sm:w-full gap-[6px] shrink-0 overflow-hidden grow">
         <div className="flex justify-between">
            <div className="flex items-center h-[40px] justify-between w-full">
               <div className='flex gap-1'>
                  <Building2 className="h-6 w-6 mt-1" />
                  <p className="text-xl pt-1 leading-none mr-2">
                     {clientData.name}
                  </p>
               </div>
               <EllipsisVertical className='w-5 h-5 text-secondary' />
            </div>
         </div>
         <div className='flex justify-between items-center'>
            <SearchBox className="border rounded-full h-7 w-[250px]" />
            <div className='flex'>
               <div className='flex gap-1'>
                  <p>active</p>
                  <Switch  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default ClientProjectSection;

