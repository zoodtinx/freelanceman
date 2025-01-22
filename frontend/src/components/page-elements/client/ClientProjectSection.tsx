import { Building2, EllipsisVertical } from 'lucide-react';
import { SearchBox } from '@/components/shared/ui/SearchBox';
import React from 'react';
import { Switch } from '@/components/shared/ui/primitives/Switch';
import { Dots } from '@/components/shared/icons';

const ClientProjectSection: React.FC = () => {
   const clientData = {
      name: 'Sansiri PLC',
   };

   return (
      <div className="flex flex-col w-full bg-foreground rounded-[30px] p-4 pt-5 sm:w-full gap-[6px] shrink-0 overflow-hidden grow">
         <div className="flex justify-between">
            <div className="flex items-center h-[40px] justify-between w-full">
               <div className="flex gap-1">
                  <Building2 className="h-6 w-6 mt-1" />
                  <p className="text-xl pt-1 leading-none mr-2">
                     {clientData.name}
                  </p>
               </div>
               <EllipsisVertical className="w-5 h-5 text-secondary" />
            </div>
         </div>
         <div className="flex justify-between items-center">
            <SearchBox className="border rounded-full h-7 w-[250px]" />
            <div className="flex">
               <div className="flex gap-1">
                  <p>active</p>
                  <Switch />
               </div>
            </div>
         </div>
         <div>
            <ProjectTab />
         </div>
      </div>
   );
};

const ProjectTab: React.FC = () => {
   const project = {
      title: 'New House Launch Campaign',
      client: 'Sansiri'
   }

   return (
      <div
         className="flex rounded-[15px] h-[40px] relative border-2 border-transparent hover:border-primary transition-colors bg-gray-200"
      >
         <div className="z-10 flex items-center pl-3 pr-2 justify-between w-full text-[#333333]">
            <p className="font-medium max-w-[700px] text-md truncate cursor-default">
               {project.title}
            </p>
            <div className="flex grow items-center justify-end text-base text-primary">
               <p className="w-fit text-right mr-8 cursor-pointer hover:opacity-60 transition-opacity">
                  {project.client}
               </p>
               <p className="w-[170px]">
                  {/* {t('startedAt')} :{' '} */}
                  Modified : {'formattedDate'}
               </p>
               <Dots className="h-[20px] w-[18px] cursor-pointer" />
            </div>
         </div>
      </div>
   );
};

export default ClientProjectSection;
